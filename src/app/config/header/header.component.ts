import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';
import { AESEncryptDecryptServiceService } from '../../services/aesencrypt-decrypt-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profile_update:FormGroup;
  collapsed = true;
  message: string;
  phone: any;
  email: any;
  name:any;
  userprofile = false;
  submitted = false;
  auth_token = localStorage.getItem('auth_token');
  constructor(private aes:AESEncryptDecryptServiceService,private fb:FormBuilder, private toastr: ToastrService, private http:HttpClient,
    private router: Router,private crexinservice:CrexinService) {
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization',`Bearer ${this.auth_token}`);
      this.http.get<any>(`https://superuser.crexin.com/api/user/details`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
        console.log(res.user);
        this.name = res.user.fullname;
        this.email = res.user.email;
        this.phone = res.user.phone
        var name = this.aes.encrypt(res.user.fullname)
        var email = this.aes.encrypt(res.user.email)
        var phone = this.aes.encrypt(res.user.phone)
        localStorage.setItem('name',name)
        localStorage.setItem('email',email)
        localStorage.setItem('phone',phone)
        this.userprofile = true;
      }) 
      // this.crexinservice.userdata().subscribe(res=>{
      //   console.log(res.user);
      //   this.name = res.user.fullname
      //   this.email = res.user.email
      //   this.phone = res.user.phone
      //   this.userprofile = true;
      // });
      // if(localStorage.getItem('isloggedin') === 'true'){
      
      // }
      // else{
      //   this.userprofile = false;
      // }
    }
  ngOnInit(): void {
    // if(localStorage.getItem('isloggedin') === 'true'){
      // this.crexinservice.userdata().subscribe(res=>{
      //   console.log(res.user);
      //   this.name = res.user.fullname
      //   this.email = res.user.email
      //   this.phone = res.user.phone
      //   this.userprofile = true;
      // });
    // }
    // else{
    //   this.userprofile = false;
    // }
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>(`https://superuser.crexin.com/api/user/details`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res.user);
      this.name = res.user.fullname;
      this.email = res.user.email;
      this.phone = res.user.phone
      var name = this.aes.encrypt(res.user.fullname)
      var email = this.aes.encrypt(res.user.email)
      var phone = this.aes.encrypt(res.user.phone)
      localStorage.setItem('name',name)
      localStorage.setItem('email',email)
      localStorage.setItem('phone',phone)      
      this.userprofile = true;
    })
    this.profile_update = this.fb.group({
      mobile:['',[Validators.required,Validators.pattern(("^((\\+91-?)|0)?[0-9]{10}$"))]],
      email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      address1:['',Validators.required],
      address2:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      pincode:['',[Validators.required,Validators.pattern("[0-9]{6}$"), Validators.maxLength(6)]]
    })
    
  }
  get f(){
    return this.profile_update.controls
  }
     toggleCollapsed(): void {
       this.collapsed = !this.collapsed;
     }
get userstatus(){
   return localStorage.getItem('auth_token');
 } 
get username(){
  var username = this.aes.decrypt(localStorage.getItem('name'));
  return username;
}
get userphone(){
  var userphone = this.aes.decrypt(localStorage.getItem('phone'));
  return userphone;
}
 logout(){
  localStorage.clear();
  localStorage.clear();
  this.toastr.success(this.message,'Logout Successfully',{
    
  });
  this.router.navigate(['/']);
 }   

//  bookings(){
//    this.router.navigate(['/bookings']).then(()=>{
//      location.reload();
//    })
//  }
updateprofile(){
   this.submitted = true
   if(this.profile_update.invalid){
     return false
   }
   else{
     const data = {
      phone:this.phone,
      email:this.email,
      address1:this.profile_update.get('address1').value,
      address2:this.profile_update.get('address2').value,
      city:this.profile_update.get('city').value,
      state:this.profile_update.get('state').value,
      pincode:this.profile_update.get('pincode').value
     }
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.post<any>(`https://superuser.crexin.com/api/user/update`,data, {'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res);
      this.toastr.success(this.message,res.response,{
        positionClass: 'toast-top-center'
      });
    },(error)=>{
      console.log(error);
      this.toastr.success(this.message,error.error.message,{
        positionClass: 'toast-top-center'
      });
    }) 
   }
 }
}
