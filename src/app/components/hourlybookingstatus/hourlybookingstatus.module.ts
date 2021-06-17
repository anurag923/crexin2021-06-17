import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HourlybookingstatusRoutingModule } from './hourlybookingstatus-routing.module';
import { HourlybookingstatusComponent } from './hourlybookingstatus.component';


@NgModule({
  declarations: [
    HourlybookingstatusComponent
  ],
  imports: [
    CommonModule,
    HourlybookingstatusRoutingModule
  ]
})
export class HourlybookingstatusModule { }
