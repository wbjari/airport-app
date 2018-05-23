import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityListComponent } from './security-list/security-list.component';
import { SecurityComponent } from './security.component';

const securityRoutes: Routes = [
  {
    path: '', component: SecurityComponent, children: [
      { path: '', component: SecurityListComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(securityRoutes)
  ],
  exports: [RouterModule]
})

export class SecurityRoutingModule { }
