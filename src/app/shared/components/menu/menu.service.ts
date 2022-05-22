import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  NgZone,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import {Observable, of} from 'rxjs';

export class ContentRef {
  constructor(
    public nodes: any[],
    public viewRef?: ViewRef,
  ) {
  }
}

export class MenuService<T> {
  private windowRef: ComponentRef<T> | null = null;
  private contentRef: ContentRef | null = null;

  constructor(
    private type: any,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
  ) {
  }

  open(content?: string | TemplateRef<any>, context?: any): { windowRef: ComponentRef<T> } {
    if (!this.windowRef) {
      this.contentRef = this._getContentRef(content, context);
      this.windowRef = this.viewContainerRef.createComponent(
        this.componentFactoryResolver.resolveComponentFactory<T>(this.type),
        this.viewContainerRef.length,
        this.injector,
        this.contentRef.nodes,
      );
    }

    return {windowRef: this.windowRef};
  }

  close(): Observable<void> {
    if (this.contentRef?.viewRef) {
      this.applicationRef.detachView(this.contentRef.viewRef);
      this.contentRef.viewRef.destroy();
      this.contentRef = null;

      if (this.windowRef) {
        this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.windowRef.hostView));
        this.windowRef = null;
      }
    }

    return of(undefined);
  }

  private _getContentRef(content?: string | TemplateRef<any>, context?: any): ContentRef {
    if (!content) {
      return new ContentRef([]);
    } else if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(context);
      this.applicationRef.attachView(viewRef);
      return new ContentRef([viewRef.rootNodes], viewRef);
    } else {
      return new ContentRef([[this.renderer.createText(`${content}`)]]);
    }
  }
}
