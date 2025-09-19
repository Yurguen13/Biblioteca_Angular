import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterModule  } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { Authors } from '../../../interfaces/author.model';
import { AuthorService } from '../../../services/author.service';

@Component({
  selector: 'app-author-create',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './author-create.component.html',
  styleUrl: './author-create.component.css'
})
export class AuthorCreateComponent {
   authorForm!: FormGroup; // Declaración del formulario reactivo como FormGroup
  auhors: Authors[] = [];
  

  constructor(
    private readonly authorService: AuthorService, 
    private readonly formBuilder: FormBuilder, 
    private readonly router: Router,

  ) 
  { }

   // El método ngOnInit es un ciclo de vida que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Inicializar el formulario con un grupo de controles
    this.authorForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      
    });    

  }

  enviarFormulario(){
    console.log("entro");
    debugger;
    // Marcar todos los campos como tocados para mostrar los mensajes de error
    this.authorForm.markAllAsTouched();

    if(this.authorForm.invalid){
      return; // No enviar el formulario si es inválido
    }
     console.log("mandalos");

    // Obtener los datos del formulario para enviarlos
    const authorData = this.authorForm.value;
 console.log("datos");
    console.log(authorData);
    // Llamar al servicio para enviar los datos del producto
    this.authorService.PostAuthor(authorData).subscribe({
      next: response => {
        this.router.navigate(['/author']); //Redirigir a la lista de productos
      },
      error: err => {
        console.log("Error al crear el author", err);
      }
    });

  }

}
