import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../../interfaces/category.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-delete',
  imports: [],
  templateUrl: './category-delete.component.html',
  styleUrl: './category-delete.component.css'
})
export class CategoryDeleteComponent {

   categoryId!: number;  // ID del producto a eliminar
 categoryData!: Category;  // Datos del producto que se eliminará

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
      this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
      this.loadCategoryData();
  }

  loadCategoryData(){
    this.categoryService.getById(this.categoryId).subscribe( data => {
      const product = data;
      if(product){
        this.categoryData = product;
      }
    })
  }

  deleteCategory(){
    this.categoryService.deleteProduct(this.categoryId).subscribe({
      next: () => {
        this.snackBar.open('Categoria eliminada con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
            verticalPosition: 'top',
          panelClass: ['snack-bar-success']
        });
        this.router.navigate(['/category']);
      }
    });
  }


}
