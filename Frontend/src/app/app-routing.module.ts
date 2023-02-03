import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddProductComponent } from './pages/admin/components/add-product/add-product.component';
import { EditProductComponent } from './pages/admin/components/edit-product/edit-product.component';
import { ProductsComponent } from './pages/admin/components/products/products.component';
import { UsersListComponent } from './pages/admin/components/users-list/users-list.component';
import { LoginComponent } from './pages/authentification/login/login.component';
import { RegisterComponent } from './pages/authentification/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: 'landing-page',
    component: LandingPageComponent,
  },
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'admin/products-list',
    component: ProductsComponent,
  },
  {
    path: 'admin/add-product',
    component: AddProductComponent,
  },
  {
    path: 'admin/edit-product/:id',
    component: EditProductComponent,
  }, {
    path: 'admin/users-list',
    component: UsersListComponent,
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
