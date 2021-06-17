import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../../services/checkout.service';
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
  ],
  providers:[CheckoutService]
})
export class BookingsModule { }
