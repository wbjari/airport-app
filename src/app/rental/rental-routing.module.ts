import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentalListComponent } from './Rental-list/Rental-list.component';
import { RentalComponent } from './Rental.component';

const RentalRoutes: Routes = [
  {
    path: '', component: RentalComponent, children: [
      { path: '', component: RentalListComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(RentalRoutes)
  ],
  exports: [RouterModule]
})

export class RentalRoutingModule { }
