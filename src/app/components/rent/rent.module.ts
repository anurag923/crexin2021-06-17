import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRoutingModule } from './rent-routing.module';
import { RentComponent } from './rent.component';


@NgModule({
  declarations: [RentComponent],
  imports: [
    CommonModule,
    RentRoutingModule
  ]
})
export class RentModule { }
