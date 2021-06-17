import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsandconditionsComponent } from './components/termsandconditions/termsandconditions.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'orders', loadChildren: () => import('./components/orders/orders.module').then(m => m.OrdersModule) },
  { path: 'careers', loadChildren: () => import('./components/careers/careers.module').then(m => m.CareersModule) }, 
  { path: 'blog', loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule) },
  { path: 'contact', loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule) },   { path: 'registerequipment', loadChildren: () => import('./components/registerequipment/registerequipment.module').then(m => m.RegisterequipmentModule) },
  { path: 'vendorsignup', loadChildren: () => import('./auth/vendorsignup/vendorsignup.module').then(m => m.VendorsignupModule) }, 
  { path: 'usersignup', loadChildren: () => import('./auth/usersignup/usersignup.module').then(m => m.UsersignupModule) }, 
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) }, 
  { path: 'otp', loadChildren: () => import('./auth/otp/otp.module').then(m => m.OtpModule) },
  { path: 'vendor', loadChildren: () => import('./vendor/vendor/vendor.module').then(m => m.VendorModule) },
  { path: 'otpsuccess', loadChildren: () => import('./auth/otpsuccess/otpsuccess.module').then(m => m.OtpsuccessModule) },
  // { path: 'rent', loadChildren: () => import('./components/rent/rent.module').then(m => m.RentModule) },
  { path: 'rent', loadChildren: () => import('./components/categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'rent/subcategories', loadChildren: () => import('./components/subcategories/subcategories.module').then(m => m.SubcategoriesModule) },
  { path: 'myorders', loadChildren: () => import('./components/myorders/myorders.module').then(m => m.MyordersModule) },
  { path: 'orderconfirmation', loadChildren: () => import('./components/orderconfirmation/orderconfirmation.module').then(m => m.OrderconfirmationModule) },
  { path: 'profile', loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'rent/check-out', loadChildren: () => import('./components/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'rent/bookingtypeselection', loadChildren: () => import('./components/singleproduct/singleproduct.module').then(m => m.SingleproductModule) },
  {path: 'Termsandconditions', component:TermsandconditionsComponent},
  { path: 'account_password', loadChildren: () => import('./auth/account-password/account-password.module').then(m => m.AccountPasswordModule) },
  { path: 'notifications', loadChildren: () => import('./components/notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: 'helpcenter', loadChildren: () => import('./components/helpcenter/helpcenter.module').then(m => m.HelpcenterModule) },
  { path: 'payments', loadChildren: () => import('./components/payments/payments.module').then(m => m.PaymentsModule) },
  { path: 'favourites', loadChildren: () => import('./components/favourites/favourites.module').then(m => m.FavouritesModule) },
  { path: 'accountsucces', loadChildren: () => import('./auth/accountsuccess/accountsuccess.module').then(m => m.AccountsuccessModule) },
  { path: 'bookings', loadChildren: () => import('./components/bookings/bookings.module').then(m => m.BookingsModule) },
  { path: 'weeklybookingstatus', loadChildren: () => import('./components/weeklybookingstatus/weeklybookingstatus.module').then(m => m.WeeklybookingstatusModule) },
  { path: 'dailybookingstatus', loadChildren: () => import('./components/dailybookingstatus/dailybookingstatus.module').then(m => m.DailybookingstatusModule) },
  { path: 'hourlybookingstatus', loadChildren: () => import('./components/hourlybookingstatus/hourlybookingstatus.module').then(m => m.HourlybookingstatusModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
