import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderconfirmationComponent } from './orderconfirmation.component';

const routes: Routes = [{ path: '', component: OrderconfirmationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderconfirmationRoutingModule { }
