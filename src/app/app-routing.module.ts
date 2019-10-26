import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartDetailsComponent } from './checkout/cart-details/cart-details.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { MenuComponent } from './menu/menu.component';
import { AboutUsComponent } from './footer/about-us/about-us.component';
import { CancelComponent } from './footer/cancel/cancel.component';
import { DeliveryComponent } from './footer/delivery/delivery.component';
import { PrivacyPolicyComponent } from './footer/privacy-policy/privacy-policy.component';
import { MenebarComponent } from './footer/menebar/menebar.component';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'menu', component: HomeComponent},
  {path: 'login', component: LoginSignupComponent},
  {path: 'myAccount', component: MyAccountComponent},
  {path: 'updateProfile', component: UpdateProfileComponent},
  {path: 'product-details', component: ProductDetailsComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'AboutUs', component: AboutUsComponent},
  {path: 'Cancel&Return', component: CancelComponent},
  {path: 'Delivery', component: DeliveryComponent},
  {path: 'Privacy-Policy', component: PrivacyPolicyComponent},
  {path: 'shopByCategory', component: MenebarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
