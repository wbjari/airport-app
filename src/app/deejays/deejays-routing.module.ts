import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeejayListComponent } from './deejay-list/deejay-list.component';
import { DeejaysComponent } from './deejays.component';

const deejaysRoutes: Routes = [
  {
    path: '', component: DeejaysComponent, children: [
      { path: '', component: DeejayListComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(deejaysRoutes)
  ],
  exports: [RouterModule]
})
export class DeejaysRoutingModule { }
