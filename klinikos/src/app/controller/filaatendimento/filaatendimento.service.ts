import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Return } from '../../model/Return';
import { FilaRegistroEvento } from 'src/app/model/FilaRegistroEvento';
import { FilaRegistro } from 'src/app/model/FilaRegistro';
import { FilaClassificacaoEvento } from 'src/app/model/FilaClassificacaoEvento';
import { FilaClassificacao } from 'src/app/model/FilaClassificacao';
import { FilaAtendimentoEvento } from 'src/app/model/FilaAtendimentoEvento';
import { FilaAtendimento } from 'src/app/model/FilaAtendimento';


@Injectable({
  providedIn: 'root',
})
export class FilaAtendimentoService {

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


  BuscarFilaAtendimento() { return this.http.get<Return>(`${this.baseUrl}filaatendimento`, this.httpOptions); }
  // BuscarFilaClassificacaoRiscoPorId(filaClassificacaoId: string) { return this.http.get<Return>(`${this.baseUrl}filaclassificacao/`+filaClassificacaoId, this.httpOptions); }
  AdicionarFilaEvento(filaAtendimentoEvento: FilaAtendimentoEvento) { return this.http.post<Return>(`${this.baseUrl}filaatendimentoevento/incluir`, filaAtendimentoEvento, this.httpOptions); }
   RetirarFila(filaAtendimento: FilaAtendimento) { return this.http.put<Return>(`${this.baseUrl}filaatendimento/retirarpacientefila`, filaAtendimento, this.httpOptions); }
   ConsultarRegistrosNovos(filaAtendimentoEvento: FilaAtendimentoEvento) { return this.http.post<Return>(`${this.baseUrl}filaatendimentoevento/consultarregistrosnovos`, filaAtendimentoEvento, this.httpOptions); }
   ConsultarRegistrosRetirados(filaAtendimentoEvento: FilaAtendimentoEvento) { return this.http.post<Return>(`${this.baseUrl}filaatendimentoevento/consultarregistrosretirados`, filaAtendimentoEvento, this.httpOptions); }
   ConsultarRegistrosChamadosAoPainel(filaAtendimentoEvento: FilaAtendimentoEvento) { return this.http.post<Return>(`${this.baseUrl}filaatendimentoevento/consultarregistroschamadosaopainel`, filaAtendimentoEvento, this.httpOptions); }
   ConsultarRegistrosCancelados(filaAtendimentoEvento: FilaAtendimentoEvento) { return this.http.post<Return>(`${this.baseUrl}filaatendimentoevento/consultarregistroscancelados`, filaAtendimentoEvento, this.httpOptions); }
   ConsultarRegistrosConfirmados(filaAtendimentoEvento: FilaAtendimentoEvento) { return this.http.post<Return>(`${this.baseUrl}filaatendimentoevento/consultarregistrosconfirmados`, filaAtendimentoEvento, this.httpOptions); }
}
