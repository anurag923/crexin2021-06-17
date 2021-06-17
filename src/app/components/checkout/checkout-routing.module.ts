import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutGuard } from 'src/app/guards/guards/checkout.guard';

import { CheckoutComponent } from './checkout.component';
const routes: Routes = [{ path: '', component: CheckoutComponent ,canDeactivate:[CheckoutGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
