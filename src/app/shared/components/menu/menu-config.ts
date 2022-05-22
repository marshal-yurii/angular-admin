import {Injectable} from '@angular/core';
import {PlacementArray} from './menu-positioning';

@Injectable({providedIn: 'root'})
export class MenuConfig {
  autoClose: boolean | 'inside' | 'outside' = true;
  placement: PlacementArray = 'auto';
  triggers = 'click';
  container!: string;
  disableMenu = false;
  menuClass!: string;
  openDelay = 0;
  closeDelay = 0;
}
