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
        sessionStorage.removeItem('rentclicked');
        if(sessionStorage.getItem('time')==null){
          sessionStorage.removeItem('no_hours');
          sessionStorage.removeItem('h_startdate');
          sessionStorage.removeItem('h_starttime');
          }
        else if(sessionStorage.getItem('time')=='hourly'){
          sessionStorage.removeItem('no_hours');
          sessionStorage.removeItem('h_startdate');
          sessionStorage.removeItem('h_starttime');
          sessionStorage.removeItem('time');
        }
        else if(sessionStorage.getItem('time')=='daily'){
          sessionStorage.removeItem('no_days');
          sessionStorage.removeItem('d_starttime');
          sessionStorage.removeItem('d_startdate');
          sessionStorage.removeItem('d_endtime');
          sessionStorage.removeItem('d_enddate');
          sessionStorage.removeItem('time');
        }
  
        else if(sessionStorage.getItem('time')=='weekly'){
          sessionStorage.removeItem('no_weeks');
          sessionStorage.removeItem('w_starttime');
          sessionStorage.removeItem('w_startdate');
          sessionStorage.removeItem('w_endtime');
          sessionStorage.removeItem('w_enddate');
          sessionStorage.removeItem('time');
        }
        return component.canExit ? component.canExit() : true;
  }
}
