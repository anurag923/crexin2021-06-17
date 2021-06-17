import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemovevalGuard } from 'src/app/guards/guards/removeval.guard';
import { SubcategoriesComponent } from './subcategories.component';

const routes: Routes = [{ path: '', component: SubcategoriesComponent, canDeactivate:[RemovevalGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoriesRoutingModule { }
