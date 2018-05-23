import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlightComponent } from './flight.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightItemComponent } from './flight-list/flight-item/flight-item.component';
import { FlightRoutingModule } from './flight-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlightService } from './flight.service';

@NgModule({
  declarations: [
    FlightComponent,
    FlightListComponent,
    FlightItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlightRoutingModule,
    SharedModule
  ],
  providers: [
    FlightService
  ]
})
export class FlightModule {}
