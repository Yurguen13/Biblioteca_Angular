import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Publishers } from '../../../interfaces/publishers.model';
import { PublishersService } from '../../../services/publishers/publishers.service';

@Component({
  selector: 'app-publishers-list',
  imports: [RouterLink, NgFor],
  templateUrl: './publishers-list.component.html',
  styleUrl: './publishers-list.component.css'
})
export class PublishersListComponent {
  publishers:Publishers[] = [];
constructor(private publishersService: PublishersService){}

ngOnInit():void{
  this.loadData();
}

loadData():void{
  this.publishersService.getPublishers().subscribe(data=>{
this.publishers = data;
console.log(data);
  });
}
}
