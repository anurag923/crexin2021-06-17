import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderconfirmationRoutingModule } from './orderconfirmation-routing.module';
import { OrderconfirmationComponent } from './orderconfirmation.component';


@NgModule({
  declarations: [OrderconfirmationComponent],
  imports: [
    CommonModule,
    OrderconfirmationRoutingModule
  ]
})
export class OrderconfirmationModule { }
