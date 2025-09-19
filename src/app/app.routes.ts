import { Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';

import { CategoryCreateComponent } from './pages/category/category-create/category-create.component';
import { CategoryUpdateComponent } from './pages/category/category-update/category-update.component';
import { CategoryDeleteComponent } from './pages/category/category-delete/category-delete.component';
import { AuthorComponent } from './pages/author/author.component';
import { AuthorUpdateComponent } from './pages/author/author-update/author-update.component';
import { AuthorCreateComponent } from './pages/author/author-create/author-create.component';
import { AuthorDeleteComponent } from './pages/author/author-delete/author-delete.component';
import { BooksComponent } from './pages/books/books.component';
import { BooksDeleteComponent } from './pages/books/books-delete/books-delete.component';
import { BooksUpdateComponent } from './pages/books/books-update/books-update.component';
import { BooksCreateComponent } from './pages/books/books-create/books-create.component';

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
    path: 'author',
    component: AuthorComponent
  },

  {
    path: 'author/create',
    component: AuthorCreateComponent
  },

  {
    path: 'author/update/:id',
    component: AuthorUpdateComponent
  },

   {
    path: 'author/delete/:id',
    component: AuthorDeleteComponent
  },
  

  {
    path: 'books',
    component: BooksComponent
  },

  {
    path: 'books/create',
    component: BooksCreateComponent
  },

  {
    path: 'books/update/:id',
    component: BooksUpdateComponent
  },

   {
    path: 'books/delete/:id',
    component: BooksDeleteComponent
  },
  





];
