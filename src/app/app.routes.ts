import { Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';

import { CategoryCreateComponent } from './pages/category/category-create/category-create.component';
import { CategoryUpdateComponent } from './pages/category/category-update/category-update.component';

export const routes: Routes = [

  {
    path: 'category',
    component: CategoryComponent
  },

  {
    path: 'category/create',
    component: CategoryCreateComponent
  },

  {
    path: 'category/update/:id',
    component: CategoryUpdateComponent
  },





];
