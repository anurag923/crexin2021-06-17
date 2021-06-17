import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingstatusComponent } from './bookingstatus.component';

const routes: Routes = [{ path: '', component: BookingstatusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingstatusRoutingModule { }
