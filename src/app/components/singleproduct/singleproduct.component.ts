import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css'],
  providers: [DatePipe]
})
export class SingleproductComponent implements OnInit {
  selectedIndex: number = null;
  hourly = true;
  daily = false;
  weekly = false;
  allcategories: any;
  cat_id: any;
  auth_token = sessionStorage.getItem('auth_token');
  singleproduct:any;
  message: string;
  products: any;
  Hourly:FormGroup;
  Daily:FormGroup;
  Weekly:FormGroup;
  submitted: boolean;
  selectedItem: any;
  submitted_hourly: boolean;
  submitted_daily: boolean;
  submitted_weekly: boolean;
  Hourly_button:boolean;
  Daily_button = false;
  Weekly_button = false;
  date: any;
  e_date: any;
  end_date = "";
  end_time = "";
  single_product = true;
  categorie_products:boolean;
  wend_date: string;
  wend_time: any;
  order: any;
  Date: Date;
  latest_date: string;
  book_date1: string;
  s_date: any;
  w_s_date: any;
  loading = true;
  no_of_weeks:any;
  cat_name = sessionStorage.getItem('cat_name');
  bookings_notavailable = false;
  show = false;
  error:any;
  index:number;
  no_of_hours:any;
  start_date:any;
  start_time:any;
  no_of_days:any;
  d_start_date:any;
  d_start_time:any;
  d_end_time:any;
  hourly_checked:boolean;
  daily_checked:boolean;
  weekly_checked:boolean;
  w_start_date:any;
  w_start_time:any;

  constructor(private datePipe: DatePipe,private fb:FormBuilder, private toastr:ToastrService,private router:Router,private http:HttpClient,private activeroute:ActivatedRoute, private route:Router, private crexinservice:CrexinService) {
    // sessionStorage.setItem('time','hourly');
   }

  ngOnInit(): void {
    this.index = +sessionStorage.getItem('index'); 
    // sessionStorage.setItem('time','hourly');
    if(sessionStorage.getItem('time')=='hourly'){
      this.hourly_checked = true;
      this.daily_checked = false;
      this.weekly_checked = false;
      this.hourly = true;
      this.daily = false;
      this.weekly = false;
      this.Hourly_button = true;
      this.Daily_button = false;
      this.Weekly_button = false;
    }
    else if(sessionStorage.getItem('time')=='daily'){
      this.daily_checked = true;
      this.hourly_checked = false;
      this.weekly_checked = false;
      this.daily = true;
      this.hourly = false;
      this.weekly = false;
      this.Hourly_button = false;
      this.Daily_button = true;
      this.Weekly_button = false;
    }
    else if(sessionStorage.getItem('time')=='weekly'){
      this.weekly_checked = true;
      this.daily_checked = false;
      this.hourly_checked = false;
      this.weekly = true;
      this.daily = false;
      this.hourly = false;
      this.Hourly_button = false;
      this.Daily_button = false;
      this.Weekly_button = true;
    }
    else if(sessionStorage.getItem('time')==null){
      this.hourly_checked = true;
      this.daily_checked = false;
      this.weekly_checked = false;
      this.hourly = true;
      this.daily = false;
      this.weekly = false;
      this.Hourly_button = true;
      this.Daily_button = false;
      this.Weekly_button = false;
    }
    if(sessionStorage.getItem('time')=='hourly'){
      if(sessionStorage.getItem('no_hours')!=null){
        this.no_of_hours = sessionStorage.getItem('no_hours');
      }
      if(sessionStorage.getItem('h_startdate')!=null){
        this.start_date = sessionStorage.getItem('h_startdate');
      }
      if(sessionStorage.getItem('h_starttime')){
        this.start_time = sessionStorage.getItem('h_starttime');
      }
    }
    
    if(sessionStorage.getItem('time')=='daily'){
      if(sessionStorage.getItem('no_days')!=null){
        this.no_of_days = sessionStorage.getItem('no_days');
      }
      if(sessionStorage.getItem('d_starttime')!=null){
        this.d_start_time = sessionStorage.getItem('d_starttime');
      }
      if(sessionStorage.getItem('d_startdate')!=null){
        this.d_start_date = sessionStorage.getItem('d_startdate');
      }
      if(sessionStorage.getItem('d_endtime')!=null){
        this.end_time = sessionStorage.getItem('d_endtime');
      }
      if(sessionStorage.getItem('d_enddate')!=null){
        this.end_date = sessionStorage.getItem('d_enddate');
      }
    }

    if(sessionStorage.getItem('time')=='weekly'){
      if(sessionStorage.getItem('no_weeks')!=null){
        this.no_of_weeks = sessionStorage.getItem('no_weeks');
      }
      if(sessionStorage.getItem('w_startdate')!=null){
        this.w_start_date = sessionStorage.getItem('w_startdate');
      }
      if(sessionStorage.getItem('w_starttime')!=null){
        this.w_start_time = sessionStorage.getItem('w_starttime');
      }
      if(sessionStorage.getItem('w_endtime')!=null){
        this.wend_time = sessionStorage.getItem('w_endtime');
      }
      if(sessionStorage.getItem('w_enddate')!=null){
        this.wend_date = sessionStorage.getItem('w_enddate');
      }
    }

    if(sessionStorage.getItem('time')==null){
      if(sessionStorage.getItem('no_hours')!=null){
        this.no_of_hours = sessionStorage.getItem('no_hours');
      }
      if(sessionStorage.getItem('h_startdate')!=null){
        this.start_date = sessionStorage.getItem('h_startdate');
      }
      if(sessionStorage.getItem('h_starttime')){
        this.start_time = sessionStorage.getItem('h_starttime');
      }
    }
    //this.categoriedetails(this.index,sessionStorage.getItem('cat_id'),sessionStorage.getItem('cat_name'));
    // sessionStorage.setItem('time','hourly');
    this.Hourly = this.fb.group({
      no_hours : ['', Validators.required],
      h_startdate : ['', Validators.required],
      h_starttime : ['', Validators.required],
      });
      this.Daily = this.fb.group({
      no_days : ['', Validators.required],
      d_startdate : ['', Validators.required],
      d_starttime : ['', Validators.required],
      // d_enddate : ['', Validators.required],
      // d_endtime : ['', Validators.required],
      });
      this.Weekly = this.fb.group({
      no_weeks : ['', Validators.required],
      w_startdate : ['', Validators.required],
      w_starttime : ['', Validators.required],
      // w_enddate : ['', Validators.required],
      // w_endtime : ['', Validators.required]
    });
    this.crexinservice.getallcategories().subscribe((res)=>{
      console.log(res.categories);
      this.allcategories = res.categories
    });
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/subcategory/'+sessionStorage.getItem('sub_id'),{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
     console.log(res);
    this.singleproduct = res.response;
    //  sessionStorage.setItem('eqid',res.equipments[0].id);
    //  sessionStorage.setItem('hourly_rate',res.equipments[0].hourly_rate)
    //  console.log(sessionStorage.getItem('hourly_rate'));
    //  if(res.response.length === 0 || res.response.length === null){
    //   this.toastr.error(this.message,"No equipments available at this moment",{
    //     positionClass: 'toast-top-center'
    //   });
    //  }
    // else{
    //   this.singleproduct = res.response;
      // this.loading = false;
    // }
     this.loading = false;
   },(error)=>{
     console.log(error);
    this.toastr.error(this.message,error.error.error,{
      positionClass: 'toast-top-center'
    });
   })
  }
  get h(){
  return this.Hourly.controls
  }
  get d(){
    return this.Daily.controls
  }
  get w(){
    return this.Weekly.controls
  }
  enddata(startdate){
      console.log(startdate);
      this.s_date = startdate;
      var str  = this.Daily.get('no_days').value 
      console.log(str);
      // var firstchar = str.charAt(0);
      var no_days = +str;
      this.date = new Date(startdate);
      var start_date = this.datePipe.transform(this.date,'dd/MM/yyyy');
      console.log(start_date);
      this.e_date =  this.date.setDate(this.date.getDate() + no_days);
      this.end_date = this.datePipe.transform(this.e_date,'yyyy-MM-dd');
      console.log(this.end_date);
  }
  d_days(){
    var str  = this.Daily.get('no_days').value 
    console.log(str);
    // var firstchar = str.charAt(0);
    var no_days = +str;
    this.date = new Date(this.s_date);
    var start_date = this.datePipe.transform(this.date,'dd/MM/yyyy');
    console.log(start_date);
    this.e_date =  this.date.setDate(this.date.getDate() + no_days);
    this.end_date = this.datePipe.transform(this.e_date,'yyyy-MM-dd');
    console.log(this.end_date);
  }
  endtime(starttime){
    this.end_time = starttime;
    console.log(this.end_time);
  }
  w_end_date(startdate){
    console.log(startdate);
    this.w_s_date = startdate;
    var str  = this.Weekly.get('no_weeks').value 
    console.log(str);
    var no_weeks = str*7;
    console.log(no_weeks);
    this.date = new Date(startdate);
    var start_date = this.datePipe.transform(this.date,'dd/MM/yyyy');
    console.log(start_date);
    this.e_date =  this.date.setDate(this.date.getDate() + no_weeks);
    this.wend_date = this.datePipe.transform(this.e_date,'yyyy-MM-dd');
    console.log(this.wend_date);
  }
  w_end_time(starttime){
    this.wend_time = starttime;
    console.log(this.end_time);
  }
  w_days(){
    var str  = this.Weekly.get('no_weeks').value 
    console.log(str);
    var no_weeks = str*7;
    console.log(no_weeks);
    this.date = new Date(this.w_s_date);
    var start_date = this.datePipe.transform(this.date,'dd/MM/yyyy');
    console.log(start_date);
    this.e_date =  this.date.setDate(this.date.getDate() + no_weeks);
    this.wend_date = this.datePipe.transform(this.e_date,'yyyy-MM-dd');
    console.log(this.wend_date);
  }
  hourly_function(){
    sessionStorage.setItem('time','hourly');
    this.hourly_checked = true;
    this.daily_checked = false;
    this.weekly_checked = false;
    this.hourly = true;
    this.daily = false;
    this.weekly = false;
    this.Hourly_button = true;
    this.Daily_button = false;
    this.Weekly_button = false;
  }
  daily_function(){
    sessionStorage.setItem('time','daily');
    this.hourly_checked = false;
    this.daily_checked = true;
    this.weekly_checked = false;
    this.daily = true;
    this.hourly = false
    this.weekly = false;
    this.Hourly_button = false;
    this.Daily_button = true;
    this.Weekly_button = false;
  }
  weekly_function(){
    sessionStorage.setItem('time','weekly');
    this.hourly_checked = false;
    this.daily_checked = false;
    this.weekly_checked = true;
    this.weekly = true;
    this.daily = false;
    this.hourly = false;
    this.Hourly_button = false;
    this.Daily_button = false;
    this.Weekly_button = true;
  }
  categoriedetails(index:number,cat_id:any,categorie){
    sessionStorage.setItem('categoryclick','true')
    if(sessionStorage.getItem('categoryclick')=='true'){
      if(sessionStorage.getItem('time')==null){
        sessionStorage.removeItem('no_hours');
        sessionStorage.removeItem('h_startdate');
        sessionStorage.removeItem('h_starttime');
        this.no_of_hours = "";
        this.start_date = "";
        this.start_time = "";
        }
      else if(sessionStorage.getItem('time')=='hourly'){
        sessionStorage.removeItem('no_hours');
        sessionStorage.removeItem('h_startdate');
        sessionStorage.removeItem('h_starttime');
        sessionStorage.removeItem('time');
        this.no_of_hours = "";
        this.start_date = "";
        this.start_time = "";
      }
      else if(sessionStorage.getItem('time')=='daily'){
        sessionStorage.removeItem('no_days');
        sessionStorage.removeItem('d_starttime');
        sessionStorage.removeItem('d_startdate');
        sessionStorage.removeItem('d_endtime');
        sessionStorage.removeItem('d_enddate');
        sessionStorage.removeItem('time');
        this.no_of_days = "";
        this.d_start_date = "";
        this.d_start_time = "";
        this.end_date = "";
        this.end_time = "";
      }

      else if(sessionStorage.getItem('time')=='weekly'){
        sessionStorage.removeItem('no_weeks');
        sessionStorage.removeItem('w_starttime');
        sessionStorage.removeItem('w_startdate');
        sessionStorage.removeItem('w_endtime');
        sessionStorage.removeItem('w_enddate');
        sessionStorage.removeItem('time');
        this.no_of_weeks = "";
        this.w_start_time = "";
        this.w_start_date = "";
        this.wend_date = "";
        this.wend_time = "";
      }
    }
    this.selectedIndex = index;
    this.selectedItem = categorie.c_name;
    sessionStorage.setItem('cat_id',cat_id);
    sessionStorage.setItem('index',index.toString());
    sessionStorage.setItem('cat_name',categorie.c_name);
    this.cat_id = cat_id;
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://www.superuser.crexin.com/api/subcategories/'+this.cat_id,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
    console.log(res);
    //this.route.navigate(['/rent/subcategories']);
    // this.singleproduct = res.response;
     if(res.subcategories.length === 0 || res.subcategories.length === null){
      this.toastr.error(this.message,"No equipments available at this moment",{
        positionClass: 'toast-top-center'
      });
     }
    else{
      this.products = res.subcategories
      this.loading = false;
    }
     this.loading = false;
   },(error)=>{
     console.log(error);
    this.toastr.error(this.message,error.error.error,{
      positionClass: 'toast-top-center'
    });
   });
   this.single_product = false;
   this.categorie_products = true;
  }
  singlesucategorie(id:any){
    sessionStorage.setItem('sub_id', id);
    console.log(sessionStorage.getItem('sub_id'));
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/subcategory/'+sessionStorage.getItem('sub_id'),{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res);
      // sessionStorage.setItem('eqid',res.equipments[0].id);
      // console.log(sessionStorage.getItem('eqid'));
      if(res.response.length === 0 || res.response.length === null){
        this.toastr.error(this.message,"No equipments available at this moment",{
          positionClass: 'toast-top-center'
        });
       }
      else{
        this.singleproduct = res.response;
      }
      this.loading = false;
    });
    this.single_product = true;
    this.categorie_products = false;
  }
  // Equipmentlist(id:any){
  //   this.crexinservice.equipmentlist(id).subscribe((res)=>{
  //     console.log(res);
  //   })
  // }
  Hourlyoption(id:any){
    sessionStorage.setItem('rentclicked','true');
    console.log(id);
    sessionStorage.setItem('sub_id',id);
    this.submitted_hourly = true;
    if(this.Hourly.invalid){
      return false;
    }
    else if(sessionStorage.getItem('auth_token') === null){
      sessionStorage.setItem('route',this.route.url);
      sessionStorage.setItem('no_hours',this.Hourly.get('no_hours').value);
      sessionStorage.setItem('h_startdate',this.Hourly.get('h_startdate').value);
      sessionStorage.setItem('h_starttime',this.Hourly.get('h_starttime').value);
      this.toastr.error(this.message,'Please login to proceed',{
        positionClass:'toast-top-center'
      });
      this.router.navigate(['/login']);
    }
    else{
      console.log(sessionStorage.getItem('sub_id'));
      const data = {
        subcategory_id:sessionStorage.getItem('sub_id'),
        // userid:sessionStorage.getItem('user_id'),
        type:'hourly',
        duration:this.Hourly.get('no_hours').value,
        start_time:this.Hourly.get('h_starttime').value,
        start_date:this.Hourly.get('h_startdate').value,
      }
      sessionStorage.setItem('no_hours',this.Hourly.get('no_hours').value);
      sessionStorage.setItem('h_startdate',this.Hourly.get('h_startdate').value);
      sessionStorage.setItem('h_starttime',this.Hourly.get('h_starttime').value);
      console.log(data);
      console.log(this.auth_token);
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization',`Bearer ${this.auth_token}`);
      this.http.post<any>('https://superuser.crexin.com/api/user/rent',data,{'headers':headers}).subscribe((res)=>{
      //  console.log(res);
      // this.crexinservice.rent(data).subscribe((res)=>{
        console.log(res.response);
        sessionStorage.setItem('booking_id',res.response.id);
        console.log(res.response.subcategory.hourly_rate);
        sessionStorage.setItem('hourly_rate',res.response.subcategory.hourly_rate);
      //  sessionStorage.setItem('grandtotal', this.order.grandtotal);
      //  sessionStorage.setItem('gst', this.order.gst);
      //  sessionStorage.setItem('subtotal', this.order.subtotal);
      //  this.toastr.success(this.message,res.message,{
      //   positionClass:'toast-top-center'
      // });
      this.router.navigate(['rent/check-out']);
     },(error)=>{
       console.log(error);
       if(error.error.message=='Bookings are allowed between 6AM to 9PM'){
         this.error = error.error.message;
         this.show = true;
         setTimeout(() => {
           this.show = false;
         }, 5000);
       }
      // this.toastr.error(this.message,error.error.message,{
      //   positionClass: 'toast-top-center'
      // });
      this.router.navigate(['singleproduct']);
     });
    }
  }
  Dailyoption(id:any){
    sessionStorage.setItem('sub_id',id);
    sessionStorage.setItem('rentclicked','true');
    
    this.submitted_daily = true;
    if(this.Daily.invalid){
      console.log(this.Daily.get('d_endtime').value);
      console.log(this.Daily.get('d_enddate').value);
      return false;
    }
    else if(sessionStorage.getItem('auth_token') === null){
      sessionStorage.setItem('route',this.route.url);
      sessionStorage.setItem('no_days',this.Daily.get('no_days').value);
      sessionStorage.setItem('d_starttime',this.Daily.get('d_starttime').value);
      sessionStorage.setItem('d_startdate',this.Daily.get('d_startdate').value);
      sessionStorage.setItem('d_endtime',this.end_time);
      sessionStorage.setItem('d_enddate',this.end_date);

      this.toastr.error(this.message,'Please login to proceed',{
        positionClass:'toast-top-center'
      });
      this.router.navigate(['/login']);
    }
    else{
      const data = {
        subcategory_id:sessionStorage.getItem('sub_id'),
        // userid:sessionStorage.getItem('user_id'),
        type:'daily',
        duration :this.Daily.get('no_days').value,
        start_time:this.Daily.get('d_starttime').value,
        end_time:this.end_time,
        start_date:this.Daily.get('d_startdate').value,
        end_date:this.end_date,
      }
      sessionStorage.setItem('no_days',this.Daily.get('no_days').value);
      sessionStorage.setItem('d_starttime',this.Daily.get('d_starttime').value);
      sessionStorage.setItem('d_startdate',this.Daily.get('d_startdate').value);
      sessionStorage.setItem('d_endtime',this.end_time);
      sessionStorage.setItem('d_enddate',this.end_date);
      console.log(data);
      // this.crexinservice.rent(data).subscribe((res)=>{
        const headers= new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization',`Bearer ${this.auth_token}`);
        this.http.post<any>('https://www.superuser.crexin.com/api/user/rent',data,{'headers':headers}).subscribe((res)=>{
        console.log(res);
        sessionStorage.setItem('booking_id',res.response.id);
        sessionStorage.setItem('daily_rate',res.response.subcategory.daily_rate);
        // this.toastr.success(this.message,res.message,{
        //   positionClass:'toast-top-center'
        // });
        //this.router.navigate(['checkout']);
        this.router.navigate(['rent/check-out']);
      },(error)=>{
        console.log(error);
        if(error.error.message=='Bookings are allowed between 6AM to 9PM'){
          this.error = error.error.message;
          this.show = true;
          setTimeout(() => {
            this.show = false;
          }, 5000);
        }
        // this.toastr.error(this.message,error.error.message,{
        //   positionClass: 'toast-top-center'
        // });
        this.router.navigate(['singleproduct']);
      })
    //   const headers= new HttpHeaders()
    //   .set('content-type', 'application/json')
    //   .set('Access-Control-Allow-Origin', '*')
    //   .set('Authorization',`Bearer ${this.auth_token}`);
    //   this.http.post<any>('https://www.superuser.crexin.com/api/rent',data,{'headers':headers}).subscribe((res)=>{
    //    console.log(res);
    //    this.order = res.data;
    //    sessionStorage.setItem('grandtotal', this.order.grandtotal);
    //    sessionStorage.setItem('gst', this.order.gst);
    //    sessionStorage.setItem('subtotal', this.order.subtotal);
    //    this.toastr.success(this.message,res.success,{
    //     positionClass:'toast-top-center'
    //   });
    //   this.router.navigate(['checkout']);
    //  },(error)=>{
    //    console.log(error);
    //   this.toastr.error(this.message,error.error.message,{
    //     positionClass: 'toast-top-center'
    //   });
    //   this.router.navigate(['singleproduct']);
    //  })
    }
  }
  Weeklyoption(id:any){
    sessionStorage.setItem('sub_id',id);
    sessionStorage.setItem('rentclicked','true');

    this.submitted_weekly = true;
    if(this.Weekly.invalid){
      return false;
    }
    else if(sessionStorage.getItem('auth_token') === null){
      sessionStorage.setItem('route',this.route.url);
      sessionStorage.setItem('no_weeks',this.Weekly.get('no_weeks').value);
      sessionStorage.setItem('w_starttime',this.Weekly.get('w_starttime').value);
      sessionStorage.setItem('w_startdate',this.Weekly.get('w_startdate').value);
      sessionStorage.setItem('w_endtime',this.wend_time);
      sessionStorage.setItem('w_enddate',this.wend_date);

      this.toastr.error(this.message,'Please login to proceed',{
        positionClass:'toast-top-center'
      });
      this.router.navigate(['/login']);
    }
    else{
      console.log(this.Weekly.get('no_weeks').value);
      const data = {
        subcategory_id:sessionStorage.getItem('sub_id'),
        // userid:sessionStorage.getItem('user_id'),
        type:'weekly',
        duration:this.no_of_weeks,
        start_time:this.Weekly.get('w_starttime').value,
        end_time:this.wend_time,
        start_date:this.Weekly.get('w_startdate').value,
        end_date:this.wend_date,
      }
      sessionStorage.setItem('no_weeks',this.Weekly.get('no_weeks').value);
      sessionStorage.setItem('w_starttime',this.Weekly.get('w_starttime').value);
      sessionStorage.setItem('w_startdate',this.Weekly.get('w_startdate').value);
      sessionStorage.setItem('w_endtime',this.wend_time);
      sessionStorage.setItem('w_enddate',this.wend_date);
      console.log(data);
      //this.crexinservice.rent(data).subscribe((res)=>{
        const headers= new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization',`Bearer ${this.auth_token}`);
        this.http.post<any>('https://www.superuser.crexin.com/api/user/rent',data,{'headers':headers}).subscribe((res)=>{
        console.log(res);
        sessionStorage.setItem('booking_id',res.response.id);
        sessionStorage.setItem('weekly_rate',res.response.subcategory.weekly_rate);
        // this.toastr.success(this.message,res.message,{
        //   positionClass:'toast-top-center'
        // });
        //this.router.navigate(['checkout']);
        this.router.navigate(['rent/check-out']);
      },(error)=>{
        console.log(error);
        if(error.error.message=='Bookings are allowed between 6AM to 9PM'){
          this.error = error.error.message;
          this.show = true;
          setTimeout(() => {
            this.show = false;
          }, 5000);
        }
      //  this.toastr.error(this.message,error.error.message,{
      //    positionClass: 'toast-top-center'
      //  });
       this.router.navigate(['singleproduct']);
      })
    //   const headers= new HttpHeaders()
    //   .set('content-type', 'application/json')
    //   .set('Access-Control-Allow-Origin', '*')
    //   .set('Authorization',`Bearer ${this.auth_token}`);
    //   this.http.post<any>('https://www.superuser.crexin.com/api/rent',data,{'headers':headers}).subscribe((res)=>{
    //    console.log(res);
    //    this.order = res.data;
    //    sessionStorage.setItem('grandtotal', this.order.grandtotal);
    //    sessionStorage.setItem('gst', this.order.gst);
    //    sessionStorage.setItem('subtotal', this.order.subtotal);
    //    this.toastr.success(this.message,res.success,{
    //     positionClass:'toast-top-center'
    //   });
    //   this.router.navigate(['checkout']);
    //  },(error)=>{
    //    console.log(error);
    //   this.toastr.error(this.message,error.error.error,{
    //     positionClass: 'toast-top-center'
    //   });
    //   this.router.navigate(['singleproduct']);
    //  })
    }
  }
  getcurrentdate() {
    this.Date = new Date();
    var time = this.datePipe.transform(this.Date, 'HH:MM');
    if(time<"18:00"){
      this.Date.setDate(this.Date.getDate()+1);
      this.latest_date = this.datePipe.transform(this.Date, 'yyyy-MM-dd');
      this.book_date1 = this.latest_date;
    }
    else if(time>="18:00"){
      this.Date.setDate(this.Date.getDate()+2);
      this.latest_date = this.datePipe.transform(this.Date, 'yyyy-MM-dd');
      this.book_date1 = this.latest_date;
    }
  }
  search(search_categorie){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>(`https://www.superuser.crexin.com/api/searchequipments?subcategoryid=${sessionStorage.getItem('p_id')}&equipment=${search_categorie}`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res.equipments);
      // console.log(res.category);
      // console.log(res.products);
      this.singleproduct = res.equipments;
      // this.products = res.products;
    })
  }
  categories(){
    this.router.navigate(['/rent']);
  }
  s(){
    this.bookings_notavailable = true;
    setTimeout(function(){
      this.bookings_notavailable = false;
    },3000);
  }
}
