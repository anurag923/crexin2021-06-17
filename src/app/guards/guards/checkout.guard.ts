import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import { CheckoutComponent } from '../components/checkout/checkout.component';
export interface IDeactivateComponent {
  canExit: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanDeactivate<IDeactivateComponent> {
  component: Object;
    route: ActivatedRouteSnapshot;
 
   constructor(){
   }
 
   canDeactivate(component:IDeactivateComponent,
                route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot,
                nextState: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        localStorage.removeItem('rentclicked');
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
        return component.canExit ? component.canExit() : true;
  }
}
