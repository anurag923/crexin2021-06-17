import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent,HttpHandler,HttpHeaders, HttpRequest,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalData } from '../globaldata/global.data';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';
import { data } from 'jquery';

// const register = "http://127.0.0.1:8000/api/register";
// const login = "http://127.0.0.1:8000/api/login";
// const auth_token = sessionStorage.getItem('auth_token');
// const headers= new HttpHeaders()
//   .set('Content-Type','multipart/form-data')
//   .set('Accept','application/json')
//   .set('Access-Control-Allow-Origin', '*');
var auth_token = sessionStorage.getItem('auth_token');
const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${auth_token}`);
@Injectable({
  providedIn: 'root'
})
export class CrexinService {

  constructor(private http:HttpClient) { 
  }

  post(data): Observable<any>{
    return this.http.post<any>(GlobalData.url_api+'posts',data);
  }
  getpost(): Observable<any>{
    return this.http.get<any>(GlobalData.url_api+'posts')
  }
  getallcategories(): Observable<any>{
    return this.http.get<any>(GlobalData.url_api+'categories')
    .pipe(shareReplay(1));
  }
  singlecategorie(cat_id): Observable<any>{
   return this.http.get<any>(GlobalData.url_api+'categories/?id='+cat_id, { 'headers': headers })
  }
  firstcategorie(){
   return this.http.get<any>(GlobalData.url_api+'first_cat');
  }
  profileupdate(data): Observable<any>{
   return this.http.post<any>(GlobalData.url_api+'profile_update',data)
  }
  address(data): Observable<any>{
    return this.http.post<any>(GlobalData.url_api+'address',data)
   }
  getaddress(user_id): Observable<any>{
    return this.http.get<any>(GlobalData.url_api+'list_address/?userid='+user_id, { 'headers': headers })
    .pipe(shareReplay(1));
  }
  // search(data): Observable<any>{
  //   return this.http.get<any>(GlobalData.url_api+'search/?keyword='+data, { 'headers': headers })
  // }
  rent(data){
    return this.http.post<any>(GlobalData.url_api+'user/rent',data, { 'headers': headers })
  }
  updaterent(data){
    return this.http.post<any>(GlobalData.url_api+'user/updaterent',data, { 'headers': headers })
  }
  userdata(){
    return this.http.get<any>(GlobalData.url_api+'user/details', { 'headers': headers })
  }
  equipmentlist(id){
    return this.http.get<any>(GlobalData.url_api+'equipments/'+id, { 'headers': headers })
  }
  bookings(data){
    return this.http.post<any>(GlobalData.url_api+'user/bookings',data ,{ 'headers': headers })
  }
  singlebooking(){
    return this.http.get<any>(GlobalData.url_api+`user/singleorder?booking_id=${sessionStorage.getItem('booking_id')}&id=${sessionStorage.getItem('b_id')}&type=${sessionStorage.getItem('type')}` ,{ 'headers': headers })
  }
  allbookings(){
    return this.http.get<any>(GlobalData.url_api+'user/myorders',{ 'headers': headers })
  }
  addfavs(data){
    return this.http.post<any>(GlobalData.url_api+'user/addfavs',data ,{ 'headers': headers })
  } 
}
