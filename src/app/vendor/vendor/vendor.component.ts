import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrexinService } from 'src/app/services/crexin.service';
declare var $:any;
import AOS from 'aos';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  Vendor:FormGroup;
  submitted = false;
  fullname = "";
  bussiness_name = "";

  phone = "";
  address_one = "";
  address_two = "";
  location = "";
  pincode = "";
  notes = "";
  message: string;
  success: any;
  error: string;
  constructor(private fb:FormBuilder, private crexinservice:CrexinService, private auth:AuthService, private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.Vendor = this.fb.group({
      fullname      : ['', Validators.required],
      bussiness_name: ['', Validators.required],
      mobile        : ['', [Validators.required, Validators.pattern(("[0-9]{10}$"))]],
      address_one   : ['', Validators.required],
      address_two   : ['', Validators.required],
      location      : ['', Validators.required],
      pincode       : ['', [Validators.required, Validators.pattern("[0-9]{6}$")]],
      notes         : ['', Validators.required]
    })
    AOS.init();
  }
  get f(){
    return this.Vendor.controls
  }
  vendor(){
    this.submitted = true;
    if(this.Vendor.invalid){
     return false;
    }
    else{
      const data = {
        fullname       : this.fullname,
        business_name  : this.bussiness_name,
        mobile         : this.phone,
        address1       : this.address_one,
        address2       : this.address_two,
        location       : this.location,
        pincode        : this.pincode,
        note           : this.notes,
        status         : 'inactive'
      }
    console.log(data);
     this.auth.vendors(data).subscribe((res)=>{
       console.log(res);
       this.success = res.message
       this.toastr.success(this.message,this.success,{
        positionClass:'toast-top-center'
      });
      this.router.navigate(['/']);
    },(err)=>{
      console.log(err);
      this.error = err.error.message;
      this.toastr.error(this.message,this.error,{
        positionClass:'toast-top-center'
      });
    });
  }
}
}
