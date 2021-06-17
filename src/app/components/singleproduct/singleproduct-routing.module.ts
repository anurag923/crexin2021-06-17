import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemovevalGuard } from '../../guards/guards/removeval.guard';
import { SingleproductComponent } from './singleproduct.component';

const routes: Routes = [{ path: '', component: SingleproductComponent , canDeactivate:[RemovevalGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleproductRoutingModule { }
