import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ]
})
export class AccountPasswordModule { }
