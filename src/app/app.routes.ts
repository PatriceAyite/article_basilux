import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }  // Rediriger vers la liste des produits par défaut
];
