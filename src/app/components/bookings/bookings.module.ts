import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../../services/checkout.service';
import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingsComponent } from './bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [
    BookingsComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule
  ],
  providers:[CheckoutService]
})
export class BookingsModule { }
