import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authors } from '../../../interfaces/author.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthorService } from '../../../services/author.service';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-author-update',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './author-update.component.html',
  styleUrl: './author-update.component.css'
})
export class AuthorUpdateComponent {
  
     private authorId!: number;  // ID del producto a actualizar
  authorForm!: FormGroup;  // Formulario reactivo
  authorData!: Authors; 

  constructor(
    private route: ActivatedRoute,  // Para acceder a los parámetros de la URL
    private fb: FormBuilder,  // Para crear el formulario reactivo
    private authorService: AuthorService,  // Servicio para interactuar con la API
    private router: Router,  // Para redirigir al usuario después de la actualización

  ) { }

  ngOnInit(): void {
    // Obtener el ID del producto de la URL
    this.authorId = Number(this.route.snapshot.paramMap.get('id'));

    // Inicializar el formulario
    this.authorForm = this.fb.group({
      name: ['', [Validators.required]],
      
        lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
        birthdate: ['', [Validators.required]],
          phone: ['', [Validators.required]],
          
    });

        this.loadProductData();


     // Cargar al formulario los datos del producto desde la API
 

}

 loadProductData() {
    this.authorService.getById(this.authorId).subscribe(data => {
        this.authorData = data;
        console.log(this.authorData);

         const birth = data.birthdate
  ? formatDate(data.birthdate, 'yyyy-MM-dd', 'en-CA')
  : null;

        this.authorForm.setValue({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          birthdate: birth,
          phone: data.phone,
       
        });
    });
  }

  updateAuthor() {
    if (this.authorForm.invalid) {
      return;  // No enviar si el formulario es inválido
    }

    const updatedauthor: Authors = {
      id: this.authorId,
      ...this.authorForm.value  // Obtener los datos actualizados del formulario
    };

    this.authorService.updateAuthor(this.authorId, updatedauthor).subscribe({
      next: () => {
        console.log('Author actualizado');
        this.router.navigate(['/author']);  // Redirigir a la lista de productos
      },
      error: err => {
        console.error('Error al actualizar author:', err);
      }
    });
  }

}
