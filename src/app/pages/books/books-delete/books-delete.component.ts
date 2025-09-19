import { Component } from '@angular/core';
import { Books } from '../../../interfaces/books.model';
import { BooksService } from '../../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-books-delete',
  imports: [],
  templateUrl: './books-delete.component.html',
  styleUrl: './books-delete.component.css'
})
export class BooksDeleteComponent {
  bookId!: number;  // ID del producto a eliminar
 bookData!: Books;  // Datos del producto que se eliminará

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
      this.bookId = Number(this.route.snapshot.paramMap.get('id'));
      this.loadboookData();
  }

  loadboookData(){
    this.bookService.getById(this.bookId).subscribe( data => {
      const product = data;
      if(product){
        this.bookData = product;
      }
    })
  }

  deletelibro(){
    this.bookService.deleteBook(this.bookId).subscribe({
      next: () => {
        this.snackBar.open('Libro eliminada con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
            verticalPosition: 'top',
          panelClass: ['snack-bar-success']
        });
        this.router.navigate(['/books']);
      }
    });
  }

}
