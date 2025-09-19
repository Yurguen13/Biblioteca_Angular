import { Component } from '@angular/core';
import { Authors } from '../../../interfaces/author.model';
import { AuthorService } from '../../../services/author.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-author-delete',
  imports: [],
  templateUrl: './author-delete.component.html',
  styleUrl: './author-delete.component.css'
})
export class AuthorDeleteComponent {

   authorId!: number;  // ID del producto a eliminar
 authorData!: Authors;  // Datos del producto que se eliminará

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
      this.authorId = Number(this.route.snapshot.paramMap.get('id'));
      this.loadAuthorData();
  }

  loadAuthorData(){
    this.authorService.getById(this.authorId).subscribe( data => {
      const product = data;
      if(product){
        this.authorData = product;
      }
    })
  }

  deleteauthor(){
    this.authorService.deleteAuthor(this.authorId).subscribe({
      next: () => {
        this.snackBar.open('Author eliminada con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
            verticalPosition: 'top',
          panelClass: ['snack-bar-success']
        });
        this.router.navigate(['/author']);
      }
    });
  }

}
