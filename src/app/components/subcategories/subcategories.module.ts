import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubcategoriesRoutingModule } from './subcategories-routing.module';
import { SubcategoriesComponent } from './subcategories.component';
import { SsidenavComponent } from './ssidenav/ssidenav.component';
import { SubcategorieslistComponent } from './subcategorieslist/subcategorieslist.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { RemovevalGuard } from 'src/app/guards/guards/removeval.guard';

@NgModule({
  declarations: [SubcategoriesComponent, SsidenavComponent, SubcategorieslistComponent],
  imports: [
    CommonModule,
    SubcategoriesRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports: [SubcategoriesComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[RemovevalGuard]
})
export class SubcategoriesModule { }
