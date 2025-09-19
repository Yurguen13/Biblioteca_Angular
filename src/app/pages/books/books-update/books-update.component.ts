import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Books } from '../../../interfaces/books.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BooksService } from '../../../services/books.service';
import { CommonModule } from '@angular/common';
import { ClassificationService } from '../../../services/classification/classification.service';
import { Classification } from '../../../interfaces/classification.module';

@Component({
  selector: 'app-books-update',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './books-update.component.html',
  styleUrl: './books-update.component.css'
})
export class BooksUpdateComponent {

     private bookId!: number;  // ID del producto a actualizar
 booksForm!: FormGroup;  // Formulario reactivo
  bookData!: Books; 
  classification: Classification[]=[];
  imageUrl!:string;
  image!:string;
     selectedFile!: File;

  constructor(
    private route: ActivatedRoute,  // Para acceder a los parámetros de la URL
    private fb: FormBuilder,  // Para crear el formulario reactivo
    private booksService: BooksService,  // Servicio para interactuar con la API
    private classiService: ClassificationService,
    private router: Router,  // Para redirigir al usuario después de la actualización

  ) { }

  ngOnInit(): void {
    // Obtener el ID del producto de la URL
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    // Inicializar el formulario
    this.booksForm = this.fb.group({
      name: ['', [Validators.required]],
      language: ['', [Validators.required]],
      year: ['', [Validators.required]],
      publisherId: ['', [Validators.required]],
      classificationId: ['', [Validators.required]],
    
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

        this.loadBooksData();


     // Cargar al formulario los datos del producto desde la API
 
     console.log(this.booksForm);

}

 loadBooksData() {
    this.booksService.getById(this.bookId).subscribe(data => {
        this.bookData = data;
        this.booksForm.setValue({
          name: data.name,
          language: data.language,
          year: data.year,
          publisherId: data.publisherId,

          classificationId: data.classificationId,
          
          
     

          



    
        });
         this.imageUrl="http://localhost:2000"+ data.path;
    });
  }


    onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.booksForm.patchValue({path: this.selectedFile}); // Actualiza el valor del control logo
    this.booksForm.get('file')?.updateValueAndValidity(); // Revalida el control logo
  }
  updateBoook() {
    if (this.booksForm.invalid) {
      return;  // No enviar si el formulario es inválido
    }

    
     const formData = new FormData();
    formData.append('name', this.booksForm.get('name')!.value);
    formData.append('language', this.booksForm.get('language')!.value);
    formData.append('year', this.booksForm.get('year')!.value);
    formData.append('publisherId', this.booksForm.get('publisherId')!.value);
    formData.append('classificationId', this.booksForm.get('classificationId')!.value);
    formData.append('publisherId', this.booksForm.get('publisherId')!.value);
    if(this.selectedFile!=null){
 formData.append('file', this.selectedFile, this.selectedFile.name); 
    }
   

    this.booksService.updateBook(this.bookId, formData).subscribe({
      next: () => {
        console.log('libro Actualizado');
        this.router.navigate(['/books']);  // Redirigir a la lista de productos
      },
      error: err => {
        console.error('Error al actualizar el libro:', err);
      }
    });
  }

}
