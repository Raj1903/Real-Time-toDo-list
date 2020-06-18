import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public appService: AppService, private fb: FormBuilder, public router: Router, public toastr: ToastrManager) { }

  ngOnInit() {
  }
resetPasswordForm = this.fb.group({
  email: [null, Validators.compose([Validators.email, Validators.required])]
})

onSubmit() {
  this.appService.resetPassword(this.resetPasswordForm.value)
      .subscribe(apiResponse => {
        if (apiResponse.status === 200) {
          this.toastr.successToastr('Token sent !!', 'Success')
          this.resetPasswordForm.reset()
          setTimeout(() => {
            this.router.navigate(['/reset-password'])
          }, 1500);
        } else {
          this.toastr.errorToastr(`${apiResponse.message}`, 'Error')
          this.resetPasswordForm.reset()
        }
      }, (err) => {
        this.toastr.errorToastr("Some internal error occurred", 'Error')
        this.resetPasswordForm.reset()
        this.router.navigate(['/server-error'])

      })
}






}
