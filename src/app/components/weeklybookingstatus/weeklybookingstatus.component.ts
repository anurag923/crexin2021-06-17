import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';

@Component({
  selector: 'app-weeklybookingstatus',
  templateUrl: './weeklybookingstatus.component.html',
  styleUrls: ['./weeklybookingstatus.component.css']
})
export class WeeklybookingstatusComponent implements OnInit {
  allweeks: any;
  loading = true;
  singleresponse: any;
  workstatus: any;
  ongoing = false;
  scheduled = false;
  completed = false
  weekly_duration: boolean;
  weekly_rate: any;
  booking_amount: number;
  constructor(private fb:FormBuilder, private toastr:ToastrService,private router:Router,private http:HttpClient,private activeroute:ActivatedRoute, private route:Router, private crexinservice:CrexinService) { }
  auth_token = sessionStorage.getItem('auth_token');
  ngOnInit(): void {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>(`https://superuser.crexin.com/api/user/singleorder?booking_id=${sessionStorage.getItem('booking_id')}&id=${sessionStorage.getItem('b_id')}&type=${sessionStorage.getItem('type')}`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      // this.crexinservice.singlebooking().subscribe((res)=>{
     console.log(res)
     if(res.singleresponse[0].work_status === 'ongoing'){
      this.allweeks = res.response
      this.workstatus = res.response.work_status
      console.log(this.allweeks)
      this.singleresponse = res.singleresponse
      this.workstatus = res.singleresponse.work_status
      console.log(this.singleresponse)
      this.weekly_duration = this.singleresponse[0].rent.duration
      this.weekly_rate = this.singleresponse[0].rent.subcategory.weekly_rate
      console.log(this.weekly_rate)
      var book_amount = +this.weekly_duration*this.weekly_rate;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst; 
      console.log(this.booking_amount);
      this.ongoing = true;
      this.scheduled = false;
      this.completed = false;
     }
     else if(res.singleresponse[0].work_status === 'scheduled'){
      this.allweeks = res.response
      this.workstatus = res.response.work_status
      console.log(this.allweeks)
      this.singleresponse = res.singleresponse
      this.workstatus = res.singleresponse.work_status
      console.log(this.singleresponse)
      this.weekly_duration = this.singleresponse[0].rent.duration
      this.weekly_rate = this.singleresponse[0].rent.subcategory.weekly_rate
      console.log(this.weekly_rate)
      var book_amount = +this.weekly_duration*this.weekly_rate;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst; 
      this.ongoing = false
      this.scheduled = true;
      this.completed = false;
     }
     else{
      this.allweeks = res.response
      this.workstatus = res.response.work_status
      console.log(this.allweeks)
      this.singleresponse = res.singleresponse
      this.workstatus = res.singleresponse.work_status
      console.log(this.singleresponse)
      this.weekly_duration = this.singleresponse[0].rent.duration
      this.weekly_rate = this.singleresponse[0].rent.subcategory.weekly_rate
      console.log(this.weekly_rate)
      var book_amount = +this.weekly_duration*this.weekly_rate;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst; 
      this.ongoing = false
      this.scheduled = false;
      this.completed = true;
     }
     this.loading = false
    })
  }

}
