import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Return } from '../../model/Return';
import { FilaRegistroEvento } from 'src/app/model/FilaRegistroEvento';
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
  ConsultarRegistrosNovos(filaregistroevento: FilaRegistroEvento) { return this.http.post<Return>(`${this.baseUrl}filaregistroevento/consultarregistrosnovos`, filaregistroevento, this.httpOptions); }
  ConsultarRegistrosRetirados(filaregistroevento: FilaRegistroEvento) { return this.http.post<Return>(`${this.baseUrl}filaregistroevento/consultarregistrosretirados`, filaregistroevento, this.httpOptions); }
  RetirarFila(filaregistro: FilaRegistro) { return this.http.put<Return>(`${this.baseUrl}filaregistro`, filaregistro, this.httpOptions); }
  AdicionarFilaEvento(filaRegistroEvento: FilaRegistroEvento) { return this.http.put<Return>(`${this.baseUrl}filaregistroevento`, filaRegistroEvento, this.httpOptions); }
  ConsultarEvento(descricao: string) { return this.http.get<Return>(`${this.baseUrl}evento/getbydescricao/`+descricao, this.httpOptions); }
  

}
