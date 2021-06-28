import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent,HttpHandler,HttpHeaders, HttpRequest,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalData } from '../globaldata/global.data';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';
import { data } from 'jquery';

var auth_token = localStorage.getItem('auth_token');
const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${auth_token}`);

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  bookings(data){
    return this.http.post<any>(GlobalData.url_api+'user/bookings',data ,{ 'headers': headers })
  }

  addfavs(data){
    return this.http.post<any>(GlobalData.url_api+'user/addfavs',data ,{ 'headers': headers })
  }

  allbookings(){
    return this.http.get<any>(GlobalData.url_api+'user/myorders',{ 'headers': headers })
  }
}

