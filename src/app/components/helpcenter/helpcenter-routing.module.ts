import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpcenterComponent } from './helpcenter.component';

const routes: Routes = [{ path: '', component: HelpcenterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpcenterRoutingModule { }
