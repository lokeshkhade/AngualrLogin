import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { DataService } from '../services/data.service';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
//import { SubSink } from 'subsink';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private ds: DataService,private router: Router) { }

  loginForm!: FormGroup;
  @ViewChild('captchaContainer', { static: false }) dataContainer!: ElementRef;
  // public apiRootUrl: any = environment.api;
  public captchaKey: any = environment.CAPTCHA_SECRET_KEY;
  public passwordKey: any = environment.PASSWORD_SECRET_KEY;
  public txtCaptcha: any = '';
  public generatedCaptcha: any = "";
  //subs = new SubSink();

  ngOnInit(): void {
    this.createForm();
     this.getCaptcha();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }
  getCaptcha() {
     this.ds.getData('captcha').subscribe((res: any) => {
      //if (res.error === false) {
        this.dataContainer.nativeElement.innerHTML = res.data;
        this.generatedCaptcha = res.text;
      //}
    });
  }

  login() {
    if (!this.loginForm.invalid) {

      // const bytes = CryptoJS.AES.decrypt(this.generatedCaptcha, this.captchaKey);
      // let txtCaptcha = bytes.toString(CryptoJS.enc.Utf8);
      let txtCaptcha =this.generatedCaptcha;
      console.log("txtCaptcha.....", this.generatedCaptcha);
      console.log("Hello",this.loginForm.value.captcha);

      if (this.loginForm.value.captcha === txtCaptcha) {
        
        const password = CryptoJS.AES.encrypt(this.loginForm.value.password, this.passwordKey);
        this.loginForm.patchValue({ password: `${password}` });
        console.log("this.loginForm.value", this.loginForm.value);

         this.ds.postData('user', this.loginForm.value)
          .subscribe((res: any) => {
            console.log(res);
            if (res.error) {
              Swal.fire(res.error.message, "", "error");
            }
            else if (res.token) {
              localStorage.setItem('token', res.token);
              Swal.fire(res.message, "", "success");
              this.router.navigate(['/studentdetails']);
              //window.open('http://10.132.2.172/UFP/', "_blank");
            }
          })

        // this.auth.userLogin(this.apiRootUrl + '/user/login', this.loginForm.value).subscribe((res: any) => {
        //   console.log(res);
        //   this.router.navigateByUrl('/process');

        // })

      }
    } else {
      console.log(777777777);
    }
  }

  // ngOnDestroy(): void {
  //   this.subs.unsubscribe();
  // }
}