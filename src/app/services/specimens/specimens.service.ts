import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specimens } from '../../interfaces/specimens.mode';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecimensService {

  constructor(private http:HttpClient) { }

  public getSpecimens():Observable<Specimens[]>{
    return this.http.get<Specimens[]>(environment.api.specimens)
  }

  public getById(id:number):Observable<Specimens>{
    return this.http.get<Specimens>(`${environment.api.specimens}/${id}`);
  }

  public postSpecimen(specimen:Specimens):Observable<Specimens>{
     console.log("datos");
    console.log(specimen);
    return this.http.post<Specimens>(environment.api.specimens, specimen);
  }

  public updateSpecimen(id:number, specimen:Specimens):Observable<Specimens>{
    return this.http.put<Specimens>(`${environment.api.specimens}/${id}`,specimen);
  }

  public deleteSpecimen(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.api.specimens}/${id}`);
  }
}
