import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SpecimensService } from '../../../services/specimens/specimens.service';

@Component({
  selector: 'app-specimens-create',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './specimens-create.component.html',
  styleUrl: './specimens-create.component.css'
})
export class SpecimensCreateComponent {
  specimenForm!:FormGroup;

  constructor(
    private readonly specimenService: SpecimensService,
    private readonly formBuilder: FormBuilder,
    private readonly router:Router,
    private readonly booksService: BooksService
  ){}

  ngOnInit():void{
    this.specimenForm=this.formBuilder.group({
      price:['',[Validators.required, Validators.min(50)]],
      booksId:['',[Validators.required]],
      condition:['',[Validators.required, Validators.minLength(30)]],
      observation: ['', [Validators.minLength(1)]]
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
