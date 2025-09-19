import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';



@Component({
  selector: 'app-category-create',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {
   categoryForm!: FormGroup; 

   constructor(private readonly categoryService:CategoryService,
    private readonly formBuilder:FormBuilder,
      private readonly router: Router,

   ) {}

     ngOnInit(): void {
    // Inicializar el formulario con un grupo de controles
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.min(0.1)]],
   
    });



}

enviarFormulario(){
    // Marcar todos los campos como tocados para mostrar los mensajes de error
    this.categoryForm.markAllAsTouched();

    if(this.categoryForm.invalid){
      return; // No enviar el formulario si es inválido
    }

    // Obtener los datos del formulario para enviarlos
    const categoryData = this.categoryForm.value;

    // Llamar al servicio para enviar los datos del producto
    this.categoryService.PostCategory(categoryData).subscribe({
      next: response => {
        this.router.navigate(['/category']); //Redirigir a la lista de productos
      },
      error: err => {
        console.log("Error al crear la categoria", err);
      }
    });

  }

}
