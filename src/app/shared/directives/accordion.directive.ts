import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAccordion]',
})
export class AccordionDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  @HostListener('click', ['$event']) onClick($event: any) {
    this.el.nativeElement.classList.toggle('is-open');

    const content = this.el.nativeElement.nextElementSibling;

    if (content.style.maxHeight) {
      // accordion is currently open, so close it
      content.style.maxHeight = null;
    } else {
      // accordion is currently closed, so open it
      content.style.maxHeight = content.scrollHeight + "px";

    }
  }
}
