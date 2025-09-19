import { Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';

import { CategoryCreateComponent } from './pages/category/category-create/category-create.component';
import { CategoryUpdateComponent } from './pages/category/category-update/category-update.component';
import { CategoryDeleteComponent } from './pages/category/category-delete/category-delete.component';
import { ClassificationListComponent } from './pages/classification/classification-list/classification-list.component';
import { ClassificationCreateComponent } from './pages/classification/classification-create/classification-create.component';
import { ClassificationUpdateComponent } from './pages/classification/classification-update/classification-update.component';
import { ClassificationDeleteComponent } from './pages/classification/classification-delete/classification-delete.component';
import { SpecimensListComponent } from './pages/specimens/specimens-list/specimens-list.component';

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

   {
    path: 'category/delete/:id',
    component: CategoryDeleteComponent
  },
  {
  path:'classifications',
  component:ClassificationListComponent
  },
    {
  path:'classifications/create',
  component:ClassificationCreateComponent
  },
    {
  path:'classifications/update/:id',
  component:ClassificationUpdateComponent
  },
    {
  path:'classifications/delete/:id',
  component:ClassificationDeleteComponent
  },
    {
  path:'specimens',
  component:SpecimensListComponent
  }




];
