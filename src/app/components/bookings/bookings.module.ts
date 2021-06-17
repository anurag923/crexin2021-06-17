import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingsComponent } from './bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BookingsComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BookingsModule { }
