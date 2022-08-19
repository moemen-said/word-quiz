import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { appRouteAnimations } from './app-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[appRouteAnimations],
})
export class AppComponent {
  title = 'wordQuiz';

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }
}
