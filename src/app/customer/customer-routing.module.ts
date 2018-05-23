import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer.component';

const customerRoutes: Routes = [
  {
    path: '', component: CustomerComponent, children: [
      { path: '', component: CustomerListComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(customerRoutes)
  ],
  exports: [RouterModule]
})

export class CustomerRoutingModule { }
