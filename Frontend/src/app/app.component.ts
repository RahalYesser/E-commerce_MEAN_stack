import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` 
  <app-header></app-header>
  <router-outlet></router-outlet>
  <app-footer></app-footer>
  <app-copyright></app-copyright>
  `,
  styles: []
})
export class AppComponent {
  title = 'store';
}
