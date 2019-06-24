import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import * as $C from 'jquery';
import { ClassificaoRiscoService } from './classificacaorisco.service';
import { Return } from '../../model/Return';
import { CausaExterna } from '../../model/CausaExterna';
import { HttpErrorResponse } from '@angular/common/http';
import * as Toastr from 'toastr';
import { EscalaDor } from '../../model/EscalaDor';
import { NivelConsciencia } from '../../model/NivelConsciencia';
import { ClassificacaoRiscoPipe } from './classificacaorisco.pipe';
import { TipoChegada } from '../../model/TipoChegada';
import { Especialidade } from '../../model/Especialidade';
import { TipoAlergia } from '../../model/TipoAlergia';
import { Alergia } from '../../model/Alergia';
import { LocalizacaoAlergia } from '../../model/LocalizacaoAlergia';
import { ReacaoAlergia } from '../../model/ReacaoAlergia';
import { SeveridadeAlergia } from '../../model/SeveridadeAlergia';
import { AberturaOcular } from '../../model/AberturaOcular';
import { RespostaVerbal } from '../../model/RespostaVerbal';
import { RespostaMotora } from '../../model/RespostaMotora';
import { TipoOcorrencia } from '../../model/TipoOcorrencia';
import { Estado } from '../../model/Estado';
import { PessoaService } from '../cadastro/pessoa/pessoa.service';
import { Cep } from '../../model/Cep';
import { Cidade } from '../../model/Cidade';
import * as RemoveAcentos from 'remove-accents';
import { Risco } from '../../model/risco';
import { NgForm } from '@angular/forms';
import { ClassificacaoRisco } from '../../model/ClassificacaoRisco';
import { ClassificacaoRiscoAlergia } from '../../model/ClassificacaoRiscoAlergia';
import * as swal from '../../../assets/vendors/general/sweetalert2/dist/sweetalert2.js';
import { AuthGuard } from '../../controller/auth/auth.guard';
import { ActivatedRoute } from '@angular/router';
import { ImcService } from '../util/imc.service';
import { SinaisVitais } from '../util/sinaisvitais.service';
import { DataService } from '../util/data.service';


@Component({
  selector: 'app-classificacaorisco',
  templateUrl: './classificacaorisco.component.html',
  styleUrls: ['./classificacaorisco.component.css'],
  providers: [ClassificacaoRiscoPipe]
})



export class ClassificacaoRiscoComponent implements OnInit {

  listaCausasExterna: Array<CausaExterna>;
  listaEscalasDor: Array<EscalaDor>;
  listaNiveisConsciencia: Array<NivelConsciencia>;
  listaTiposChegada: Array<TipoChegada>;
  listaEspecialidade: Array<Especialidade>;
  ListaPossuiAlergia: any;
  listaTipoAlergia: Array<TipoAlergia>;
  listaAlergia: Array<Alergia>;
  listaLocalizacaoAlergia: Array<LocalizacaoAlergia>;
  listaReacaoAlergia: Array<ReacaoAlergia>;
  listaSeveridadeAlergia: Array<SeveridadeAlergia>;
  listaAberturaOcular: Array<AberturaOcular>;
  listaRespostaVerbal: Array<RespostaVerbal>;
  listaRespostaMotora: Array<RespostaMotora>;
  listaTipoOcorrencia: Array<TipoOcorrencia>;
  listaEstado: Array<Estado>;
  listaCidade: Array<Cidade>;
  listaCep: Array<Cep>;
  listaRisco: Array<Risco>;
 // listaClassificacaoRiscoAlergia: Array<ClassificacaoRiscoAlergia>;
 listaClassificacaoRiscoAlergia: any;

  CausaExterna: CausaExterna;
  NivelConsciencia: NivelConsciencia;
  TipoChegada: TipoChegada;
  Especialidade: Especialidade;
  PossuiAlergia: any;
  TipoAlergia: TipoAlergia;
  Alergia: Alergia;
  LocalizacaoAlergia: LocalizacaoAlergia;
  ReacaoAlergia: ReacaoAlergia;
  SeveridadeAlergia: SeveridadeAlergia;
  AberturaOcular: AberturaOcular;
  RespostaVerbal: RespostaVerbal;
  RespostaMotora: RespostaMotora;
  TipoOcorrencia: TipoOcorrencia;
  Estado: Estado;
  Cidade: Cidade;
  ClassificacaoRiscoAlergia: ClassificacaoRiscoAlergia;
  orderDescricao: string = 'descricao';
  orderNome: string = 'nome';
  orderGlasgow: string = 'ordem';

  constructor(private classificacaoriscoservice: ClassificaoRiscoService, 
    private pessoaService: PessoaService, private auth: AuthGuard, 
    private route: ActivatedRoute, private imcService: ImcService, 
    private sinaisvitaisService: SinaisVitais, private dataService: DataService,) {
    this.listaClassificacaoRiscoAlergia = new Array<ClassificacaoRiscoAlergia>();
  }

  ngOnInit() {
    $C.noConflict();

    $C(document).ready(function () {
 

      document.title = 'Classificação de Risco | Klinikos';
      $C("h3[class^=k-subheader__title]").html("Classificação de Risco");

      $C("select[name^=DP_Endereco_Cidade]").val($C("select[name^=DP_Endereco_Cidade] option:first").val());

      $C.getScript("../../../assets/demo/default/base/scripts.bundle.js", function (data: any, textStatus: any, jqxhr: any) {
      });

      $C.getScript("../../../assets/vendors/general/bootstrap/dist/js/bootstrap.min.js", function (data: any, textStatus: any, jqxhr: any) {
      });
  
      $C.getScript("../../../assets/vendors/general/tooltip.js/dist/umd/tooltip.min.js", function (data: any, textStatus: any, jqxhr: any) {
      });

      $C.getScript("../../../assets/app/custom/general/interface.js", function (data: any, textStatus: any, jqxhr: any) {
      });
    

      $C('.ed').on('click', function () {

  
        // sweep radio-buttons
        var escala = $C(this);
        var radios = $C('input[type="radio"][name="EscalaDor"]').parent();
    
        // check
        if (!$C(escala).hasClass('active')) {
          $C(escala).removeClass('ed-opac');
          // restore opacity other options
          $C(radios).each(function (i, e) {
            // check each
            if ($C(e) != escala) {
              if ($C(e).hasClass('active')) {
                $C(e).removeClass('active');
                $C(e).addClass('ed-opac');
              }
            }
    
          });
        }
      });
    });

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    this.classificacaoriscoservice.BindCausaExterna().subscribe(async (data: Return) => {
      this.listaCausasExterna = data.result;


      $C(document).ready(function () { $C("select[name^=CausaExterna]").val($C("select[name^=CausaExterna] option:first").val()); });


    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });

    this.classificacaoriscoservice.BindEscalaDor().subscribe(async (data: Return) => {
      this.listaEscalasDor = data.result;



    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });

    this.classificacaoriscoservice.BindNivelConsciencia().subscribe(async (data: Return) => {
      this.listaNiveisConsciencia = data.result;


    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });


    this.classificacaoriscoservice.BindTipoChegada().subscribe(async (data: Return) => {
      this.listaTiposChegada = data.result;
      $C(document).ready(function () { $C("select[name^=TipoChegada]").val($C("select[name^=TipoChegada] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });



    this.classificacaoriscoservice.BindEspecialidade().subscribe(async (data: Return) => {
      this.listaEspecialidade = data.result;
      $C(document).ready(function () { $C("select[name^=Especialidade]").val($C("select[name^=Especialidade] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });


    this.ListaPossuiAlergia = [{ 'id': '0', 'descricao': 'SIM' }, { 'id': '1', 'descricao': 'NÃO' }, { 'id': '2', 'descricao': 'NÃO INFORMADO' }];
    $C(document).ready(function () { $C("select[name^=PossuiAlergia]").val($C("select[name^=PossuiAlergia] option:first").val()); });


    this.classificacaoriscoservice.BindAberturaOcular().subscribe(async (data: Return) => {
      this.listaAberturaOcular = data.result;
      $C(document).ready(function () { $C("select[name^=AberturaOcular]").val($C("select[name^=AberturaOcular] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });

    this.classificacaoriscoservice.BindRespostaVerbal().subscribe(async (data: Return) => {
      this.listaRespostaVerbal = data.result;
      $C(document).ready(function () { $C("select[name^=RespostaVerbal]").val($C("select[name^=RespostaVerbal] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });

    this.classificacaoriscoservice.BindRespostaVerbal().subscribe(async (data: Return) => {
      this.listaRespostaVerbal = data.result;
      $C(document).ready(function () { $C("select[name^=RespostaVerbal]").val($C("select[name^=RespostaVerbal] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });


    this.classificacaoriscoservice.BindRespostaMotora().subscribe(async (data: Return) => {
      this.listaRespostaMotora = data.result;
      $C(document).ready(function () { $C("select[name^=RespostaMotora]").val($C("select[name^=RespostaMotora] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });

    this.classificacaoriscoservice.BindTipoOcorrencia().subscribe(async (data: Return) => {
      this.listaTipoOcorrencia = data.result;
      console.log(data.result);

      $C(document).ready(function () { $C("select[name^=DO_TipoOcorrencia]").val($C("select[name^=DO_TipoOcorrencia] option:first").val()); });
    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });

    this.pessoaService.BindEstado().subscribe(async (data: Return) => {
      this.listaEstado = data.result;

      $C(document).ready(function () { $C("select[name^=DP_Endereco_Estado]").val($C("select[name^=DP_Endereco_Estado] option:first").val()); });
    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });

    this.classificacaoriscoservice.BindRisco().subscribe(async (data: Return) => {
      this.listaRisco = data.result;

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });
  }




  onPossuiAlergia() {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    if (this.PossuiAlergia.id == 0) {

      this.classificacaoriscoservice.BindTipoAlergia().subscribe(async (data: Return) => {
        this.listaTipoAlergia = data.result;
        $C(document).ready(function () { $C("select[name^=TipoAlergia]").val($C("select[name^=TipoAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
      });

      this.classificacaoriscoservice.BindAlergia().subscribe(async (data: Return) => {
        this.listaAlergia = data.result;
        $C(document).ready(function () { $C("select[name^=Alergia]").val($C("select[name^=Alergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
      });


      this.classificacaoriscoservice.BindLocalizacaoAlergia().subscribe(async (data: Return) => {
        this.listaLocalizacaoAlergia = data.result;
        $C(document).ready(function () { $C("select[name^=LocalizacaoAlergia]").val($C("select[name^=LocalizacaoAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
      });

      this.classificacaoriscoservice.BindReacaoAlergia().subscribe(async (data: Return) => {
        this.listaReacaoAlergia = data.result;
        $C(document).ready(function () { $C("select[name^=ReacaoAlergia]").val($C("select[name^=ReacaoAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
      });

      this.classificacaoriscoservice.BindSeveridade().subscribe(async (data: Return) => {
        this.listaSeveridadeAlergia = data.result;
        $C(document).ready(function () { $C("select[name^=SeveridadeAlergia]").val($C("select[name^=SeveridadeAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
      });


      // show card : Alergia
      $C('#AlergiaCard').removeClass('oculta');
      $C('#collapseOne3').addClass('show');
      $C('select[name="AlergiaTipo"]').focus();

    } else {
      $C('#AlergiaCard').addClass('oculta');
      $C('#collapseOne3').removeClass('show');
    }

  }

  //begin:: Consulta Cep / Consulta tanto o CEP, quanto o logradouro e atribui aos campos correspondentes
  onBuscaCep() {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    var dp_cep = $C("input[name^=DO_CEP]").val().replace('-', '');
    var dp_logradouro = $C.trim($C("input[name^=DO_Logradouro]").val());

    var cep: Cep = {}

    if ($C.isNumeric(dp_cep) && dp_cep.length === 8)
      cep.cep = dp_cep;

    if (this.Estado != undefined)
      cep.uf = this.Estado.uf.toLowerCase();

    if (this.Cidade != undefined)
      cep.localidade = this.Cidade.nome.toLowerCase();

    if (dp_logradouro !== "")
      cep.logradouro = dp_logradouro.toLowerCase();


    if ($C.isNumeric(dp_cep) && dp_cep.length === 8 && dp_logradouro === "") {


      this.pessoaService.BuscarCep(cep)
        .subscribe(data => {

          if (data.logradouro === undefined) {
            Toastr.warning("CEP não encontrado");
          } else {


            $C("input[name^=DO_Logradouro]").val(data.logradouro.toUpperCase())
            $C("input[name^=DO_Bairro]").val(data.bairro.toUpperCase())

            this.Estado = this.listaEstado.find(x => x.uf == data.uf.toUpperCase())

            this.pessoaService.BindCidade(this.Estado).subscribe(subdata => {

              this.listaCidade = subdata.result;

              var cidadeSelecionada = RemoveAcentos.remove(data.localidade);

              this.Cidade = this.listaCidade.find(x => x.nome == cidadeSelecionada.toUpperCase());


            }, (error: HttpErrorResponse) => {
                this.auth.onSessaoInvalida(error);
            });

          }
        }, (error: HttpErrorResponse) => {
            this.auth.onSessaoInvalida(error);
        });
    } else {

      if (dp_logradouro !== "" && !$C.isNumeric(dp_cep) && dp_cep.length === 0) {

        if (dp_logradouro.length > 3) {
          //$C('#divPesquisaLogradouro').removeClass('oculta');
          $C('#divPesquisaLogradouro').addClass('show');
          this.pessoaService.BuscarCepPorLogradouro(cep)
            .subscribe(data => {

              this.listaCep = data;
            }, (error: HttpErrorResponse) => {
                this.auth.onSessaoInvalida(error);
            });

        } else {
          $C('#divPesquisaLogradouro').removeClass('show');
          //$C('#divPesquisaLogradouro').addClass('oculta');
        }



      }
    }
  }
  //end:: Consulta Cep

  //begin:: Fecha as pesquisas
  onFechaPesquisa() {

    if ($C("#divPesquisaNomeCompleto").hasClass('show'))
      $C("#divPesquisaNomeCompleto").removeClass('show');

    if ($C("#divPesquisaLogradouro").hasClass('show'))
      $C("#divPesquisaLogradouro").removeClass('show');

    if ($C("#divPesquisaNomeSocial").hasClass('show'))
      $C("#divPesquisaNomeSocial").removeClass('show');
  }
  //end:: Fecha as pesquisas

  //begin:: Seleciona Endereco / Responsável por selecionar o cep vindo da consulta cep logradouro
  public onSelectedCep(cep: any) {

    $C("input[name^=DO_CEP]").val(cep.cep);
    $C("input[name^=DO_Logradouro]").val(cep.logradouro.toUpperCase());
    $C("input[name^=DO_Bairro]").val(cep.bairro.toUpperCase());
    $C("input[name^=DO_Complemento]").val(cep.complemento.toUpperCase());
    $C('#divPesquisaLogradouro').addClass('oculta');
  }
  //end:: Seleciona Endereco

  onSelectedUf() {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    $C(document).ready(function () { $C("select[name^=DP_Endereco_Cidade]").val($C("select[name^=DP_Endereco_Cidade] option:first").val()); });

    this.pessoaService.BindCidade(this.Estado).subscribe(async (data: Return) => {
      this.listaCidade = data.result;

      $C(document).ready(function () { $C("select[name^=DP_Endereco_Cidade]").val($C("select[name^=DP_Endereco_Cidade] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });


  }


  public onSalvarClassificacaoRisco(cr: NgForm) {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    $C("#k_scrolltop").trigger("click");

    var imc = $C("input[name^=SV_IMC]").val();
    var nivelConsciencia = $C("input[name^=nivelConsciencia]:checked").val();
    var escalaGlasgow = $C("input[name^=EscalaGlasgow]").val();
    var dataOcorrencia = $C("input[name^=DO_Data]").val();
    var horaOcorrencia = $C("input[name^=DO_Hora]").val();
    var cep = $C("input[name^=DO_CEP]").val();

    var classificacaorisco: ClassificacaoRisco = {};


    if (cr.value.DescricaoQueixa !== "")
      classificacaorisco.descricaoQueixa = cr.value.DescricaoQueixa.toUpperCase();



    if (this.CausaExterna !== undefined && this.CausaExterna !== null)
      classificacaorisco.causaExternaId = this.CausaExterna.causaExternaId;

    if ($C("label[for^=EscalaDor0]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 0).escalaDorId;

    if ($C("label[for^=EscalaDor1]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 1).escalaDorId;

    if ($C("label[for^=EscalaDor2]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 2).escalaDorId;

    if ($C("label[for^=EscalaDor3]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 3).escalaDorId;

    if ($C("label[for^=EscalaDor4]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 4).escalaDorId;

    if ($C("label[for^=EscalaDor5]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 5).escalaDorId;

    if ($C("label[for^=EscalaDor6]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 6).escalaDorId;

    if ($C("label[for^=EscalaDor7]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 7).escalaDorId;

    if ($C("label[for^=EscalaDor8]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 8).escalaDorId;

    if ($C("label[for^=EscalaDor9]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 9).escalaDorId;

    if ($C("label[for^=EscalaDor10]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 10).escalaDorId;

    if (cr.value.SV_Peso !== "")
      classificacaorisco.peso = cr.value.SV_Peso + " kg";

    if (cr.value.SV_Altura !== "")
      classificacaorisco.altura = cr.value.SV_Altura + " cm";

    if (imc !== undefined)
      classificacaorisco.imc = imc.toUpperCase();

    if (cr.value.SV_Temperatura !== "")
      classificacaorisco.temperatura = cr.value.SV_Temperatura + " °C";

    if (cr.value.SV_PreArterialDiastolica !== "")
      classificacaorisco.pressaoArterialDiastolica = cr.value.SV_PreArterialDiastolica + " mmHg";

    if (cr.value.SV_PreArterialSistolica !== "")
      classificacaorisco.pressaoArterialSistolica = cr.value.SV_PreArterialSistolica + " mmHg";

    if (cr.value.Pulso !== "")
      classificacaorisco.pulso = cr.value.Pulso + " bpm";

    if (cr.value.FreqRespiratoria !== "")
      classificacaorisco.frequenciaRespiratoria = cr.value.FreqRespiratoria + " rpm";


    if (nivelConsciencia !== undefined)
      classificacaorisco.nivelConscienciaId = this.listaNiveisConsciencia.find(x => x.nivelConscienciaId === nivelConsciencia).nivelConscienciaId;

    classificacaorisco.sutura = cr.value.Sutura !== "" ? true : false;

    if (cr.value.Saturacao !== "")
      classificacaorisco.saturacao = cr.value.Saturacao + " %";

    classificacaorisco.hipertensao = cr.value.DPE_Hipertensao !== "" ? true : false;
    classificacaorisco.diabete = cr.value.DPE_Diabete !== "" ? true : false;
    classificacaorisco.cardiopata = cr.value.DPE_Cardiopata !== "" ? true : false;
    classificacaorisco.renalCronico = cr.value.DPE_RenalCronico !== "" ? true : false;
    classificacaorisco.respiratoriaCronica = cr.value.DPE_RespCronico !== "" ? true : false;
    classificacaorisco.outros = cr.value.DPE_Outros !== "" ? true : false;

    if (cr.value.DPE_RespCronico === true && cr.value.DoencaPreExistRespCron !== "")
      classificacaorisco.observacaoRespiratoriaCronica = cr.value.DoencaPreExistRespCron;

    if (cr.value.DPE_Outros === true && cr.value.DoencaPreExistOutros !== "")
      classificacaorisco.observacaoOutros = cr.value.DoencaPreExistOutros;

    if (this.TipoChegada !== undefined && this.TipoChegada !== null)
      classificacaorisco.tipoChegadaId = this.TipoChegada.tipoChegadaId;

    if (this.Especialidade !== undefined && this.Especialidade !== null)
      classificacaorisco.especialidadeId = this.Especialidade.especialidadeId;

    if ($C("label[for^=riscoazul]").hasClass("active"))
      classificacaorisco.riscoId = this.listaRisco.find(x => x.descricao === "AZUL").riscoId;

    if ($C("label[for^=riscoverde]").hasClass("active"))
      classificacaorisco.riscoId = this.listaRisco.find(x => x.descricao === "VERDE").riscoId;

    if ($C("label[for^=riscoamareloconsultorio]").hasClass("active"))
      classificacaorisco.riscoId = this.listaRisco.find(x => x.descricao === "AMARELO CONSULTÓRIO").riscoId;

    if ($C("label[for^=riscoId]").hasClass("active"))
      classificacaorisco.riscoId = this.listaRisco.find(x => x.descricao === "AMARELO OBSERVAÇÃO").riscoId;

    if ($C("label[for^=riscolaranja]").hasClass("active"))
      classificacaorisco.riscoId = this.listaRisco.find(x => x.descricao === "LARANJA").riscoId;

    if ($C("label[for^=riscovermelho]").hasClass("active"))
      classificacaorisco.riscoId = this.listaRisco.find(x => x.descricao === "VERMELHO").riscoId;

      var msgCamposObrigatorios = "";

      if (classificacaorisco.riscoId === undefined)
        msgCamposObrigatorios = "Informe o risco\n";
  
      if (this.TipoChegada === undefined)
        if (classificacaorisco.riscoId !== undefined)
          msgCamposObrigatorios = msgCamposObrigatorios + "Informe como chegou ";
        else
          msgCamposObrigatorios = msgCamposObrigatorios + ", como chegou ";
  
      if (this.Especialidade === undefined)
        if (this.TipoChegada !== undefined)
          msgCamposObrigatorios = msgCamposObrigatorios + "Informe a especialidade ";
        else
          msgCamposObrigatorios = msgCamposObrigatorios + "e a especialidade ";


      if(this.AberturaOcular !== undefined || this.RespostaVerbal !== undefined || this.RespostaMotora !== undefined)
        if(this.AberturaOcular === undefined || this.RespostaVerbal === undefined || this.RespostaMotora === undefined)
         if (this.Especialidade !== undefined)
            msgCamposObrigatorios = msgCamposObrigatorios + "Finalize a escala de Glasgow";
          else{
            
            msgCamposObrigatorios = msgCamposObrigatorios.replace('e a especialidade',', especialidade ');
            msgCamposObrigatorios = msgCamposObrigatorios + "e finalizar a escala de Glasgow";
          }
  
      if (msgCamposObrigatorios !== "") {
        swal("Campos Obrigatórios", msgCamposObrigatorios, "error");
        return;
      }



    if (this.listaClassificacaoRiscoAlergia.length > 0) {

      classificacaorisco.ClassificacoesRiscoAlergia = [];
      classificacaorisco.ClassificacoesRiscoAlergia = this.listaClassificacaoRiscoAlergia;
    }

    if (this.AberturaOcular !== undefined)
      classificacaorisco.aberturaOcularId = this.AberturaOcular.aberturaOcularId;

    if (this.RespostaVerbal !== undefined)
      classificacaorisco.respostaVerbalId = this.RespostaVerbal.respostaVerbalId;

    if (this.RespostaMotora !== undefined)
      classificacaorisco.respostaMotoraId = this.RespostaMotora.respostaMotoraId;

    if (this.AberturaOcular !== undefined && this.RespostaVerbal !== undefined && this.RespostaMotora !== undefined)
      classificacaorisco.status = escalaGlasgow;

    if (cr.value.DO_Procedencia !== "")
      classificacaorisco.procedencia = cr.value.DO_Procedencia.toUpperCase();

    if (this.listaTipoOcorrencia !== null)
      classificacaorisco.tipoOcorrenciaId = this.TipoOcorrencia.tipoOcorrenciaId;


    if (dataOcorrencia !== "") {
      var data = dataOcorrencia.split("/");
      var newData = new Date(data[2] + '-' + data[1] + '-' + data[0]);

      if (horaOcorrencia !== "") {
        var hora = horaOcorrencia.split(":");
        newData.setHours(newData.getHours() + parseInt(hora[0]));
        newData.setMinutes(newData.getMinutes() + parseInt(hora[1]));
      }
      classificacaorisco.dataOcorrencia = newData;
    }

    classificacaorisco.pab = $C("label[for^=PAB]").hasClass("active") ? true : false;
    classificacaorisco.paf = $C("label[for^=PAF]").hasClass("active") ? true : false;

    if (cep !== "")
      classificacaorisco.cep = cep.replace('-', '');

    if (cr.value.DO_Logradouro !== "")
      classificacaorisco.logradouro = cr.value.DO_Logradouro.toUpperCase();

    if (cr.value.DO_Numero !== "")
      classificacaorisco.numero = cr.value.DO_Numero.toUpperCase();

    if (cr.value.DO_Complemento !== "")
      classificacaorisco.complemento = cr.value.DO_Complemento.toUpperCase();

    if (this.Estado !== null)
      classificacaorisco.estadoId = this.Estado.estadoId;

    if (this.Cidade !== null)
      classificacaorisco.cidadeId = this.Cidade.cidadeId;

    if (cr.value.DO_Bairro !== "")
      classificacaorisco.bairro = cr.value.DO_Bairro.toUpperCase();

    console.log(JSON.stringify(classificacaorisco));

    this.classificacaoriscoservice.SalvarClassificacaoRisco(classificacaorisco).subscribe(async (data: Return) => {
      this.listaSeveridadeAlergia = data.result;

      Toastr.success("Classificação de Risco salvo com sucesso");

      this.onLimpaFormClassificacaoRisco(cr);

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });


  }



  onAdicionaAlergia() {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    if (this.TipoAlergia !== null && this.Alergia !== null) {


      var datasintomas = $C("input[name^=AlergiaData]").val();

      var alergiaSituacao = $C('input[type=checkbox][name^=AlergiaAtivo]').prop("checked");

      var classificacaoriscoAlergia: any = {};


      classificacaoriscoAlergia.TipoAlergia = this.TipoAlergia.descricao;
      classificacaoriscoAlergia.Alergia = this.Alergia.nome;

      if (this.LocalizacaoAlergia !== null)
        classificacaoriscoAlergia.LocalizacaoAlergia = this.LocalizacaoAlergia.nome;

      if (this.ReacaoAlergia !== null)
        classificacaoriscoAlergia.ReacaoAlergia = this.ReacaoAlergia.descricao;

      if (this.SeveridadeAlergia !== null)
        classificacaoriscoAlergia.SeveridadeAlergia = this.SeveridadeAlergia.nome;


      if (datasintomas !== "") {

        var data = datasintomas.split("/");
        classificacaoriscoAlergia.dataSintomas = new Date(data[2] + '/' + data[1] + '/' + data[0]);
      }

      classificacaoriscoAlergia.alergiaSituacao = alergiaSituacao;


      if (this.listaClassificacaoRiscoAlergia.find(x => x.tipoAlergiaId === this.TipoAlergia.tipoAlergiaId && x.alergiaId === this.Alergia.alergiaId) === undefined && this.ClassificacaoRiscoAlergia === undefined) {

        this.listaClassificacaoRiscoAlergia.push(classificacaoriscoAlergia);

      } else if (this.ClassificacaoRiscoAlergia !== undefined) {

        if (this.ClassificacaoRiscoAlergia.tipoAlergiaId != classificacaoriscoAlergia.tipoAlergiaId && this.ClassificacaoRiscoAlergia.alergiaId != classificacaoriscoAlergia.alergiaId) 
          if (this.listaClassificacaoRiscoAlergia.find(x => x.tipoAlergiaId === this.TipoAlergia.tipoAlergiaId && x.alergiaId === this.Alergia.alergiaId))
            return;
        
        var index = this.listaClassificacaoRiscoAlergia.findIndex(x => x.tipoAlergiaId === this.TipoAlergia.tipoAlergiaId || x.alergiaId === this.Alergia.alergiaId);
        this.listaClassificacaoRiscoAlergia[index] = classificacaoriscoAlergia;

      }
    } else {

        $C('select').val($C("select option:first").val());
      


    }


    this.onLimparCamposAlergia();
  }

  onLimparCamposAlergia() {

    $C("input[name^=Prof_NumConselho]").val("");
    this.TipoAlergia = undefined;
    this.Alergia = undefined;
    this.LocalizacaoAlergia = undefined;
    this.ReacaoAlergia = undefined;
    this.SeveridadeAlergia = undefined;
    this.ClassificacaoRiscoAlergia = undefined;

    $C(document).ready(function () {
      $C("select[name^=TipoAlergia]").val($C("select[name^=TipoAlergia] option:first").val());
      $C("select[name^=Alergia]").val($C("select[name^=Alergia] option:first").val());
      $C("select[name^=LocalizacaoAlergia]").val($C("select[name^=LocalizacaoAlergia] option:first").val());
      $C("select[name^=ReacaoAlergia]").val($C("select[name^=ReacaoAlergia] option:first").val());
      $C("select[name^=SeveridadeAlergia]").val($C("select[name^=SeveridadeAlergia] option:first").val());
      $C("input[name^=AlergiaData]").val("");
      $C("input[name^=AlergiaAtivo]").prop("checked", false);
      //$C('#msg_tipoprofissional').addClass('oculta');
      $C('#btnCancelarAlergia').addClass('oculta');
      $C("#btnAddNovaAlergia").html('<i class="fa fa-plus"></i>Adicionar');
    });
  }

  onCalculaStatusEscalaGlasgow() {

    if (this.AberturaOcular != null && this.RespostaVerbal != null && this.RespostaMotora != null) {

      var totalRespostas = this.AberturaOcular.escore + this.RespostaVerbal.escore + this.RespostaMotora.escore;

      if (8 >= totalRespostas)
        $C("input[name^=EscalaGlasgow]").val(totalRespostas + " - Trauma Grave");
      else if (12 >= totalRespostas)
        $C("input[name^=EscalaGlasgow]").val(totalRespostas + " - Trauma Moderado");
      else if (15 >= totalRespostas)
        $C("input[name^=EscalaGlasgow]").val(totalRespostas + " - Trauma Leve");
    }
  }

  onLimpaCamposGlasgow() {

    this.AberturaOcular = null;
    this.RespostaVerbal = null;
    this.RespostaMotora = null;
    $C("input[name^=EscalaGlasgow]").val("");

    $C(document).ready(function () {

      $C("select[name^=AberturaOcular]").val($C("select[name^=AberturaOcular] option:first").val());
      $C("select[name^=RespostaVerbal]").val($C("select[name^=RespostaVerbal] option:first").val());
      $C("select[name^=RespostaMotora]").val($C("select[name^=RespostaMotora] option:first").val());

    });
  }

  public onLimpaFormClassificacaoRisco(form: NgForm) {

    $C("#k_scrolltop").trigger("click");
    form.reset();
    form.value.DescricaoQueixa = "";
    form.value.SV_Peso = "";
    form.value.SV_Altura = "";
    form.value.SV_Temperatura = "";
    form.value.SV_PreArterialDiastolica = "";
    form.value.SV_PreArterialSistolica = "";
    form.value.FreqRespiratoria = "";
    form.value.Sutura = "";
    form.value.Saturacao = "";
    form.value.DPE_Hipertensao = "";
    form.value.DPE_Diabete = "";
    form.value.DPE_Cardiopata = "";
    form.value.DPE_RenalCronico = "";
    form.value.DPE_RespCronico = "";
    form.value.DPE_Outros = "";
    form.value.DoencaPreExistRespCron = "";
    form.value.DoencaPreExistOutros = "";
    form.value.DO_Procedencia = "";
    form.value.DO_Logradouro = "";
    form.value.DO_Numero = "";
    form.value.DO_Complemento = "";
    form.value.DO_Bairro = "";

  
   
    
  }

  //begin:: Edita Lotacao Profissional / Permite o usuário editar as lotações lançadas na aba profissional
  onEditarAlergia(classificacaoRiscoAlergia: ClassificacaoRiscoAlergia) {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    this.TipoAlergia = this.listaTipoAlergia.find(x => x.tipoAlergiaId === classificacaoRiscoAlergia.tipoAlergiaId);
    this.Alergia = this.listaAlergia.find(x => x.alergiaId === classificacaoRiscoAlergia.alergiaId);
    this.LocalizacaoAlergia = this.listaLocalizacaoAlergia.find(x => x.localizacaoAlergiaId === classificacaoRiscoAlergia.localizacaoAlergiaId);
    this.ReacaoAlergia = this.listaReacaoAlergia.find(x => x.reacaoAlergiaId === classificacaoRiscoAlergia.reacaoAlergiaId);
    this.SeveridadeAlergia = this.listaSeveridadeAlergia.find(x => x.severidadeAlergiaId === classificacaoRiscoAlergia.severidadeAlergiaId);

    if (classificacaoRiscoAlergia.dataSintomas != null) {

      var dataSintomas = new Date(classificacaoRiscoAlergia.dataSintomas),
        month = '' + (dataSintomas.getMonth() + 1),
        day = '' + dataSintomas.getDate(),
        year = dataSintomas.getFullYear();

      $C("input[name^=AlergiaData]").val(("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year);
    }

    $C("input[name^=AlergiaAtivo]").prop("checked", false);

    this.ClassificacaoRiscoAlergia = classificacaoRiscoAlergia;

    $C("#btnAddNovaAlergia").html("<i class='fa fa-plus'></i>Salvar");
    $C('#btnCancelarAlergia').removeClass('oculta');

  }
  //end::  Edita Lotacao Profissional


  //begin:: Exibe Mensagem Excluir / Alerta o usuário da confirmação da exclusão na aba profissional
  onExibeMensagemExcluir(classificacaoRiscoAlergia: ClassificacaoRiscoAlergia) {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    var page = this;

    return swal({ title: 'Deseja excluir essa alergia?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })

      .then(function (result: any) {
        if (result.value) {
          page.onExcluirAlergia(classificacaoRiscoAlergia);
        }

      });

  }
  //end:: Exibe Mensagem Excluir

  //begin:: Exclui lotacao Profissional / Alerta o usuário da confirmação da exclusão na aba profissional
  onExcluirAlergia(classificacaoRiscoAlergia: ClassificacaoRiscoAlergia) {

    var index = this.listaClassificacaoRiscoAlergia.findIndex(x => x.alergiaId === classificacaoRiscoAlergia.alergiaId);
    this.listaClassificacaoRiscoAlergia.splice(index, 1);
  }
  //end:: Exibe Mensagem Excluir


  onCalculaImc(){

    var peso = $C("input[name^=Peso]").val();
    var altura = $C("input[name^=Altura]").val();
  
      if(peso !== "" && altura !== ""){
  
        var imc = this.imcService.CalculaImc(peso, altura);
  
        $C('input[name^=IMC]').val(imc);
      }
  
      
    }

    onValidaTemperatura(){

      var temp = $C('input[name^=SV_Temperatura]').val();
 
      var msg_validacao = this.sinaisvitaisService.ValidaTemperatura(temp);
 
      switch(msg_validacao) { 
       case 'normal': { 
         $C('#msg_erro_temperatura').addClass('oculta');
          break; 
       } 
       case 'recomendar': { 
        $C('#msg_erro_temperatura').prop('class','form-text text-info');
        $C('#msg_erro_temperatura').html('<b>Temperatura:</b> Indicado valores entre 35º à 40º');
        
          break; 
       } 
       case 'bloquear': { 
        $C('#msg_erro_temperatura').prop('class','form-text text-danger');
        $C('#msg_erro_temperatura').html('<b>Temperatura:</b> Não permitido menor que 33º e maior que 45º');
         break; 
      } 
    } 
 
      }

      onValidaSaturacao(){

        var saturacao = $C('input[name^=SV_Saturacao]').val();
       var msg_validacao = this.sinaisvitaisService.ValidaSaturacao(saturacao);

       switch(msg_validacao) { 
        case 'normal': { 
          $C('#msg_erro_saturacao').addClass('oculta');
           break; 
        } 
        case 'recomendar': { 
          $C('#msg_erro_saturacao').prop('class','form-text text-info');
          $C('#msg_erro_saturacao').html('<b>Saturação:</b> Indicado valor acima de 85%');
           break; 
        } 
        case 'bloquear': { 
          $C('#msg_erro_saturacao').prop('class','form-text text-danger');
          $C('#msg_erro_saturacao').html('<b>Saturação:</b> Não permitido maior que 100%');
  
          
          break; 
       } 
     } 
       }

       onValidaFreqResp(){

        var freq_resp = $C('input[name^=SV_FreqResp]').val();
  
        var msg_validacao = this.sinaisvitaisService.ValidaFrequenciaRespiratoria(freq_resp);
  
        switch(msg_validacao) { 
         case 'normal': { 
         $C('#msg_erro_freq_respiratoria').addClass('oculta');
            break; 
         } 
         case 'recomendar': { 
          $C('#msg_erro_freq_respiratoria').prop('class','form-text text-info');
          $C('#msg_erro_freq_respiratoria').html('<b>Freq Respiratória:</b> Indicado valores entre 12 e 60 (rpm)');
            break; 
         } 
         case 'bloquear': { 
          $C('#msg_erro_freq_respiratoria').removeClass('oculta');
          $C('#msg_erro_freq_respiratoria').html('Freq Respiratória:</b> Não permitido menor que 10 e maior que 66');
           
           break; 
        } 
      }
  
       }

       onValidaPulso(){

        var pulso = $C('input[name^=SV_Pulso]').val();
    
        var msg_validacao = this.sinaisvitaisService.ValidaPulso(pulso);
  
        switch(msg_validacao) { 
         case 'normal': { 
          $C('#msg_erro_pulso').addClass('oculta');
            break; 
         } 
         case 'recomendar': { 
          $C('#msg_erro_pulso').prop('class','form-text text-info');
          $C('#msg_erro_pulso').html('Pulso: Indicado valores entre 60 à 120');
           break; 
         } 
         case 'bloquear': { 
          $C('#msg_erro_pulso').removeClass('oculta');
          $C('#msg_erro_pulso').html('Pulso: Não permitido menor que 40 e maior que 150');
           break; 
        } 
      }
  
       }

       onHabilitaDescricao(event: any){

        if(event.target.name === "DPE_Outros")
          if(event.target.checked){
            $C('#dpe_outros_box').removeClass('oculta');
            $C('textarea[name="DoencaPreExistOutros"]').focus();
           } else  
            $C('#dpe_outros_box').addClass('oculta');
          

         if(event.target.name === "DPE_RespCronico")
            if(event.target.checked){
              $C('#dpe_respcron_box').removeClass('oculta');
              $C('textarea[name="DoencaPreExistRespCron"]').focus();
             } else  
             $C('#dpe_respcron_box').addClass('oculta');

       }

       onValidaHora(event: any){

        var data = event.target.value.split(':');
        var d = new Date();
    

        if(+data[0] > 23 || +data[1] > 59 || event.target.value.length !== 5)
          $C("input[name^=DO_Hora]").val('');
        

    }

    onValidaData(event: any){

      if(event.target.name === "DO_Data")
      if(!this.dataService.validarData(event.target.value)){
        $C("input[name^=DO_Data]").val('');
        return;
       }
      }


      


}







