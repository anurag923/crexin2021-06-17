import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeeklybookingstatusComponent } from './weeklybookingstatus.component';

const routes: Routes = [{ path: '', component: WeeklybookingstatusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeeklybookingstatusRoutingModule { }
