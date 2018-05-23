import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalItemComponent } from './rental-list/rental-item/rental-item.component';
import { RentalRoutingModule } from './rental-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RentalService } from './rental.service';

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RentalRoutingModule,
    SharedModule
  ],
  providers: [
    RentalService
  ]
})
export class RentalModule {}
