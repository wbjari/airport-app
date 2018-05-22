import { Component, Input } from '@angular/core';

import { Deejay } from '../../deejay.model';

@Component({
  selector: 'app-deejay-item',
  templateUrl: './deejay-item.component.html'
})
export class DeejayItemComponent {
  @Input()
  public deejay: Deejay;
}
