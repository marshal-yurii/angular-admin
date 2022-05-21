import {Pipe, PipeTransform} from '@angular/core';
import {ListItem} from './multiselect.model';

@Pipe({
  name: 'multiSelectFilter',
  pure: false,
})
export class MultiselectFilterPipe implements PipeTransform {
  transform(items: ListItem[], filter: ListItem, isAdditionalTextNDC: boolean = false): ListItem[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item: ListItem) => this.applyFilter(item, filter, isAdditionalTextNDC));
  }

  applyFilter(item: ListItem, filter: ListItem, isAdditionalTextNDC: boolean): boolean {
    const additionalText = isAdditionalTextNDC ? item?.additionalText?.toString()?.replace(/-/g, '') : item?.additionalText?.toString();
    if (typeof item.text === 'string' && typeof filter.text === 'string') {
      return !(filter.text && item.text && item.text.toLowerCase().indexOf(filter.text.toLowerCase()) === -1 
        && !additionalText?.includes(filter?.text?.toString()?.replace(/-/g, '')));
    } else {
      return !(filter.text && item.text && item.text.toString().toLowerCase().indexOf(filter.text.toString().toLowerCase()) === -1 
        && !additionalText?.includes(filter?.text?.toString()?.replace(/-/g, '')));
    }
  }
}
