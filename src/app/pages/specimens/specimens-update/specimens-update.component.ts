import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Specimens } from '../../../interfaces/specimens.mode';
import { SpecimensService } from '../../../services/specimens/specimens.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Books } from '../../../interfaces/books.model';
import { BooksService } from '../../../services/books.service';

@Component({
  selector: 'app-specimens-update',
  imports: [ CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './specimens-update.component.html',
  styleUrl: './specimens-update.component.css'
})
export class SpecimensUpdateComponent {
    private specimenId!: number;
    specimenForm!:FormGroup;
    specimenData!:Specimens;
    books:Books[]=[];

    constructor(
      private route:ActivatedRoute,
      private fb:FormBuilder,
      private specimenService: SpecimensService,
      private router: Router,
      private readonly booksService: BooksService,
    ){}

    ngOnInit():void{
      this.specimenId=Number(this.route.snapshot.paramMap.get('id'));
      this.specimenForm = this.fb.group({
        pice:['',[Validators.required, Validators.min(50)]],
        condition:['',[Validators.required, Validators.minLength(1)]],
        observation:['',[Validators.required, Validators.minLength(1)]],
        booksId:['',[Validators.required]]
      });

      this.loadSpecimensData();

      this.booksService.getBooks().subscribe({
        next:(data)=>{this.books = data;},
        error:(err)=>{console.error('Error al obtener libros',err);}
      });
    }
    loadSpecimensData(){
      this.specimenService.getById(this.specimenId).subscribe(data=>{
          this.specimenData = data;
          this.specimenForm.setValue({
            price:data.price,
            condition:data.condition,
            observation:data.observation,
            booksId:data.booksId
          });
      });
    }

    updateSpecimen(){
      if(this.specimenForm.invalid){
        //return;
      }

      const updateSpecimen:Specimens={
        id:this.specimenId,
        ...this.specimenForm.value
      };

      this.specimenService.updateSpecimen(this.specimenId, updateSpecimen).subscribe({
        next:()=>{
          console.log('specimen actualizado');
          this.router.navigate(['/specimens']);
        },
        error: err =>{
          console.error('Error al actualizar specimen:',err);
        }
      });
    }
}
