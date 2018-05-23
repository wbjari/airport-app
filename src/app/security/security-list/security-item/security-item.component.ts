import { Component, Input } from '@angular/core';

import { Security } from '../../security.model';

@Component({
  selector: 'app-security-item',
  templateUrl: './security-item.component.html'
})
export class SecurityItemComponent {
  @Input()
  public security: Security;
}
