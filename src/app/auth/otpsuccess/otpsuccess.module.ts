import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpsuccessRoutingModule } from './otpsuccess-routing.module';
import { OtpsuccessComponent } from './otpsuccess.component';


@NgModule({
  declarations: [OtpsuccessComponent],
  imports: [
    CommonModule,
    OtpsuccessRoutingModule
  ]
})
export class OtpsuccessModule { }
