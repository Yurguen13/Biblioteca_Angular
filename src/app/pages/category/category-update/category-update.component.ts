import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category } from '../../../interfaces/category.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-update',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css'
})
export class CategoryUpdateComponent {

     private categoryId!: number;  // ID del producto a actualizar
  categoryForm!: FormGroup;  // Formulario reactivo
  categoryData!: Category; 

  constructor(
    private route: ActivatedRoute,  // Para acceder a los parámetros de la URL
    private fb: FormBuilder,  // Para crear el formulario reactivo
    private categoryService: CategoryService,  // Servicio para interactuar con la API
    private router: Router,  // Para redirigir al usuario después de la actualización

  ) { }

  ngOnInit(): void {
    // Obtener el ID del producto de la URL
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    // Inicializar el formulario
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    
    });

        this.loadProductData();


     // Cargar al formulario los datos del producto desde la API
 

}

 loadProductData() {
    this.categoryService.getById(this.categoryId).subscribe(data => {
        this.categoryData = data;
        this.categoryForm.setValue({
          name: data.name,
          description: data.description,
       
        });
    });
  }

  updateCategory() {
    if (this.categoryForm.invalid) {
      return;  // No enviar si el formulario es inválido
    }

    const updatedProduct: Category = {
      id: this.categoryId,
      ...this.categoryForm.value  // Obtener los datos actualizados del formulario
    };

    this.categoryService.updateCategory(this.categoryId, updatedProduct).subscribe({
      next: () => {
        console.log('Categoria Actualizada');
        this.router.navigate(['/category']);  // Redirigir a la lista de productos
      },
      error: err => {
        console.error('Error al actualizar el producto:', err);
      }
    });
  }

}
