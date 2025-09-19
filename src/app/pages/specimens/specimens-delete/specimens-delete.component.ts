import { Component } from '@angular/core';
import { Specimens } from '../../../interfaces/specimens.mode';
import { SpecimensService } from '../../../services/specimens/specimens.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-specimens-delete',
  imports: [],
  templateUrl: './specimens-delete.component.html',
  styleUrl: './specimens-delete.component.css'
})
export class SpecimensDeleteComponent {
    specimenId!:number;
    specimenData!:Specimens;

    constructor(
      private specimentService:SpecimensService,
      private route:ActivatedRoute,
      private router:Router,
      private snackBar: MatSnackBar
    ){}

    ngOnInit():void{
      this.specimenId = Number(this.route.snapshot.paramMap.get('id'));
      this.loadSpecimenData();
    }

    loadSpecimenData(){
      this.specimentService.getById(this.specimenId).subscribe(data=>{
          const specimen=data;
          if(specimen){
            this.specimenData=specimen;
          }
      });
    }

    deleteSpecimen(){
      this.specimentService.deleteSpecimen(this.specimenId).subscribe({
        next:()=>{
          this.snackBar.open('Producto eliminado con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
            verticalPosition: 'top',
          panelClass: ['snack-bar-success']
        });
        this.router.navigate(['/specimens']);
        }
      });
    }

}
