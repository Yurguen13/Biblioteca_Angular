import { Component } from '@angular/core';
import { Authors } from '../../interfaces/author.model';
import { AuthorService } from '../../services/author.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-author',
  imports: [NgFor,RouterLink],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent {
  
    authors: Authors[]=[];
  
    constructor ( private authorservice:AuthorService) {
  
    }
  
    ngOnInit():void {
      this.loadData();
    }
  
    loadData():void 
    {
      this.authorservice.getAuthor().subscribe(data=> {
        this.authors=data;
        console.log(this.authors);
  
      });
    }
  

}
