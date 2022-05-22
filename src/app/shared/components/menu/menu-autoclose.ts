import {NgZone} from '@angular/core';
import {fromEvent, Observable, race} from 'rxjs';
import {delay, filter, map, takeUntil, tap, withLatestFrom} from 'rxjs/operators';

export enum Key {
  Tab = 9,
  Enter = 13,
  Escape = 27,
  Space = 32,
  PageUp = 33,
  PageDown = 34,
  End = 35,
  Home = 36,
  ArrowLeft = 37,
  ArrowUp = 38,
  ArrowRight = 39,
  ArrowDown = 40,
}

export function closest(element: HTMLElement, selector?: string): HTMLElement | null {
  if (!selector) {
    return null;
  }

  if (typeof element.closest === 'undefined') {
    return null;
  }

  return element.closest(selector);
}

const isContainedIn = (element: HTMLElement, array?: HTMLElement[]) =>
  array ? array.some(item => item.contains(element)) : false;

const matchesSelectorIfAny = (element: HTMLElement, selector?: string) =>
  !selector || closest(element, selector) != null;

const isMobile = (() => {
  const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  const isAndroid = () => /Android/.test(navigator.userAgent);

  return typeof navigator !== 'undefined' ? !!navigator.userAgent && (isIOS() || isAndroid()) : false;
})();

const wrapAsyncForMobile = (fn: any) => isMobile ? () => setTimeout(() => fn(), 100) : fn;

export const enum SOURCE {ESCAPE, CLICK}

export const autoClose = (
  zone: NgZone,
  document: any,
  type: boolean | 'inside' | 'outside',
  close: (source: SOURCE) => void,
  closed$: Observable<any>,
  insideElements: HTMLElement[],
  ignoreElements?: HTMLElement[],
  insideSelector?: string,
) => {
  // closing on ESC and outside clicks
  if (type) {
    zone.runOutsideAngular(wrapAsyncForMobile(() => {

      const shouldCloseOnClick = (event: MouseEvent) => {
        const element = event.target as HTMLElement;
        if (event.button === 2 || isContainedIn(element, ignoreElements)) {
          return false;
        }
        if (type === 'inside') {
          return isContainedIn(element, insideElements) && matchesSelectorIfAny(element, insideSelector);
        } else if (type === 'outside') {
          return !isContainedIn(element, insideElements);
        } else /* if (type === true) */ {
          return matchesSelectorIfAny(element, insideSelector) || !isContainedIn(element, insideElements);
        }
      };

      const escapes$ = fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(
          takeUntil(closed$),
          // tslint:disable-next-line:deprecation
          filter(e => e.which === Key.Escape), tap(e => e.preventDefault()));

      const mouseDowns$ =
        fromEvent<MouseEvent>(document, 'mousedown').pipe(map(shouldCloseOnClick), takeUntil(closed$));

      const closeableClicks$ = fromEvent<MouseEvent>(document, 'mouseup')
        .pipe(
          withLatestFrom(mouseDowns$),
          filter(([_, shouldClose]: [MouseEvent, any]) => shouldClose),
          delay(0),
          takeUntil(closed$),
        ) as Observable<any>;

      race<any>([
        escapes$.pipe(map(_ => SOURCE.ESCAPE)), closeableClicks$.pipe(map(_ => SOURCE.CLICK))
      ]).subscribe((source: SOURCE) => zone.run(() => close(source)));
    }));
  }
};
