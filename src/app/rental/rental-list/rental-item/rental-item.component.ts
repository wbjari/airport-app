import { Component, Input } from '@angular/core';

import { Rental } from '../../rental.model';

@Component({
  selector: 'app-rental-item',
  templateUrl: './rental-item.component.html'
})
export class RentalItemComponent {
  @Input()
  public rental: Rental;
}
