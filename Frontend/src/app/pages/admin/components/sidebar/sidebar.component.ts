import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl:'sidebar.component.html',
  styles: ['*{ font-family: poppins;}'
  ]
})
export class SidebarComponent {

  @Input() select: any;
}
