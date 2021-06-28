import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrexinService } from 'src/app/services/crexin.service';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Singin:FormGroup;
  submitted = false;
  mobile = "";
  message:any;
  disable=false;
  data: any;
  success: string;
  error: any;
  mobile_not_register = false;
  constructor(private fb:FormBuilder, private auth:AuthService ,private crexinservice:CrexinService,private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    // this.data =  this.crexinservice.getpost().pipe(shareReplay(1));
    this.Singin = this.fb.group({
       mobile : ['', [Validators.required, Validators.pattern(("^((\\+91-?)|0)?[0-9]{10}$"))]]
    });
  }
  get f(){
    return this.Singin.controls
  }
  login(){
     this.submitted = true;
     if(this.Singin.invalid){
      // this.toastr.error(this.message,'Mobile number required',{
      //   positionClass: 'toast-top-center'
      //  });
      //  if(this.Singin.get('mobile').validator){
      //   this.toastr.error(this.message,'Mobil Number must be at 10 digits required',{
      //     positionClass: 'toast-top-center'
      //    });
      //  }
      //  else{
      //         this.toastr.error(this.message,'Mobile number required',{
      //   positionClass: 'toast-top-center'
      //  });
      //  }
      return false
     }
     else{
       this.disable = true;
       localStorage.setItem('mobile', this.Singin.get('mobile').value) 
       console.log(localStorage.getItem('mobile'));
       const data = {
        mobile :localStorage.getItem('mobile'),
       }
       console.log(data);
       this.auth.login(data).subscribe((res)=>{
         console.log(res);
         this.success = res.message;
         if(res.message=='OTP has been successfully sent to your mobile number'){
           this.disable = true;
         }
          this.toastr.success(this.message,this.success,{
            // positionClass: 'toast-top-center'
           });
          this.router.navigate(['/otp']);
       },(error)=>{
         console.log(error.error.message);
         this.error = error.error.message;
         if(this.error === 'This mobile number does not exist'){
          // this.toastr.error(this.message,'This mobile number does not exist.Please signup',{
          //   
          // });
          this.mobile_not_register = true;
          this.router.navigate(['login']);
         }
        // this.router.navigate(['login']);
       })
     }
   }
  //  post(){
  //    const data = {
  //     title : this.title,
  //     description : this.description
  //    }
  //    this.crexinservice.post(data).subscribe((res)=>{
  //      console.log(res);
  //    },(error)=>{
  //      console.log(error);
  //    }
  //    )
  //  }
  //  getpost(){
  //   this.crexinservice.getpost().subscribe((res)=>{
  //     console.log(res);
  //   },(error)=>{
  //     console.log(error);
  //   }
  //   )
  //  }
  mobilenumber(event){
    console.log(event.target.value);
    if(event.target.value.length==0){
      this.mobile_not_register = false;
    }
  }
}

