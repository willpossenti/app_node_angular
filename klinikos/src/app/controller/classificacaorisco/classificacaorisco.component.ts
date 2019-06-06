import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import * as $ from 'jquery';
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
  listaClassificacaoRiscoAlergia: Array<ClassificacaoRiscoAlergia>;

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
  orderVariavel: string = 'variavel';

  constructor(private classificacaoriscoservice: ClassificaoRiscoService, private pessoaService: PessoaService, private auth: AuthGuard, private route: ActivatedRoute ) {
    this.listaClassificacaoRiscoAlergia = new Array<ClassificacaoRiscoAlergia>();
  }

  ngOnInit() {

    $(document).ready(function () {

      document.title = 'Classificação de Risco | Klinikos';
      $("h3[class^=k-subheader__title]").html("Classificação de Risco");

      $("select[name^=DP_Endereco_Cidade]").val($("select[name^=DP_Endereco_Cidade] option:first").val());

    });

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    this.classificacaoriscoservice.BindCausaExterna().subscribe(async (data: Return) => {
      this.listaCausasExterna = data.result;


      $(document).ready(function () { $("select[name^=CausaExterna]").val($("select[name^=CausaExterna] option:first").val()); });


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
      $(document).ready(function () { $("select[name^=TipoChegada]").val($("select[name^=TipoChegada] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });



    this.classificacaoriscoservice.BindEspecialidade().subscribe(async (data: Return) => {
      this.listaEspecialidade = data.result;
      $(document).ready(function () { $("select[name^=Especialidade]").val($("select[name^=Especialidade] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });


    this.ListaPossuiAlergia = [{ 'id': '0', 'descricao': 'SIM' }, { 'id': '1', 'descricao': 'NÃO' }, { 'id': '2', 'descricao': 'NÃO INFORMADO' }];
    $(document).ready(function () { $("select[name^=PossuiAlergia]").val($("select[name^=PossuiAlergia] option:first").val()); });


    this.classificacaoriscoservice.BindAberturaOcular().subscribe(async (data: Return) => {
      this.listaAberturaOcular = data.result;
      $(document).ready(function () { $("select[name^=AberturaOcular]").val($("select[name^=AberturaOcular] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });

    this.classificacaoriscoservice.BindRespostaVerbal().subscribe(async (data: Return) => {
      this.listaRespostaVerbal = data.result;
      $(document).ready(function () { $("select[name^=RespostaVerbal]").val($("select[name^=RespostaVerbal] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });

    this.classificacaoriscoservice.BindRespostaVerbal().subscribe(async (data: Return) => {
      this.listaRespostaVerbal = data.result;
      $(document).ready(function () { $("select[name^=RespostaVerbal]").val($("select[name^=RespostaVerbal] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });


    this.classificacaoriscoservice.BindRespostaMotora().subscribe(async (data: Return) => {
      this.listaRespostaMotora = data.result;
      $(document).ready(function () { $("select[name^=RespostaMotora]").val($("select[name^=RespostaMotora] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });

    this.classificacaoriscoservice.BindTipoOcorrencia().subscribe(async (data: Return) => {
      this.listaTipoOcorrencia = data.result;
      console.log(data.result);

      $(document).ready(function () { $("select[name^=DO_TipoOcorrencia]").val($("select[name^=DO_TipoOcorrencia] option:first").val()); });
    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });

    this.pessoaService.BindEstado().subscribe(async (data: Return) => {
      this.listaEstado = data.result;

      $(document).ready(function () { $("select[name^=DP_Endereco_Estado]").val($("select[name^=DP_Endereco_Estado] option:first").val()); });
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
        $(document).ready(function () { $("select[name^=TipoAlergia]").val($("select[name^=TipoAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
      });

      this.classificacaoriscoservice.BindAlergia().subscribe(async (data: Return) => {
        this.listaAlergia = data.result;
        $(document).ready(function () { $("select[name^=Alergia]").val($("select[name^=Alergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
      });


      this.classificacaoriscoservice.BindLocalizacaoAlergia().subscribe(async (data: Return) => {
        this.listaLocalizacaoAlergia = data.result;
        $(document).ready(function () { $("select[name^=LocalizacaoAlergia]").val($("select[name^=LocalizacaoAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
      });

      this.classificacaoriscoservice.BindReacaoAlergia().subscribe(async (data: Return) => {
        this.listaReacaoAlergia = data.result;
        $(document).ready(function () { $("select[name^=ReacaoAlergia]").val($("select[name^=ReacaoAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
      });

      this.classificacaoriscoservice.BindSeveridade().subscribe(async (data: Return) => {
        this.listaSeveridadeAlergia = data.result;
        $(document).ready(function () { $("select[name^=SeveridadeAlergia]").val($("select[name^=SeveridadeAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
      });





      // show card : Alergia
      $('#AlergiaCard').removeClass('oculta');
      $('#collapseOne3').addClass('show');
      $('select[name="AlergiaTipo"]').focus();

    } else {
      $('#AlergiaCard').addClass('oculta');
      $('#collapseOne3').removeClass('show');
    }

  }

  //begin:: Consulta Cep / Consulta tanto o CEP, quanto o logradouro e atribui aos campos correspondentes
  onBuscaCep() {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    var dp_cep = $("input[name^=DO_CEP]").val().replace('-', '');
    var dp_logradouro = $.trim($("input[name^=DO_Logradouro]").val());

    var cep: Cep = {}

    if ($.isNumeric(dp_cep) && dp_cep.length === 8)
      cep.cep = dp_cep;

    if (this.Estado != undefined)
      cep.uf = this.Estado.uf.toLowerCase();

    if (this.Cidade != undefined)
      cep.localidade = this.Cidade.nome.toLowerCase();

    if (dp_logradouro !== "")
      cep.logradouro = dp_logradouro.toLowerCase();


    if ($.isNumeric(dp_cep) && dp_cep.length === 8 && dp_logradouro === "") {


      this.pessoaService.BuscarCep(cep)
        .subscribe(data => {

          if (data.logradouro === undefined) {
            Toastr.warning("CEP não encontrado");
          } else {


            $("input[name^=DO_Logradouro]").val(data.logradouro.toUpperCase())
            $("input[name^=DO_Bairro]").val(data.bairro.toUpperCase())

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

      if (dp_logradouro !== "" && !$.isNumeric(dp_cep) && dp_cep.length === 0) {

        if (dp_logradouro.length > 3) {
          //$('#divPesquisaLogradouro').removeClass('oculta');
          $('#divPesquisaLogradouro').addClass('show');
          this.pessoaService.BuscarCepPorLogradouro(cep)
            .subscribe(data => {

              this.listaCep = data;
            }, (error: HttpErrorResponse) => {
                this.auth.onSessaoInvalida(error);
            });

        } else {
          $('#divPesquisaLogradouro').removeClass('show');
          //$('#divPesquisaLogradouro').addClass('oculta');
        }



      }
    }
  }
  //end:: Consulta Cep

  //begin:: Fecha as pesquisas
  onFechaPesquisa() {

    if ($("#divPesquisaNomeCompleto").hasClass('show'))
      $("#divPesquisaNomeCompleto").removeClass('show');

    if ($("#divPesquisaLogradouro").hasClass('show'))
      $("#divPesquisaLogradouro").removeClass('show');

    if ($("#divPesquisaNomeSocial").hasClass('show'))
      $("#divPesquisaNomeSocial").removeClass('show');
  }
  //end:: Fecha as pesquisas

  //begin:: Seleciona Endereco / Responsável por selecionar o cep vindo da consulta cep logradouro
  public onSelectedCep(cep: any) {

    $("input[name^=DO_CEP]").val(cep.cep);
    $("input[name^=DO_Logradouro]").val(cep.logradouro.toUpperCase());
    $("input[name^=DO_Bairro]").val(cep.bairro.toUpperCase());
    $("input[name^=DO_Complemento]").val(cep.complemento.toUpperCase());
    $('#divPesquisaLogradouro').addClass('oculta');
  }
  //end:: Seleciona Endereco

  onSelectedUf() {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    $(document).ready(function () { $("select[name^=DP_Endereco_Cidade]").val($("select[name^=DP_Endereco_Cidade] option:first").val()); });

    this.pessoaService.BindCidade(this.Estado).subscribe(async (data: Return) => {
      this.listaCidade = data.result;

      $(document).ready(function () { $("select[name^=DP_Endereco_Cidade]").val($("select[name^=DP_Endereco_Cidade] option:first").val()); });

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });


  }


  public onSalvarClassificacaoRisco(cr: NgForm) {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();


    $("#k_scrolltop").trigger("click");


    var imc = $("input[name^=SV_IMC]").val();
    var nivelConsciencia = $("input[name^=nivelConsciencia]:checked").val();
    var escalaGlasgow = $("input[name^=EscalaGlasgow]").val();
    var dataOcorrencia = $("input[name^=DO_Data]").val();
    var horaOcorrencia = $("input[name^=DO_Hora]").val();
    var cep = $("input[name^=DO_CEP]").val();

    var classificacaorisco: ClassificacaoRisco = {};

    if (cr.value.DescricaoQueixa !== "")
      classificacaorisco.descricaoQueixa = cr.value.DescricaoQueixa.toUpperCase();

    if (this.CausaExterna !== undefined)
      classificacaorisco.causaExternaId = this.CausaExterna.causaExternaId;

    if ($("label[for^=EscalaDor0]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 0).escalaDorId;

    if ($("label[for^=EscalaDor1]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 1).escalaDorId;

    if ($("label[for^=EscalaDor2]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 2).escalaDorId;

    if ($("label[for^=EscalaDor3]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 3).escalaDorId;

    if ($("label[for^=EscalaDor4]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 4).escalaDorId;

    if ($("label[for^=EscalaDor5]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 5).escalaDorId;

    if ($("label[for^=EscalaDor6]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 6).escalaDorId;

    if ($("label[for^=EscalaDor7]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 7).escalaDorId;

    if ($("label[for^=EscalaDor8]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 8).escalaDorId;

    if ($("label[for^=EscalaDor9]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 9).escalaDorId;

    if ($("label[for^=EscalaDor10]").hasClass("active"))
      classificacaorisco.escalaDorId = this.listaEscalasDor.find(x => x.codigoEscalaDor === 10).escalaDorId;

    if (cr.value.SV_Peso !== "")
      classificacaorisco.peso = cr.value.SV_Peso + " kg";

    if (cr.value.SV_Altura !== "")
      classificacaorisco.altura = cr.value.SV_Altura + " cm";

    if (imc !== "")
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



    if (this.TipoChegada !== null)
      classificacaorisco.tipoChegadaId = this.TipoChegada.tipoChegadaId;

    if (this.Especialidade !== null)
      classificacaorisco.especialidadeId = this.Especialidade.especialidadeId;

    if ($("label[for^=riscoazul]").hasClass("active"))
      classificacaorisco.riscoId = this.listaRisco.find(x => x.descricao === "AZUL").riscoId;

    if ($("label[for^=riscoverde]").hasClass("active"))
      classificacaorisco.riscoId = this.listaRisco.find(x => x.descricao === "VERDE").riscoId;

    if ($("label[for^=riscoamareloconsultorio]").hasClass("active"))
      classificacaorisco.riscoId = this.listaRisco.find(x => x.descricao === "AMARELO CONSULTÓRIO").riscoId;

    if ($("label[for^=riscoId]").hasClass("active"))
      classificacaorisco.riscoId = this.listaRisco.find(x => x.descricao === "AMARELO OBSERVAÇÃO").riscoId;

    if ($("label[for^=riscolaranja]").hasClass("active"))
      classificacaorisco.riscoId = this.listaRisco.find(x => x.descricao === "LARANJA").riscoId;

    if ($("label[for^=riscovermelho]").hasClass("active"))
      classificacaorisco.riscoId = this.listaRisco.find(x => x.descricao === "VERMELHO").riscoId;

    console.log(localStorage['token_accessToken']);



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

    classificacaorisco.pab = $("label[for^=PAB]").hasClass("active") ? true : false;
    classificacaorisco.paf = $("label[for^=PAF]").hasClass("active") ? true : false;

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

      this.LimparCampos(cr);

    }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
    });


  }



  onAdicionaAlergia() {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    if (this.TipoAlergia !== null && this.Alergia !== null) {


      var datasintomas = $("input[name^=AlergiaData]").val();

      var alergiaSituacao = $('input[type=checkbox][name^=AlergiaAtivo]').prop("checked");

      var classificacaoriscoAlergia: ClassificacaoRiscoAlergia = {};


      classificacaoriscoAlergia.tipoAlergiaId = this.TipoAlergia.tipoAlergiaId;
      classificacaoriscoAlergia.alergiaId = this.Alergia.alergiaId;

      if (this.LocalizacaoAlergia !== null)
        classificacaoriscoAlergia.localizacaoAlergiaId = this.LocalizacaoAlergia.localizacaoAlergiaId;

      if (this.ReacaoAlergia !== null)
        classificacaoriscoAlergia.reacaoAlergiaId = this.ReacaoAlergia.reacaoAlergiaId;

      if (this.SeveridadeAlergia !== null)
        classificacaoriscoAlergia.severidadeAlergiaId = this.SeveridadeAlergia.severidadeAlergiaId;


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

      $(document).ready(function () {

        //$('#msg_tipoprofissional').removeClass('oculta');
      });

    }


    this.onLimparCamposAlergia();
  }

  onLimparCamposAlergia() {

    $("input[name^=Prof_NumConselho]").val("");
    this.TipoAlergia = undefined;
    this.Alergia = undefined;
    this.LocalizacaoAlergia = undefined;
    this.ReacaoAlergia = undefined;
    this.SeveridadeAlergia = undefined;
    this.ClassificacaoRiscoAlergia = undefined;

    $(document).ready(function () {
      $("select[name^=TipoAlergia]").val($("select[name^=TipoAlergia] option:first").val());
      $("select[name^=Alergia]").val($("select[name^=Alergia] option:first").val());
      $("select[name^=LocalizacaoAlergia]").val($("select[name^=LocalizacaoAlergia] option:first").val());
      $("select[name^=ReacaoAlergia]").val($("select[name^=ReacaoAlergia] option:first").val());
      $("select[name^=SeveridadeAlergia]").val($("select[name^=SeveridadeAlergia] option:first").val());
      $("input[name^=AlergiaData]").val("");
      $("input[name^=AlergiaAtivo]").prop("checked", false);
      //$('#msg_tipoprofissional').addClass('oculta');
      $('#btnCancelarAlergia').addClass('oculta');
      $("#btnAddNovaAlergia").html('<i class="fa fa-plus"></i>Adicionar');
    });
  }

  onCalculaStatusEscalaGlasgow() {

    if (this.AberturaOcular != null && this.RespostaVerbal != null && this.RespostaMotora != null) {

      var totalRespostas = this.AberturaOcular.escore + this.RespostaVerbal.escore + this.RespostaMotora.escore;

      if (8 >= totalRespostas)
        $("input[name^=EscalaGlasgow]").val(totalRespostas + " - Trauma Grave");
      else if (12 >= totalRespostas)
        $("input[name^=EscalaGlasgow]").val(totalRespostas + " - Trauma Moderado");
      else if (15 >= totalRespostas)
        $("input[name^=EscalaGlasgow]").val(totalRespostas + " - Trauma Leve");
    }
  }

  onLimpaCamposGlasgow() {

    this.AberturaOcular = null;
    this.RespostaVerbal = null;
    this.RespostaMotora = null;
    $("input[name^=EscalaGlasgow]").val("");

    $(document).ready(function () {

      $("select[name^=AberturaOcular]").val($("select[name^=AberturaOcular] option:first").val());
      $("select[name^=RespostaVerbal]").val($("select[name^=RespostaVerbal] option:first").val());
      $("select[name^=RespostaMotora]").val($("select[name^=RespostaMotora] option:first").val());

    });
  }

  public LimparCampos(cr: NgForm) {

    $("#btn_formclear").trigger("click");
    cr.value.DescricaoQueixa = "";
    cr.value.SV_Peso = "";
    cr.value.SV_Altura = "";
    cr.value.SV_Temperatura = "";
    cr.value.SV_PreArterialDiastolica = "";
    cr.value.SV_PreArterialSistolica = "";
    cr.value.FreqRespiratoria = "";
    cr.value.Sutura = "";
    cr.value.Saturacao = "";
    cr.value.DPE_Hipertensao = "";
    cr.value.DPE_Diabete = "";
    cr.value.DPE_Cardiopata = "";
    cr.value.DPE_RenalCronico = "";
    cr.value.DPE_RespCronico = "";
    cr.value.DPE_Outros = "";
    cr.value.DoencaPreExistRespCron = "";
    cr.value.DoencaPreExistOutros = "";
    cr.value.DO_Procedencia = "";
    cr.value.DO_Logradouro = "";
    cr.value.DO_Numero = "";
    cr.value.DO_Complemento = "";
    cr.value.DO_Bairro = "";
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

      $("input[name^=AlergiaData]").val(("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year);
    }

    $("input[name^=AlergiaAtivo]").prop("checked", false);

    this.ClassificacaoRiscoAlergia = classificacaoRiscoAlergia;

    $("#btnAddNovaAlergia").html("<i class='fa fa-plus'></i>Salvar");
    $('#btnCancelarAlergia').removeClass('oculta');

  }
  //end::  Edita Lotacao Profissional


  //begin:: Exibe Mensagem Excluir / Alerta o usuário da confirmação da exclusão na aba profissional
  onExibeMensagemExcluir(classificacaoRiscoAlergia: ClassificacaoRiscoAlergia) {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    var page = this;

    return swal({ title: 'Deseja excluir essa alergia?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })

      .then(function (result) {
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

}







