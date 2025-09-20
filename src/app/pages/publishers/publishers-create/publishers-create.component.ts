import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PublishersService } from '../../../services/publishers/publishers.service';

@Component({
  selector: 'app-publishers-create',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './publishers-create.component.html',
  styleUrl: './publishers-create.component.css'
})
export class PublishersCreateComponent {
publisherForm!:FormGroup;

  constructor(
    private readonly publisherService:PublishersService,
    private readonly formBuilder:FormBuilder,
    private readonly router: Router,
  ){}

  ngOnInit():void{
    this.publisherForm=this.formBuilder.group({
      name:['',[Validators.required, Validators.minLength(15)]],
      city:['',[Validators.required, Validators.minLength(25)]],
      country:['',[Validators.required, Validators.minLength(5)]],
      phone:['',[Validators.required, Validators.minLength(5)]]
    });
  }
 sendForm(){
    debugger;
    this.publisherForm.markAllAsTouched();
    console.log("prueba");

    if(this.publisherForm.invalid){
    //  return;
    }

    const publisherData=this.publisherForm.value;

    this.publisherService.postPublishers(publisherData).subscribe({
      next:response =>{
        this.router.navigate(['/publishers']);
      },
      error:err=>{
        console.log("Error al crear la editorial", err);
      }
    });
  }
}

