import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BaseControlDirective} from '../../directives/base-control.directive';
import {debounceTime, distinctUntilChanged, skip} from 'rxjs/operators';
import {Subject, takeUntil} from "rxjs";

export const DEFAULT_SEARCH_BOUNCE = 2;

export enum SearchInputColorEnum {
  Green = 'green',
  Blue = 'blue',
}

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SearchInputComponent), multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => SearchInputComponent), multi: true},
  ],
})
export class SearchInputComponent extends BaseControlDirective implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() searchResults!: any[];
  @Input() loading!: boolean;
  @Input() isDrugOption = true;
  @Input() hideDropdown!: boolean;
  @Input() processed!: boolean;
  @Input() label!: string;
  @Input() hasError!: boolean;
  @Input() errorMessage!: string;
  @Input() color!: SearchInputColorEnum; // add whatever color you want
  // TODO: provide autocomplete as placeholder + replace with full string on Enter
  @Input()
  set customComplete(val: boolean) {
    if (val) {
      this.initPlaceholderAutocomplete();
    }
  }

  @Output() keyEnter: EventEmitter<void> = new EventEmitter();
  @Output() searchFocused: EventEmitter<void> = new EventEmitter();
  @Output() searchBlurred: EventEmitter<void> = new EventEmitter();
  @Output() searchCleared: EventEmitter<void> = new EventEmitter();
  @Output() keydownTab: EventEmitter<void> = new EventEmitter();
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();
  @Output() searchValueChanged: EventEmitter<string> = new EventEmitter();

  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChildren('searchResults') searchResultsQueryList!: QueryList<ElementRef>;

  SearchInputColorEnum = SearchInputColorEnum;

  searchControl: FormControl = new FormControl({value: '', disabled: this.disable});

  isOpened = false;
  chosenItem: any;

  DEFAULT_SEARCH_BOUNCE = DEFAULT_SEARCH_BOUNCE;

  focusedOptionIndex = -1; // should be always -1 till assigned to focused option

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  @HostListener('keydown', ['$event'])
  keyDown(ev: any): void {
    if (ev.key === 'ArrowUp') {
      this.arrowNavigationHandler(-1);
    } else if (ev.key === 'ArrowDown') {
      this.arrowNavigationHandler(+1);
    } else if (ev.key === 'Enter' || ev.key === 'Tab') {
      setTimeout(() => {
        if (this.focusedOptionIndex >= 0 && this.focusedOptionIndex < this.searchResults.length) {
          this.chooseOption(this.searchResults[this.focusedOptionIndex]);
        }
      }, 100);
    }
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        skip(1),
        takeUntil(this.onDestroy$),
        distinctUntilChanged(),
        debounceTime(250),
      )
      .subscribe((value: string) => {
        if (!value || value.length >= DEFAULT_SEARCH_BOUNCE || this.hideDropdown) {
          this.searchValueChanged.emit(value);
        }

        if (value && value.length > 10 && !isNaN(+value)) {
          value = value.slice(value.indexOf('3') + 1, value.indexOf('3') + 11);
          // ignore everything up until the first 3 - everything after is the ndc either with a check digit or without.
        }

        this.writeValue(value);
      });
  }

  ngAfterViewInit(): void {
    if (this.autofocus) {
      setTimeout(() => {
        // click to trigger isFocused state
        this.searchInput.nativeElement.click();
        this.searchInput.nativeElement.focus();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.searchInput && changes['autofocus'] &&
      changes['autofocus'].currentValue !== changes['autofocus'].previousValue &&
      changes['autofocus'].currentValue === true
    ) {
      setTimeout(() => {
        // click to trigger isFocused state
        this.searchInput.nativeElement.click();
        this.searchInput.nativeElement.focus();
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  override writeValue(search: string): void {
    if (this.isDrugOption && search === null) {
      this.chosenItem = null;
    }
    this.value = search;
    this.searchControl.patchValue(search);
  }

  initPlaceholderAutocomplete(): void {
  }

  keyupHandler(ev: KeyboardEvent): void {
    if (this.chosenItem) {
      if (!!ev.key.match(/^[0-9a-zA-Z]$/)) {
        this.searchControl.patchValue(ev.key);
      } else {
        this.searchControl.patchValue('');
      }

      this.chosenItem = null;
      this.optionSelected.emit(null);
    }

    if (ev.key === 'Enter') {
      this.keyEnter.emit();
    }
  }

  chooseOption(option: any): void {
    this.chosenItem = option;
    this.writeValue(this.isDrugOption ? option.friendlyName : option.name);
    this.optionSelected.emit(option);
    this.isOpened = false;
    this.focusedOptionIndex = -1;
  }

  clearSearch(): void {
    this.chosenItem = null;
    this.onChangeCallback(null);
    this.searchControl.patchValue('');
    this.searchCleared.emit();
    this.focusedOptionIndex = -1;
  }

  focusInput(): void {
    setTimeout(() => this.searchInput.nativeElement.focus());
    this.isFocused = true;
    this.focusedOptionIndex = -1;
  }

  searchFocus(): void {
    this.isFocused = true;
    this.searchFocused.emit();
  }

  searchBlur(): void {
    this.isFocused = false;
    this.searchBlurred.emit();
  }

  private arrowNavigationHandler(increment: number): void {
    if (this.scrollContainer) {
      const queryList = this.searchResultsQueryList.toArray();

      if (queryList.length) {
        this.focusedOptionIndex += increment;

        if (this.focusedOptionIndex < -1 || this.focusedOptionIndex === queryList.length) {
          this.focusedOptionIndex = 0;
        } else if (this.focusedOptionIndex === -1) {
          this.focusedOptionIndex = queryList.length - 1;
        }

        setTimeout(() => queryList[this.focusedOptionIndex].nativeElement.focus());

        if (this.focusedOptionIndex > 0 && this.focusedOptionIndex < queryList.length - 1) {
          queryList[this.focusedOptionIndex].nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
        } else if (this.focusedOptionIndex === 0) {
          setTimeout(() => this.scrollContainer.nativeElement.scrollTop = 0, 50);
        } else {
          setTimeout(() => this.scrollContainer.nativeElement.scrollTop =
            this.scrollContainer.nativeElement.scrollHeight -
            queryList[this.focusedOptionIndex].nativeElement.clientHeight, 50);
        }
      }
    }
  }
}
