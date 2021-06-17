import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyordersRoutingModule } from './myorders-routing.module';
import { MyordersComponent } from './myorders.component';


@NgModule({
  declarations: [MyordersComponent],
  imports: [
    CommonModule,
    MyordersRoutingModule
  ]
})
export class MyordersModule { }
