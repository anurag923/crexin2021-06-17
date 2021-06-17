import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyordersComponent } from './myorders.component';

const routes: Routes = [{ path: '', component: MyordersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyordersRoutingModule { }
