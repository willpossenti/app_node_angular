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
  BuscarFilaRegistroPorId(filaRegistroId: string) { return this.http.get<Return>(`${this.baseUrl}filaregistro/`+filaRegistroId, this.httpOptions); }
  BindPreferencial() { return this.http.get<Return>(`${this.baseUrl}preferencial`, this.httpOptions); }
  ConsultarRegistrosNovos(filaregistroevento: FilaRegistroEvento) { return this.http.post<Return>(`${this.baseUrl}filaregistroevento/consultarregistrosnovos`, filaregistroevento, this.httpOptions); }
  ConsultarRegistrosRetirados(filaregistroevento: FilaRegistroEvento) { return this.http.post<Return>(`${this.baseUrl}filaregistroevento/consultarregistrosretirados`, filaregistroevento, this.httpOptions); }
  ConsultarRegistrosChamadosAoPainel(filaregistroevento: FilaRegistroEvento) { return this.http.post<Return>(`${this.baseUrl}filaregistroevento/consultarregistroschamadosaopainel`, filaregistroevento, this.httpOptions); }
  ConsultarRegistrosCancelados(filaregistroevento: FilaRegistroEvento) { return this.http.post<Return>(`${this.baseUrl}filaregistroevento/consultarregistroscancelados`, filaregistroevento, this.httpOptions); }
  ConsultarRegistrosConfirmados(filaregistroevento: FilaRegistroEvento) { return this.http.post<Return>(`${this.baseUrl}filaregistroevento/consultarregistrosconfirmados`, filaregistroevento, this.httpOptions); }
  RetirarFila(filaregistro: FilaRegistro) { return this.http.put<Return>(`${this.baseUrl}filaregistro/retirarpacientefila`, filaregistro, this.httpOptions); }
  AdicionarFilaEvento(filaRegistroEvento: FilaRegistroEvento) { return this.http.post<Return>(`${this.baseUrl}filaregistroevento/incluir`, filaRegistroEvento, this.httpOptions); }
  ConsultarEvento(sigla: string) { return this.http.get<Return>(`${this.baseUrl}evento/getbysigla/`+sigla, this.httpOptions); }
  

}
