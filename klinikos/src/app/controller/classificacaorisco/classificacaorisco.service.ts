
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Return } from '../../model/Return';
import { ClassificacaoRisco } from '../../model/ClassificacaoRisco';


@Injectable({
  providedIn: 'root',
})
export class ClassificaoRiscoService {

  private baseUrl: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage['token_accessToken']
    })
  };


  constructor(private http: HttpClient) {
    //this.baseUrl = 'https://localhost:44307/api/';
    this.baseUrl = 'https://apinew.ecosistemas.com.br/api/';
  }

  BindCausaExterna() { return this.http.get<Return>(`${this.baseUrl}causaexterna`, this.httpOptions); }
  BindEscalaDor() { return this.http.get<Return>(`${this.baseUrl}escalador`, this.httpOptions); }
  BindNivelConsciencia() { return this.http.get<Return>(`${this.baseUrl}nivelconsciencia`, this.httpOptions); }
  BindDoencaPreExistente() { return this.http.get<Return>(`${this.baseUrl}doencapreexistente`, this.httpOptions); }
  BindTipoChegada() { return this.http.get<Return>(`${this.baseUrl}tipochegada`, this.httpOptions); }
  BindEspecialidade() { return this.http.get<Return>(`${this.baseUrl}especialidade`, this.httpOptions); }
  BindTipoAlergia() { return this.http.get<Return>(`${this.baseUrl}tipoalergia`, this.httpOptions); }
  BindAlergia() { return this.http.get<Return>(`${this.baseUrl}alergia`, this.httpOptions); }
  BindLocalizacaoAlergia() { return this.http.get<Return>(`${this.baseUrl}localizacaoalergia`, this.httpOptions); }
  BindReacaoAlergia() { return this.http.get<Return>(`${this.baseUrl}reacaoalergia`, this.httpOptions); }
  BindSeveridade() { return this.http.get<Return>(`${this.baseUrl}severidadealergia`, this.httpOptions); }
  BindAberturaOcular() { return this.http.get<Return>(`${this.baseUrl}aberturaocular`, this.httpOptions); }
  BindRespostaVerbal() { return this.http.get<Return>(`${this.baseUrl}respostaverbal`, this.httpOptions); }
  BindRespostaMotora() { return this.http.get<Return>(`${this.baseUrl}respostamotora`, this.httpOptions); }
  BindTipoOcorrencia() { return this.http.get<Return>(`${this.baseUrl}tipoocorrencia`, this.httpOptions); }
  BindRisco() { return this.http.get<Return>(`${this.baseUrl}risco`, this.httpOptions); }

  SalvarClassificacaoRisco(classificacaorisco: ClassificacaoRisco) {

    return this.http.post<Return>(`${this.baseUrl}classificacaorisco/incluir`, classificacaorisco, this.httpOptions);
  }
}
