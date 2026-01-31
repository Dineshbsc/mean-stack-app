import { Products } from './products/products';
import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
  {path:'login',loadComponent:()=>import("./auth/auth").then(m => m.Auth)},
  {path:'product',loadComponent:()=>import("./products/products").then(m => m.Products), canActivate:[AuthGuard]}

];
