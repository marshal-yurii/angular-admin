export interface IDropdownSettings {
  singleSelection?: boolean;
  idField?: string;
  textField?: string;
  additionalText?: string;
  disabledField?: string;
  enableCheckAll?: boolean;
  selectAllText?: string;
  unSelectAllText?: string;
  allowSearchFilter?: boolean;
  clearSearchFilter?: boolean;
  maxHeight?: number;
  limitSelection?: number;
  searchPlaceholderText?: string;
  noDataAvailablePlaceholderText?: string;
  closeDropDownOnSelection?: boolean;
  showSelectedItemsAtTop?: boolean;
  allowRemoteDataSearch?: boolean;
}

export class ListItem {
  id!: string | number;
  text!: string | number;
  additionalText?: string | number;
  disable?: boolean;

  public constructor(source: any) {
    if (typeof source === 'string' || typeof source === 'number') {
      this.id = this.text = source;
      this.disable = false;
    }
    if (typeof source === 'object') {
      this.id = source.id;
      this.text = source.text;
      this.additionalText = source.additionalText;
      this.disable = source.disable;
    }
  }
}
