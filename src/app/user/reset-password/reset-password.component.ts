import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public appService: AppService, private fb: FormBuilder, public router: Router, public toastr: ToastrManager) { }

  ngOnInit() {
    $('#confirmPassword').on('keyup', function () {
      if ($('#password').val() == $('#confirmPassword').val()) {
        $('#message').html('Match Successful').css('color', 'white');       
      } else 
        $('#message').html('Not Matching').css('color', 'red');
    });
  }

  confirmPasswordForm = this.fb.group({
    secret :[null, Validators.required],
    password: [null, Validators.compose([Validators.required,Validators.minLength(9)])],
    confirmPassword: [null,Validators.compose([Validators.required,Validators.minLength(9)])]
  })



  onSubmit() {
    let data = {
      secret: this.confirmPasswordForm.value.secret,
      password: this.confirmPasswordForm.value.confirmPassword
    }
    this.appService.updatePassword(data).subscribe(apiResponse => {
      if(apiResponse.status === 200) {
        this.toastr.successToastr('Password Updated Successfully', 'Done !')
        this.confirmPasswordForm.reset()
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 12000);
      } else {
        this.toastr.errorToastr('${apiResponse.message}', 'Error !')
        this.confirmPasswordForm.reset()
      }
    }, (error) => {
      this.toastr.errorToastr("Some Internal Error")
      this.confirmPasswordForm.reset()
      this.router.navigate(['/server-error'])
    })
  }

}
