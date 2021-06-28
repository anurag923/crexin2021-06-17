import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrexinService } from 'src/app/services/crexin.service';
import { AESEncryptDecryptServiceService } from '../../services/aesencrypt-decrypt-service.service';

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
  constructor(private aes:AESEncryptDecryptServiceService,private fb:FormBuilder, private auth:AuthService, private toastr: ToastrService,private router: Router) { }

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
        phone : localStorage.getItem('mobile'),
        password : this.AccountPassword.get('password').value
      }
      this.auth.login_password(data).subscribe((res)=>{
        console.log(res);
        var name = this.aes.encrypt(res.fullname);
        var phone = this.aes.encrypt(res.phone);
        var email = this.aes.encrypt(res.email);
        localStorage.setItem('auth_token',res.token);
        localStorage.setItem('isloggedin', 'true');
        localStorage.setItem('name',name)
        localStorage.setItem('email',email)
        localStorage.setItem('phone',phone)

        this.toastr.success(this.message,res.message,{
          
        });
        if(localStorage.getItem('route')=='/rent/bookingtypeselection'){
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
            
          });
          this.router.navigate(['account_password']);
        }
      }
      );
    } 
  }
}
