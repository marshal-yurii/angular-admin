import {animate, group, query, state, style, transition, trigger} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0, transform: 'scale(0.95)'}),
    animate('100ms', style({opacity: 1, transform: 'scale(1)'})),
  ]),
  transition(':leave', [
    animate('100ms', style({opacity: 0, transform: 'scale(0.95)'})),
  ]),
]);

export const slideToLeft =
  trigger('slideToLeft', [
    transition('* => rightToLeft', slideTo('left') ),
    transition('* => leftToRight', slideTo('right') ),
    transition('rightToLeft => *', slideTo('left') ),
    transition('leftToRight => *', slideTo('right') ),
  ]);

function slideTo(direction: string) {
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: '94px',
        [direction]: 0,
        width: 'calc(100% - 280px)',
      }),
    ], { optional: true }),
    query(':enter', [
      style({ [direction]: 'calc(-100% - 260px'}),
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: 'calc(100% + 260px)'})),
      ], { optional: true }),
      query(':enter', [
        animate('600ms ease', style({ [direction]: 'calc(0% + 260px)'})),
      ])
    ]),
  ];
}
