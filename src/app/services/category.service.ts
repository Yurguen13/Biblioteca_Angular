import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getCategory():Observable<Category[]> {
    return this.http.get<Category[]>(environment.api.categories);
  }
}
