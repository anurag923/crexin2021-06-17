import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpsuccessComponent } from './otpsuccess.component';

const routes: Routes = [{ path: '', component: OtpsuccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtpsuccessRoutingModule { }
