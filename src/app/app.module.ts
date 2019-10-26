import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HomeComponent } from './home/home.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { MarketPricePipe } from './pipes/market-price.pipe';
import { MyAccountComponent } from './my-account/my-account.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from './shared/components/product-quantity/product-quantity.component';
import { CartDetailsComponent } from './checkout/cart-details/cart-details.component';
import { ShippingFormComponent } from './checkout/shipping-form/shipping-form.component';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular5-social-login';
import { ProductsComponent } from './shared/components/products/products.component';
import { OrderDatePipe } from './pipes/order-date.pipe';
import { MenuComponent } from './menu/menu.component';
import { FooterRowComponent } from './footer/footer-row/footer-row.component';
import { AboutUsComponent } from './footer/about-us/about-us.component';
import { CancelComponent } from './footer/cancel/cancel.component';
import { DeliveryComponent } from './footer/delivery/delivery.component';
import { PrivacyPolicyComponent } from './footer/privacy-policy/privacy-policy.component';
import { MobFooterComponent } from './footer/mob-footer/mob-footer.component';
import { MenebarComponent } from './footer/menebar/menebar.component';
import {DemoMaterialModule} from '../material-module';
import { SupportComponent } from './shared/component/support/support.component';
// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('Your-Facebook-app-id')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('879113238185-nd03o19hs9vcmt1d2l99a1i06dj6a9p5.apps.googleusercontent.com')
      },
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginSignupComponent,
    DiscountPipe,
    MarketPricePipe,
    MyAccountComponent,
    UpdateProfileComponent,
    ProductDetailsComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    CartDetailsComponent,
    ShippingFormComponent,
    ProductsComponent,
    OrderDatePipe,
    MenuComponent,
    FooterRowComponent,
    AboutUsComponent,
    CancelComponent,
    DeliveryComponent,
    PrivacyPolicyComponent,
    MobFooterComponent,
    MenebarComponent,
    SupportComponent
  ],
  imports: [
    BrowserModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    DemoMaterialModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
