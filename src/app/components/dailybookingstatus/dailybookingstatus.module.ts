import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailybookingstatusRoutingModule } from './dailybookingstatus-routing.module';
import { DailybookingstatusComponent } from './dailybookingstatus.component';


@NgModule({
  declarations: [
    DailybookingstatusComponent
  ],
  imports: [
    CommonModule,
    DailybookingstatusRoutingModule
  ]
})
export class DailybookingstatusModule { }
