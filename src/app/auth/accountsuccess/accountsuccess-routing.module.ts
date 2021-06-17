import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsuccessComponent } from './accountsuccess.component';

const routes: Routes = [{ path: '', component: AccountsuccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsuccessRoutingModule { }
