import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Raca } from '../../../model/Raca';
import { Etnia } from '../../../model/Etnia';
import { Justificativa } from '../../../model/Justificativa';
import { Return } from '../../../model/Return';
import { Estado } from '../../../model/Estado';
import { Cidade } from '../../../model/Cidade';
import { Cep } from '../../../model/Cep';
import { PessoaPaciente } from '../../../model/PessoaPaciente';
import { PessoaContato } from '../../../model/PessoaContato';
import { PessoaProfissional } from 'src/app/model/PessoaProfissional';
import { Pessoa } from 'src/app/model/Pessoa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {

  private baseUrl: string;
  private cepUrl: string;
  private raca: Raca;
  private etnia: Etnia;
  private justificativa: Justificativa;
  private estado: Estado;


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) {
    this.baseUrl = 'https://localhost:44307/api/';
    this.cepUrl = 'https://viacep.com.br/ws/';

  }


  BindRaca() { return this.http.get<Return>(`${this.baseUrl}raca`, this.httpOptions); }
  BindEtnia() { return this.http.get<Return>(`${this.baseUrl}etnia`, this.httpOptions); }
  BindJustificativa() { return this.http.get<Return>(`${this.baseUrl}justificativa`, this.httpOptions); }
  BindNacionalidade() { return this.http.get<Return>(`${this.baseUrl}nacionalidade`, this.httpOptions); }
  BindEstado() { return this.http.get<Return>(`${this.baseUrl}estado`, this.httpOptions); }
  BindCidade(estado: Estado) { return this.http.post<Return>(`${this.baseUrl}cidade/GetByEstado`, estado, this.httpOptions); }
  BindOrgaoEmissor() { return this.http.get<Return>(`${this.baseUrl}orgaoemissor`, this.httpOptions); }
  BindOcupacao() { return this.http.get<Return>(`${this.baseUrl}ocupacao`, this.httpOptions); }
  BindPais() { return this.http.get<Return>(`${this.baseUrl}pais`, this.httpOptions); }
  BindTipoCertidao() { return this.http.get<Return>(`${this.baseUrl}tipocertidao`, this.httpOptions); }
  BindEscolaridade() { return this.http.get<Return>(`${this.baseUrl}escolaridade`, this.httpOptions); }
  BindSituacaoFamiliarConjugal() { return this.http.get<Return>(`${this.baseUrl}situacaofamiliarconjugal`, this.httpOptions); }
  BindTipoProfissional() { return this.http.get<Return>(`${this.baseUrl}tipoprofissional`, this.httpOptions); }
  BuscarCep(cep: Cep) {


    if (cep.cep != undefined)
      return this.http.get<Cep>(`${this.cepUrl}` + cep.cep + `/json/`);

  }
  BuscarCepPorLogradouro(cep: Cep): Observable<Array<Cep>> {

    return this.http.get<Array<Cep>>(`${this.cepUrl}` + cep.uf + `/` + cep.localidade + `/` + cep.logradouro + `/json/`);

  }
  BuscarCidade(nomecidade: string) { return this.http.get<Return>(`${this.baseUrl}cidade/buscacidade/` + nomecidade, this.httpOptions); }

  ConsultaCpfProfissional(cpf: string) {
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoaprofissional/consultacpf/` + cpf, this.httpOptions);
  }
  ConsultaCpfPaciente(cpf: string) {
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoapaciente/consultacpf/` + cpf, this.httpOptions);
  }

  SalvarPessoaPaciente(pessoapaciente: PessoaPaciente) {

    return this.http.post<Return>(`${this.baseUrl}pessoa/pessoapaciente/incluir`, pessoapaciente, this.httpOptions);
  }
  SalvarPessoaProfissional(pessoaprofissional: PessoaProfissional) {

    return this.http.post<Return>(`${this.baseUrl}pessoa/pessoaprofissional/incluir`, pessoaprofissional, this.httpOptions);
  }






}
