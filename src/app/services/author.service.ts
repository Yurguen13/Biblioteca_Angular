import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authors } from '../interfaces/author.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  constructor(private http: HttpClient) { }

  public getAuthor():Observable<Authors[]> {
    return this.http.get<Authors[]>(environment.api.author);
  }

  public PostAuthor(authors:Authors):Observable<Authors>
  {
    console.log("Me intento conectar");
    console.log(authors);
    return this.http.post<Authors>(environment.api.author, authors);
     
  }
 
  
  public updateAuthor(id:number, author: Authors): Observable<Authors>
  {
    return this.http.put<Authors>(`${environment.api.author}/${id}`, author);
  }

    public getById(id: number): Observable<Authors>
  {
    return this.http.get<Authors>(`${environment.api.author}/${id}`);
  }
  // Eliminar producto
  public deleteAuthor(id: number): Observable<void>
  {
    return this.http.delete<void>(`${environment.api.author}/${id}`);
  }
}
