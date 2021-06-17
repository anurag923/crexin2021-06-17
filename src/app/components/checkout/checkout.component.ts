import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { constants } from 'node:buffer';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';
import { CheckoutService } from '../../services/checkout.service';
import { WindowRefService } from 'src/app/window-ref.service';

declare var $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [DatePipe]
})
export class CheckoutComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);
  hourly = false;
  daily = false;
  weekly = false;
  allcategories: any;
  cat_id: any;
  auth_token = sessionStorage.getItem('auth_token');
  singleproduct: any;
  message: string;
  products: any;
  Hourly: FormGroup;
  Daily: FormGroup;
  Weekly: FormGroup;
  submitted: boolean;
  selectedItem: any;
  submitted_hourly: boolean;
  submitted_daily: boolean;
  submitted_weekly: boolean;
  Hourly_button = false;
  Daily_button = false;
  Weekly_button = false;
  date: any;
  e_date: any;
  end_date = "";
  end_time = "";
  hourly_type = "";
  daily_type = "";
  weekly_type = "";
  single_product = true;
  categorie_products: boolean;
  bookingtype = sessionStorage.getItem('time');
  // weekendtime = "";
  // weekenddate = "";
  ammount = sessionStorage.getItem('subtotal');
  grandtotal = sessionStorage.getItem('grandtotal');
  gst = sessionStorage.getItem('gst');
  General_Details: FormGroup;
  Site_Details: FormGroup;
  Billing_Information: FormGroup;
  no_hours = sessionStorage.getItem('no_hours');
  h_startdate = sessionStorage.getItem('h_startdate');
  h_starttime = sessionStorage.getItem('h_starttime');
  no_days = sessionStorage.getItem('no_days');
  d_startdate = sessionStorage.getItem('d_startdate');
  d_starttime = sessionStorage.getItem('d_starttime');
  d_endtime = sessionStorage.getItem('d_endtime');
  // d_enddate = sessionStorage.getItem('d_enddate');
  d_enddate = this.datePipe.transform(sessionStorage.getItem('d_enddate'), 'yyyy-MM-dd');
  no_weeks = sessionStorage.getItem('no_weeks');
  w_startdate = sessionStorage.getItem('w_startdate');
  w_starttime = sessionStorage.getItem('w_starttime');
  w_endtime = sessionStorage.getItem('w_endtime');
  // w_enddate = sessionStorage.getItem('w_enddate');
  w_enddate = this.datePipe.transform(sessionStorage.getItem('w_enddate'), 'yyyy-MM-dd');
  checked_hourly: boolean;
  checked_daily: boolean;
  checked_weekly: boolean;
  Date: Date;
  latest_date: string;
  book_date1: string;
  w_s_date: any;
  s_date: any;
  h_rate = sessionStorage.getItem('hourly_rate');
  hourly_rate: any;
  d_rate = sessionStorage.getItem('daily_rate');
  daily_rate: any;
  w_rate = sessionStorage.getItem('weekly_rate');
  weekly_rate: any;
  h_sub_total: any;
  d_sub_total: any;
  w_sub_total: any;
  sub_total: any;
  h_no_hours: number;
  due_date: any;
  h_time: boolean;
  d_time: boolean;
  w_time: boolean;
  h_grandtotal: any;
  d_grandtotal: any;
  w_grandtotal: any;
  d_no_days: number;
  d_total_days_amount: any;
  d_paid_amount: number;
  w_total_weeks_amount: number;
  w_paid_amount: number;
  w_no_weeks: number;
  name = sessionStorage.getItem('name');
  mobile = sessionStorage.getItem('phone')
  subcategory_name: any;
  subcategory_image: any;
  subcategory_rate: any;
  gstval: number;
  constructor(private checkoutservice: CheckoutService, private winRef: WindowRefService, private datePipe: DatePipe, private fb: FormBuilder, private toastr: ToastrService, private router: Router, private http: HttpClient, private activeroute: ActivatedRoute, private route: Router, private crexinservice: CrexinService) {
    console.log(this.d_enddate);
    if (sessionStorage.getItem('time') == null) {
      this.bookingtype = 'hourly';
    }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('time') == null) {
      this.bookingtype = 'hourly';
    }
    document.getElementById('paynow').onclick = function () {
      sessionStorage.setItem('clicked', 'true');
    };
    this.Hourly = this.fb.group({
      no_hours: ['', Validators.required],
      h_startdate: ['', Validators.required],
      h_starttime: ['', Validators.required],
    });
    this.Daily = this.fb.group({
      no_days: ['', Validators.required],
      d_startdate: ['', Validators.required],
      d_starttime: ['', Validators.required],
    });
    this.Weekly = this.fb.group({
      no_weeks: ['', Validators.required],
      w_startdate: ['', Validators.required],
      w_starttime: ['', Validators.required],
    });
    this.General_Details = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(("[0-9]{10}$"))]],
    });
    this.Site_Details = this.fb.group({
      coordinator_name: ['', Validators.required],
      contact_number: ['', [Validators.required, Validators.pattern(("[0-9]{10}$"))]],
      address_one: ['', Validators.required],
      address_two: ['', Validators.required],
      landmark: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern("[0-9]{6}$"), Validators.maxLength(6)]],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
    this.Billing_Information = this.fb.group({
      c_name: ['', Validators.required],
      gst_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      c_address: ['', Validators.required],
      p_code: ['', [Validators.required, Validators.pattern("[0-9]{6}$"), Validators.maxLength(6)]],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/subcategory/' + sessionStorage.getItem('sub_id'), { 'headers': headers }).pipe(shareReplay(1)).subscribe((res) => {
      console.log(res);
      this.singleproduct = res.response;
      this.subcategory_name = res.response.sc_name
      this.subcategory_image = res.response.sc_image
      // this.hourly_rate = res.equipment.hourly_rate
      if (sessionStorage.getItem('time') == 'hourly') {
        this.subcategory_rate = res.response.hourly_rate
      }
      if (sessionStorage.getItem('time') == 'daily') {
        this.subcategory_rate = res.response.daily_rate
      }
      if (sessionStorage.getItem('time') == 'weekly') {
        this.subcategory_rate = res.response.weekly_rate
      }

      if (sessionStorage.getItem('time') == null) {
        this.subcategory_rate = res.response.hourly_rate
      }
      sessionStorage.setItem('hourly_rate', res.response.hourly_rate)
      sessionStorage.setItem('daily_rate', res.response.daily_rate)
      sessionStorage.setItem('weekly_rate', res.response.weekly_rate)
      // console.log(sessionStorage.getItem('hourly_rate'))
      // this.daily_rate = res.equipment.daily_rate
      // this.weekly_rate =  res.equipment.weekly_rate
    });
    if (sessionStorage.getItem('time') == 'hourly') {
      this.checked_hourly = true;
      this.checked_daily = false;
      this.checked_weekly = false;
      this.hourly = true;
      this.h_no_hours = +this.no_hours
      this.hourly_rate = +this.h_rate
      console.log(this.h_no_hours);
      console.log(this.hourly_rate);
      this.h_sub_total = this.h_no_hours * this.hourly_rate
      console.log(this.h_sub_total)
      var servicecharge = 0.02 * this.h_sub_total;
      var gst1 = 0.18 * servicecharge;
      var gst2 = gst1.toFixed(2);
      var gst = +gst2;
      this.gstval = gst;
      this.h_grandtotal = this.h_sub_total + gst;
      // this.h_time = true;
      // this.d_time = false;
      // this.d_time = false;
    }
    else if (sessionStorage.getItem('time') == 'daily') {
      this.checked_hourly = false;
      this.checked_daily = true;
      this.checked_weekly = false;
      this.daily = true;
      this.daily_rate = +this.d_rate
      this.d_no_days = +this.no_days
      this.d_total_days_amount = this.d_no_days * this.daily_rate
      console.log(this.d_total_days_amount);
      var servicecharge = 0.02 * this.d_total_days_amount;
      var gst1 = 0.18 * servicecharge;
      var gst2 = gst1.toFixed(2);
      var gst = +gst2;
      this.gstval = gst;
      this.d_grandtotal = this.d_total_days_amount + gst;
      var d_advance = this.d_grandtotal / 10;
      var d_advance_round = d_advance.toFixed(2);
      this.d_paid_amount = +d_advance_round;
      console.log(this.d_paid_amount);
    }
    else if (sessionStorage.getItem('time') == 'weekly') {
      this.checked_hourly = false;
      this.checked_daily = false;
      this.checked_weekly = true;
      this.weekly = true;
      this.weekly_rate = +this.w_rate
      this.w_no_weeks = +this.no_weeks
      this.w_total_weeks_amount = this.w_no_weeks * this.weekly_rate
      console.log(this.w_total_weeks_amount);
      var servicecharge = 0.02 * this.w_total_weeks_amount;
      var gst1 = 0.18 * servicecharge;
      var gst2 = gst1.toFixed(2);
      var gst = +gst2;
      this.gstval = gst;
      this.w_grandtotal = this.w_total_weeks_amount + gst;
      console.log(this.w_grandtotal);
      var w_advance = this.w_grandtotal / 5;
      var w_advance_round = w_advance.toFixed(2);
      this.w_paid_amount = +w_advance_round;
      console.log(this.w_paid_amount);
    }

    else if (sessionStorage.getItem('time') == null) {
      this.checked_hourly = true;
      this.checked_daily = false;
      this.checked_weekly = false;
      this.hourly = true;
      this.h_no_hours = +this.no_hours
      this.hourly_rate = +this.h_rate
      console.log(this.h_no_hours);
      console.log(this.hourly_rate);
      this.h_sub_total = this.h_no_hours * this.hourly_rate
      console.log(this.h_sub_total)
      var servicecharge = 0.02 * this.h_sub_total;
      var gst1 = 0.18 * servicecharge;
      var gst2 = gst1.toFixed(2);
      var gst = +gst2;
      this.gstval = gst;
      this.h_grandtotal = this.h_sub_total + gst;
    }
    else {
      this.toastr.error(this.message, 'Please Select the any options', {
        positionClass: 'toast-top-center'
      });
    }

  }
  get f() {
    return this.General_Details.controls
  }
  get s() {
    return this.Site_Details.controls
  }
  get b() {
    return this.Billing_Information.controls
  }
  get h() {
    return this.Hourly.controls
  }
  get d() {
    return this.Daily.controls
  }
  get w() {
    return this.Weekly.controls
  }
  enddata(startdate) {
    console.log(startdate);
    this.s_date = startdate
    var str = this.Daily.get('no_days').value
    console.log(str);
    // var firstchar = str.charAt(0);
    var no_days = +str;
    this.date = new Date(startdate);
    var start_date = this.datePipe.transform(this.date, 'dd/MM/yyyy');
    console.log(start_date);
    this.e_date = this.date.setDate(this.date.getDate() + no_days);
    this.d_enddate = this.datePipe.transform(this.e_date, 'yyyy-MM-dd');
    console.log(this.d_enddate);
  }
  nohours() {
    sessionStorage.setItem('time', 'hourly')
    // sessionStorage.setItem('no_hours',this.Hourly.get('no_hours').value);
    this.h_no_hours = +this.no_hours
    this.hourly_rate = sessionStorage.getItem('hourly_rate');
    this.h_sub_total = this.h_no_hours * this.hourly_rate
    // console.log(this.h_sub_total)
    // this.h_grandtotal = this.h_sub_total+0
    // console.log(this.h_grandtotal)
    var servicecharge = 0.02 * this.h_sub_total;
    var gst1 = 0.18 * servicecharge;
    var gst2 = gst1.toFixed(2);
    var gst = +gst2;
    this.gstval = gst;
    this.h_grandtotal = this.h_sub_total + gst;
  }
  d_days() {
    sessionStorage.setItem('time', 'daily')
    // sessionStorage.setItem('no_days',this.Daily.get('no_days').value);
    this.daily_rate = sessionStorage.getItem('daily_rate')
    this.d_no_days = +this.no_days
    this.d_total_days_amount = this.d_no_days * this.daily_rate
    console.log(this.d_total_days_amount);
    var servicecharge = 0.02 * this.d_total_days_amount;
    var gst1 = 0.18 * servicecharge;
    var gst2 = gst1.toFixed(2);
    var gst = +gst2;
    this.gstval = gst;
    this.d_grandtotal = this.d_total_days_amount + gst;
    var d_advance = this.d_grandtotal / 10;
    var d_advance_round = d_advance.toFixed(2);
    this.d_paid_amount = +d_advance_round;
    console.log(this.d_paid_amount);
    // this.d_paid_amount = this.d_total_days_amount/10
    // console.log(this.d_paid_amount);
    // this.d_grandtotal = this.d_total_days_amount+0
    // console.log(this.d_grandtotal);
    var str = this.Daily.get('no_days').value
    console.log(str);
    // var firstchar = str.charAt(0);
    var no_days = +str;
    this.date = new Date(this.Daily.get('d_startdate').value);
    var start_date = this.datePipe.transform(this.date, 'dd/MM/yyyy');
    console.log(start_date);
    if (str.length != 0) {
      console.log(this.date.setDate(this.date.getDate()));
      if (this.date.setDate(this.date.getDate()) != 0) {
        this.e_date = this.date.setDate(this.date.getDate() + no_days);
        this.d_enddate = this.datePipe.transform(this.e_date, 'yyyy-MM-dd');
        console.log(this.d_enddate);
      }
    }
  }
  endtime(starttime) {
    this.d_endtime = starttime;
    console.log(this.d_endtime);
  }
  w_end_date(startdate) {
    console.log(startdate);
    this.w_s_date = startdate;
    var str = this.Weekly.get('no_weeks').value
    console.log(str);
    var no_weeks = str * 7;
    console.log(no_weeks);
    this.date = new Date(startdate);
    var start_date = this.datePipe.transform(this.date, 'dd/MM/yyyy');
    console.log(start_date);
    this.e_date = this.date.setDate(this.date.getDate() + no_weeks);
    this.w_enddate = this.datePipe.transform(this.e_date, 'yyyy-MM-dd');
    console.log(this.w_enddate);
  }
  w_end_time(starttime) {
    this.w_endtime = starttime;
    console.log(this.w_endtime);
  }
  w_days() {
    sessionStorage.setItem('time', 'weekly')
    // this.weekly_rate = sessionStorage.getItem('weekly_rate')
    this.weekly_rate = sessionStorage.getItem('weekly_rate')
    this.w_no_weeks = +this.no_weeks
    this.w_total_weeks_amount = this.w_no_weeks * this.weekly_rate
    console.log(this.w_total_weeks_amount);
    // this.w_paid_amount = this.w_total_weeks_amount/5
    // console.log(this.w_paid_amount);
    // this.w_grandtotal = this.w_total_weeks_amount+0
    var servicecharge = 0.02 * this.w_total_weeks_amount;
    var gst1 = 0.18 * servicecharge;
    var gst2 = gst1.toFixed(2);
    var gst = +gst2;
    this.gstval = gst;
    this.w_grandtotal = this.w_total_weeks_amount + gst;
    console.log(this.w_grandtotal);
    var w_advance = this.w_grandtotal / 5;
    var w_advance_round = w_advance.toFixed(2);
    this.w_paid_amount = +w_advance_round;

    console.log(this.w_paid_amount);
    console.log(this.w_grandtotal);
    sessionStorage.setItem('no_hours', this.Weekly.get('no_weeks').value);
    var str = this.Weekly.get('no_weeks').value
    console.log(str);
    var no_weeks = str * 7;
    console.log(no_weeks);
    this.date = new Date(this.Weekly.get('w_startdate').value);
    var start_date = this.datePipe.transform(this.date, 'dd/MM/yyyy');
    console.log(start_date);
    if (str.length != 0) {
      console.log(this.date.setDate(this.date.getDate()));
      if (this.date.setDate(this.date.getDate()) != 0) {
        this.e_date = this.date.setDate(this.date.getDate() + no_weeks);
        this.d_enddate = this.datePipe.transform(this.e_date, 'yyyy-MM-dd');
        console.log(this.d_enddate);
      }
    }
  }
  hourly_function() {
    sessionStorage.setItem('time', 'hourly');
    this.hourly = true;
    this.daily = false;
    this.weekly = false;
    this.Hourly_button = true;
    this.Daily_button = false;
    this.Weekly_button = false;
    this.bookingtype = 'hourly';

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/subcategory/' + sessionStorage.getItem('sub_id'), { 'headers': headers }).pipe(shareReplay(1)).subscribe((res) => {
      console.log(res);
      this.singleproduct = res.response;
      this.subcategory_name = res.response.sc_name
      this.subcategory_image = res.response.sc_image
      // this.hourly_rate = res.equipment.hourly_rate
      if (sessionStorage.getItem('time') == 'hourly') {
        this.subcategory_rate = res.response.hourly_rate
      }
      if (sessionStorage.getItem('time') == 'daily') {
        this.subcategory_rate = res.response.daily_rate
      }
      if (sessionStorage.getItem('time') == 'weekly') {
        this.subcategory_rate = res.response.weekly_rate
      }

      if (sessionStorage.getItem('time') == null) {
        this.subcategory_rate = res.response.hourly_rate
      }
      sessionStorage.setItem('hourly_rate', res.response.hourly_rate)
      sessionStorage.setItem('daily_rate', res.response.daily_rate)
      sessionStorage.setItem('weekly_rate', res.response.weekly_rate)
      // console.log(sessionStorage.getItem('hourly_rate'))
      // this.daily_rate = res.equipment.daily_rate
      // this.weekly_rate =  res.equipment.weekly_rate
    });
    if (sessionStorage.getItem('time') == 'hourly') {
      this.checked_hourly = true;
      this.checked_daily = false;
      this.checked_weekly = false;
      this.hourly = true;
      this.h_no_hours = +this.no_hours
      this.hourly_rate = +this.h_rate
      console.log(this.h_no_hours);
      console.log(this.hourly_rate);
      this.h_sub_total = this.h_no_hours * this.hourly_rate
      console.log(this.h_sub_total)
      var servicecharge = 0.02 * this.h_sub_total;
      var gst1 = 0.18 * servicecharge;
      var gst2 = gst1.toFixed(2);
      var gst = +gst2;
      this.gstval = gst;
      this.h_grandtotal = this.h_sub_total + gst;
      // this.h_time = true;
      // this.d_time = false;
      // this.d_time = false;
    }
    else if (sessionStorage.getItem('time') == 'daily') {
      this.checked_hourly = false;
      this.checked_daily = true;
      this.checked_weekly = false;
      this.daily = true;
      this.daily_rate = +this.d_rate
      this.d_no_days = +this.no_days
      this.d_total_days_amount = this.d_no_days * this.daily_rate
      console.log(this.d_total_days_amount);
      var servicecharge = 0.02 * this.d_total_days_amount;
      var gst = 0.18 * servicecharge;
      this.gstval = gst;
      this.d_grandtotal = this.d_total_days_amount + gst;
      this.d_paid_amount = this.d_grandtotal / 10
      console.log(this.d_paid_amount);
    }
    else if (sessionStorage.getItem('time') == 'weekly') {
      this.checked_hourly = false;
      this.checked_daily = false;
      this.checked_weekly = true;
      this.weekly = true;
      this.weekly_rate = +this.w_rate
      this.w_no_weeks = +this.no_weeks
      this.w_total_weeks_amount = this.w_no_weeks * this.weekly_rate
      console.log(this.w_total_weeks_amount);
      var servicecharge = 0.02 * this.w_total_weeks_amount;
      var gst = 0.18 * servicecharge;
      this.gstval = gst;
      this.w_grandtotal = this.w_total_weeks_amount + gst;
      console.log(this.w_grandtotal);
      this.w_paid_amount = this.w_grandtotal / 5
      console.log(this.w_paid_amount);
    }

  }
  daily_function() {
    sessionStorage.setItem('time', 'daily');
    this.daily = true;
    this.hourly = false
    this.weekly = false;
    this.Hourly_button = false;
    this.Daily_button = true;
    this.Weekly_button = false;
    this.checked_daily = true;
    this.checked_hourly = false;
    this.checked_weekly = false;
    this.bookingtype = 'daily';

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/subcategory/' + sessionStorage.getItem('sub_id'), { 'headers': headers }).pipe(shareReplay(1)).subscribe((res) => {
      console.log(res);
      this.singleproduct = res.response;
      this.subcategory_name = res.response.sc_name
      this.subcategory_image = res.response.sc_image
      // this.hourly_rate = res.equipment.hourly_rate
      if (sessionStorage.getItem('time') == 'hourly') {
        this.subcategory_rate = res.response.hourly_rate
      }
      if (sessionStorage.getItem('time') == 'daily') {
        this.subcategory_rate = res.response.daily_rate
      }
      if (sessionStorage.getItem('time') == 'weekly') {
        this.subcategory_rate = res.response.weekly_rate
      }

      if (sessionStorage.getItem('time') == null) {
        this.subcategory_rate = res.response.hourly_rate
      }
      sessionStorage.setItem('hourly_rate', res.response.hourly_rate)
      sessionStorage.setItem('daily_rate', res.response.daily_rate)
      sessionStorage.setItem('weekly_rate', res.response.weekly_rate)
      // console.log(sessionStorage.getItem('hourly_rate'))
      // this.daily_rate = res.equipment.daily_rate
      // this.weekly_rate =  res.equipment.weekly_rate
    });

  }
  weekly_function() {
    sessionStorage.setItem('time', 'weekly');
    console.log(this.weekly_type);
    this.weekly = true;
    this.daily = false;
    this.hourly = false;
    this.Hourly_button = false;
    this.Daily_button = false;
    this.Weekly_button = true;
    this.bookingtype = 'weekly';

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/subcategory/' + sessionStorage.getItem('sub_id'), { 'headers': headers }).pipe(shareReplay(1)).subscribe((res) => {
      console.log(res);
      this.singleproduct = res.response;
      this.subcategory_name = res.response.sc_name
      this.subcategory_image = res.response.sc_image
      // this.hourly_rate = res.equipment.hourly_rate
      if (sessionStorage.getItem('time') == 'hourly') {
        this.subcategory_rate = res.response.hourly_rate
      }
      if (sessionStorage.getItem('time') == 'daily') {
        this.subcategory_rate = res.response.daily_rate
      }
      if (sessionStorage.getItem('time') == 'weekly') {
        this.subcategory_rate = res.response.weekly_rate
      }

      if (sessionStorage.getItem('time') == null) {
        this.subcategory_rate = res.response.hourly_rate
      }
      sessionStorage.setItem('hourly_rate', res.response.hourly_rate)
      sessionStorage.setItem('daily_rate', res.response.daily_rate)
      sessionStorage.setItem('weekly_rate', res.response.weekly_rate)
      // console.log(sessionStorage.getItem('hourly_rate'))
      // this.daily_rate = res.equipment.daily_rate
      // this.weekly_rate =  res.equipment.weekly_rate
    });
    if (sessionStorage.getItem('time') == 'hourly') {
      this.checked_hourly = true;
      this.checked_daily = false;
      this.checked_weekly = false;
      this.hourly = true;
      this.h_no_hours = +this.no_hours
      this.hourly_rate = +this.h_rate
      console.log(this.h_no_hours);
      console.log(this.hourly_rate);
      this.h_sub_total = this.h_no_hours * this.hourly_rate
      console.log(this.h_sub_total)
      var servicecharge = 0.02 * this.h_sub_total;
      var gst1 = 0.18 * servicecharge;
      var gst2 = gst1.toFixed(2);
      var gst = +gst2;
      this.gstval = gst;
      this.h_grandtotal = this.h_sub_total + gst;
      // this.h_time = true;
      // this.d_time = false;
      // this.d_time = false;
    }
    else if (sessionStorage.getItem('time') == 'daily') {
      this.checked_hourly = false;
      this.checked_daily = true;
      this.checked_weekly = false;
      this.daily = true;
      this.daily_rate = +this.d_rate
      this.d_no_days = +this.no_days
      this.d_total_days_amount = this.d_no_days * this.daily_rate
      console.log(this.d_total_days_amount);
      var servicecharge = 0.02 * this.d_total_days_amount;
      var gst = 0.18 * servicecharge;
      this.gstval = gst;
      this.d_grandtotal = this.d_total_days_amount + gst;
      this.d_paid_amount = this.d_grandtotal / 10
      console.log(this.d_paid_amount);
    }
    else if (sessionStorage.getItem('time') == 'weekly') {
      this.checked_hourly = false;
      this.checked_daily = false;
      this.checked_weekly = true;
      this.weekly = true;
      this.weekly_rate = +this.w_rate
      this.w_no_weeks = +this.no_weeks
      this.w_total_weeks_amount = this.w_no_weeks * this.weekly_rate
      console.log(this.w_total_weeks_amount);
      var servicecharge = 0.02 * this.w_total_weeks_amount;
      var gst = 0.18 * servicecharge;
      this.gstval = gst;
      this.w_grandtotal = this.w_total_weeks_amount + gst;
      console.log(this.w_grandtotal);
      this.w_paid_amount = this.w_grandtotal / 5
      console.log(this.w_paid_amount);
    }

  }
  paynow() {
    this.submitted = true;
    if (this.Site_Details.invalid) {
      return false;
    }
    else if (this.Billing_Information.invalid) {
      return false;
    }
    else if (sessionStorage.getItem('auth_token') === null) {
      this.toastr.error(this.message, 'Please login to procced', {
        positionClass: 'toast-top-center'
      });
    }
    else {
      if (sessionStorage.getItem('time') === 'hourly') {
        // console.log(this.h_sub_total);
        const data = {
          duration: this.no_hours,
          start_date: this.h_startdate,
          start_time: this.h_starttime,
          type: 'hourly',
          booking_id: sessionStorage.getItem('booking_id'),
          paid_amount: this.h_grandtotal,
          coordinator: this.Site_Details.get('coordinator_name').value,
          phone: this.Site_Details.get('contact_number').value,
          address1: this.Site_Details.get('address_one').value,
          address2: this.Site_Details.get('address_two').value,
          landmark: this.Site_Details.get('landmark').value,
          pincode: this.Site_Details.get('pincode').value,
          city: this.Site_Details.get('city').value,
          state: this.Site_Details.get('state').value,
          company_name: this.Billing_Information.get('c_name').value,
          gstn: this.Billing_Information.get('gst_number').value,
          email: this.Billing_Information.get('email').value,
          address: this.Billing_Information.get('c_address').value,
          companypincode: this.Billing_Information.get('p_code').value,
          company_city: this.Billing_Information.get('city').value,
          company_state: this.Billing_Information.get('state').value,
        }
        console.log(data);
        this.checkoutservice.bookings(data).subscribe(res => {
          console.log(res);
          sessionStorage.setItem('b_id', res.response.id);
          sessionStorage.setItem('booked_id', res.response.booked_id)
          sessionStorage.setItem('booking_id', res.response.booking_id)
          sessionStorage.setItem('booking_status', res.response.booking_status)
          this.toastr.success(this.message, res.message, {
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['rent']);
        }, (error) => {
          this.toastr.error(this.message, error.error.message, {
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['checkout']);
        })
      }
      else if (sessionStorage.getItem('time') == 'daily') {
        console.log(this.no_days);
        console.log(this.d_endtime);
        console.log(this.d_enddate)
        const data = {
          duration: this.no_days,
          start_date: this.d_startdate,
          start_time: this.d_starttime,
          end_date: this.d_enddate,
          end_time: this.d_endtime,
          type: 'daily',
          booking_id: sessionStorage.getItem('booking_id'),
          paid_amount: this.d_paid_amount,
          coordinator: this.Site_Details.get('coordinator_name').value,
          phone: this.Site_Details.get('contact_number').value,
          address1: this.Site_Details.get('address_one').value,
          address2: this.Site_Details.get('address_two').value,
          landmark: this.Site_Details.get('landmark').value,
          pincode: this.Site_Details.get('pincode').value,
          city: this.Site_Details.get('city').value,
          state: this.Site_Details.get('state').value,
          company_name: this.Billing_Information.get('c_name').value,
          gstn: this.Billing_Information.get('gst_number').value,
          email: this.Billing_Information.get('email').value,
          address: this.Billing_Information.get('c_address').value,
          companypincode: this.Billing_Information.get('p_code').value,
          company_city: this.Billing_Information.get('city').value,
          company_state: this.Billing_Information.get('state').value,
        }
        this.checkoutservice.bookings(data).subscribe(res => {
          console.log(res);
          sessionStorage.setItem('b_id', res.response.id);
          sessionStorage.setItem('booked_id', res.response.booked_id)
          sessionStorage.setItem('booking_status', res.response.booking_status)
          this.toastr.success(this.message, res.message, {
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['rent']);
        }, (error) => {
          this.toastr.error(this.message, error.error.message, {
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['checkout']);
        })
      }
      else if (sessionStorage.getItem('time') == 'weekly') {
        this.Date = new Date(this.w_startdate);
        this.Date.setDate(this.Date.getDate() + 7);
        this.due_date = this.datePipe.transform(this.Date, 'yyyy-MM-dd');
        // this.due_date = this.w_startdate+7
        console.log(this.due_date);
        console.log(this.no_weeks);
        console.log(this.w_endtime);
        console.log(this.w_enddate)
        const data = {
          duration: this.no_weeks,
          start_date: this.w_startdate,
          start_time: this.w_starttime,
          end_date: this.w_enddate,
          end_time: this.w_endtime,
          type: 'weekly',
          booking_id: sessionStorage.getItem('booking_id'),
          paid_amount: this.w_paid_amount,
          due_date: this.due_date,
          coordinator: this.Site_Details.get('coordinator_name').value,
          phone: this.Site_Details.get('contact_number').value,
          address1: this.Site_Details.get('address_one').value,
          address2: this.Site_Details.get('address_two').value,
          landmark: this.Site_Details.get('landmark').value,
          pincode: this.Site_Details.get('pincode').value,
          city: this.Site_Details.get('city').value,
          state: this.Site_Details.get('state').value,
          company_name: this.Billing_Information.get('c_name').value,
          gstn: this.Billing_Information.get('gst_number').value,
          email: this.Billing_Information.get('email').value,
          address: this.Billing_Information.get('c_address').value,
          companypincode: this.Billing_Information.get('p_code').value,
          company_city: this.Billing_Information.get('city').value,
          company_state: this.Billing_Information.get('state').value,
        }
        this.checkoutservice.bookings(data).subscribe(res => {
          console.log(res);
          sessionStorage.setItem('b_id', res.response.id);
          sessionStorage.setItem('booked_id', res.response.booked_id)
          sessionStorage.setItem('booking_status', res.response.booking_status)
          this.toastr.success(this.message, 'You have successfully booked this equipment', {
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['rent']);
        }, (error) => {
          this.toastr.error(this.message, error.error.message, {
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['checkout']);
        })
      }
      else {
        this.toastr.error(this.message, 'Please Select the any options', {
          positionClass: 'toast-top-center'
        });
      }
    }
    // this.submitted = true;
    // if(this.General_Details.invalid && this.Site_Details.invalid && this.Billing_Information.invalid){
    //   return false;
    // }
    // else if(sessionStorage.getItem('user_id') === null){
    //   this.toastr.error(this.message,'Please login to procced',{
    //     positionClass: 'toast-top-center'
    //   });
    // }
    // else{
    //   console.log(this.General_Details.value);
    //   console.log(this.Site_Details.value);
    //   console.log(this.Billing_Information.value);
    // }
  }
  favourites() {
    const data = {
      subcategory_id: sessionStorage.getItem('sub_id')
    }
    this.checkoutservice.addfavs(data).subscribe((res) => {
      console.log(res);
      this.toastr.success(this.message, res.response, {
        positionClass: 'toast-top-center'
      });
      // this.router.navigate(['/favourites']);
    }, (error) => {
      console.log(error);
      this.toastr.error(this.message, error.error.message, {
        positionClass: 'toast-top-center'
      });
      this.router.navigate(['/rent/check-out']);
    })
  }
  getcurrentdate() {
    this.Date = new Date();
    var time = this.datePipe.transform(this.Date, 'HH:MM');
    if (time < "18:00") {
      this.Date.setDate(this.Date.getDate() + 1);
      this.latest_date = this.datePipe.transform(this.Date, 'yyyy-MM-dd');
      this.book_date1 = this.latest_date;
    }
    else if (time >= "18:00") {
      this.Date.setDate(this.Date.getDate() + 2);
      this.latest_date = this.datePipe.transform(this.Date, 'yyyy-MM-dd');
      this.book_date1 = this.latest_date;
    }
  }

  canExit(): boolean {

    if (sessionStorage.getItem('clicked') == 'true') {
      return true;
    }
    else {
      if (confirm("Some unsaved changes are there. Are you sure you wish to leave this page ?")) {
        return true
      } else {
        return false
      }
    }
  }
}
