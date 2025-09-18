import { Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [

{
    path: '',
    component: LayoutComponent,   // ← envoltorio
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // otras páginas...
      {
        path: 'category',
        title: 'Categorías',
        loadComponent: () =>
          import('./pages/category/category.component')
            .then(m => m.CategoryComponent)
      },
    ],
  },


    
];
