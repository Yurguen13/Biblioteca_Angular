import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classification } from '../../interfaces/classification.module';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  constructor(private http:HttpClient) { }

  public getClassifications(): Observable<Classification[]>{
    return this.http.get<Classification[]>(environment.api.classifications)
  }

  public getById(id:number):Observable<Classification>{
    return this.http.get<Classification>(`${environment.api.classifications}/${id}`);
  }

  public postClassification(classification:Classification): Observable<Classification>{
    return this.http.post<Classification>(environment.api.classifications, classification);
  }

  public updateClassification(id:number, classification:Classification):Observable<Classification>{
    return this.http.put<Classification>(`${environment.api.classifications}/${id}`, classification);
  }

  public deleteClassification(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.api.classifications}/${id}`);
  }
}
