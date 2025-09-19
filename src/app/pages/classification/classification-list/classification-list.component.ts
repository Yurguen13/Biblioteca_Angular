import { Component } from '@angular/core';
import { Classification } from '../../../interfaces/classification.module';
import { ClassificationService } from '../../../services/classification/classification.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-classification-list',
  imports: [RouterLink],
  templateUrl: './classification-list.component.html',
  styleUrl: './classification-list.component.css'
})
export class ClassificationListComponent {
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
