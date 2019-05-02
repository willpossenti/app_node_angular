
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Return } from '../../model/Return';


@Injectable({
  providedIn: 'root',
})
export class ClassificaoRiscoService {

  private baseUrl: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage['token_accessToken']
    })
  };


  constructor(private http: HttpClient) {
    this.baseUrl = 'https://localhost:44307/api/';
  }

  BindCausaExterna() { return this.http.get<Return>(`${this.baseUrl}causaexterna`, this.httpOptions); }
  BindEscalaDor() { return this.http.get<Return>(`${this.baseUrl}escalador`, this.httpOptions); }
  BindNivelConsciencia() { return this.http.get<Return>(`${this.baseUrl}nivelconsciencia`, this.httpOptions); }
}
