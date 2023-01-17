import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SuperheroApiService {

  constructor(private httpClient: HttpClient) {  }

  public search(name: string): Observable<any>
  {
    return this.httpClient.get<any>(`https://www.superheroapi.com/api.php/5526989450757332/search/${name}`);
  }

  public searchById(id: string): Observable<any>
  {
    return this.httpClient.get<any>(`https://www.superheroapi.com/api.php/5526989450757332/${id}`);
  }
}
