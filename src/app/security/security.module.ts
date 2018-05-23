import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SecurityComponent } from './security.component';
import { SecurityListComponent } from './security-list/security-list.component';
import { SecurityItemComponent } from './security-list/security-item/security-item.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SecurityService } from './security.service';

@NgModule({
  declarations: [
    SecurityComponent,
    SecurityListComponent,
    SecurityItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SecurityRoutingModule,
    SharedModule
  ],
  providers: [
    SecurityService
  ]
})
export class SecurityModule {}
