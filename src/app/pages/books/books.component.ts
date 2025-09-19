import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Books } from '../../interfaces/books.model';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-books',
  imports: [NgFor,RouterLink],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {

    books: Books[]=[];
    
      constructor ( private bookService:BooksService) {
    
      }
    
      ngOnInit():void {
        this.loadData();
      }
    
      loadData():void 
      {
        this.bookService.getBooks().subscribe(data=> {
          this.books=data;
          console.log(this.books);
    
        });
      }

}
