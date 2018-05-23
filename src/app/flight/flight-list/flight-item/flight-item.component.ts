import { Component, Input } from '@angular/core';

import { Flight } from '../../flight.model';

@Component({
  selector: 'app-flight-item',
  templateUrl: './flight-item.component.html'
})
export class FlightItemComponent {
  @Input()
  public flight: Flight;
}
