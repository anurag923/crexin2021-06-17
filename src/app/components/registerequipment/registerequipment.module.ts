import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterequipmentRoutingModule } from './registerequipment-routing.module';
import { RegisterequipmentComponent } from './registerequipment.component';


@NgModule({
  declarations: [RegisterequipmentComponent],
  imports: [
    CommonModule,
    RegisterequipmentRoutingModule
  ]
})
export class RegisterequipmentModule { }
