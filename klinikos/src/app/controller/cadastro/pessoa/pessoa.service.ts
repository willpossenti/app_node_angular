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
import { PessoaProfissional } from 'src/app/model/PessoaProfissional';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {

  private baseUrl: string;
  private cepUrl: string;
  private cadecoUrl: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage['token_accessToken']
    })
  };

  private httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage['token_accessToken_cadeco']
    })
  };


  constructor(private http: HttpClient) {
    this.baseUrl = 'https://localhost:44307/api/';
    // this.baseUrl = 'https://apinew.ecosistemas.com.br/api/';

    this.cepUrl = 'https://viacep.com.br/ws/';
    this.cadecoUrl = 'https://integrador.ecosistemas.com.br/cadeco-rest/api/paciente/cpf?';



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

  ConsultaProfissional(pessoaId: string) {
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoaprofissional/consultaprofissional/` + pessoaId, this.httpOptions);
  }

  ConsultaCpfProfissional(cpf: string) {
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoaprofissional/consultacpf/` + cpf, this.httpOptions);
  }


  ConsultaCpfPacienteCadeco(cpf: string) {

    console.log('Basic ' + localStorage['token_accessToken_cadeco']);
    return this.http.get<any>(`${this.cadecoUrl}cpf=` + cpf, this.httpOptions2);

  }


  ConsultaCpfPaciente(cpf: string) {
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoapaciente/consultacpf/` + cpf, this.httpOptions);

  }
  ConsultaCnsProfissional(cns: string) {
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoaprofissional/consultacns/` + cns, this.httpOptions);
  }
  ConsultaCnsPaciente(cns: string) {
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoapaciente/consultacns/` + cns, this.httpOptions);
  }
  ConsultaPisProfissional(pis: string) {
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoaprofissional/consultapis/` + pis, this.httpOptions);
  }
  ConsultaPisPaciente(pis: string) {
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoapaciente/consultapis/` + pis, this.httpOptions);
  }
  ConsultaNomeCompletoPaciente(nome: string) {

    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoapaciente/consultanome/` + nome, this.httpOptions);
  }
  ConsultaNomeCompletoProfissional(nome: string) {

    
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoaprofissional/consultanome/` + nome, this.httpOptions);
  }
  ConsultaNomeSocialPaciente(nome: string) {
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoapaciente/consultanomesocial/` + nome, this.httpOptions);
  }
  ConsultaNomeSocialProfissional(nome: string) {
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoaprofissional/consultanomesocial/` + nome, this.httpOptions);
  }
  ConsultaLotacoesProfissional(pessoaId: string) {
    return this.http.get<Return>(`${this.baseUrl}lotacaoprofissional/consultalotacoesprofissional/` + pessoaId, this.httpOptions);
  }

  SalvarPessoaPaciente(pessoapaciente: PessoaPaciente) {

    return this.http.post<Return>(`${this.baseUrl}pessoa/pessoapaciente/incluir`, pessoapaciente, this.httpOptions);
  }
  SalvarPessoaProfissional(pessoaprofissional: PessoaProfissional) {

    return this.http.post<Return>(`${this.baseUrl}pessoa/pessoaprofissional/incluir`, pessoaprofissional, this.httpOptions);
  }


  ConsultaPaciente(pessoaId: string) {
    return this.http.get<Return>(`${this.baseUrl}pessoa/pessoapaciente/` + pessoaId, this.httpOptions);
  }

  AlterarPessoaPaciente(pessoapaciente: PessoaPaciente) {

    return this.http.put<Return>(`${this.baseUrl}pessoa/pessoapaciente/alterar`, pessoapaciente, this.httpOptions);
  }

  ConsultaPessoaStatus() { return this.http.get<Return>(`${this.baseUrl}pessoastatus`, this.httpOptions); }
  
  ConsultaPessoaStatusNome(sigla: string) { return this.http.get<Return>(`${this.baseUrl}pessoastatus/getbynome/`+sigla, this.httpOptions); }
  
  ConsultaPessoaStatusArray(siglas: string[]) { return this.http.post<Return>(`${this.baseUrl}pessoastatus/getbynomeandarray`,siglas, this.httpOptions); }

}
