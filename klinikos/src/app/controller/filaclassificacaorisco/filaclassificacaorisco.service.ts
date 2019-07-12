import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Return } from '../../model/Return';
import { FilaRegistroEvento } from 'src/app/model/FilaRegistroEvento';
import { FilaRegistro } from 'src/app/model/FilaRegistro';
import { FilaClassificacaoEvento } from 'src/app/model/FilaClassificacaoEvento';


@Injectable({
  providedIn: 'root',
})
export class FilaClassificacaoRiscoService {

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


  BuscarFilaClassificacaoRisco() { return this.http.get<Return>(`${this.baseUrl}filaclassificacao`, this.httpOptions); }
  AdicionarFilaEvento(filaClassificacaoEvento: FilaClassificacaoEvento) { return this.http.post<Return>(`${this.baseUrl}filaclassificacaoevento/incluir`, filaClassificacaoEvento, this.httpOptions); }

}
