import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsuccessRoutingModule } from './accountsuccess-routing.module';
import { AccountsuccessComponent } from './accountsuccess.component';


@NgModule({
  declarations: [
    AccountsuccessComponent
  ],
  imports: [
    CommonModule,
    AccountsuccessRoutingModule
  ]
})
export class AccountsuccessModule { }
