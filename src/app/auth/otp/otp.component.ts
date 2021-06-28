import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CrexinService } from 'src/app/services/crexin.service';
import { AESEncryptDecryptServiceService } from '../../services/aesencrypt-decrypt-service.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  mobile = localStorage.getItem('mobile');
  Otp:FormGroup; 
  submitted = false;
  one ="";
  two ="";
  three ="";
  four = "";
  message: string;
  success:string;
  error:string;
  status: any;
  data: any;
  auth_token = localStorage.getItem('auth_token');
  constructor(private aes:AESEncryptDecryptServiceService, private crexinservice:CrexinService,private http:HttpClient,private router:Router, private fb:FormBuilder, private toastr:ToastrService, private auth:AuthService) { }
  ngOnInit(): void {
      this.Otp = this.fb.group({
        one:['', Validators.required],
        two:['', Validators.required],
        three:['', Validators.required],
        four:['', Validators.required],
      })
      // const headers= new HttpHeaders()
      // .set('content-type', 'application/json')
      // .set('Access-Control-Allow-Origin', '*')
      // .set('Authorization',`Bearer ${this.auth_token}`);
      // this.http.get<any>(`https://superuser.crexin.com/api/user/details`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      //   console.log(res.user);
      //   localStorage.setItem('name',res.user.fullname)
      //   localStorage.setItem('email',res.user.email)
      //   localStorage.setItem('phone',res.user.phone)
      // })
  }
  get f(){
    return this.Otp.controls
  }
move1(one, two){
  console.log(one);
  var length = one.length
  console.log(length);
  var maxlength = one.getAttribute(maxlength)
  console.log(maxlength);
  if(length == maxlength){
    two.focus();
  }
}
move2(two, three){
  var length = two.length
  var maxlength = two.getAttribute(maxlength)
  if(length == maxlength){
    three.focus();
  }
  // else if(length == 0){
  //   two.focus();
  // }
}
move3(three, four){
  var length = three.length
  var maxlength = three.getAttribute(maxlength)
  if(length == maxlength){
    four.focus();
  }
}
otpsuccess(){
  this.submitted = true;
  if(this.Otp.invalid){
    this.toastr.error(this.message,'Otp Number is required',{
      positionClass: 'toast-top-center'
    });
    return false;
  }
  else{
    const data = {
     mobile: localStorage.getItem('mobile'),
     otp:this.one + this.two + this.three + this.four
    }
    this.auth.verifyotp(data).subscribe((res)=>{
      console.log(res);
      var name = this.aes.encrypt(res.fullname);
      var phone = this.aes.encrypt(res.phone);
      var email = this.aes.encrypt(res.email);
      localStorage.setItem('auth_token',res.token);
      localStorage.setItem('isloggedin', 'true');
      localStorage.setItem('name',name)
      localStorage.setItem('email',email)
      localStorage.setItem('phone',phone)
      this.toastr.success(this.message,'Successfully otp verification done',{
        positionClass: 'toast-top-center'
      });
      //  const headers= new HttpHeaders()
      // .set('content-type', 'application/json')
      // .set('Access-Control-Allow-Origin', '*')
      // .set('Authorization',`Bearer ${localStorage.getItem('auth_token')}`);
      // this.http.get<any>(`https://superuser.crexin.com/api/user/details`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      //   console.log(res.user);
      //   localStorage.setItem('name',res.user.fullname)
      //   localStorage.setItem('email',res.user.email)
      //   localStorage.setItem('phone',res.user.phone)
      // })
      if(localStorage.getItem('route')=='/rent/bookingtypeselection'){
        this.router.navigate(['/rent/bookingtypeselection']);
      }
      else{
        this.router.navigate(['/']);
      }
      // window.location.reload(); 
    },(error)=>{
      console.log(error);
      this.error = error.error.message;
      this.toastr.error(this.message,this.error,{
        positionClass: 'toast-top-center'
      });
      this.router.navigate(['/otp']);
    }
    )     
  }
} 
setFocus(nextElement) {
  nextElement.setFocus(); 
}
resendotp(){
  const data ={
    mobile : localStorage.getItem('mobile')
  }
  this.auth.login(data).subscribe((res)=>{
    console.log(res);
    this.success = res.message;
     this.toastr.success(this.message,this.success,{
       positionClass: 'toast-top-center'
      });
    this.router.navigate(['/otp']);
  },(error)=>{
    console.log(error);
    this.error = error.error.message;
    this.toastr.error(this.message,this.error,{
     
   });
   this.router.navigate(['/otp']);
  })
}
}
