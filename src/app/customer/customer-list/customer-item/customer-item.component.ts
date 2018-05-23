import { Component, Input } from '@angular/core';

import { Customer } from '../../customer.model';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html'
})
export class CustomerItemComponent {
  @Input()
  public customer: Customer;
}
