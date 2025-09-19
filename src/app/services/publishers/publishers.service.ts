import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Publishers } from '../../interfaces/publishers.model';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

constructor(private http:HttpClient){}

 public getPublishers(): Observable<Publishers[]>{
    return this.http.get<Publishers[]>(environment.api.publishers)
  }

  public getById(id:number):Observable<Publishers>{
    return this.http.get<Publishers>(`${environment.api.publishers}/${id}`);
  }

  public postPublishers(publisher:Publishers): Observable<Publishers>{
    return this.http.post<Publishers>(environment.api.publishers, publisher);
  }

  public updatePublishers(id:number, publisher:Publishers):Observable<Publishers>{
    return this.http.put<Publishers>(`${environment.api.publishers}/${id}`, publisher);
  }

  public deletePublishers(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.api.publishers}/${id}`);
  }
}
