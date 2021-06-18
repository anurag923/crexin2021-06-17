import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AESEncryptDecryptServiceService } from '../../services/aesencrypt-decrypt-service.service';
import { AccountPasswordRoutingModule } from './account-password-routing.module';
import { AccountPasswordComponent } from './account-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountPasswordComponent
  ],
  imports: [
    CommonModule,
    AccountPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[AESEncryptDecryptServiceService]
})
export class AccountPasswordModule { }
