import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrexinService } from 'src/app/services/crexin.service';

@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.component.html',
  styleUrls: ['./account-password.component.css']
})
export class AccountPasswordComponent implements OnInit {
  AccountPassword:FormGroup;
  submitted = false;
  message: string;
  incorrect_credentials: any;
  constructor(private fb:FormBuilder, private auth:AuthService, private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.AccountPassword = this.fb.group({
      password:['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
    });
  }
  get f(){
    return this.AccountPassword.controls
  }
  account_password(){
    this.submitted = true;
         if(this.AccountPassword.invalid){
           return false;
    }    
    else{
      const data = {
        phone : sessionStorage.getItem('mobile'),
        password : this.AccountPassword.get('password').value
      }
      this.auth.login_password(data).subscribe((res)=>{
        console.log(res);
        sessionStorage.setItem('auth_token',res.token);
        sessionStorage.setItem('isloggedin', 'true');
        sessionStorage.setItem('name',res.fullname)
        sessionStorage.setItem('email',res.email)
        sessionStorage.setItem('phone',res.phone)

        this.toastr.success(this.message,res.message,{
          positionClass:'toast-top-center'
        });
        if(sessionStorage.getItem('route')=='/rent/bookingtypeselection'){
          this.router.navigate(['/rent/bookingtypeselection']);
        }
        else{
          this.router.navigate(['/']);
        }
      },(err)=>{
        console.log(err);
        this.incorrect_credentials = err.error.message
        if(this.incorrect_credentials === 'please enter correct credentials'){
          this.toastr.error(this.message,err.error.message,{
            positionClass:'toast-top-center'
          });
          this.router.navigate(['account_password']);
        }
      }
      );
    } 
  }
}
