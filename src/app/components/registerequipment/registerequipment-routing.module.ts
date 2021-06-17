import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterequipmentComponent } from './registerequipment.component';

const routes: Routes = [{ path: '', component: RegisterequipmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterequipmentRoutingModule { }
