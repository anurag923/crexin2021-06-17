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
import { AESEncryptDecryptServiceService } from '../../services/aesencrypt-decrypt-service.service';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

declare var $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [DatePipe]
})
export class CheckoutComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);
  hourly = false;
  daily = false;
  weekly = false;
  allcategories: any;
  cat_id: any;
  auth_token = localStorage.getItem('auth_token');
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
  bookingtype = localStorage.getItem('time');
  // weekendtime = "";
  // weekenddate = "";
  ammount = localStorage.getItem('subtotal');
  grandtotal = localStorage.getItem('grandtotal');
  gst = localStorage.getItem('gst');
  General_Details: FormGroup;
  Site_Details: FormGroup;
  Billing_Information: FormGroup;
  no_hours = localStorage.getItem('no_hours');
  h_startdate = localStorage.getItem('h_startdate');
  h_starttime = localStorage.getItem('h_starttime');
  no_days = localStorage.getItem('no_days');
  d_startdate = localStorage.getItem('d_startdate');
  d_starttime = localStorage.getItem('d_starttime');
  d_endtime = localStorage.getItem('d_endtime');
  // d_enddate = localStorage.getItem('d_enddate');
  d_enddate = this.datePipe.transform(localStorage.getItem('d_enddate'), 'yyyy-MM-dd');
  no_weeks = localStorage.getItem('no_weeks');
  w_startdate = localStorage.getItem('w_startdate');
  w_starttime = localStorage.getItem('w_starttime');
  w_endtime = localStorage.getItem('w_endtime');
  // w_enddate = localStorage.getItem('w_enddate');
  w_enddate = this.datePipe.transform(localStorage.getItem('w_enddate'), 'yyyy-MM-dd');
  checked_hourly: boolean;
  checked_daily: boolean;
  checked_weekly: boolean;
  Date: Date;
  latest_date: string;
  book_date1: string;
  w_s_date: any;
  s_date: any;
  h_rate = localStorage.getItem('hourly_rate');
  hourly_rate: any;
  d_rate = localStorage.getItem('daily_rate');
  daily_rate: any;
  w_rate = localStorage.getItem('weekly_rate');
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
  name = '';
  mobile = '';
  subcategory_name: any;
  subcategory_image: any;
  subcategory_rate: any;
  gstval: number;
  h_sub_tot:number;
  d_sub_tot:number;
  w_sub_tot:number;
  site_errors = false;
  billing_errors = false;
  constructor(private aes:AESEncryptDecryptServiceService,private checkoutservice: CheckoutService, private winRef: WindowRefService, private datePipe: DatePipe, private fb: FormBuilder, private toastr: ToastrService, private router: Router, private http: HttpClient, private activeroute: ActivatedRoute, private route: Router, private crexinservice: CrexinService) {
    console.log(this.d_enddate);
    this.name = this.aes.decrypt(localStorage.getItem('name'));
    this.mobile = this.aes.decrypt(localStorage.getItem('phone'));
    if (localStorage.getItem('time') == null) {
      this.bookingtype = 'hourly';
    }
  }

  ngOnInit(): void {
    this.name = this.aes.decrypt(localStorage.getItem('name'));
    this.mobile = this.aes.decrypt(localStorage.getItem('phone'));
    if (localStorage.getItem('time') == null) {
      this.bookingtype = 'hourly';
    }
    document.getElementById('paynow').onclick = function () {
      localStorage.setItem('clicked', 'true');
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
    this.http.get<any>('https://superuser.crexin.com/api/subcategory/' + localStorage.getItem('sub_id'), { 'headers': headers }).pipe(shareReplay(1)).subscribe((res) => {
      console.log(res);
      this.singleproduct = res.response;
      this.subcategory_name = res.response.sc_name
      this.subcategory_image = res.response.sc_image
      // this.hourly_rate = res.equipment.hourly_rate
      if (localStorage.getItem('time') == 'hourly') {
        this.subcategory_rate = res.response.hourly_rate
      }
      if (localStorage.getItem('time') == 'daily') {
        this.subcategory_rate = res.response.daily_rate
      }
      if (localStorage.getItem('time') == 'weekly') {
        this.subcategory_rate = res.response.weekly_rate
      }

      if (localStorage.getItem('time') == null) {
        this.subcategory_rate = res.response.hourly_rate
      }
      localStorage.setItem('hourly_rate', res.response.hourly_rate)
      localStorage.setItem('daily_rate', res.response.daily_rate)
      localStorage.setItem('weekly_rate', res.response.weekly_rate)
      // console.log(localStorage.getItem('hourly_rate'))
      // this.daily_rate = res.equipment.daily_rate
      // this.weekly_rate =  res.equipment.weekly_rate
    });
    if (localStorage.getItem('time') == 'hourly') {
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
      var subtotalval = this.h_sub_total/1.0236;
      var subtotalvalround = subtotalval.toFixed(2);
      this.h_sub_tot = +subtotalvalround;
      var gst = this.h_sub_total-this.h_sub_tot;
      var gstround = gst.toFixed(2);
      this.gstval = +gstround;
      console.log(this.gstval)
    }
    else if (localStorage.getItem('time') == 'daily') {
      this.checked_hourly = false;
      this.checked_daily = true;
      this.checked_weekly = false;
      this.daily = true;
      this.daily_rate = +this.d_rate
      this.d_no_days = +this.no_days
      this.d_total_days_amount = this.d_no_days * this.daily_rate
      console.log(this.d_total_days_amount);
      var d_advance = this.d_total_days_amount / 10;
      var d_advance_round = d_advance.toFixed(2);
      this.d_paid_amount = +d_advance_round;
      console.log(this.d_paid_amount);
      var d_subtotal = this.d_total_days_amount/1.0236;
      var d_subtotal_round = d_subtotal.toFixed(2);
      this.d_sub_tot = +d_subtotal_round;
      var d_gst = this.d_total_days_amount - this.d_sub_tot;
      var d_gst_round = d_gst.toFixed(2);
      this.gstval = +d_gst_round
      console.log(this.gstval)
    }
    else if (localStorage.getItem('time') == 'weekly') {
      this.checked_hourly = false;
      this.checked_daily = false;
      this.checked_weekly = true;
      this.weekly = true;
      this.weekly_rate = +this.w_rate
      this.w_no_weeks = +this.no_weeks
      this.w_total_weeks_amount = this.w_no_weeks * this.weekly_rate
      console.log(this.w_total_weeks_amount);
      var w_advance = this.w_total_weeks_amount/5;
      var w_advance_round = w_advance.toFixed(2);
      this.w_paid_amount = +w_advance_round;
      console.log(this.w_paid_amount);
      var w_sub = this.w_total_weeks_amount/1.0236;
      var w_sub_round = w_sub.toFixed(2);
      this.w_sub_tot =  +w_sub_round;
      var w_gst = this.w_total_weeks_amount - this.w_sub_tot;
      var w_gst_round = w_gst.toFixed(2);
      this.gstval = +w_gst_round;
      console.log(this.gstval);
    }

    else if (localStorage.getItem('time') == null) {
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
      var subtotalval = this.h_sub_total/1.0236;
      var subtotalvalround = subtotalval.toFixed(2);
      this.h_sub_tot = +subtotalvalround;
      var gst = this.h_sub_total-this.h_sub_tot;
      var gstround = gst.toFixed(2);
      this.gstval = +gstround;
      console.log(this.gstval);
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
    localStorage.setItem('time', 'hourly')
    // localStorage.setItem('no_hours',this.Hourly.get('no_hours').value);
    this.h_no_hours = +this.no_hours
    this.hourly_rate = localStorage.getItem('hourly_rate');
    this.h_sub_total = this.h_no_hours * this.hourly_rate
    // console.log(this.h_sub_total)
    // this.h_grandtotal = this.h_sub_total+0
    // console.log(this.h_grandtotal)
      var subtotalval = this.h_sub_total/1.0236;
      var subtotalvalround = subtotalval.toFixed(2);
      this.h_sub_tot = +subtotalvalround;
      var gst = this.h_sub_total-this.h_sub_tot;
      var gstround = gst.toFixed(2);
      this.gstval = +gstround;
      console.log(this.gstval);
  }
  d_days() {
    localStorage.setItem('time', 'daily')
    // localStorage.setItem('no_days',this.Daily.get('no_days').value);
    this.daily_rate = localStorage.getItem('daily_rate')
    this.d_no_days = +this.no_days
    this.d_total_days_amount = this.d_no_days * this.daily_rate
    console.log(this.d_total_days_amount);
      var d_advance = this.d_total_days_amount / 10;
      var d_advance_round = d_advance.toFixed(2);
      this.d_paid_amount = +d_advance_round;
      console.log(this.d_paid_amount);
      var d_subtotal = this.d_total_days_amount/1.0236;
      var d_subtotal_round = d_subtotal.toFixed(2);
      this.d_sub_tot = +d_subtotal_round;
      var d_gst = this.d_total_days_amount - this.d_sub_tot;
      var d_gst_round = d_gst.toFixed(2);
      this.gstval = +d_gst_round;
      console.log(this.gstval);
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
    localStorage.setItem('time', 'weekly')
    // this.weekly_rate = localStorage.getItem('weekly_rate')
    this.weekly_rate = localStorage.getItem('weekly_rate')
    this.w_no_weeks = +this.no_weeks
    this.w_total_weeks_amount = this.w_no_weeks * this.weekly_rate
    console.log(this.w_total_weeks_amount);
    // this.w_paid_amount = this.w_total_weeks_amount/5
    // console.log(this.w_paid_amount);
    // this.w_grandtotal = this.w_total_weeks_amount+0
      var w_advance = this.w_total_weeks_amount/5;
      var w_advance_round = w_advance.toFixed(2);
      this.w_paid_amount = +w_advance_round;
      console.log(this.w_paid_amount);
      var w_sub = this.w_total_weeks_amount/1.0236;
      var w_sub_round = w_sub.toFixed(2);
      this.w_sub_tot =  +w_sub_round;
      var w_gst = this.w_total_weeks_amount - this.w_sub_tot;
      var w_gst_round = w_gst.toFixed(2);
      this.gstval = +w_gst_round;
      console.log(this.gstval);
    localStorage.setItem('no_hours', this.Weekly.get('no_weeks').value);
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
    localStorage.setItem('time', 'hourly');
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
    this.http.get<any>('https://superuser.crexin.com/api/subcategory/' + localStorage.getItem('sub_id'), { 'headers': headers }).pipe(shareReplay(1)).subscribe((res) => {
      console.log(res);
      this.singleproduct = res.response;
      this.subcategory_name = res.response.sc_name
      this.subcategory_image = res.response.sc_image
      // this.hourly_rate = res.equipment.hourly_rate
      if (localStorage.getItem('time') == 'hourly') {
        this.subcategory_rate = res.response.hourly_rate
      }
      if (localStorage.getItem('time') == 'daily') {
        this.subcategory_rate = res.response.daily_rate
        this.gstval = 0;
      }
      if (localStorage.getItem('time') == 'weekly') {
        this.subcategory_rate = res.response.weekly_rate
        this.gstval = 0;
      }

      if (localStorage.getItem('time') == null) {
        this.subcategory_rate = res.response.hourly_rate
      }
      localStorage.setItem('hourly_rate', res.response.hourly_rate)
      localStorage.setItem('daily_rate', res.response.daily_rate)
      localStorage.setItem('weekly_rate', res.response.weekly_rate)
      // console.log(localStorage.getItem('hourly_rate'))
      // this.daily_rate = res.equipment.daily_rate
      // this.weekly_rate =  res.equipment.weekly_rate
    });
    if (localStorage.getItem('time') == 'hourly') {
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
      var subtotalval = this.h_sub_total/1.0236;
      var subtotalvalround = subtotalval.toFixed(2);
      this.h_sub_tot = +subtotalvalround;
      var gst = this.h_sub_total-this.h_sub_tot;
      var gstround = gst.toFixed(2);
      this.gstval = +gstround;
      console.log(this.gstval);
      // this.h_time = true;
      // this.d_time = false;
      // this.d_time = false;
    }
    else if (localStorage.getItem('time') == 'daily') {
      this.checked_hourly = false;
      this.checked_daily = true;
      this.checked_weekly = false;
      this.daily = true;
      this.daily_rate = +this.d_rate
      this.d_no_days = +this.no_days
      this.d_total_days_amount = this.d_no_days * this.daily_rate
      console.log(this.d_total_days_amount);
      var d_advance = this.d_total_days_amount / 10;
      var d_advance_round = d_advance.toFixed(2);
      this.d_paid_amount = +d_advance_round;
      console.log(this.d_paid_amount);
      var d_subtotal = this.d_total_days_amount/1.0236;
      var d_subtotal_round = d_subtotal.toFixed(2);
      this.d_sub_tot = +d_subtotal_round;
      var d_gst = this.d_total_days_amount - this.d_sub_tot;
      var d_gst_round = d_gst.toFixed(2);
      this.gstval = +d_gst_round
      console.log(this.gstval);
    }
    else if (localStorage.getItem('time') == 'weekly') {
      this.checked_hourly = false;
      this.checked_daily = false;
      this.checked_weekly = true;
      this.weekly = true;
      this.weekly_rate = +this.w_rate
      this.w_no_weeks = +this.no_weeks
      this.w_total_weeks_amount = this.w_no_weeks * this.weekly_rate
      console.log(this.w_total_weeks_amount);
      var w_advance = this.w_total_weeks_amount/5;
      var w_advance_round = w_advance.toFixed(2);
      this.w_paid_amount = +w_advance_round;
      console.log(this.w_paid_amount);
      var w_sub = this.w_total_weeks_amount/1.0236;
      var w_sub_round = w_sub.toFixed(2);
      this.w_sub_tot =  +w_sub_round;
      var w_gst = this.w_total_weeks_amount - this.w_sub_tot;
      var w_gst_round = w_gst.toFixed(2);
      this.gstval = +w_gst_round;
      console.log(this.gstval);
    }

  }
  daily_function() {
    localStorage.setItem('time', 'daily');
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
    this.http.get<any>('https://superuser.crexin.com/api/subcategory/' + localStorage.getItem('sub_id'), { 'headers': headers }).pipe(shareReplay(1)).subscribe((res) => {
      console.log(res);
      this.singleproduct = res.response;
      this.subcategory_name = res.response.sc_name
      this.subcategory_image = res.response.sc_image
      // this.hourly_rate = res.equipment.hourly_rate
      if (localStorage.getItem('time') == 'hourly') {
        this.subcategory_rate = res.response.hourly_rate
        this.gstval = 0;
      }
      if (localStorage.getItem('time') == 'daily') {
        this.subcategory_rate = res.response.daily_rate
      }
      if (localStorage.getItem('time') == 'weekly') {
        this.subcategory_rate = res.response.weekly_rate
        this.gstval = 0;
      }

      if (localStorage.getItem('time') == null) {
        this.subcategory_rate = res.response.hourly_rate;
        this.gstval = 0;
        
      }
      localStorage.setItem('hourly_rate', res.response.hourly_rate)
      localStorage.setItem('daily_rate', res.response.daily_rate)
      localStorage.setItem('weekly_rate', res.response.weekly_rate)
      // console.log(localStorage.getItem('hourly_rate'))
      // this.daily_rate = res.equipment.daily_rate
      // this.weekly_rate =  res.equipment.weekly_rate
    });
    if (localStorage.getItem('time') == 'hourly') {
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
      var subtotalval = this.h_sub_total/1.0236;
      var subtotalvalround = subtotalval.toFixed(2);
      this.h_sub_tot = +subtotalvalround;
      var gst = this.h_sub_total-this.h_sub_tot;
      var gstround = gst.toFixed(2);
      this.gstval = +gstround;
      console.log(this.gstval);
      // this.h_time = true;
      // this.d_time = false;
      // this.d_time = false;
    }
    else if (localStorage.getItem('time') == 'daily') {
      this.checked_hourly = false;
      this.checked_daily = true;
      this.checked_weekly = false;
      this.daily = true;
      this.daily_rate = +this.d_rate
      this.d_no_days = +this.no_days
      this.d_total_days_amount = this.d_no_days * this.daily_rate
      console.log(this.d_total_days_amount);
      var d_advance = this.d_total_days_amount / 10;
      var d_advance_round = d_advance.toFixed(2);
      this.d_paid_amount = +d_advance_round;
      console.log(this.d_paid_amount);
      var d_subtotal = this.d_total_days_amount/1.0236;
      var d_subtotal_round = d_subtotal.toFixed(2);
      this.d_sub_tot = +d_subtotal_round;
      var d_gst = this.d_total_days_amount - this.d_sub_tot;
      var d_gst_round = d_gst.toFixed(2);
      this.gstval = +d_gst_round
      console.log(this.gstval);
    }
    else if (localStorage.getItem('time') == 'weekly') {
      this.checked_hourly = false;
      this.checked_daily = false;
      this.checked_weekly = true;
      this.weekly = true;
      this.weekly_rate = +this.w_rate
      this.w_no_weeks = +this.no_weeks
      this.w_total_weeks_amount = this.w_no_weeks * this.weekly_rate
      console.log(this.w_total_weeks_amount);
      var w_advance = this.w_total_weeks_amount/5;
      var w_advance_round = w_advance.toFixed(2);
      this.w_paid_amount = +w_advance_round;
      console.log(this.w_paid_amount);
      var w_sub = this.w_total_weeks_amount/1.0236;
      var w_sub_round = w_sub.toFixed(2);
      this.w_sub_tot =  +w_sub_round;
      var w_gst = this.w_total_weeks_amount - this.w_sub_tot;
      var w_gst_round = w_gst.toFixed(2);
      this.gstval = +w_gst_round;
      console.log(this.gstval);
    }
  }
  weekly_function() {
    localStorage.setItem('time', 'weekly');
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
    this.http.get<any>('https://superuser.crexin.com/api/subcategory/' + localStorage.getItem('sub_id'), { 'headers': headers }).pipe(shareReplay(1)).subscribe((res) => {
      console.log(res);
      this.singleproduct = res.response;
      this.subcategory_name = res.response.sc_name
      this.subcategory_image = res.response.sc_image
      // this.hourly_rate = res.equipment.hourly_rate
      if (localStorage.getItem('time') == 'hourly') {
        this.subcategory_rate = res.response.hourly_rate
        this.gstval = 0;
      }
      if (localStorage.getItem('time') == 'daily') {
        this.subcategory_rate = res.response.daily_rate
        this.gstval = 0;
      }
      if (localStorage.getItem('time') == 'weekly') {
        this.subcategory_rate = res.response.weekly_rate
      }

      if (localStorage.getItem('time') == null) {
        this.subcategory_rate = res.response.hourly_rate
        this.gstval = 0;
      }
      localStorage.setItem('hourly_rate', res.response.hourly_rate)
      localStorage.setItem('daily_rate', res.response.daily_rate)
      localStorage.setItem('weekly_rate', res.response.weekly_rate)
      // console.log(localStorage.getItem('hourly_rate'))
      // this.daily_rate = res.equipment.daily_rate
      // this.weekly_rate =  res.equipment.weekly_rate
    });
    if (localStorage.getItem('time') == 'hourly') {
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
      var subtotalval = this.h_sub_total/1.0236;
      var subtotalvalround = subtotalval.toFixed(2);
      this.h_sub_tot = +subtotalvalround;
      var gst = this.h_sub_total-this.h_sub_tot;
      var gstround = gst.toFixed(2);
      this.gstval = +gstround;
      console.log(this.gstval);
      // this.h_time = true;
      // this.d_time = false;
      // this.d_time = false;
    }
    else if (localStorage.getItem('time') == 'daily') {
      this.checked_hourly = false;
      this.checked_daily = true;
      this.checked_weekly = false;
      this.daily = true;
      this.daily_rate = +this.d_rate
      this.d_no_days = +this.no_days
      this.d_total_days_amount = this.d_no_days * this.daily_rate
      console.log(this.d_total_days_amount);
      var d_advance = this.d_total_days_amount / 10;
      var d_advance_round = d_advance.toFixed(2);
      this.d_paid_amount = +d_advance_round;
      console.log(this.d_paid_amount);
      var d_subtotal = this.d_total_days_amount/1.0236;
      var d_subtotal_round = d_subtotal.toFixed(2);
      this.d_sub_tot = +d_subtotal_round;
      var d_gst = this.d_total_days_amount - this.d_sub_tot;
      var d_gst_round = d_gst.toFixed(2);
      this.gstval = +d_gst_round
      console.log(this.gstval);
    }
    else if (localStorage.getItem('time') == 'weekly') {
      this.checked_hourly = false;
      this.checked_daily = false;
      this.checked_weekly = true;
      this.weekly = true;
      this.weekly_rate = +this.w_rate
      this.w_no_weeks = +this.no_weeks
      this.w_total_weeks_amount = this.w_no_weeks * this.weekly_rate
      console.log(this.w_total_weeks_amount);
      var w_advance = this.w_total_weeks_amount/5;
      var w_advance_round = w_advance.toFixed(2);
      this.w_paid_amount = +w_advance_round;
      console.log(this.w_paid_amount);
      var w_sub = this.w_total_weeks_amount/1.0236;
      var w_sub_round = w_sub.toFixed(2);
      this.w_sub_tot =  +w_sub_round;
      var w_gst = this.w_total_weeks_amount - this.w_sub_tot;
      var w_gst_round = w_gst.toFixed(2);
      this.gstval = +w_gst_round;
      console.log(this.gstval);
    }

  }
  paynow() {
    this.submitted = true;
    if(this.Site_Details.invalid){
      this.site_errors = true;
    }
    if(this.Billing_Information.invalid){
      this.billing_errors = true;
    }
    if (this.Site_Details.invalid) {
      return false;
    }
    else if (this.Billing_Information.invalid) {
      return false;
    }
    else if (localStorage.getItem('auth_token') === null) {
      this.toastr.error(this.message, 'Please login to procced', {
        positionClass: 'toast-top-center'
      });
    }
    else {
      
      if(localStorage.getItem('time')==null){
        const formData = {
          amount: this.h_sub_total*100,
          currency: 'INR',
          receipt: this.makeid(10),
        };
       
        this.http.post<any>('https://superuser.crexin.com/api/user/order_id',formData).subscribe(
          (res) => {
            console.log(res);
            res.id;
            // this.router.navigate(['/patient/payment']);
            const options: any = {
              key: 'rzp_test_89ZbQ2LKtoRyRs',
              amount: this.h_sub_total*100, // amount should be in paise format to display Rs 1255 without decimal point
              // amount: Math.floor(+localStorage.getItem('amount')*100),
              currency: 'INR',
              name: '', // company name or product name
              description: '', // product description
              image: '../assets/images/Log_one.png', // company logo or product image
              order_id: res.id, // order_id created by you in backend
              modal: {
                // We should prevent closing of the form when esc key is pressed.
                escape: false,
              },
              notes: {
                // include notes if any
              },
              theme: {
                color: '#dca101',
              },
            };
            console.log(options);
            options.handler = (response, error) => {
              options.response = response;
              console.log(response);
              console.log(options);
              const data = {
                order_id: res.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              };
              console.log(data);
              this.http.post<any>('https://superuser.crexin.com/api/user/signature',data).subscribe(
                (res) => {
                  console.log(res);
                  const data = {
                    duration: this.no_hours,
                    start_date: this.h_startdate,
                    start_time: this.h_starttime,
                    type: 'hourly',
                    booking_id: localStorage.getItem('booking_id'),
                    paid_amount: this.h_sub_total,
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
                  const headers = new HttpHeaders()
                  .set('content-type', 'application/json')
                  .set('Access-Control-Allow-Origin', '*')
                  .set('Authorization', `Bearer ${this.auth_token}`);
                  this.http.post<any>('https://superuser.crexin.com/api/user/bookings',data,{'headers':headers}).subscribe(res => {
                    console.log(res);
                    localStorage.setItem('b_id', res.response.id);
                    localStorage.setItem('booked_id', res.response.booked_id)
                    localStorage.setItem('booking_id', res.response.booking_id)
                    localStorage.setItem('booking_status', res.response.booking_status)
                    this.toastr.success(this.message, res.message, {
                      positionClass: 'toast-top-center'
                    });
                    this.router.navigate(['booked']);
                  }, (error) => {
                    this.toastr.error(this.message, error.error.message, {
                      positionClass: 'toast-top-center'
                    });
                    this.toastr.success(this.message, res.message, {
                      positionClass: 'toast-top-center'
                    });
                    this.router.navigate(['booked']);
                  })
                },
                (err) => {
                  this.toastr.error(this.message, 'Payment failed', {
                    positionClass: 'toast-top-center',
                  });
                }
              );
            };
            options.modal.ondismiss = () => {
              console.log('Transaction cancelled.');
            };
            const rzp = new this.winRef.nativeWindow.Razorpay(options);
            rzp.open();
          },
          (err) => {
            console.log(err);
          }
        );
      }
      else if (localStorage.getItem('time') === 'hourly') {
        const formData = {
          amount: this.h_sub_total*100,
          currency: 'INR',
          receipt: this.makeid(10),
        };
       
        this.http.post<any>('https://superuser.crexin.com/api/user/order_id',formData).subscribe(
          (res) => {
            console.log(res);
            res.id;
            // this.router.navigate(['/patient/payment']);
            const options: any = {
              key: 'rzp_test_89ZbQ2LKtoRyRs',
              amount: this.h_sub_total*100, // amount should be in paise format to display Rs 1255 without decimal point
              // amount: Math.floor(+localStorage.getItem('amount')*100),
              currency: 'INR',
              name: '', // company name or product name
              description: '', // product description
              image: '../assets/images/Log_one.png', // company logo or product image
              order_id: res.id, // order_id created by you in backend
              modal: {
                // We should prevent closing of the form when esc key is pressed.
                escape: false,
              },
              notes: {
                // include notes if any
              },
              theme: {
                color: '#dca101',
              },
            };
            console.log(options);
            options.handler = (response, error) => {
              options.response = response;
              console.log(response);
              console.log(options);
              const data = {
                order_id: res.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              };
              console.log(data);
              this.http.post<any>('https://superuser.crexin.com/api/user/signature',data).subscribe(
                (res) => {
                  console.log(res);
                  const data = {
                    duration: this.no_hours,
                    start_date: this.h_startdate,
                    start_time: this.h_starttime,
                    type: 'hourly',
                    booking_id: localStorage.getItem('booking_id'),
                    paid_amount: this.h_sub_total,
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
                  const headers = new HttpHeaders()
                  .set('content-type', 'application/json')
                  .set('Access-Control-Allow-Origin', '*')
                  .set('Authorization', `Bearer ${this.auth_token}`);
                  this.http.post<any>('https://superuser.crexin.com/api/user/bookings',data,{'headers':headers}).subscribe(res => {
                    console.log(res);
                    localStorage.setItem('b_id', res.response.id);
                    localStorage.setItem('booked_id', res.response.booked_id)
                    localStorage.setItem('booking_id', res.response.booking_id)
                    localStorage.setItem('booking_status', res.response.booking_status)
                    this.toastr.success(this.message, res.message, {
                      positionClass: 'toast-top-center'
                    });
                    this.router.navigate(['booked']);
                  }, (error) => {
                    this.toastr.error(this.message, error.error.message, {
                      positionClass: 'toast-top-center'
                    });
                    this.toastr.success(this.message, res.message, {
                      positionClass: 'toast-top-center'
                    });
                    this.router.navigate(['booked']);
                  })
                },
                (err) => {
                  this.toastr.error(this.message, 'Payment failed', {
                    positionClass: 'toast-top-center',
                  });
                }
              );
            };
            options.modal.ondismiss = () => {
              console.log('Transaction cancelled.');
            };
            const rzp = new this.winRef.nativeWindow.Razorpay(options);
            rzp.open();
          },
          (err) => {
            console.log(err);
          }
        );
      }
      else if (localStorage.getItem('time') == 'daily') {
        const formData = {
          amount: this.d_paid_amount*100,
          currency: 'INR',
          receipt: this.makeid(10),
        };
       
        this.http.post<any>('https://superuser.crexin.com/api/user/order_id',formData).subscribe(
          (res) => {
            console.log(res);
            res.id;
            // this.router.navigate(['/patient/payment']);
            const options: any = {
              key: 'rzp_test_89ZbQ2LKtoRyRs',
              amount: this.d_paid_amount*100, // amount should be in paise format to display Rs 1255 without decimal point
              // amount: Math.floor(+localStorage.getItem('amount')*100),
              currency: 'INR',
              name: '', // company name or product name
              description: '', // product description
              image: '../assets/images/Log_one.png', // company logo or product image
              order_id: res.id, // order_id created by you in backend
              modal: {
                // We should prevent closing of the form when esc key is pressed.
                escape: false,
              },
              notes: {
                // include notes if any
              },
              theme: {
                color: '#dca101',
              },
            };
            console.log(options);
            options.handler = (response, error) => {
              options.response = response;
              console.log(response);
              console.log(options);
              const data = {
                order_id: res.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              };
              console.log(data);
              this.http.post<any>('https://superuser.crexin.com/api/user/signature',data).subscribe(
                (res) => {
                  console.log(res);
                  const data = {
                    duration: this.no_days,
                    start_date: this.d_startdate,
                    start_time: this.d_starttime,
                    end_date: this.d_enddate,
                    end_time: this.d_endtime,
                    type: 'daily',
                    booking_id: localStorage.getItem('booking_id'),
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
                  console.log(data);
                  const headers = new HttpHeaders()
                  .set('content-type', 'application/json')
                  .set('Access-Control-Allow-Origin', '*')
                  .set('Authorization', `Bearer ${this.auth_token}`);
                  this.http.post<any>('https://superuser.crexin.com/api/user/bookings',data,{'headers':headers}).subscribe(res => {
                    console.log(res);
                    localStorage.setItem('b_id', res.response.id);
                    localStorage.setItem('booked_id', res.response.booked_id)
                    localStorage.setItem('booking_id', res.response.booking_id)
                    localStorage.setItem('booking_status', res.response.booking_status)
                    this.toastr.success(this.message, res.message, {
                      positionClass: 'toast-top-center'
                    });
                    this.router.navigate(['booked']);
                  }, (error) => {
                    this.toastr.error(this.message, error.error.message, {
                      positionClass: 'toast-top-center'
                    });
                    this.toastr.success(this.message, res.message, {
                      positionClass: 'toast-top-center'
                    });
                    this.router.navigate(['booked']);
                  })
                },
                (err) => {
                  this.toastr.error(this.message, 'Payment failed', {
                    positionClass: 'toast-top-center',
                  });
                }
              );
            };
            options.modal.ondismiss = () => {
              console.log('Transaction cancelled.');
            };
            const rzp = new this.winRef.nativeWindow.Razorpay(options);
            rzp.open();
          },
          (err) => {
            console.log(err);
          }
        );
      }
      else if (localStorage.getItem('time') == 'weekly') {
        const formData = {
          amount: this.w_paid_amount*100,
          currency: 'INR',
          receipt: this.makeid(10),
        };
       
        this.http.post<any>('https://superuser.crexin.com/api/user/order_id',formData).subscribe(
          (res) => {
            console.log(res);
            res.id;
            // this.router.navigate(['/patient/payment']);
            const options: any = {
              key: 'rzp_test_89ZbQ2LKtoRyRs',
              amount: this.w_paid_amount*100, // amount should be in paise format to display Rs 1255 without decimal point
              // amount: Math.floor(+localStorage.getItem('amount')*100),
              currency: 'INR',
              name: '', // company name or product name
              description: '', // product description
              image: '../assets/images/Log_one.png', // company logo or product image
              order_id: res.id, // order_id created by you in backend
              modal: {
                // We should prevent closing of the form when esc key is pressed.
                escape: false,
              },
              notes: {
                // include notes if any
              },
              theme: {
                color: '#dca101',
              },
            };
            console.log(options);
            options.handler = (response, error) => {
              options.response = response;
              console.log(response);
              console.log(options);
              const data = {
                order_id: res.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              };
              console.log(data);
              this.http.post<any>('https://superuser.crexin.com/api/user/signature',data).subscribe(
                (res) => {
                  console.log(res);
                  const data = {
                    duration: this.no_weeks,
                    start_date: this.w_startdate,
                    start_time: this.w_starttime,
                    end_date: this.w_enddate,
                    end_time: this.w_endtime,
                    type: 'weekly',
                    booking_id: localStorage.getItem('booking_id'),
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
                  console.log(data);
                  const headers = new HttpHeaders()
                  .set('content-type', 'application/json')
                  .set('Access-Control-Allow-Origin', '*')
                  .set('Authorization', `Bearer ${this.auth_token}`);
                  this.http.post<any>('https://superuser.crexin.com/api/user/bookings',data,{'headers':headers}).subscribe(res => {
                    console.log(res);
                    localStorage.setItem('b_id', res.response.id);
                    localStorage.setItem('booked_id', res.response.booked_id)
                    localStorage.setItem('booking_id', res.response.booking_id)
                    localStorage.setItem('booking_status', res.response.booking_status)
                    this.toastr.success(this.message, res.message, {
                      positionClass: 'toast-top-center'
                    });
                    this.router.navigate(['booked']);
                  }, (error) => {
                    this.toastr.error(this.message, error.error.message, {
                      positionClass: 'toast-top-center'
                    });
                    this.toastr.success(this.message, res.message, {
                      positionClass: 'toast-top-center'
                    });
                    this.router.navigate(['booked']);
                  })
                },
                (err) => {
                  this.toastr.error(this.message, 'Payment failed', {
                    positionClass: 'toast-top-center',
                  });
                }
              );
            };
            options.modal.ondismiss = () => {
              console.log('Transaction cancelled.');
            };
            const rzp = new this.winRef.nativeWindow.Razorpay(options);
            rzp.open();
          },
          (err) => {
            console.log(err);
          }
        );

      }
      else {
        this.toastr.error(this.message, 'Please Select the any options', {
          positionClass: 'toast-top-center'
        });
      }
    }
  }
  private makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  favourites() {
    const data = {
      subcategory_id: localStorage.getItem('sub_id')
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

    if (localStorage.getItem('clicked') == 'true') {
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
