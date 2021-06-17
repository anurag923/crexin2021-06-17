import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsignupRoutingModule } from './vendorsignup-routing.module';
import { VendorsignupComponent } from './vendorsignup.component';


@NgModule({
  declarations: [VendorsignupComponent],
  imports: [
    CommonModule,
    VendorsignupRoutingModule
  ]
})
export class VendorsignupModule { }
