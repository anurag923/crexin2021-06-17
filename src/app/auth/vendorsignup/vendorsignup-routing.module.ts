import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorsignupComponent } from './vendorsignup.component';

const routes: Routes = [{ path: '', component: VendorsignupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorsignupRoutingModule { }
