import { Routes } from '@angular/router';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { HomeComponent } from '../home/home.component';
import { BlogComponent } from '../blog/blog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'blog/:id', component: BlogComponent },
  { path: '**', redirectTo: '' }
];
