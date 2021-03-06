import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customers', loadChildren: '../app/customer/customer.module#CustomerModule', pathMatch: 'full' },
  { path: 'flights', loadChildren: '../app/flight/flight.module#FlightModule', pathMatch: 'full' },
  // { path: 'rental', loadChildren: '../app/rental/rental.module#RentalModule', pathMatch: 'full' },
  { path: 'securitys', loadChildren: '../app/security/security.module#SecurityModule', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
