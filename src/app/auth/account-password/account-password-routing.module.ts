import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPasswordComponent } from './account-password.component';

const routes: Routes = [{ path: '', component: AccountPasswordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountPasswordRoutingModule { }
