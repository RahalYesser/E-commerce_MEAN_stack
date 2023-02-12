import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-information',
  templateUrl:'profile-information.component.html',
  styles: [
  ]
})
export class ProfileInformationComponent {

  @Input() user: User | undefined

}
