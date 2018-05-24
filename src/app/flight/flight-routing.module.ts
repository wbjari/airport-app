import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { FlightComponent } from './flight.component';

const flightRoutes: Routes = [
  {
    path: '', component: FlightComponent, children: [
      { path: '', component: FlightListComponent },
      { path: 'flights/new', component: FlightEditComponent },
      { path: 'flights/:id', component: FlightDetailComponent },
      { path: 'flights/:id/edit', component: FlightEditComponent },
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
