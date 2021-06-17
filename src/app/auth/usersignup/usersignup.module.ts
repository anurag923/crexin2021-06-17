import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersignupRoutingModule } from './usersignup-routing.module';
import { UsersignupComponent } from './usersignup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [UsersignupComponent],
  imports: [
    CommonModule,
    UsersignupRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ]
})
export class UsersignupModule { }
