import { Component } from '@angular/core';
import { Publishers } from '../../../interfaces/publishers.model';
import { PublishersService } from '../../../services/publishers/publishers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-publishers-delete',
  imports: [],
  templateUrl: './publishers-delete.component.html',
  styleUrl: './publishers-delete.component.css'
})
export class PublishersDeleteComponent {
publisherId!:number;
publisherData!:Publishers;

constructor(
  private publisherService: PublishersService,
        private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
){}

  ngOnInit():void{
    this.publisherId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPublishersData();
  }
  loadPublishersData(){
        this.publisherService.getById(this.publisherId).subscribe(data=>{
      const publishers = data;
      if(publishers){
        this.publisherData=publishers;
      }
    });
  }

    deleteClassification(){
    this.publisherService.deletePublishers(this.publisherId).subscribe({
      next:()=>{
        this.snackBar.open('Editorial eliminada con exito','Cerrar',{
          duration:3000,
          horizontalPosition: 'center',
            verticalPosition: 'top',
          panelClass: ['snack-bar-success']
        });
          this.router.navigate(['/publishers']);
      } 
    });
  }
}
