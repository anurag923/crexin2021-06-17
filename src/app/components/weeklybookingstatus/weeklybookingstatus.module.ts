import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeeklybookingstatusRoutingModule } from './weeklybookingstatus-routing.module';
import { WeeklybookingstatusComponent } from './weeklybookingstatus.component';


@NgModule({
  declarations: [
    WeeklybookingstatusComponent
  ],
  imports: [
    CommonModule,
    WeeklybookingstatusRoutingModule
  ]
})
export class WeeklybookingstatusModule { }
