import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { CategorieslistComponent } from './categorieslist/categorieslist.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'categorie', component: CategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
