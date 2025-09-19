import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Classification } from '../../../interfaces/classification.module';
import { ClassificationService } from '../../../services/classification/classification.service';

@Component({
  selector: 'app-classification-update',
  imports: [ CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './classification-update.component.html',
  styleUrl: './classification-update.component.css'
})
class ClassificationUpdateComponent {
  private classificationId!: number;
  classificationForm!: FormGroup;
  classificationData!: Classification;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private classificationService: ClassificationService,
    private router:Router
  ){}

  ngOnInit():void{
    this.classificationId = Number(this.route.snapshot.paramMap.get('id'));

    this.classificationForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(15)]],
      description:['',Validators.required, Validators.minLength(25)],
      code:['',Validators.required, Validators.minLength(5)]
    });

    this.loadClassificationData();
  }


  loadClassificationData(){
    this.classificationService.getById(this.classificationId).subscribe(data=>{
        this.classificationData = data;
        this.classificationForm.setValue({
          name:data.name,
          description:data.description,
          code:data.code
        });
    });
  }

  updateClassification(){
    if(this.classificationForm.invalid){
      return;
    }
    
    const updateClassification: Classification={
      id:this.classificationId,
      ...this.classificationForm.value
    };

    this.classificationService.updateClassification(this.classificationId, updateClassification).subscribe({
        next:()=>{
          console.log("Clasificacion actualizada");
          this.router.navigate(['/classifications']);
        },
        error: err =>{
          console.error('Error al actualizar la clasificacion', err)
        }
    });
  }
}
