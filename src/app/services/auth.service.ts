import { HttpClient,HttpHeaders,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalData } from '../globaldata/global.data';
import { Injectable } from '@angular/core';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';
const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  singup(data): Observable<any>{
    return this.http.post<any>(GlobalData.url_api+'user/register',data,{'headers':headers});
  }
  login(data): Observable<any>{
     return this.http.post<any>(GlobalData.url_api+'user/getotp',data,{'headers':headers})
    .pipe(shareReplay(1));
  } 
  verifyotp(data): Observable<any>{
    return this.http.post<any>(GlobalData.url_api+'user/verifyotp',data,{'headers':headers})
  }
 login_password(data): Observable<any>{
    return this.http.post<any>(GlobalData.url_api+'user/login',data,{'headers':headers})
  }
  vendors(data):Observable<any>{
    return this.http.post<any>(GlobalData.url_api+'Vendor_Request',data,{'headers':headers});
  }
  userenquiry(data){
    return this.http.post<any>(GlobalData.url_api+'user/postenquiry',data,{'headers':headers});
  }
}

