import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VendorComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VendorModule { }
