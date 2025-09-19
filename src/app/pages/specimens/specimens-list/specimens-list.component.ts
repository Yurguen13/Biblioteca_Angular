import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpecimensService } from '../../../services/specimens/specimens.service';
import { Specimens } from '../../../interfaces/specimens.mode';

@Component({
  selector: 'app-specimens-list',
  imports: [RouterLink, NgFor],
  templateUrl: './specimens-list.component.html',
  styleUrl: './specimens-list.component.css'
})
export class SpecimensListComponent {
specimen:Specimens[]=[];
constructor(private specimensService: SpecimensService){}

ngOnInit():void{
  this.loadData();
}

loadData():void{
this.specimensService.getSpecimens().subscribe(data=>{
  this.specimen = data;
  console.log(data);
});
}
}
