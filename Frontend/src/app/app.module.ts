import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsHeaderComponent } from './pages/home/components/products-header/products-header.component';
import { CategoriesComponent } from './pages/home/components/categories/categories.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductBoxComponent } from './pages/home/components/product-box/product-box.component';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartService } from './services/cart.service';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FeaturesComponent } from './pages/landing-page/components/features/features.component';
import { BannerComponent } from './pages/landing-page/components/banner/banner.component';
import { LoginComponent } from './pages/authentification/login/login.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/authconfig.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/authentification/register/register.component';

import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './pages/admin/admin.component';
import { SidebarComponent } from './pages/admin/components/sidebar/sidebar.component';
import { ProductsComponent } from './pages/admin/components/products/products.component';
import { AddProductComponent } from './pages/admin/components/add-product/add-product.component';
import { EditProductComponent } from './pages/admin/components/edit-product/edit-product.component';
import { UsersListComponent } from './pages/admin/components/users-list/users-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductBoxDetailsComponent } from './pages/product-details/components/product-box-details/product-box-details.component';
import { DetailsProductComponent } from './pages/admin/components/details-product/details-product.component';
import { OrderComponent } from './pages/order/order.component';
import { OrdersComponent } from './pages/admin/components/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileInformationComponent } from './pages/profile/profile-information/profile-information.component';
import { OrderHistoryComponent } from './pages/profile/order-history/order-history.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsHeaderComponent,
    CategoriesComponent,
    NavbarComponent,
    ProductBoxComponent,
    CopyrightComponent,
    FooterComponent,
    CartComponent,
    LandingPageComponent,
    FeaturesComponent,
    BannerComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    SidebarComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    UsersListComponent,
    ProductDetailsComponent,
    ProductBoxDetailsComponent,
    DetailsProductComponent,
    OrderComponent,
    OrdersComponent,
    ProfileComponent,
    ProfileInformationComponent,
    OrderHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
