import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrexinService } from 'src/app/services/crexin.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
// import { MustMatch } from './_helpers/must-match.validator';
@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css']
})
export class UsersignupComponent implements OnInit {
  Singup:FormGroup;
  submitted = false;
  message:any;
  firstname = "";
  lastname = "";
  mobile = "";
  email = "";
  password = "";
  companyname = "";
  pincode = "";
  constructor(private fb:FormBuilder, private crexinService:CrexinService, private auth:AuthService, private toastr: ToastrService,private router: Router,) { }
  ngOnInit(): void {
       this.Singup = this.fb.group({
        password    : ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
        c_password: ['', Validators.required],
        fullname   : ['', Validators.required],
        mobile      : ['', [Validators.required, Validators.pattern(("^((\\+91-?)|0)?[0-9]{10}$"))]],
       },
       {
        validator : MustMatch("password", "c_password")
       }
       );
  }
  get f() { return this.Singup.controls; }

  onSubmit(email:any) {
    this.submitted = true;
    if (this.Singup.invalid) {
        return false;
    }
    else{
          const data = {
          fullname: this.Singup.get('fullname').value,
          email:email,
          phone:this.Singup.get('mobile').value,
          password:this.Singup.get('password').value,
          }
          console.log(data);
          this.auth.singup(data).subscribe((res)=>{
            console.log(res);
            this.toastr.success(this.message,'Registered successfully.Please login',{
              positionClass:'toast-top-center'
            });
            this.router.navigate(['accountsucces']);
          },(err)=>{
            console.log(err);
            this.toastr.error(this.message,err.error.message,{
              positionClass:'toast-top-center'
            });
            this.router.navigate(['usersignup']);
          }
          );
    }
}
}
