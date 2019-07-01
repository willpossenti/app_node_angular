import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Return } from '../../model/Return';
import { Acolhimento } from '../../model/Acolhimento';
import { PessoaPaciente } from '../../model/PessoaPaciente';
import { FilaRegistro } from 'src/app/model/FilaRegistro';


@Injectable({
  providedIn: 'root',
})
export class FilaRegistroService {

  private baseUrl: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage['token_accessToken']
    })
  };

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://localhost:44307/api/';
    //this.baseUrl = 'https://apinew.ecosistemas.com.br/api/';
  }

  BuscarFilaRegistro() { return this.http.get<Return>(`${this.baseUrl}filaregistro`, this.httpOptions); }
  BindPreferencial() { return this.http.get<Return>(`${this.baseUrl}preferencial`, this.httpOptions); }
  
}
