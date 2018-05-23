import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightComponent } from './flight.component';

const flightRoutes: Routes = [
  {
    path: '', component: FlightComponent, children: [
      { path: '', component: FlightListComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(flightRoutes)
  ],
  exports: [RouterModule]
})

export class FlightRoutingModule { }
