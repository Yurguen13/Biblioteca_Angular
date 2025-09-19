import { Component } from '@angular/core';
import { Category } from '../../interfaces/category.model';
import { CategoryService } from '../../services/category.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-category',
  imports: [NgFor,RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  category: Category[]=[];

  constructor ( private categoryservice:CategoryService) {

  }

  ngOnInit():void {
    this.loadData();
  }

  loadData():void 
  {
    this.categoryservice.getCategory().subscribe(data=> {
      this.category=data;
      console.log(this.category);

    });
  }

  deleteCategory(id:number):void 
  {

  }

}
