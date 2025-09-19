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
         this.imageUrl="http://localhost:2000/"+ data.path;
    });
  }

  updateBoook() {
    if (this.booksForm.invalid) {
      return;  // No enviar si el formulario es inválido
    }

    const updatedProduct: Books = {
      id: this.bookId,
      ...this.booksForm.value  // Obtener los datos actualizados del formulario
    };

    this.booksService.updateBook(this.bookId, updatedProduct).subscribe({
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
