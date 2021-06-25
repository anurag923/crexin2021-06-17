import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AESEncryptDecryptServiceService } from '../../services/aesencrypt-decrypt-service.service';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { CheckoutGuard } from 'src/app/guards/guards/checkout.guard';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers:[CheckoutService,CheckoutGuard,AESEncryptDecryptServiceService]
})
export class CheckoutModule { }
