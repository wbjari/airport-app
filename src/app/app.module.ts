import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { CustomerModule } from './customer/customer.module';
import { FlightModule } from './flight/flight.module';
// import { RentalModule } from './rental/rental.module';
import { SecurityModule } from './security/security.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    CustomerModule,
    FlightModule,
    // RentalModule,
    SecurityModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
