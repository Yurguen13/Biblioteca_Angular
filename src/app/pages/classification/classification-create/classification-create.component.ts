import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Classification } from '../../../interfaces/classification.module';
import { ClassificationService } from '../../../services/classification/classification.service';

@Component({
  selector: 'app-classification-create',
  imports: [RouterLink],
  templateUrl: './classification-create.component.html',
  styleUrl: './classification-create.component.css'
})
export class ClassificationCreateComponent {
classification:Classification[] = [];

constructor(private classificationService: ClassificationService){}

ngOnInit():void{
  this.loadData();
}

loadData():void{
  this.classificationService.getClassifications().subscribe(data=>{
this.classification = data;
console.log(data);
  });
}
}
