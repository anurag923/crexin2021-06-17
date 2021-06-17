import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HourlybookingstatusComponent } from './hourlybookingstatus.component';

const routes: Routes = [{ path: '', component: HourlybookingstatusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HourlybookingstatusRoutingModule { }
