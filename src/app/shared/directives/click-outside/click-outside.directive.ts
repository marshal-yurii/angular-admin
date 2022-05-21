import {Directive, Output, EventEmitter, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<Event>();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  onClick(ev: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(ev.target);

    if (!clickedInside) {
      this.clickOutside.emit(ev);
    }
  }
}
