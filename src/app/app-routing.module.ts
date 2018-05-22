import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { FlightComponent } from './flight/flight.component';
import { RentalComponent } from './rental/rental.component';
import { SecurityComponent } from './security/security.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customer', loadChildren: '../app/customer/customer.module#CustomerModule', pathMatch: 'full' },
  { path: 'flight', loadChildren: '../app/flight/flight.module#FlightModule', pathMatch: 'full' },
  { path: 'rental', loadChildren: '../app/rental/rental.module#RentalModule', pathMatch: 'full' },
  { path: 'security', loadChildren: '../app/security/security.module#SecurityModule', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
