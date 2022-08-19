import { transition, trigger, style, animate, query } from '@angular/animations';


export const appRouteAnimations = trigger('appRouteAnimations', [
    transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
            })
        ],{optional: true }),
        query(':enter', [style({ opacity: 0 })],{ optional: true }),
        query(':leave', [animate('200ms ease-in', style({ opacity: 0 }))],{optional:true}),
        query(':enter', [animate('300ms ease-out', style({ opacity: 1}))],{ optional: true })
    ])
]);