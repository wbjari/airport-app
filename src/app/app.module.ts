import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { FlightComponent } from './flight/flight.component';
import { SecurityComponent } from './security/security.component';
import { RentalComponent } from './rental/rental.component';
import { HomeComponent } from './core/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    FlightComponent,
    SecurityComponent,
    RentalComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
