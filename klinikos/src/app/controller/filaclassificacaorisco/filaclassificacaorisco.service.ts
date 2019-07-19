import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Return } from '../../model/Return';
import { FilaRegistroEvento } from 'src/app/model/FilaRegistroEvento';
import { FilaRegistro } from 'src/app/model/FilaRegistro';
import { FilaClassificacaoEvento } from 'src/app/model/FilaClassificacaoEvento';
import { FilaClassificacao } from 'src/app/model/FilaClassificacao';


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
  BuscarFilaClassificacaoRiscoPorId(filaClassificacaoId: string) { return this.http.get<Return>(`${this.baseUrl}filaclassificacao/`+filaClassificacaoId, this.httpOptions); }
  AdicionarFilaEvento(filaClassificacaoEvento: FilaClassificacaoEvento) { return this.http.post<Return>(`${this.baseUrl}filaclassificacaoevento/incluir`, filaClassificacaoEvento, this.httpOptions); }
  RetirarFila(filaclassificacao: FilaClassificacao) { return this.http.put<Return>(`${this.baseUrl}filaclassificacao/retirarpacientefila`, filaclassificacao, this.httpOptions); }
  ConsultarRegistrosNovos(filaClassificacaoEvento: FilaClassificacaoEvento) { return this.http.post<Return>(`${this.baseUrl}filaclassificacaoevento/consultarregistrosnovos`, filaClassificacaoEvento, this.httpOptions); }
  ConsultarRegistrosRetirados(filaClassificacaoEvento: FilaClassificacaoEvento) { return this.http.post<Return>(`${this.baseUrl}filaclassificacaoevento/consultarregistrosretirados`, filaClassificacaoEvento, this.httpOptions); }
  ConsultarRegistrosChamadosAoPainel(filaClassificacaoEvento: FilaClassificacaoEvento) { return this.http.post<Return>(`${this.baseUrl}filaclassificacaoevento/consultarregistroschamadosaopainel`, filaClassificacaoEvento, this.httpOptions); }
  ConsultarRegistrosCancelados(filaClassificacaoEvento: FilaClassificacaoEvento) { return this.http.post<Return>(`${this.baseUrl}filaclassificacaoevento/consultarregistroscancelados`, filaClassificacaoEvento, this.httpOptions); }
  ConsultarRegistrosConfirmados(filaClassificacaoEvento: FilaClassificacaoEvento) { return this.http.post<Return>(`${this.baseUrl}filaclassificacaoevento/consultarregistrosconfirmados`, filaClassificacaoEvento, this.httpOptions); }
}
