import { Component } from '@angular/core';
import { Books } from '../../../interfaces/books.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from '../../../services/books.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Classification } from '../../../interfaces/classification.module';
import { Publishers } from '../../../interfaces/publishers.model';
import { ClassificationService } from '../../../services/classification/classification.service';

@Component({
  selector: 'app-books-create',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './books-create.component.html',
  styleUrl: './books-create.component.css'
})
export class BooksCreateComponent {

   booksForm!: FormGroup; // Declaración del formulario reactivo como FormGroup
  books: Books[] = [];

    publisher: Publishers[] = [];
  classification: Classification[] = [];

    selectedFile!: File;
  

  constructor(
    private readonly bookService: BooksService, 
    private readonly classiService: ClassificationService, 

    private readonly formBuilder: FormBuilder, 
    private readonly router: Router,

  ) 
  { }

   // El método ngOnInit es un ciclo de vida que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Inicializar el formulario con un grupo de controles
    this.booksForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      language: ['', [Validators.required]],
      year: ['', [Validators.required]],
      publisherId: ['', [Validators.required]],
      classificationId: ['', [Validators.required]],
     // path:['', [Validators.required]],
      
    });   
    
       this.classiService.getClassifications().subscribe({

      next: (data) => {
        this.classification = data;
        console.log(this.classification);
      },
      error: (err) => {
        console.error('Error al obtener las clasificaciones:', err);
      }
    });


  }
  // Obtiene las categorías
  

   onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.booksForm.patchValue({path: this.selectedFile}); // Actualiza el valor del control logo
    this.booksForm.get('file')?.updateValueAndValidity(); // Revalida el control logo
  }

 
  enviarFormulario(){
    console.log("entro");
    debugger;
    // Marcar todos los campos como tocados para mostrar los mensajes de error
    this.booksForm.markAllAsTouched();
    console.log(this.booksForm);

    if(this.booksForm.invalid){
      return; // No enviar el formulario si es inválido
    }
     console.log("mandalos");

    // Obtener los datos del formulario para enviarlos



    const formData = new FormData();
    formData.append('name', this.booksForm.get('name')!.value);
    formData.append('language', this.booksForm.get('language')!.value);
    formData.append('year', this.booksForm.get('year')!.value);
    formData.append('publisherId', this.booksForm.get('publisherId')!.value);
    formData.append('classificationId', this.booksForm.get('classificationId')!.value);
    formData.append('publisherId', this.booksForm.get('publisherId')!.value);
    formData.append('file', this.selectedFile, this.selectedFile.name); // 'file' debe coincidir con el nombre esperado por tu API

    // Llamar al servicio para enviar los datos del producto
    this.bookService.PostBooks(formData).subscribe({
      next: response => {
        this.router.navigate(['/books']); //Redirigir a la lista de productos
      },
      error: err => {
        console.log("Error al crear el Libro", err);
      }
    });

  }

}
