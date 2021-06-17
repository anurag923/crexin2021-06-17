import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  auth_token = sessionStorage.getItem('auth_token');
  booker_id = sessionStorage.getItem('booked_id');
  booking_status = sessionStorage.getItem('booking_status');
  start_date: any;
  type: any;
  start_time: any;
  duration: any;
  payment_status: any;
  paid_amount: any;
  equipment_image: any;
  equipment_model: any;
  res: any;
  constructor(private toastr: ToastrService, private http:HttpClient,
    private router: Router,private crexinservice:CrexinService) { 
      sessionStorage.setItem('clicked','false');
    }

  ngOnInit(): void {
    sessionStorage.setItem('clicked','false');
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>(`https://superuser.crexin.com/api/user/bookeditem/${sessionStorage.getItem('b_id')}/${sessionStorage.getItem('booking_id')}`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res);
      this.res = res.response[0]
      console.log(this.res);
      this.payment_status = this.res.payment_status
      this.paid_amount = this.res.paid_amount
      this.duration =this.res.rent.duration
      this.type = this.res.rent.type
      this.start_date = this.res.rent.start_date
      this.start_time = this.res.rent.start_time
      this.equipment_image = this.res.rent.subcategory.sc_image
      this.equipment_model = this.res.rent.subcategory.sc_name
    })
  }
  crane(){
     this.router.navigate(['/orderconfirmation']);
  }
}
