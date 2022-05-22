export class Positioning {
  private getAllStyles(element: HTMLElement): CSSStyleDeclaration {
    return window.getComputedStyle(element);
  }

  private getStyle(element: HTMLElement, prop: any): string {
    return this.getAllStyles(element)[prop];
  }

  private isStaticPositioned(element: HTMLElement): boolean {
    return (this.getStyle(element, 'position') || 'static') === 'static';
  }

  private offsetParent(element: HTMLElement): HTMLElement {
    let offsetParentEl = element.offsetParent as HTMLElement || document.documentElement;

    while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
      offsetParentEl = offsetParentEl.offsetParent as HTMLElement;
    }

    return offsetParentEl || document.documentElement;
  }

  position(element: HTMLElement, round = true): any {
    let elPosition: any;
    let parentOffset: any = {width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0};

    if (this.getStyle(element, 'position') === 'fixed') {
      elPosition = element.getBoundingClientRect() as any;
      elPosition = {
        top: elPosition.top,
        bottom: elPosition.bottom,
        left: elPosition.left,
        right: elPosition.right,
        height: elPosition.height,
        width: elPosition.width,
      };
    } else {
      const offsetParentEl = this.offsetParent(element);

      elPosition = this.offset(element, false);

      if (offsetParentEl !== document.documentElement) {
        parentOffset = this.offset(offsetParentEl, false);
      }

      parentOffset.top += offsetParentEl.clientTop;
      parentOffset.left += offsetParentEl.clientLeft;
    }

    elPosition.top -= parentOffset.top;
    elPosition.bottom -= parentOffset.top;
    elPosition.left -= parentOffset.left;
    elPosition.right -= parentOffset.left;

    if (round) {
      elPosition.top = Math.round(elPosition.top);
      elPosition.bottom = Math.round(elPosition.bottom);
      elPosition.left = Math.round(elPosition.left);
      elPosition.right = Math.round(elPosition.right);
    }

    return elPosition;
  }

  offset(element: HTMLElement, round: boolean = true): any {
    const elBcr = element.getBoundingClientRect();
    const viewportOffset = {
      top: window.pageYOffset - document.documentElement.clientTop,
      left: window.pageXOffset - document.documentElement.clientLeft
    };

    const elOffset = {
      height: elBcr.height || element.offsetHeight,
      width: elBcr.width || element.offsetWidth,
      top: elBcr.top + viewportOffset.top,
      bottom: elBcr.bottom + viewportOffset.top,
      left: elBcr.left + viewportOffset.left,
      right: elBcr.right + viewportOffset.left,
    };

    if (round) {
      elOffset.height = Math.round(elOffset.height);
      elOffset.width = Math.round(elOffset.width);
      elOffset.top = Math.round(elOffset.top);
      elOffset.bottom = Math.round(elOffset.bottom);
      elOffset.left = Math.round(elOffset.left);
      elOffset.right = Math.round(elOffset.right);
    }

    return elOffset;
  }

  positionElements(
    hostElement: HTMLElement,
    targetElement: HTMLElement,
    placement: string,
    offset: { x: number, y: number },
    appendToBody?: boolean,
  ):
    boolean {
    const [placementPrimary = 'top', placementSecondary = 'center'] = placement.split('-');

    const hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
    const targetElStyles = this.getAllStyles(targetElement);

    const marginTop = parseFloat(targetElStyles.marginTop);
    const marginBottom = parseFloat(targetElStyles.marginBottom);
    const marginLeft = parseFloat(targetElStyles.marginLeft);
    const marginRight = parseFloat(targetElStyles.marginRight);

    let topPosition = 0;
    let leftPosition = 0;

    switch (placementPrimary) {
      case 'top':
        topPosition = (hostElPosition.top - (targetElement.offsetHeight + marginTop + marginBottom)) + offset.y;
        break;
      case 'bottom':
        topPosition = (hostElPosition.top + hostElPosition.height) + offset.y;
        break;
      case 'left':
        leftPosition = (hostElPosition.left - (targetElement.offsetWidth + marginLeft + marginRight)) + offset.x;
        break;
      case 'right':
        leftPosition = (hostElPosition.left + hostElPosition.width) + offset.x;
        break;
    }

    switch (placementSecondary) {
      case 'top':
        topPosition = hostElPosition.top + offset.y;
        break;
      case 'bottom':
        topPosition = hostElPosition.top + hostElPosition.height - targetElement.offsetHeight + offset.y;
        break;
      case 'left':
        leftPosition = hostElPosition.left + offset.x;
        break;
      case 'right':
        leftPosition = hostElPosition.left + hostElPosition.width - targetElement.offsetWidth + offset.x;
        break;
      case 'center':
        if (placementPrimary === 'top' || placementPrimary === 'bottom') {
          leftPosition = (hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2) + offset.x;
        } else {
          topPosition = (hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2) + offset.y;
        }
        break;
    }

    targetElement.style.top = `${Math.round(topPosition)}px`;
    targetElement.style.left = `${Math.round(leftPosition)}px`;

    // Check if the targetElement is inside the viewport
    const targetElBCR = targetElement.getBoundingClientRect();
    const html = document.documentElement;
    const windowHeight = window.innerHeight || html.clientHeight;
    const windowWidth = window.innerWidth || html.clientWidth;

    return targetElBCR.left >= 0 && targetElBCR.top >= 0 && targetElBCR.right <= windowWidth &&
      targetElBCR.bottom <= windowHeight;
  }
}

const placementSeparator = /\s+/;
export const positionService = new Positioning();

export function positionElements(
  hostElement: HTMLElement, targetElement: HTMLElement,
  placement: string | Placement | PlacementArray, offset: { x: number, y: number },
  appendToBody?: boolean, baseClass?: string): Placement | null {
  const placementVals: Array<Placement> =
    Array.isArray(placement) ? placement : placement.split(placementSeparator) as Array<Placement>;

  const allowedPlacements = [
    'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top', 'left-bottom',
    'right-top', 'right-bottom'
  ];

  const classList = targetElement.classList;
  const addClassesToTarget = (targetPlacement: Placement): Array<string> => {
    const [primary, secondary] = targetPlacement.split('-');
    const classes: string[] = [];
    if (baseClass) {
      classes.push(`${baseClass}-${primary}`);
      if (secondary) {
        classes.push(`${baseClass}-${primary}-${secondary}`);
      }

      classes.forEach((classname) => {
        classList.add(classname);
      });
    }

    return classes;
  };

  // Remove old placement classes to avoid issues
  if (baseClass) {
    allowedPlacements.forEach((placementToRemove: string) => {
      classList.remove(`${baseClass}-${placementToRemove}`);
    });
  }

  // replace auto placement with other placements
  let hasAuto = placementVals.findIndex(val => val === 'auto');
  if (hasAuto >= 0) {
    allowedPlacements.forEach((obj) => {
      if (placementVals.find(val => val.search('^' + obj) !== -1) == null) {
        placementVals.splice(hasAuto++, 1, obj as Placement);
      }
    });
  }

  // coordinates where to position

  // Required for transform:
  const style = targetElement.style;
  style.position = 'absolute';
  style.top = '0';
  style.left = '0';

  let testPlacement: Placement | null = null;
  let isInViewport = false;
  for (testPlacement of placementVals) {
    const addedClasses = addClassesToTarget(testPlacement as Placement);

    if (positionService.positionElements(hostElement, targetElement, testPlacement as Placement, offset, appendToBody)) {
      isInViewport = true;
      break;
    }

    // Remove the baseClasses for further calculation
    if (baseClass) {
      addedClasses.forEach((classname) => {
        classList.remove(classname);
      });
    }
  }

  if (!isInViewport) {
    // If nothing match, the first placement is the default one
    testPlacement = placementVals[0];
    addClassesToTarget(testPlacement);
    positionService.positionElements(hostElement, targetElement, testPlacement, offset, appendToBody);
  }

  return testPlacement;
}

export type Placement =
  'auto' | 'top' | 'bottom' | 'left' | 'right' |
  'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' |
  'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';

export type PlacementArray = Placement | Array<Placement> | string;
