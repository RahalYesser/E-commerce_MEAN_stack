import { Component } from '@angular/core';


@Component({
  selector: 'app-landing-page',
  templateUrl:'landing-page.component.html',
  styles: ['*{font-family: poppins;}'
  ]
})
export class LandingPageComponent {
  cols = 4 ;
  rowHeight: number = 355;

}
