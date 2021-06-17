import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  loading = true;
  auth_token = sessionStorage.getItem('auth_token');
  ongoing: any;
  scheduled: any;
  completed: any;
  pending:any;
  ongoing_array = [];
  scheduled_array = [];
  completed_array=[];
  pending_array=[];
  type: any;
  constructor(private fb:FormBuilder, private toastr:ToastrService,private router:Router,private http:HttpClient,private activeroute:ActivatedRoute, private route:Router, private crexinservice:CrexinService) { }

  ngOnInit(): void {
    // const headers= new HttpHeaders()
    // .set('content-type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    // .set('Authorization',`Bearer ${this.auth_token}`);
    // this.http.get<any>('https://superuser.crexin.com/api/user/bookeditem/',{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
    //   console.log(res);
    // })
    this.crexinservice.allbookings().subscribe((res)=>{
      console.log(res);
      this.ongoing = res.ongoing;
      console.log(this.ongoing);
      for(var i=0;i<this.ongoing.length;i++){
        console.log(this.ongoing);
        if(this.ongoing[i].booking!=null){
          this.ongoing_array.push(this.ongoing[i]);
          console.log(this.ongoing_array);
        }
      }
      this.scheduled = res.scheduled;
      console.log(this.scheduled);
      for(var i=0;i<this.scheduled.length;i++){
        console.log(this.scheduled);
        if(this.scheduled[i].booking!=null){
          this.scheduled_array.push(this.scheduled[i]);
          console.log(this.scheduled_array);
          console.log(this.type);
        }
      }
      this.completed = res.completed
      console.log(this.completed);
      for(var i=0;i<this.completed.length;i++){
        if(this.completed[i].booking!=null){
          this.completed_array.push(this.completed[i]);
          console.log(this.completed_array);
        }
      }

      this.pending = res.pending
      console.log(this.pending);
      for(var i=0;i<this.pending.length;i++){
        if(this.pending[i].booking!=null){
          this.pending_array.push(this.pending[i]);
          console.log(this.pending_array);
        }
      }
      this.loading = false
    })
  }
  ongoing_singlebooking(type:any,booking_id:any,id:any){
    sessionStorage.setItem('booking_id', booking_id)
    sessionStorage.setItem('b_id', id)
    sessionStorage.setItem('type', type)
    this.type = type;
    console.log(this.type);
    if(this.type === 'hourly'){
       this.router.navigate(['hourlybookingstatus']);
    }
    else if(this.type === 'daily'){
      this.router.navigate(['dailybookingstatus']);
    }
    else if(this.type === 'weekly'){
      this.router.navigate(['weeklybookingstatus'])
    }
  }
  sheduled_singlebooking(type:any,booking_id:any,id:any){
    sessionStorage.setItem('booking_id', booking_id)
    sessionStorage.setItem('b_id', id)
    sessionStorage.setItem('type', type)
    this.type = type;
    console.log(this.type);
    if(this.type === 'hourly'){
       this.router.navigate(['hourlybookingstatus']);
    }
    else if(this.type === 'daily'){
      this.router.navigate(['dailybookingstatus']);
    }
    else if(this.type === 'weekly'){
      this.router.navigate(['weeklybookingstatus'])
    }
  }
  completed_singlebooking(type:any,booking_id:any,id:any){
    sessionStorage.setItem('booking_id', booking_id)
    sessionStorage.setItem('b_id', id)
    sessionStorage.setItem('type', type)
    this.type = type;
    console.log(this.type);
    if(this.type === 'hourly'){
       this.router.navigate(['hourlybookingstatus']);
    }
    else if(this.type === 'daily'){
      this.router.navigate(['dailybookingstatus']);
    }
    else if(this.type === 'weekly'){
      this.router.navigate(['weeklybookingstatus'])
    }
  }

  pending_singlebooking(type:any,booking_id:any,id:any){
    sessionStorage.setItem('booking_id', booking_id)
    sessionStorage.setItem('b_id', id)
    sessionStorage.setItem('type', type)
    this.type = type;
    console.log(this.type);
    if(this.type === 'hourly'){
       this.router.navigate(['hourlybookingstatus']);
    }
    else if(this.type === 'daily'){
      this.router.navigate(['dailybookingstatus']);
    }
    else if(this.type === 'weekly'){
      this.router.navigate(['weeklybookingstatus'])
    }
  }
}
