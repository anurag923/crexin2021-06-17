import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleproductRoutingModule } from './singleproduct-routing.module';
import { SingleproductComponent } from './singleproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SharedModule } from '../../shared/shared/shared.module';
import { RemovevalGuard } from '../../guards/guards/removeval.guard';

@NgModule({
  declarations: [SingleproductComponent],
  imports: [
    CommonModule,
    SingleproductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    SharedModule
  ],
  providers:[RemovevalGuard]
})
export class SingleproductModule { }
