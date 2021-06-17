import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CrexinService } from 'src/app/services/crexin.service';
import * as $ from "jquery";
import AOS from 'aos';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  closeResult: string;
  Address:FormGroup;
  submitted =  false;
  message: any;
  success: any;
  street = "";
  address = "";
  pincode = "";
  type = "";
  auth_token = sessionStorage.getItem('auth_token');
  getaddresses: any;
  singlestreet: any;
  singlepincode: any;
  singleaddress: any;
  add_id: any;
  singletype: any;
  loading = true;
  constructor(private http:HttpClient,private modalService: NgbModal, private fb:FormBuilder, private crexinservice:CrexinService, private toastr:ToastrService) { }

  ngOnInit(): void {
    AOS.init();
    this.Address = this.fb.group({
      sreet: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern("[0-9]{6}$")]],
      type: ['', Validators.required],
    })
     const headers= new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*')
     .set('Authorization',`Bearer ${this.auth_token}`);
     this.http.get('https://www.superuser.crexin.com/api/list_address?userid='+sessionStorage.getItem('user_id'),{'headers':headers}).subscribe((res)=>{
      this.getaddresses = res;
      this.loading = false;
    })
  }
  get f(){
    return this.Address.controls
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  editsingleaddress(id:any,street:any,address:any,pincode:any,type:any){
   this.add_id = id;
   this.singlestreet = street;
   this.singleaddress = address;
   this.singlepincode = pincode;
   this.singletype = type
  }
  updateaddress(){
    this.submitted = true;
    if(this.Address.invalid){
      return false;
    }
    else{
      const data ={
        userid: sessionStorage.getItem('user_id'),
        choose: 'adding',
        street: this.street,
        address: this.address, 
        pincode: this.pincode,
        type: this.type
      }
      this.crexinservice.address(data).subscribe((res)=>{
        this.success = res.success;
        this.loading = false;
        this.getdata();
        this.toastr.success(this.message,this.success,{
          positionClass: 'toast-top-center'
        });
      },(error)=>{
        this.toastr.error(this.message,error.error,{
          positionClass: 'toast-top-center'
        });
      }
      )
    }
  }
  updatesingleaddress(){
    this.submitted = true;
    if(this.Address.invalid){
      return false;
    }
    else{
      const data ={
        id:this.add_id,
        choose: 'update',
        street: this.singlestreet,
        address: this.singleaddress, 
        pincode: this.singlepincode,
        type: this.singletype
      }
      this.crexinservice.address(data).subscribe((res)=>{
        this.success = res.success;
        this.loading = false;
        this.getdata();
        this.toastr.success(this.message,this.success,{
          positionClass: 'toast-top-center'
        });
        // $('#editaddress').hide();
      },(error)=>{
        this.toastr.error(this.message,error.error,{
          positionClass: 'toast-top-center'
        });
      }
      )
    }
  }
  delete(id:any){
    this.add_id = id
  }
  deletesingledelete(){
    const data ={
      id:this.add_id,
      choose: 'delete',
    }
    this.crexinservice.address(data).subscribe((res)=>{
      this.success = res.success;
      this.getdata();
      this.getdata();
      this.toastr.success(this.message,this.success,{
        positionClass: 'toast-top-center'
      });
      // $('#deleteaddress').hide();
    },(error)=>{
      this.toastr.error(this.message,error.error,{
        positionClass: 'toast-top-center'
      });
    }
    )
  }
  getdata(){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get('https://www.superuser.crexin.com/api/list_address?userid='+sessionStorage.getItem('user_id'),{'headers':headers}).subscribe((res)=>{
      console.log(res);
      this.getaddresses = res;
    })
  }
}
