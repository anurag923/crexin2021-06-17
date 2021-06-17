import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingstatusRoutingModule } from './bookingstatus-routing.module';
import { BookingstatusComponent } from './bookingstatus.component';


@NgModule({
  declarations: [
    BookingstatusComponent
  ],
  imports: [
    CommonModule,
    BookingstatusRoutingModule
  ]
})
export class BookingstatusModule { }
