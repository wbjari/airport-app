import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerItemComponent } from './customer-list/customer-item/customer-item.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomerService } from './customer.service';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerListComponent,
    CustomerItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    SharedModule
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule {}
