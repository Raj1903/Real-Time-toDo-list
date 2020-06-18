import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { UserModule } from './user/user.module';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { SingleUserComponent } from './todo/single-user/single-user.component'
import { MultiUserComponent } from './todo/multi-user/multi-user.component';
import { ManageFriendsComponent } from './todo/manage-friends/manage-friends.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todo/single-user', component: SingleUserComponent},
  { path: 'todo/multi-user', component: MultiUserComponent},
  { path: 'todo/manage-friends', component: ManageFriendsComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path :'*',component:PageNotFoundComponent },
  { path :'**',component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
