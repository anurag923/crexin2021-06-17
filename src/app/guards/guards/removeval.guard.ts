import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemovevalGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if(localStorage.getItem('time')!=null){
    //   localStorage.removeItem('time');
    // }
    if(localStorage.getItem('searchval')!=null){
      localStorage.removeItem('searchval');
    }
    if(localStorage.getItem('auth_token')!=null&&localStorage.getItem('rentclicked')==null){
      if(localStorage.getItem('time')==null){
        localStorage.removeItem('no_hours');
        localStorage.removeItem('h_startdate');
        localStorage.removeItem('h_starttime');
        }
      else if(localStorage.getItem('time')=='hourly'){
        localStorage.removeItem('no_hours');
        localStorage.removeItem('h_startdate');
        localStorage.removeItem('h_starttime');
        localStorage.removeItem('time');
      }
      else if(localStorage.getItem('time')=='daily'){
        localStorage.removeItem('no_days');
        localStorage.removeItem('d_starttime');
        localStorage.removeItem('d_startdate');
        localStorage.removeItem('d_endtime');
        localStorage.removeItem('d_enddate');
        localStorage.removeItem('time');
      }

      else if(localStorage.getItem('time')=='weekly'){
        localStorage.removeItem('no_weeks');
        localStorage.removeItem('w_starttime');
        localStorage.removeItem('w_startdate');
        localStorage.removeItem('w_endtime');
        localStorage.removeItem('w_enddate');
        localStorage.removeItem('time');
      }
    }
    return true;
  }
  
}
