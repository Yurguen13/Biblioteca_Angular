import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SpecimensService } from '../../../services/specimens/specimens.service';
import { BooksService } from '../../../services/books.service';
import { Books } from '../../../interfaces/books.model';

@Component({
  selector: 'app-specimens-create',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './specimens-create.component.html',
  styleUrl: './specimens-create.component.css'
})
export class SpecimensCreateComponent {
  specimenForm!:FormGroup;
  books:Books[]=[];

  constructor(
    private readonly specimenService: SpecimensService,
    private readonly formBuilder: FormBuilder,
    private readonly router:Router,
    private readonly booksService: BooksService 
  ){}

  ngOnInit():void{
    this.specimenForm=this.formBuilder.group({
      price:['',[Validators.required, Validators.min(50)]],
      condition:['',[Validators.required, Validators.minLength(1)]],
      observation: ['', [Validators.required, Validators.minLength(1)]],
      booksId:['',[Validators.required]],
    });

this.booksService.getBooks().subscribe({
    next:(data)=>{
      this.books = data;
    },
    error:(err)=>{
      console.error('Errpr al obtener el libro', err);
    }
});

  }

  sendForm(){
    debugger;
    this.specimenForm.markAllAsTouched();

    if(this.specimenForm.invalid){
      //return;
    }

    const specimenData = this.specimenForm.value;

    this.specimenService.postSpecimen(specimenData).subscribe({
      next:response =>{
        this.router.navigate(['/specimens']);
      },
      error:err=>{
        console.log("Error al crear el especimen",err);
      }
    });
  }
}
