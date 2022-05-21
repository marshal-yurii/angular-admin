import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {IDropdownSettings, ListItem} from './multiselect.model';
import {BaseControlDirective} from "../../directives/base-control.directive";

@Component({
  selector: 'app-multiselect-dropdown',
  templateUrl: './multiselect-dropdown.component.html',
  styleUrls: ['./multiselect-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectDropdownComponent),
      multi: true,
    },
  ],
})
export class MultiselectDropdownComponent extends BaseControlDirective implements ControlValueAccessor {
  @Input()
  set settings(value: IDropdownSettings) {
    this.settingsInner = value ? {...this.defaultSettings, ...value} : {...this.defaultSettings};
  }

  get settings(): IDropdownSettings {
    return this.settingsInner || {...this.defaultSettings};
  }

  @Input()
  set itemsLimit(value: number) {
    this.itemsLimitInner = value || 1000;
  }

  get itemsLimit(): number {
    return this.itemsLimitInner;
  }

  @Input()
  set data(value: any[]) {
    if (!value) {
      this.dataInner = [];
    } else {
      const firstItem = value[0];

      this.sourceDataType = typeof firstItem as any;
      this.sourceDataFields = this.getFields(firstItem);

      this.dataInner = value.map((item: any) =>
        typeof item === 'string' || typeof item === 'number'
          ? new ListItem(item)
          : new ListItem({
            id: item[this.settingsInner.idField || ''],
            text: item[this.settingsInner.textField || ''],
            additionalText: item[this.settingsInner.additionalText || ''],
            disable: item[this.settingsInner.disabledField || ''],
          })
      );
    }
  }

  get data(): Array<any> {
    return this.dataInner;
  }

  @Input() label!: string;
  @Input() id!: number | string;
  @Input() loading!: boolean;
  @Input() isAllItemsSelected = true;
  @Input() shouldFilterByNDC = false;

  @Output() filterChanged: EventEmitter<string> = new EventEmitter<any>();
  @Output() dropDownOpened: EventEmitter<ListItem> = new EventEmitter<any>();
  @Output() dropDownClosed: EventEmitter<ListItem> = new EventEmitter<any>();
  @Output() selected: EventEmitter<ListItem> = new EventEmitter<any>();
  @Output() deSelected: EventEmitter<ListItem> = new EventEmitter<any>();
  @Output() selectedAll: EventEmitter<Array<ListItem>> = new EventEmitter<Array<ListItem>>();
  @Output() deSelectedAll: EventEmitter<Array<ListItem>> = new EventEmitter<Array<ListItem>>();
  @Output() tabEnterEvent: EventEmitter<void> = new EventEmitter<void>();

  defaultSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    additionalText: 'code',
    disabledField: 'disable',
    enableCheckAll: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: false,
    limitSelection: -1,
    clearSearchFilter: true,
    maxHeight: 200,
    searchPlaceholderText: 'Search',
    noDataAvailablePlaceholderText: 'No items available',
    closeDropDownOnSelection: false,
    showSelectedItemsAtTop: false,
    allowRemoteDataSearch: false,
  };

  opened!: boolean;
  override isFocused = false;
  itemsLimitInner!: number;
  settingsInner: IDropdownSettings = {...this.defaultSettings};
  dataInner: Array<ListItem> = [];
  selectedItems: Array<ListItem> = [];
  placeholderInner = 'Select';
  filteredItems: ListItem[] = [];
  multiselectSearchTooltip: string | number = '';
  filter: ListItem = new ListItem(this.data);

  focusedOptionIndex = -1; // should be always -1 till assigned to focused option

  private skipClasses = ['clear-search-icon', 'remove-icon'];

  private sourceDataType = null;
  private sourceDataFields: string[] = [];

  @ViewChild('searchTooltip') searchTooltip!: any;
  @ViewChild('multiselectDropdown') multiselectDropdown!: any;
  @ViewChild('optionsListContainer') optionsListContainer!: any;
  @ViewChild('optionsScrollContainer') optionsScrollContainer!: any;
  @ViewChildren('multiselectItems') multiselectItemsQueryList!: QueryList<ElementRef>;

  @HostListener('keydown', ['$event'])
  keyDown(ev: any): void {
    if (ev.key === 'ArrowUp') {
      this.arrowNavigationHandler(-1);
    } else if (ev.key === 'ArrowDown') {
      this.arrowNavigationHandler(+1);
    } else if (ev.key === 'Enter') {
      setTimeout(() => {
        if (this.focusedOptionIndex >= 0) {
          this.onItemClick(null, this.filter.text ? this.filteredItems[this.focusedOptionIndex] : this.data[this.focusedOptionIndex]);
        } else if (this.isFocused) {
          this.closeOnKeydown();
        }
      }, 100);
    } else if (ev.key === 'Tab') {
      if (this.isFocused) {
        this.closeOnKeydown();
      }
    }
  }

  closeOnKeydown(): void {
    this.opened = false;
    this.dropDownClosed.emit();
    this.tabEnterEvent.emit();
  }

  arrowNavigationHandler(increment: number): void {
    let queryList: ElementRef[] = [];

    if (this.data && this.optionsListContainer) {
      queryList = this.multiselectItemsQueryList.toArray();
    }

    if (queryList?.length) {
      this.focusedOptionIndex += increment;

      if (this.focusedOptionIndex < -1 || this.focusedOptionIndex === queryList.length) {
        this.focusedOptionIndex = 0;
      } else if (this.focusedOptionIndex === -1) {
        this.focusedOptionIndex = queryList.length - 1;
      }

      setTimeout(() => {
        queryList[this.focusedOptionIndex].nativeElement.focus();

        if (this.focusedOptionIndex > 0 && this.focusedOptionIndex < queryList.length - 1) {
          queryList[this.focusedOptionIndex].nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
        } else if (this.focusedOptionIndex === 0) {
          setTimeout(() => (this.optionsListContainer || this.optionsScrollContainer).nativeElement.scrollTop = 0, 100);
        } else {
          (this.optionsListContainer || this.optionsScrollContainer).nativeElement.scrollTop =
            (this.optionsListContainer || this.optionsScrollContainer)
              .nativeElement.scrollHeight - queryList[this.focusedOptionIndex].nativeElement.clientHeight;
        }
      });
    }
  }

  filterTextChange(search: string): void {
    this.filteredItems = this.data.filter((item: ListItem) => {
      return !(this.filter.text && item.text && item.text.toString().toLowerCase().indexOf(this.filter.text.toString().toLowerCase()) === -1)
    });
    if (search && search.length > 1) {
      search = search.toLowerCase();
      const additionalText = this.filteredItems[0]?.additionalText?.toString();
      const firstItemText: string = `${this.filteredItems[0]?.text.toString()} ${additionalText ? ` | ${additionalText}` : ''}` || '';
      this.multiselectSearchTooltip = (firstItemText.toLowerCase().startsWith(search) ? firstItemText.substring(search.length) : '') as string;
    } else {
      this.multiselectSearchTooltip = '';
      this.filteredItems = [];
    }

    this.filterChanged.emit(search);
  }

  searchTooltipApply(): void {
    if (this.filter.text && this.filteredItems.length) {
      this.onItemClick(null, this.filteredItems[0]);
      this.filter.text = '';
      this.multiselectSearchTooltip = '';
      this.filteredItems = [];
    }
  }

  onItemClick($event: any, item: ListItem): void {
    if (this.disable || item.disable) {
      return;
    }

    const found = this.isSelected(item);
    const allowAdd = this.settingsInner.limitSelection && (this.settingsInner.limitSelection === -1 ||
      (this.settingsInner.limitSelection > 0 && this.selectedItems.length < this.settingsInner.limitSelection));

    if (!found) {
      if (allowAdd) {
        this.addSelected(item);
      }
    } else {
      this.removeSelected(item);
    }

    if (this.settingsInner.singleSelection && this.settingsInner.closeDropDownOnSelection) {
      this.closeDropdown($event);
    }
  }

  override writeValue(value: any): void {
    if (value !== undefined && value !== null && value.length > 0) {
      if (this.settingsInner.singleSelection) {
        try {
          if (value.length >= 1) {
            const firstItem = value[0];
            this.selectedItems = [
              typeof firstItem === 'string' || typeof firstItem === 'number'
                ? new ListItem(firstItem)
                : new ListItem({
                  id: firstItem[this.settingsInner.idField || ''],
                  text: firstItem[this.settingsInner.textField || ''],
                  additionalText: firstItem[this.settingsInner.additionalText || ''],
                  disable: firstItem[this.settingsInner.disabledField || ''],
                })
            ];
          }
        } catch (e) {
          // console.error(e.body.msg);
        }
      } else {
        const dataInner = value.map((item: any) =>
          typeof item === 'string' || typeof item === 'number'
            ? new ListItem(item)
            : new ListItem({
              id: item[this.settingsInner.idField || ''],
              text: item[this.settingsInner.textField || ''],
              additionalText: item[this.settingsInner.additionalText || ''],
              disable: item[this.settingsInner.disabledField || ''],
            })
        );
        if (this.settingsInner.limitSelection && this.settingsInner.limitSelection > 0) {
          this.selectedItems = dataInner.splice(0, this.settingsInner.limitSelection);
        } else {
          this.selectedItems = dataInner;
        }
      }
    } else {
      this.selectedItems = [];
    }

    this.value = value;
  }

  trackByFn(index: number, item: any): number | string {
    return item.id;
  }

  isSelected(clickedItem: ListItem): boolean {
    return !!this.selectedItems.find(item => clickedItem.id === item.id);
  }

  isItemDisabled(item: any): boolean {
    return this.disable || (this.isLimitSelectionReached() && !this.isSelected(item)) || item.disable;
  }

  isLimitSelectionReached(): boolean {
    return this.settingsInner.limitSelection === this.selectedItems.length;
  }

  showButton(): boolean {
    if (!this.settingsInner.singleSelection) {
      if (this.settingsInner.limitSelection && this.settingsInner.limitSelection > 0) {
        return false;
      }
      // this.settingsInner.enableCheckAll = this.settingsInner.limitSelection === -1 ? true : false;
      return true; // !this.settingsInner.singleSelection && this.settingsInner.enableCheckAll && this.dataInner.length > 0;
    } else {
      // should be disabled in single selection mode
      return false;
    }
  }

  addSelected(item: ListItem): void {
    if (this.isAllItemsSelected) {
      this.isAllItemsSelected = false;
    }
    if (this.settingsInner.singleSelection) {
      this.selectedItems = [];
      this.selectedItems.push(item);
    } else {
      this.selectedItems.push(item);
    }
    this.writeValue(this.emittedValue(this.selectedItems));
    this.selected.emit(this.emittedValue(item));
  }

  removeSelected(itemSel: ListItem): void {
    this.selectedItems.forEach(item => {
      if (itemSel.id === item.id) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
      }
    });

    this.writeValue(this.emittedValue(this.selectedItems));
    this.deSelected.emit(this.emittedValue(itemSel));
  }

  emittedValue(val: any): any {
    const selected: any[] = [];

    if (Array.isArray(val)) {
      val.map(item => {
        selected.push(this.objectify(item));
      });
    } else {
      if (val) {
        return this.objectify(val);
      }
    }

    return selected;
  }

  objectify(val: ListItem): any {
    if (this.sourceDataType === 'object') {
      const obj: any = {};
      obj[this.settingsInner.idField as string] = val.id;
      obj[this.settingsInner.textField as string] = val.text;
      obj[this.settingsInner.additionalText as string] = val.additionalText;
      if (this.sourceDataFields.includes(this.settingsInner.disabledField as string)) {
        obj[this.settingsInner.disabledField as string] = val.disable;
      }
      return obj;
    }
    if (this.sourceDataType === 'number') {
      return Number(val.id);
    } else {
      return val.text;
    }
  }

  toggleDropdown(ev: any): void {
    const classList = ev && (ev.target as HTMLElement).classList;

    if (!classList.value.includes('remove-icon')) {
      ev.preventDefault();

      if (this.disable && this.settingsInner.singleSelection) {
        return;
      }

      this.opened = !this.opened;

      this.opened ?
        this.dropDownOpened.emit() :
        this.dropDownClosed.emit();

      this.isFocused = true;
    }
  }

  closeDropdown(ev: Event): void {
    if (this.opened) {
      const classList = ev && (ev.target as HTMLElement).classList;

      if (!this.skipClasses.some(el => classList.value.includes(el))) {
        this.opened = false;
        this.isFocused = false;

        if (this.settingsInner.clearSearchFilter) {
          this.filter.text = '';
        }

        this.dropDownClosed.emit();
      }
    }
  }

  showSelectAll(): boolean {
    return !!((
        !this.filter.text &&
        this.dataInner.length > 0 || this.settingsInner.allowRemoteDataSearch
      ) &&
      !this.settingsInner.singleSelection &&
      this.settingsInner.enableCheckAll &&
      this.settingsInner.limitSelection === -1);
  }

  toggleSelectAll(remove?: boolean): void {
    if (this.disable) {
      return;
    }

    if (this.isAllItemsSelected || remove) {
      this.deSelectedAll.emit([]);
    } else {
      this.selectedItems = [];
      this.selectedAll.emit([]);
    }

    this.writeValue([]);
  }

  getFields(inputData: any): any[] {
    const fields: any[] = [];

    if (typeof inputData !== 'object') {
      return fields;
    }
    // tslint:disable-next-line
    for (const prop in inputData) {
      fields.push(prop);
    }

    return fields;
  }
}
