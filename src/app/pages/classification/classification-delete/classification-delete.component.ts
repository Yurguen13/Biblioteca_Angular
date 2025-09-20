import { Component } from '@angular/core';
import { Classification } from '../../../interfaces/classification.module';
import { ClassificationService } from '../../../services/classification/classification.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-classification-delete',
  imports: [],
  templateUrl: './classification-delete.component.html',
  styleUrl: './classification-delete.component.css'
})
export class ClassificationDeleteComponent {
  classificationId!:number;
  classificationData!:Classification;

  constructor(
    private classificationService: ClassificationService,
      private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit():void{
    this.classificationId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadClassificationData();
  }

  loadClassificationData(){
    this.classificationService.getById(this.classificationId).subscribe(data=>{
      const classification = data;
      if(classification){
        this.classificationData=classification;
      }
    });
  }

  deleteClassification(){
    this.classificationService.deleteClassification(this.classificationId).subscribe({
      next:()=>{
        this.snackBar.open('Clasificacion eliminada con exito','Cerrar',{
          duration:3000,
          horizontalPosition: 'center',
            verticalPosition: 'top',
          panelClass: ['snack-bar-success']
        });
      } 
    });

      this.router.navigate(['/classifications']);
  }
}
