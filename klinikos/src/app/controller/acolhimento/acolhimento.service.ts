import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Return } from '../../model/Return';
import { Acolhimento } from '../../model/Acolhimento';
import { PessoaPaciente } from '../../model/PessoaPaciente';
import { FilaRegistro } from 'src/app/model/FilaRegistro';


@Injectable({
  providedIn: 'root',
})
export class AcolhimentoService {

  private baseUrl: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage['token_accessToken']
    })
  };

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://localhost:44307/api/';
    // this.baseUrl = 'https://apinew.ecosistemas.com.br/api/';

  }

  BindEspecialidade() { return this.http.get<Return>(`${this.baseUrl}especialidade`, this.httpOptions); }
  BindPreferencial() { return this.http.get<Return>(`${this.baseUrl}preferencial`, this.httpOptions); }

  ConsultaPacienteAcolhimento(pesquisa: string) {
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoapaciente/consultapacienteacolhimento/` + pesquisa, this.httpOptions);
  }

  ConsultaAcolhimentoPorPessoaId(pessoaId: string) {
    return this.http.get<Return>(`${this.baseUrl}acolhimento/consultaacolhimentoporpessoaId/` + pessoaId, this.httpOptions);
  }


  IncluirFilaRegistro(filaregistro: FilaRegistro) {

    return this.http.post<Return>(`${this.baseUrl}filaregistro/incluir`, filaregistro, this.httpOptions);
  }

  SalvarAcolhimento(acolhimento: Acolhimento) {

    return this.http.post<Return>(`${this.baseUrl}acolhimento/incluir`, acolhimento, this.httpOptions);
  }

  AlterarRegistroPessoa(paciente: PessoaPaciente) {

    return this.http.put<Return>(`${this.baseUrl}pessoa/pessoapaciente/alterar`, paciente, this.httpOptions);
  }
}
