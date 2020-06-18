import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './../../app.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: String;
  public password: any;


  constructor(public appService: AppService, private fb: FormBuilder, public router: Router, public toastr: ToastrManager, private Cookie: CookieService) { }

  ngOnInit() {
      
  }
  loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.email, Validators.required])],
    password: ['', Validators.required]
  })


  onSubmit() {
    
    this.appService.loginFunction(this.loginForm.value)
      .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.successToastr('Login successful', 'Welcome');
        this.Cookie.set('authToken', apiResponse.data.authToken)
        this.Cookie.set('userName', `${apiResponse.data.userDetails.firstName} ${apiResponse.data.userDetails.lastName}`)
        this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
        this.Cookie.set('userId', apiResponse.data.userDetails.userId)
        this.loginForm.reset()
        this.router.navigate(['/todo/single-user'])

      } else  {
        this.toastr.errorToastr(`${apiResponse.message}`, 'Error')
        this.loginForm.reset()

      }
    }, (err) => {
      this.toastr.errorToastr(`${err.message}`, "Error!");
      this.router.navigate(['/server-error']);
      this.loginForm.reset()
    })
  }



}


