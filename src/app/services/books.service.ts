import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from '../interfaces/books.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  public getBooks():Observable<Books[]> {
    return this.http.get<Books[]>(environment.api.books);
  }

  public PostBooks(formData: FormData):Observable<Books>
  {
    console.log("Me intento conectar");
    console.log(formData);
    return this.http.post<Books>(environment.api.books, formData);
     
  }
 
  
  public updateBook(id:number, boo: Books): Observable<Books>
  {
    return this.http.put<Books>(`${environment.api.books}/${id}`, boo);
  }

    public getById(id: number): Observable<Books>
  {
    return this.http.get<Books>(`${environment.api.books}/${id}`);
  }
  // Eliminar producto
  public deleteBook(id: number): Observable<void>
  {
    return this.http.delete<void>(`${environment.api.books}/${id}`);
  }
}
