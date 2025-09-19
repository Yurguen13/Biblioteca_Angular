import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClassificationService } from '../../../services/classification/classification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classification-create',
  imports: [ CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './classification-create.component.html',
  styleUrl: './classification-create.component.css'
})
export class ClassificationCreateComponent {
  classificationForm!:FormGroup;

  constructor(
    private readonly classificationService: ClassificationService,
    private readonly formBuilder:FormBuilder,
    private readonly router: Router,
  ){}

  ngOnInit():void{
    this.classificationForm= this.formBuilder.group({
      name:['',[Validators.required, Validators.minLength(15)]],
      description:['',[Validators.required, Validators.minLength(25)]],
      code:['',[Validators.required, Validators.minLength(5)]]
    });
  }

  sendForm(){
    debugger;
    this.classificationForm.markAllAsTouched();
    console.log("prueba");

    if(this.classificationForm.invalid){
    //  return;
    }

    const classificationData=this.classificationForm.value;

    this.classificationService.postClassification(classificationData).subscribe({
      next:response =>{
        this.router.navigate(['/classifications']);
      },
      error:err=>{
        console.log("Error al crear la classificacion", err);
      }
    });
  }
}
