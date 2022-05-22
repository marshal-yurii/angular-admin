import {
  Component,
  Directive,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  OnChanges,
  Inject,
  Injector,
  Renderer2,
  ComponentRef,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  NgZone,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectorRef,
  ApplicationRef,
  HostBinding,
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {listenToTriggers} from './menu-triggers';
import {autoClose} from './menu-autoclose';
import {positionElements, PlacementArray} from './menu-positioning';
import {MenuService} from './menu.service';
import {MenuConfig} from './menu-config';
import {fadeInOut} from '../../animations/animations';

let nextId = 0;

@Component({
  selector: 'app-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './menu.component.html',
  animations: [fadeInOut],
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() hasAnimation!: boolean;
  @Input() title: string | TemplateRef<any> | null | undefined;
  @Input() id!: string;
  @Input() menuClass!: string;
  @Input() context!: any;

  @HostBinding('role') role = 'tooltip';
  @HostBinding('style.zIndex') zIndex = 1;
  @HostBinding('@fadeInOut') trigger = '';

  isTitleTemplate(): boolean {
    return this.title instanceof TemplateRef;
  }
}

@Directive({selector: '[appMenu]', exportAs: 'appMenu'})
export class MenuDirective implements OnInit, OnDestroy, OnChanges {
  // tslint:disable-next-line
  static ngAcceptInputType_autoClose: boolean | string;

  @Input() hasAnimation!: boolean;
  @Input() autoClose!: boolean | 'inside' | 'outside';
  @Input() menuContent!: string | TemplateRef<any> | null | undefined;
  @Input() menuTitle!: string | TemplateRef<any> | null | undefined;
  @Input() placement!: PlacementArray;
  @Input() triggers!: string;
  @Input() container!: string;
  @Input() disableMenu!: boolean;
  @Input() menuClass!: string;
  @Input() openDelay!: number;
  @Input() closeDelay!: number;
  @Input() offsetX = 0;
  @Input() offsetY = 0;

  @Output() hidden = new EventEmitter<void>();

  private appMenuWindowId = `app-menu-${nextId++}`;
  private menuService!: MenuService<MenuComponent>;
  private windowRef: ComponentRef<MenuComponent> | null = null;
  private unregisterListenersFn!: any;
  private zoneSubscription!: any;

  private _isDisabled(): boolean {
    if (this.disableMenu) {
      return true;
    }

    if (!this.menuContent && !this.menuTitle) {
      return true;
    }
    return false;
  }

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    injector: Injector,
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    config: MenuConfig,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: any,
    private changeDetector: ChangeDetectorRef,
    applicationRef: ApplicationRef,
  ) {
    this.autoClose = config.autoClose;
    this.placement = config.placement;
    this.triggers = config.triggers;
    this.container = config.container;
    this.disableMenu = config.disableMenu;
    this.menuClass = config.menuClass;
    this.openDelay = config.openDelay;
    this.closeDelay = config.closeDelay;
    this.menuService = new MenuService<MenuComponent>(
      MenuComponent,
      injector,
      viewContainerRef,
      renderer,
      this.ngZone,
      componentFactoryResolver,
      applicationRef,
    );

    this.zoneSubscription = ngZone.onStable.subscribe(() => {
      if (this.windowRef) {
        positionElements(
          this.elementRef.nativeElement, this.windowRef.location.nativeElement, this.placement,
          {x: this.offsetX, y: this.offsetY},
          this.container === 'body', 'app-menu');
      }
    });
  }

  open(context?: any): void {
    if (!this.windowRef && !this._isDisabled()) {
      const {windowRef} = this.menuService.open(this.menuContent as (string | TemplateRef<any>), context);
      this.windowRef = windowRef;
      this.windowRef.instance.hasAnimation = this.hasAnimation;
      this.windowRef.instance.title = this.menuTitle;
      this.windowRef.instance.context = context;
      this.windowRef.instance.menuClass = this.menuClass;
      this.windowRef.instance.id = this.appMenuWindowId;

      this.renderer.setAttribute(this.elementRef.nativeElement, 'aria-describedby', this.appMenuWindowId);
      this.renderer.addClass(this.elementRef.nativeElement, 'opened');

      if (this.container === 'body') {
        this.document.querySelector(this.container).appendChild(this.windowRef.location.nativeElement);
      }

      this.windowRef.changeDetectorRef.detectChanges();
      this.windowRef.changeDetectorRef.markForCheck();

      autoClose(
        this.ngZone,
        this.document,
        this.autoClose,
        () => this.close(),
        this.hidden,
        [this.windowRef.location.nativeElement],
      );
    }
  }

  close(): void {
    if (this.windowRef) {
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'aria-describedby');
      this.renderer.removeClass(this.elementRef.nativeElement, 'opened');
      this.menuService.close().subscribe(() => {
        this.windowRef = null;
        this.hidden.emit();
        this.changeDetector.markForCheck();
      });
    }
  }

  toggle(): void {
    if (this.windowRef) {
      this.close();
    } else {
      this.open();
    }
  }

  isOpen(): boolean {
    return this.windowRef != null;
  }

  ngOnInit(): void {
    this.unregisterListenersFn = listenToTriggers(
      this.renderer,
      this.elementRef.nativeElement,
      this.triggers,
      this.isOpen.bind(this),
      this.open.bind(this),
      this.close.bind(this),
      +this.openDelay,
      +this.closeDelay,
    );
  }

  ngOnChanges({menuContent, menuTitle, disableMenu, menuClass}: SimpleChanges): void {
    if (menuClass && this.isOpen()) {
      if (this.windowRef && this.windowRef.instance) {
        this.windowRef.instance.menuClass = menuClass.currentValue;
      }
    }
    if ((menuContent || menuTitle || disableMenu) && this._isDisabled()) {
      this.close();
    }
  }

  ngOnDestroy(): void {
    this.close();
    if (this.unregisterListenersFn) {
      this.unregisterListenersFn();
    }
    this.zoneSubscription.unsubscribe();
  }
}
