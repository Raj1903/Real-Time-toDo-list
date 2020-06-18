import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleUserComponent } from './single-user/single-user.component';
import { MultiUserComponent } from './multi-user/multi-user.component';
import { ManageFriendsComponent } from './manage-friends/manage-friends.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SingleUserComponent, MultiUserComponent, ManageFriendsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TodoModule { }
