import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Publishers } from '../../../interfaces/publishers.model';
import { PublishersService } from '../../../services/publishers/publishers.service';

@Component({
  selector: 'app-publishers-update',
  imports: [ CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './publishers-update.component.html',
  styleUrl: './publishers-update.component.css'
})
export class PublishersUpdateComponent {
  private publishersId!: number;
  publishersForm!: FormGroup;
  publishersData!: Publishers;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private publishersService: PublishersService,
    private router:Router
  ){}

  
  ngOnInit():void{
    this.publishersId = Number(this.route.snapshot.paramMap.get('id'));

    this.publishersForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(15)]],
      city:['',[Validators.required, Validators.minLength(25)]],
      country:['',[Validators.required, Validators.minLength(5)]],
      phone:['',[Validators.required, Validators.minLength(5)]]
    });

    this.loadClassificationData();
  }

    loadClassificationData(){
    this.publishersService.getById(this.publishersId).subscribe(data=>{
        this.publishersData = data;
        this.publishersForm.patchValue({
          name:data.name,
         city:data.city,
         country:data.country,
         phone:data.phone,
        });
    });
  }

  updateClassification(){
    
    if(this.publishersForm.invalid){
     //return;
    }
    const updatePublisher: Publishers={
      id:this.publishersId,
      ...this.publishersForm.value
    };
  
 this.publishersService.updatePublishers(this.publishersId, updatePublisher).subscribe({
        next:()=>{
          console.log("publisher actualizado");
          this.router.navigate(['/publishers']);
        },
        error: err =>{
          console.error('Error al actualizar el publisher', err)
        }
    });

  }
}
