import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpcenterRoutingModule } from './helpcenter-routing.module';
import { HelpcenterComponent } from './helpcenter.component';


@NgModule({
  declarations: [
    HelpcenterComponent
  ],
  imports: [
    CommonModule,
    HelpcenterRoutingModule
  ]
})
export class HelpcenterModule { }
