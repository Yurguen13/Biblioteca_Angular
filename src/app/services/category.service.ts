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

  public PostCategory(categoyr:Category):Observable<Category>
  {
    return this.http.post<Category>(environment.api.categories,categoyr);
  }

  
  public updateCategory(id:number, category: Category): Observable<Category>
  {
    return this.http.put<Category>(`${environment.api.categories}/${id}`, category);
  }

    public getById(id: number): Observable<Category>
  {
    return this.http.get<Category>(`${environment.api.categories}/${id}`);
  }
  // Eliminar producto
  public deleteProduct(id: number): Observable<void>
  {
    return this.http.delete<void>(`${environment.api.categories}/${id}`);
  }
}
