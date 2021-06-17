import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { CheckoutGuard } from 'src/app/guards/guards/checkout.guard';
@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[CheckoutService,CheckoutGuard]
})
export class CheckoutModule { }
