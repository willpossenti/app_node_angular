
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Return } from '../../model/Return';
import { AtendimentoMedico } from '../../model/AtendimentoMedico';
import { ConsultaCID } from 'src/app/model/ConsultaCID';
import { CID } from 'src/app/model/CID';


@Injectable({
  providedIn: 'root',
})
export class AtendimentoMedicoService {

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

  ConsultarCIDByCapitulo(cid: CID) { return this.http.post<Return>(`${this.baseUrl}cid/GetCIDByCapitulo`, cid, this.httpOptions); }
  BindConsultaCID() { return this.http.get<Return>(`${this.baseUrl}consultacid`, this.httpOptions); }
  BindGrupoExame() { return this.http.get<Return>(`${this.baseUrl}grupoexame`, this.httpOptions); }
  BindExame() { return this.http.get<Return>(`${this.baseUrl}exame`, this.httpOptions); }
  BindModeloPrescricaoReceita() { return this.http.get<Return>(`${this.baseUrl}ModeloPrescricaoReceita`, this.httpOptions); }
  BindTipoAlergia() { return this.http.get<Return>(`${this.baseUrl}tipoalergia`, this.httpOptions); }
  BindAlergia() { return this.http.get<Return>(`${this.baseUrl}alergia`, this.httpOptions); }
  BindLocalizacaoAlergia() { return this.http.get<Return>(`${this.baseUrl}localizacaoalergia`, this.httpOptions); }
  BindReacaoAlergia() { return this.http.get<Return>(`${this.baseUrl}reacaoalergia`, this.httpOptions); }
  BindSeveridade() { return this.http.get<Return>(`${this.baseUrl}severidadealergia`, this.httpOptions); }
  BindGrupoMedicamento() { return this.http.get<Return>(`${this.baseUrl}grupomedicamento`, this.httpOptions); }
  BindMedicamento() { return this.http.get<Return>(`${this.baseUrl}medicamento`, this.httpOptions); }
  BindViaAdministracaoMedicamento() { return this.http.get<Return>(`${this.baseUrl}viaadministracaomedicamento`, this.httpOptions); }
  BindUnidadeMedicamento() { return this.http.get<Return>(`${this.baseUrl}unidademedicamento`, this.httpOptions); }
  BindIntervaloMedicamento() { return this.http.get<Return>(`${this.baseUrl}intervalomedicamento`, this.httpOptions); }
  BindModeloAtestado() { return this.http.get<Return>(`${this.baseUrl}modeloatestado`, this.httpOptions); }
  BindAtendimentoMedicoExame() { return this.http.get<Return>(`${this.baseUrl}atendimentomedicoexame`, this.httpOptions); }
  BindModeloPrescricaoReceitaDetalhe() { return this.http.get<Return>(`${this.baseUrl}modeloprescricaoreceitadetalhe`, this.httpOptions); }
  BindAtendimentoMedicoPrescricaoReceita() { return this.http.get<Return>(`${this.baseUrl}atendimentomedicoprescricaoreceita`, this.httpOptions); }
  Bindatendimentomedicoalergia() { return this.http.get<Return>(`${this.baseUrl}atendimentomedicoalergia`, this.httpOptions); }
  ConsultaMedicamento(nome: string) { return this.http.get<Return>(`${this.baseUrl}medicamento/consultamedicamento/` + nome, this.httpOptions); }
  ConsultaExame(nome: string) { return this.http.get<Return>(`${this.baseUrl}exame/consultaexame/` + nome, this.httpOptions); }
  SalvarAtendimentoMedico(atendimentomedico: AtendimentoMedico) {

    return this.http.post<Return>(`${this.baseUrl}atendimentomedico/incluir`, atendimentomedico, this.httpOptions);
  }
  

}
