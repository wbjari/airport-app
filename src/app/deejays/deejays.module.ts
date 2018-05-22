import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DeejaysComponent } from './deejays.component';
import { DeejayListComponent } from './deejay-list/deejay-list.component';
import { DeejayItemComponent } from './deejay-list/deejay-item/deejay-item.component';
import { DeejaysRoutingModule } from './deejays-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DeejayService } from './deejay.service';

@NgModule({
  declarations: [
    DeejaysComponent,
    DeejayListComponent,
    DeejayItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DeejaysRoutingModule,
    SharedModule
  ],
  providers: [
    DeejayService
  ]
})
export class DeejaysModule {}
