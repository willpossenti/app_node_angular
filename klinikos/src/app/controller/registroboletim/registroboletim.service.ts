import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Return } from '../../model/Return';
import { Estado } from '../../model/Estado';
import { RegistroBoletim } from '../../model/RegistroBoletim';
import { PessoaPaciente } from '../../model/PessoaPaciente';
import { FilaClassificacao } from 'src/app/model/FilaClassificacao';

@Injectable({
  providedIn: 'root',
})
export class RegistroBoletimService {

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

  BindEspecialidade() { return this.http.get<Return>(`${this.baseUrl}especialidade`, this.httpOptions); }
  BindTipoChegada() { return this.http.get<Return>(`${this.baseUrl}tipochegada`, this.httpOptions); }
  BindCidade(estado: Estado) { return this.http.post<Return>(`${this.baseUrl}cidade/GetByEstado`, estado, this.httpOptions); }

  SalvarRegistroBoletim(registroboletim: RegistroBoletim) {

    return this.http.post<Return>(`${this.baseUrl}registroboletim/incluir`, registroboletim, this.httpOptions);
  }

  AlterarRegistroPessoa(paciente: PessoaPaciente) {

    return this.http.put<Return>(`${this.baseUrl}pessoa/pessoapaciente/alterar`, paciente, this.httpOptions);
  }

  IncluirFilaClassificacao(filaClassificacao: FilaClassificacao) {

    return this.http.post<Return>(`${this.baseUrl}filaclassificacao/incluir`, filaClassificacao, this.httpOptions);
  }
}
