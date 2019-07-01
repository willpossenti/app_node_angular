import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import * as $ from 'jquery';
import { AtendimentoMedicoService } from './atendimentomedico.service';
import { Return } from '../../model/Return';
import { HttpErrorResponse } from '@angular/common/http';
import * as Toastr from 'toastr';
import { AtendimentoMedicoAlergia } from '../../model/AtendimentoMedicoAlergia';
import { CID } from '../../model/CID';
import { CapituloCID } from '../../model/CapituloCID';
import { AtendimentoMedicoExame } from '../../model/AtendimentoMedicoExame';
import { ModeloPrescricaoReceitaDetalhe } from '../../model/ModeloPrescricaoReceitaDetalhe';
import { ModeloPrescricaoReceita } from '../../model/ModeloPrescricaoReceita';
import { AtendimentoMedicoPrescricaoReceitaDetalhe } from '../../model/AtendimentoMedicoPrescricaoReceitaDetalhe';
import { ModeloAtestado } from '../../model/ModeloAtestado';
import { GrupoExame } from '../../model/GrupoExame';
import { Exame } from '../../model/Exame';
import { GrupoMedicamento } from '../../model/GrupoMedicamento';
import { GrupoExameDetalhe } from '../../model/GrupoExameDetalhe';
import { Medicamento } from '../../model/Medicamento';
import { ViaAdministracaoMedicamento } from '../../model/ViaAdministracaoMedicamento';
import { UnidadeMedicamento } from '../../model/UnidadeMedicamento';
import { IntervaloMedicamento } from '../../model/IntervaloMedicamento';
import { TipoAlergia } from '../../model/TipoAlergia';
import { Alergia } from '../../model/Alergia';
import { LocalizacaoAlergia } from '../../model/LocalizacaoAlergia';
import { ReacaoAlergia } from '../../model/ReacaoAlergia';
import { SeveridadeAlergia } from '../../model/SeveridadeAlergia';
import { PessoaService } from '../cadastro/pessoa/pessoa.service';
import { NgForm } from '@angular/forms';
import { AtendimentoMedico } from '../../model/AtendimentoMedico';
import * as swal from '../../../assets/vendors/general/sweetalert2/dist/sweetalert2.js';
import { PessoaProfissional } from 'src/app/model/PessoaProfissional';


@Component({
  selector: 'app-atendimentomedico',
  templateUrl: './atendimentomedico.component.html',
  styleUrls: ['./atendimentomedico.component.css'],
})


export class AtendimentoMedicoComponent implements OnInit {



  listaCID: Array<CID>;
  listaCapituloCID: Array<CapituloCID>;
  // listaAtendimentoMedicoExame: Array<AtendimentoMedicoExame>;
  listaAtendimentoMedicoExame: any;
  listaModeloPrescricaoReceitaDetalhe: Array<ModeloPrescricaoReceitaDetalhe>;
  ListaPossuiAlergia: any;
  listaTipoAlergia: Array<TipoAlergia>;
  listaAlergia: Array<Alergia>;
  listaLocalizacaoAlergia: Array<LocalizacaoAlergia>;
  listaReacaoAlergia: Array<ReacaoAlergia>;
  listaSeveridadeAlergia: Array<SeveridadeAlergia>;
  // listaAtendimentoMedicoPrescricaoReceitaDetalhe: Array<AtendimentoMedicoPrescricaoReceitaDetalhe>;
  listaAtendimentoMedicoPrescricaoReceitaDetalhe: any;
  listaModeloAtestado: Array<ModeloAtestado>;
  listaGrupoExame: Array<GrupoExame>;
  listaExame: Array<Exame>;
  listaGrupoMedicamento: Array<GrupoMedicamento>;
  listaGrupoExameDetalhe: Array<GrupoExameDetalhe>;
  listaMedicamento: Array<Medicamento>;
  listaViaAdministracaoMedicamento: Array<ViaAdministracaoMedicamento>;
  listaUnidadeMedicamento: Array<UnidadeMedicamento>;
  listaIntervaloMedicamento: Array<IntervaloMedicamento>;
  // listaAtendimentoMedicoAlergia: Array<AtendimentoMedicoAlergia>;
  listaAtendimentoMedicoAlergia: any;
  listaModeloPrescricaoReceita: Array<ModeloPrescricaoReceita>;

  CID: CID;
  CapituloCID: CapituloCID;
  AtendimentoMedicoExame: AtendimentoMedicoExame;
  ModeloPrescricaoReceitaDetalhe: ModeloPrescricaoReceitaDetalhe;
  ModeloPrescricaoReceita: ModeloPrescricaoReceita;
  PossuiAlergia: any;
  TipoAlergia: TipoAlergia;
  Alergia: Alergia;
  LocalizacaoAlergia: LocalizacaoAlergia;
  ReacaoAlergia: ReacaoAlergia;
  SeveridadeAlergia: SeveridadeAlergia;
  AtendimentoMedicoPrescricaoReceita: AtendimentoMedicoPrescricaoReceitaDetalhe;
  ModeloAtestado: ModeloAtestado;
  GrupoExameDetalhe: GrupoExameDetalhe;
  GrupoExame: GrupoExame;
  Exame: Exame;
  GrupoMedicamento: GrupoMedicamento;
  Medicamento: Medicamento;
  ViaAdministracaoMedicamento: ViaAdministracaoMedicamento;
  UnidadeMedicamento: UnidadeMedicamento;
  IntervaloMedicamento: IntervaloMedicamento;
  AtendimentoMedicoAlergia: AtendimentoMedicoAlergia;
  orderDescricao: string = 'descricao';
  orderNome: string = 'nome';
  orderVariavel: string = 'variavel';
  orderOrdem: string = 'ordem';
  Profissional: PessoaProfissional;


  constructor(private atendimentomedicoservice: AtendimentoMedicoService, private pessoaService: PessoaService) {
    this.listaAtendimentoMedicoAlergia = new Array<AtendimentoMedicoAlergia>();
    this.listaAtendimentoMedicoExame = new Array<AtendimentoMedicoExame>();
    this.listaAtendimentoMedicoPrescricaoReceitaDetalhe = new Array<AtendimentoMedicoPrescricaoReceitaDetalhe>();

  }

  ngOnInit() {

    let user = JSON.parse(localStorage.getItem('user'));
    this.pessoaService.ConsultaProfissional(user.userId).subscribe(async (data: Return) => {
      console.log(data.result)
     this.Profissional = data.result;

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar o profissional");
      console.log(`Error. ${error.message}.`);
    });

    



    $(document).ready(function () {

      document.title = 'Atendimento Médico | Klinikos';
      $("h3[class^=k-subheader__title]").html("Atendimento Médico");

      $("#divPesquisaMedicamento")
        .mouseover(function () {
          $("#divPesquisaMedicamento").addClass('show');
        })
        .mouseout(function () {
          $("#divPesquisaMedicamento").removeClass('show');
        });

      $("input[name^=Medicamento]").focus(function () {
        if ($('input[name^=Medicamento]').val().length > 2 && $('input[name^=Medicamento]').is(':hover') === true)
          $("#divPesquisaMedicamento").addClass('show');
      });

      $("input[name^=Medicamento]").focusout(function () {
        if ($('#divPesquisaMedicamento').is(':hover') === false)
          $("#divPesquisaMedicamento").removeClass('show');
        else
          $("#divPesquisaMedicamento").addClass('show');
      });



      $("#divPesquisaExame")
        .mouseover(function () {
          $("#divPesquisaExame").addClass('show');
        })
        .mouseout(function () {
          $("#divPesquisaExame").removeClass('show');
        });

      $("input[name^=Exame]").focus(function () {
        if ($('input[name^=Exame]').val().length > 2 && $('input[name^=Exame]').is(':hover') === true)
          $("#divPesquisaExame").addClass('show');
      });

      $("input[name^=Exame]").focusout(function () {
        if ($('#divPesquisaExame').is(':hover') === false)
          $("#divPesquisaExame").removeClass('show');
        else
          $("#divPesquisaExame").addClass('show');
      });


      $("#divPesquisaCID")
        .mouseover(function () {
          $("#divPesquisaCID").addClass('show');
        })
        .mouseout(function () {
          $("#divPesquisaCID").removeClass('show');
        });

      $("input[name^=CID]").focus(function () {
        if ($('input[name^=CID]').val().length > 2 && $('input[name^=CID]').is(':hover') === true)
          $("#divPesquisaCID").addClass('show');
      });

      $("input[name^=CID]").focusout(function () {
        if ($('#divPesquisaCID').is(':hover') === false)
          $("#divPesquisaCID").removeClass('show');
        else
          $("#divPesquisaCID").addClass('show');
      });


      $.getScript("../../../assets/app/custom/general/interface.js", function (data: any, textStatus: any, jqxhr: any) {
      });

      $.getScript("../../../assets/demo/default/base/scripts.bundle.js", function (data: any, textStatus: any, jqxhr: any) {
      });

      $.getScript("../../../assets/vendors/general/bootstrap/dist/js/bootstrap.min.js", function (data: any, textStatus: any, jqxhr: any) {
      });
  
      $.getScript("../../../assets/vendors/general/tooltip.js/dist/umd/tooltip.min.js", function (data: any, textStatus: any, jqxhr: any) {
      });

    });

this.atendimentomedicoservice.BindCapituloCID().subscribe(async (data: Return) => {
      this.listaCapituloCID = data.result;
      

      $(document).ready(function () { $("select[name^=CapituloCID]").val($("select[name^=CapituloCID] option:first").val()); });


    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar os capítulos na aba Atendimento Médico");
      console.log(`Error. ${error.message}.`);
    });

    // this.atendimentomedicoservice.BindCID(this.CapituloCID).subscribe(async (data: Return) => {
    //   this.listaCID = data.result;


    //   $(document).ready(function () { $("select[name^=CID]").val($("select[name^=CID] option:first").val()); });


    // }, (error: HttpErrorResponse) => {
    //   Toastr.error("Falha ao carregar CID na aba Atendimento Médico");
    //   console.log(`Error. ${error.message}.`);
    // });


    this.atendimentomedicoservice.BindGrupoExame().subscribe(async (data: Return) => {
      this.listaGrupoExame = data.result;
      $(document).ready(function () { $("select[name^=GrupoExame]").val($("select[name^=GrupoExame] option:first").val()); });


    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Grupo de Exame na aba Atendimento Médico");
      console.log(`Error. ${error.message}.`);
    });


   

    this.ListaPossuiAlergia = [{ 'id': '0', 'descricao': 'SIM' }, { 'id': '1', 'descricao': 'NÃO' }, { 'id': '2', 'descricao': 'NÃO INFORMADO' }];
    $(document).ready(function () { $("select[name^=PossuiAlergia]").val($("select[name^=PossuiAlergia] option:first").val()); });


    this.atendimentomedicoservice.BindModeloPrescricaoReceita().subscribe(async (data: Return) => {
      this.listaModeloPrescricaoReceitaDetalhe = data.result;
      $(document).ready(function () { $("select[name^=PR_Modelo]").val($("select[name^=PR_Modelo] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Modelo na aba Prescrição e Receita");
      console.log(`Error. ${error.message}.`);
    });

   

    // this.atendimentomedicoservice.BindGrupoMedicamento().subscribe(async (data: Return) => {
    //   this.listaGrupoMedicamento = data.result;
    //   $(document).ready(function () { $("select[name^=M_Grupo]").val($("select[name^=M_Grupo] option:first").val()); });

    // }, (error: HttpErrorResponse) => {
    //   Toastr.error("Falha ao carregar Grupo de Medicamento na aba Prescrição e Receita");
    //   console.log(`Error. ${error.message}.`);
    // });


    this.atendimentomedicoservice.BindViaAdministracaoMedicamento().subscribe(async (data: Return) => {
      this.listaViaAdministracaoMedicamento = data.result;
      $(document).ready(function () { $("select[name^=M_Via_Administracao]").val($("select[name^=M_Via_Administracao] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Via Administração na aba Prescrição e Receita");
      console.log(`Error. ${error.message}.`);
    });

    this.atendimentomedicoservice.BindUnidadeMedicamento().subscribe(async (data: Return) => { 
      this.listaUnidadeMedicamento = data.result; 
      $(document).ready(function () { $("select[name^=M_Unidade]").val($("select[name^=M_Unidade] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Unidade na aba Prescrição e Receita");
      console.log(`Error. ${error.message}.`);
    });

    this.atendimentomedicoservice.BindIntervaloMedicamento().subscribe(async (data: Return) => {
      this.listaIntervaloMedicamento = data.result;
      $(document).ready(function () { $("select[name^=M_Intervalo]").val($("select[name^=M_Intervalo] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Intervalo na aba Prescrição e Receita");
      console.log(`Error. ${error.message}.`);
    });

    // this.atendimentomedicoservice.BindModeloAtestado().subscribe(async (data: Return) => {
    //   this.listaModeloAtestado = data.result;
    //   $(document).ready(function () { $("select[name^=ModeloAtestado]").val($("select[name^=ModeloAtestado] option:first").val()); });


    // }, (error: HttpErrorResponse) => {
    //   Toastr.error("Falha ao carregar Modelo Atestado na aba Prescrição Receita");
    //   console.log(`Error. ${error.message}.`);
    // });

   

  }


  onSelectedCapitulo() {

    $(document).ready(function () { $("select[name^=CID]").val($("select[name^=CID] option:first").val()); });

    // this.atendimentomedicoservice.BindCID(this.CapituloCID).subscribe(async (data: Return) => {
    //   this.listaCID = data.result;

    //   if (this.CID != null) {

    //     var cidId = this.CID.cidId;
    //     this.CID = this.listaCID.find(x => x.cidId === cidId);
    //   }
    //   else
    //     $(document).ready(function () { $("select[name^=CID]").val($("select[name^=CID] option:first").val()); });

    // }, (error: HttpErrorResponse) => {
    //   Toastr.error("Falha ao carregar UF(s) na aba Dados Pessoais");
    //   console.log(`Error. ${error.message}.`);
    // });


  }


  onPossuiAlergia() {


        if(this.PossuiAlergia.id == 0) {


      this.atendimentomedicoservice.BindTipoAlergia().subscribe(async (data: Return) => {
        this.listaTipoAlergia = data.result;
        $(document).ready(function () { $("select[name^=TipoAlergia]").val($("select[name^=TipoAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Tipo da Alergia na aba Alergia");
        console.log(`Error. ${error.message}.`);
      });

      this.atendimentomedicoservice.BindAlergia().subscribe(async (data: Return) => {
        this.listaAlergia = data.result;
        $(document).ready(function () { $("select[name^=Alergia]").val($("select[name^=Alergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Alergia na aba Alergia");
        console.log(`Error. ${error.message}.`);
      });


      this.atendimentomedicoservice.BindLocalizacaoAlergia().subscribe(async (data: Return) => {
        this.listaLocalizacaoAlergia = data.result;
        $(document).ready(function () { $("select[name^=LocalizacaoAlergia]").val($("select[name^=LocalizacaoAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Localização Alergia na aba Alergia");
        console.log(`Error. ${error.message}.`);
      });

      this.atendimentomedicoservice.BindReacaoAlergia().subscribe(async (data: Return) => {
        this.listaReacaoAlergia = data.result;
        $(document).ready(function () { $("select[name^=ReacaoAlergia]").val($("select[name^=ReacaoAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Alergia na aba Alergia");
        console.log(`Error. ${error.message}.`);
      });

      this.atendimentomedicoservice.BindSeveridade().subscribe(async (data: Return) => {
        this.listaSeveridadeAlergia = data.result;
        $(document).ready(function () { $("select[name^=SeveridadeAlergia]").val($("select[name^=SeveridadeAlergia] option:first").val()); });


      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Severidade na aba Alergia");
        console.log(`Error. ${error.message}.`);
      });





       //show card : Alergia
          $('#AlergiaCardAM').removeClass('oculta');
          $('#collapseOne2').addClass('show');
          $('select[name^="AlergiaTipo"]').focus();

    }
   else {
          $('#AlergiaCardAM').addClass('oculta');
          $('#collapseOne2').removeClass('show');
    }

  }


  public onSalvarAtendimentoMedico(rb: NgForm) {

    $("#k_scrolltop").trigger("click");

    var atendimentomedico: AtendimentoMedico = {};

    var imc = $("input[name^=AM_IMC]").val();

    atendimentomedico.CIDId = this.CID.cidId;

    if (rb.value.AM_Anamnese !== "")
      atendimentomedico.anamnese = rb.value.AM_Anamnese.toUpperCase();

    if (rb.value.AM_Peso  !== "")
      atendimentomedico.peso = rb.value.AM_Peso;

    if (rb.value.AM_Altura !== "")
      atendimentomedico.altura = rb.value.AM_Altura;

    if (imc !== "")
      atendimentomedico.imc = imc.toUpperCase();

    if (rb.value.AM_Temperatura !== "")
      atendimentomedico.temperatura = rb.value.AM_Temperatura;

    if (rb.value.AM_PressaoArterial_Sistolica !== "")
      atendimentomedico.pressaoArterialSistolica = rb.value.AM_PressaoArterial_Sistolica;

    if (rb.value.AM_PressaoArterial_Diastolica !== "")
      atendimentomedico.pressaoArterialDiastolica = rb.value.AM_PressaoArterial_Diastolica;

    if (rb.value.AM_Pulso !== "")
      atendimentomedico.pulso = rb.value.AM_Pulso;

    if (rb.value.AM_FreqResp !== "")
      atendimentomedico.frequenciaRespiratoria = rb.value.AM_FreqResp;

    if (rb.value.AM_Saturacao !== "")
      atendimentomedico.saturacao = rb.value.AM_Saturacao;

    if (rb.value.Observacoes !== "")
      atendimentomedico.campoObservacao = rb.value.Observacoes.toUpperCase();

    if (rb.value.SuspeitaDiagnostica != "")
      atendimentomedico.suspeitaDiagnostico = rb.value.SuspeitaDiagnostica.toUpperCase();


    if ($("label[for^=Prescricao]").hasClass("active"))
      atendimentomedico.Prescricao = true;
    else
      atendimentomedico.Prescricao = false;

    if ($("label[for^=Receita]").hasClass("active"))
      atendimentomedico.Receita = true;
    else
      atendimentomedico.Receita = false;
      
      
    if (rb.value.AtestadoObservacao != "")
    {
      atendimentomedico.atestado = rb.value.AtestadoObservacao.toUpperCase();
      if (rb.value.AtestadoValidade != "")
        atendimentomedico.validadeatestado = rb.value.AtestadoValidade;
    }
    if($("#AtendMedTipoSaida").val("1")){
      atendimentomedico.tipoSaida = "A";
    }
    if($("#AtendMedTipoSaida").val("2")){
      atendimentomedico.tipoSaida = "O";
    }
    if($("#AtendMedTipoSaida").val("")){
      atendimentomedico.tipoSaida = "";
    }
    // if (rb.value.TipoSaida != "")
    // {
    //   if (rb.value.TipoSaida == "1") {
    //     atendimentomedico.tipoSaida = "A";
    //   }
    //   if (rb.value.TipoSaida == "2") {
    //     atendimentomedico.tipoSaida = "O";
    // }
    // }
    // else{
    //   atendimentomedico.tipoSaida = "";
    // }

    if (rb.value.colModalFinAlta != "")
      atendimentomedico.dataSaida = rb.value.colModalFinAlta;

    if (rb.value.colModalFinObito != "")
      atendimentomedico.dataSaida = rb.value.colModalFinObito;

    if (this.listaAtendimentoMedicoAlergia.length > 0) {

      atendimentomedico.AtendimentoMedicoAlergia = [];
      atendimentomedico.AtendimentoMedicoAlergia = this.listaAtendimentoMedicoAlergia;
    }
    if (this.listaAtendimentoMedicoExame.length > 0) {
      
      atendimentomedico.AtendimentoMedicoExame = [];
      atendimentomedico.AtendimentoMedicoExame = this.listaAtendimentoMedicoExame;
    }  
    if (this.listaAtendimentoMedicoPrescricaoReceitaDetalhe.length > 0) {

      atendimentomedico.AtendimentoMedicoPrescricaoReceitaDetalhe = [];
      atendimentomedico.AtendimentoMedicoPrescricaoReceitaDetalhe = this.listaAtendimentoMedicoPrescricaoReceitaDetalhe;
    }


    console.log(JSON.stringify(atendimentomedico));

    console.log(localStorage['token_accessToken']);

    


    this.atendimentomedicoservice.SalvarAtendimentoMedico(atendimentomedico).subscribe(data => {


      Toastr.success("Atendimento Médico salvo com sucesso");

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao comunicar com API");
      console.log(`Error. ${error.message}.`);
    },
    );

  }


  onAdicionaExame() {

    if (this.GrupoExame !== null && this.Exame !== null) {

      var observacaoexame = $("input[name^=ExamesObservacao]").val();
      


      var atendimentomedicoExame: any = {};

      atendimentomedicoExame.GrupoExame = this.GrupoExame.nome;
      atendimentomedicoExame.Exame = this.Exame.nome;
      atendimentomedicoExame.observacaoExame = observacaoexame.toUpperCase();
      atendimentomedicoExame.dataExame = new Date();
      // atendimentomedicoExame.Profissional = this.Profissional.nomeCompleto;
      
    

      //atendimentomedicoExame.Profissional = localStorage.getItem('user');

 //this.pessoaService.ConsultaCpfProfissional()


      //if (dataexame !== "") {

      //  var data = dataexame.split("/");
      //  atendimentomedicoExame.dataExame = new Date(data[2] + '/' + data[1] + '/' + data[0]);
      //}



      // if (this.listaAtendimentoMedicoExame.find(x => x.GrupoExame === this.GrupoExame && x.Exame === this.Exame) === undefined && this.AtendimentoMedicoExame === undefined) {

        this.listaAtendimentoMedicoExame.push(atendimentomedicoExame);

      // } else if (this.AtendimentoMedicoExame !== undefined) {

        // if (this.AtendimentoMedicoExame.GrupoExame != atendimentomedicoExame.GrupoExame && this.AtendimentoMedicoExame.Exame != atendimentomedicoExame.Exame)
        //   if (this.listaAtendimentoMedicoExame.find(x => x.GrupoExame === this.GrupoExame && x.Exame === this.Exame))
        //     return;

    //    var index = this.listaAtendimentoMedicoExame.findIndex(x => x.GrupoExame === this.GrupoExame || x.Exame === this.Exame);
    //     this.listaAtendimentoMedicoExame[index] = atendimentomedicoExame;

      
    // } else {

      $(document).ready(function () {

        //$('#msg_tipoprofissional').removeClass('oculta');
      });

    }


    this.onLimparCamposExame();
  }

  onLimparCamposExame() {

    $("input[name^=ExamesObservacao]").val("");
    this.GrupoExame = undefined;
    this.Exame = undefined;
    this.AtendimentoMedicoExame = undefined;

    $(document).ready(function () {
      $("select[name^=GrupoExame]").val($("select[name^=GrupoExame] option:first").val());
      $("select[name^=Exame]").val($("select[name^=Exame] option:first").val());
      $("input[name^=ExameData]").val("");
      //$('#msg_tipoprofissional').addClass('oculta');
      $('#btnCancelarExame').addClass('oculta');
      $("#btnAddNovaExame").html('<i class="fa fa-plus fa-fw"></i> Adicionar');
    });
  }



  public LimparCamposExame(p: NgForm) {

    $("#btn_formclear").trigger("click");
  }

  //begin:: Edita Lotacao Profissional / Permite o usuário editar as lotações lançadas na aba profissional
  onEditarExame(atendimentomedicoExame: AtendimentoMedicoExame) {

    this.GrupoExame = atendimentomedicoExame.GrupoExame;
    this.Exame.exameId = atendimentomedicoExame.Exame.exameId;


    // if (atendimentomedicoExame.dataExame != null) {

    //   var dataExame = new Date(atendimentomedicoExame.dataExame),
    //     month = '' + (dataExame.getMonth() + 1),
    //     day = '' + dataExame.getDate(),
    //     year = dataExame.getFullYear();

      //$("input[name^=Data/Hora]").val(("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year);
    // }

    $("input[name^=ExameAtivo]").prop("checked", false);

    this.AtendimentoMedicoExame = atendimentomedicoExame;

    $("#btnAddNovaExame").html("<i class='fa fa-plus'></i>Salvar");
    $('#btnCancelarExame').removeClass('oculta');

  }
  //end::  Edita Lotacao Profissional


  ///begin:: Exibe Mensagem Excluir / Alerta o usuário da confirmação da exclusão na aba profissional
  onExibeMensagemExcluirExame(atendimentomedicoExame: AtendimentoMedicoExame) {

    var page = this;

    return swal({ title: 'Deseja excluir esse exame?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })

      .then(function (result) {
        if (result.value) {
          page.onExcluirExame(atendimentomedicoExame);
        }

      });

  }

  //end:: Exibe Mensagem Excluir

  //begin:: Exclui lotacao Profissional / Alerta o usuário da confirmação da exclusão na aba profissional
  onExcluirExame(atendimentomedicoExame: AtendimentoMedicoExame) {

    var index = this.listaAtendimentoMedicoExame.findIndex(x => x.exameId === atendimentomedicoExame.Exame.exameId && x.grupoExame === atendimentomedicoExame.GrupoExame);
    this.listaAtendimentoMedicoExame.splice(index, 1);
  }
  //end:: Exibe Mensagem Excluir

  onAdicionaMedicamento() {

    if (this.Medicamento !== null) {

     

      var observacao = $('input[name^=ObservacaoMedicamento]').val();
      var dose = $('input[name^=Dose]').val();

      var atendimentomedicoPrescricaoReceitaDetalhe: any = {};

      if (this.Medicamento !== null)
      atendimentomedicoPrescricaoReceitaDetalhe.Medicamento = this.Medicamento.nome;

      if (this.UnidadeMedicamento !== null)
        atendimentomedicoPrescricaoReceitaDetalhe.UnidadeMedicamento = this.UnidadeMedicamento.descricao;

      if (this.ViaAdministracaoMedicamento !== null)
        atendimentomedicoPrescricaoReceitaDetalhe.ViaAdministracaoMedicamento = this.ViaAdministracaoMedicamento.descricao;

      if (this.GrupoMedicamento !== null)
        atendimentomedicoPrescricaoReceitaDetalhe.GrupoMedicamento = this.GrupoMedicamento;


      atendimentomedicoPrescricaoReceitaDetalhe.observacao = observacao;

      atendimentomedicoPrescricaoReceitaDetalhe.dose = dose;

      atendimentomedicoPrescricaoReceitaDetalhe.prescricao = $("#btnPrescricao").hasClass("active");
      atendimentomedicoPrescricaoReceitaDetalhe.receita = $("#btnReceita").hasClass("active");

      console.log(atendimentomedicoPrescricaoReceitaDetalhe);


      //if (this.listaAtendimentoMedicoPrescricaoReceita.find(x => x.GrupoMedicamento === this.GrupoMedicamento && x.Medicamento === this.Medicamento) === undefined && this.AtendimentoMedicoPrescricaoReceita === undefined) {

        this.listaAtendimentoMedicoPrescricaoReceitaDetalhe.push(atendimentomedicoPrescricaoReceitaDetalhe);


console.log( this.listaAtendimentoMedicoPrescricaoReceitaDetalhe);

     // } else if (this.AtendimentoMedicoPrescricaoReceita !== undefined) {

       // if (this.AtendimentoMedicoPrescricaoReceita.GrupoMedicamento != atendimentomedicoPrescricaoReceita.GrupoMedicamento && this.AtendimentoMedicoPrescricaoReceita.Medicamento != atendimentomedicoPrescricaoReceita.Medicamento)
        //  if (this.listaAtendimentoMedicoPrescricaoReceita.find(x => x.GrupoMedicamento === this.GrupoMedicamento && x.Medicamento === this.Medicamento))
        //    return;

     //   var index = this.listaAtendimentoMedicoPrescricaoReceita.findIndex(x => x.GrupoMedicamento === this.GrupoMedicamento || x.Medicamento === this.Medicamento);
//this.listaAtendimentoMedicoPrescricaoReceita[index] = atendimentomedicoPrescricaoReceita;

     // }
   // } else {

      $(document).ready(function () {

        //$('#msg_tipoprofissional').removeClass('oculta');
      });

    }


    this.onLimparCamposMedicamento();
  }

  onLimparCamposMedicamento() {

    $("input[name^=Prof_NumConselho]").val("");
    $("input[name^=Dose]").val("");
    $("input[name^=ExamesObservacao").val("");
    $('input[type=checkbox][name^=Receita]').prop("unchecked");
    $('input[type=checkbox][name^=Prescricao]').prop("unchecked");
    this.GrupoMedicamento = undefined;
    this.Medicamento = undefined;
    this.UnidadeMedicamento = undefined;
    this.ViaAdministracaoMedicamento = undefined;
    this.IntervaloMedicamento = undefined;
    this.AtendimentoMedicoPrescricaoReceita = undefined;


    $(document).ready(function () {
      $("select[name^=GrupoMedicamento]").val($("select[name^=GrupoMedicamento] option:first").val());
      $("select[name^=Medicamento]").val($("select[name^=Medicamento] option:first").val());
      $("select[name^=LocalizacaoMedicamento]").val($("select[name^=LocalizacaoMedicamento] option:first").val());
      $("select[name^=ReacaoMedicamento]").val($("select[name^=ReacaoMedicamento] option:first").val());
      $("select[name^=SeveridadeMedicamento]").val($("select[name^=SeveridadeMedicamento] option:first").val());
      $("input[name^=MedicamentoData]").val("");
      $("input[name^=MedicamentoAtivo]").prop("checked", false);
      //$('#msg_tipoprofissional').addClass('oculta');
      $('#btnCancelarMedicamento').addClass('oculta');
      $("#btnAddNovaMedicamento").html('<i class="fa fa-plus"></i>Adicionar');
    });
  }





  //begin:: Edita Lotacao Profissional / Permite o usuário editar as lotações lançadas na aba profissional
  onEditarMedicamento(atendimentomedicoPrescricaoReceitaDetalhe: AtendimentoMedicoPrescricaoReceitaDetalhe) {

    this.GrupoMedicamento = atendimentomedicoPrescricaoReceitaDetalhe.GrupoMedicamento;
    this.Medicamento.medicamentoId = atendimentomedicoPrescricaoReceitaDetalhe.medicamentoId;
    this.UnidadeMedicamento.unidadeMedicamentoId = atendimentomedicoPrescricaoReceitaDetalhe.unidadeMedicamentoId;
    this.ViaAdministracaoMedicamento.viaAdministracaoMedicamentoId = atendimentomedicoPrescricaoReceitaDetalhe.viaAdministracaoMedicamentoId;
    this.IntervaloMedicamento.intervaloMedicamentoId = atendimentomedicoPrescricaoReceitaDetalhe.intervaloMedicamentoId;
   

    this.AtendimentoMedicoPrescricaoReceita = atendimentomedicoPrescricaoReceitaDetalhe;

    $("#btnAddNovaMedicamento").html("<i class='fa fa-plus'></i>Salvar");
    $('#btnCancelarMedicamento').removeClass('oculta');

  }
  //end::  Edita Lotacao Profissional


  //begin:: Exibe Mensagem Excluir / Alerta o usuário da confirmação da exclusão na aba profissional
  onExibeMensagemExcluirMedicamento(atendimentomedicoPrescricaoReceitaDetalhe: AtendimentoMedicoPrescricaoReceitaDetalhe) {

    var page = this;

    return swal({ title: 'Deseja excluir essa medicamento?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })

      .then(function (result) {
        if (result.value) {
          page.onExcluirMedicamento(atendimentomedicoPrescricaoReceitaDetalhe);
        }

      });

  }
  //end:: Exibe Mensagem Excluir

  //begin:: Exclui lotacao Profissional / Alerta o usuário da confirmação da exclusão na aba profissional
  onExcluirMedicamento(atendimentomedicoPrescricaoReceitaDetalhe: AtendimentoMedicoPrescricaoReceitaDetalhe) {

    var index = this.listaAtendimentoMedicoPrescricaoReceitaDetalhe.findIndex(x => x.medicamentoId === atendimentomedicoPrescricaoReceitaDetalhe.medicamentoId);
    this.listaAtendimentoMedicoPrescricaoReceitaDetalhe.splice(index, 1);
  }
  //end:: Exibe Mensagem Excluir

 
 
  onAdicionaAlergia() {

    if (this.TipoAlergia !== null && this.Alergia !== null) {


      var datasintomas = $("input[name^=AlergiaData]").val();

      var alergiaSituacao = $('input[type=checkbox][name^=AlergiaAtivo]').prop("checked");

      var atendimentomedicoAlergia: any = {};

      atendimentomedicoAlergia.TipoAlergia = this.TipoAlergia.descricao;
      atendimentomedicoAlergia.Alergia = this.Alergia.nome;

      if (this.LocalizacaoAlergia !== null)
        atendimentomedicoAlergia.LocalizacaoAlergia = this.LocalizacaoAlergia.nome;

      if (this.ReacaoAlergia !== null)
        atendimentomedicoAlergia.ReacaoAlergia = this.ReacaoAlergia.descricao;

      if (this.SeveridadeAlergia !== null)
        atendimentomedicoAlergia.SeveridadeAlergia = this.SeveridadeAlergia.nome;


      if (datasintomas !== "") {

        var data = datasintomas.split("/");
        atendimentomedicoAlergia.dataSintomas = new Date(data[2] + '/' + data[1] + '/' + data[0]);
      }

      atendimentomedicoAlergia.alergiaSituacao = alergiaSituacao;


      if (this.listaAtendimentoMedicoAlergia.find(x => x.tipoAlergiaId === this.TipoAlergia.tipoAlergiaId && x.alergiaId === this.Alergia.alergiaId) === undefined && this.AtendimentoMedicoAlergia === undefined) {

        this.listaAtendimentoMedicoAlergia.push(atendimentomedicoAlergia);

      } else if (this.AtendimentoMedicoAlergia !== undefined) {

        if (this.AtendimentoMedicoAlergia.tipoAlergiaId != atendimentomedicoAlergia.tipoAlergiaId && this.AtendimentoMedicoAlergia.alergiaId != atendimentomedicoAlergia.alergiaId)
          if (this.listaAtendimentoMedicoAlergia.find(x => x.tipoAlergiaId === this.TipoAlergia.tipoAlergiaId && x.alergiaId === this.Alergia.alergiaId))
            return;

        var index = this.listaAtendimentoMedicoAlergia.findIndex(x => x.tipoAlergiaId === this.TipoAlergia.tipoAlergiaId || x.alergiaId === this.Alergia.alergiaId);
        this.listaAtendimentoMedicoAlergia[index] = atendimentomedicoAlergia;

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
    this.AtendimentoMedicoAlergia = undefined;

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



  public LimparCampos(p: NgForm) {

    $("#btn_formclear").trigger("click");
  }

  //begin:: Edita Lotacao Profissional / Permite o usuário editar as lotações lançadas na aba profissional
  onEditarAlergia(atendimentomedicoAlergia: AtendimentoMedicoAlergia) {

    this.TipoAlergia.tipoAlergiaId = atendimentomedicoAlergia.tipoAlergiaId;
    this.Alergia.alergiaId = atendimentomedicoAlergia.alergiaId;
    this.LocalizacaoAlergia.localizacaoAlergiaId = atendimentomedicoAlergia.localizacaoAlergiaId;
    this.ReacaoAlergia.reacaoAlergiaId = atendimentomedicoAlergia.reacaoAlergiaId;
    this.SeveridadeAlergia.severidadeAlergiaId = atendimentomedicoAlergia.severidadeAlergiaId;

    if (atendimentomedicoAlergia.dataSintomas != null) {

      var dataSintomas = new Date(atendimentomedicoAlergia.dataSintomas),
        month = '' + (dataSintomas.getMonth() + 1),
        day = '' + dataSintomas.getDate(),
        year = dataSintomas.getFullYear();

      $("input[name^=AlergiaData]").val(("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year);
    }

    $("input[name^=AlergiaAtivo]").prop("checked", false);

    this.AtendimentoMedicoAlergia = atendimentomedicoAlergia;

    $("#btnAddNovaAlergia").html("<i class='fa fa-plus'></i>Salvar");
    $('#btnCancelarAlergia').removeClass('oculta');

  }
  //end::  Edita Lotacao Profissional


  //begin:: Exibe Mensagem Excluir / Alerta o usuário da confirmação da exclusão na aba profissional
  onExibeMensagemExcluir(atendimentomedicoAlergia: AtendimentoMedicoAlergia) {

    var page = this;

    return swal({ title: 'Deseja excluir essa alergia?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })

      .then(function (result) {
        if (result.value) {
          page.onExcluirAlergia(atendimentomedicoAlergia);
        }

      });

  }
  //end:: Exibe Mensagem Excluir

  //begin:: Exclui lotacao Profissional / Alerta o usuário da confirmação da exclusão na aba profissional
  onExcluirAlergia(atendimentomedicoAlergia: AtendimentoMedicoAlergia) {

    var index = this.listaAtendimentoMedicoAlergia.findIndex(x => x.alergiaId === atendimentomedicoAlergia.alergiaId);
    this.listaAtendimentoMedicoAlergia.splice(index, 1);
  }
  //end:: Exibe Mensagem Excluir
  //begin:: Consulta o Medicamento/ Consulta e monta um grid com as opções

  onConsultaMedicamento() {

    var am_medicamento = $("input[name^=Medicamentos]").val().trim().toUpperCase();

    if (am_medicamento.length > 3) {

      $('#divPesquisaMedicamento').addClass('show');



      this.atendimentomedicoservice.ConsultaMedicamento(am_medicamento)
        .subscribe(data => {

          this.listaMedicamento = data.result;
          console.log(this.listaMedicamento);
        }, (error: HttpErrorResponse) => {
          Toastr.error("Falha ao consultar os Medicamentos");
          console.log(`Error. ${error.message}.`);
        });


    }

  }

  //end:: Consulta o medicamento
  //begin:: carregamento padrão de campos para a tela
  CarregaMedicamento(medicamento: any) {

    this.Medicamento = medicamento;

    $("input[name^=Medicamentos]").val(medicamento.nome);


  }
  //end:: carregamento padrão de campos para a tela


  //begin:: Carregamento do Medicamento pela Busca
  onSelectedMedicamento(medicamento: Medicamento) {

    Toastr.info("Medicamento carregado");
    this.CarregaMedicamento(medicamento);

    $("#divPesquisaMedicamento").removeClass('show');
    
  }
  //end::  Carregamento do Medicamento pela Busca

  //begin:: Consulta o exame/ Consulta e monta um grid com as opções
  onConsultaExame() {

    var dp_exame = $("input[name^=Exames]").val().trim().toUpperCase();


    if (dp_exame.length > 3) {

      $('#divPesquisaExame').addClass('show');

      this.atendimentomedicoservice.ConsultaExame(dp_exame)
        .subscribe(async (data: Return) => {

          console.log(data.result);

          this.listaExame = data.result;

        }, (error: HttpErrorResponse) => {
          Toastr.error("Falha ao consultar os exames");
          console.log(`Error. ${error.message}.`);
        });


    }
    // if (event.target.value.length > 3) {

    //   var consultaFiltro: GrupoExame = {

    //     grupoExameId: this.GrupoExame.grupoExameId,
    //     nome : event.target.value,
    //     ativo: true
    //  };
    //  console.log(consultaFiltro);

    //   $('#divPesquisaExame').addClass('show');

    //   this.atendimentomedicoservice.GetDetalheByGrupo(consultaFiltro)
    //     .subscribe(async (data: Return) => {

    //       console.log(data.result);

    //       this.listaGrupoExameDetalhe = data.result;

    //     }, (error: HttpErrorResponse) => {
    //       Toastr.error("Falha ao consultar o Exame");
    //       console.log(`Error. ${error.message}.`);
    //     });


    // }

  }
  //end:: Consulta o exame

  //begin:: carregamento padrão de campos para a tela
  CarregaExame(exame: any) {

    this.Exame = exame;

    $("input[name^=Exames]").val(exame.nome);


  }
  //end:: carregamento padrão de campos para a tela

  //begin:: Carregamento do Exame pela Busca
  onSelectedExame(exame: Exame) {

    Toastr.info("Exame carregado");
    this.CarregaExame(exame);

    $("#divPesquisaExame").removeClass('show');

  }

  onSelectedGrupoExame(grupoExame: GrupoExame) {

    this.GrupoExame = grupoExame;

    $("input[name^=GrupoExame]").val(grupoExame.nome);

  }
  //end::  Carregamento do Exame pela Busca
  // onSelectedGrupoExame(grupoExame: GrupoExame) {
  //   console.log(grupoExame);
 
  //   this.atendimentomedicoservice.GetDetalheByGrupo(grupoExame)
  //   .subscribe(async (data: Return) => {
  //     console.log(data.result);
  //     this.listaGrupoExameDetalhe = data.result;
      

  //   }, (error: HttpErrorResponse) => {
  //     Toastr.error("Falha ao consultar o CID");
  //     console.log(`Error. ${error.message}.`);
  //   });

  // }



  //begin:: consulta CID/ Consulta e monta um grid com as opções
  onConsultaCIDs(event: any) {


    if (event.target.value.length > 3) {

      var consultaFiltro: CID = {

        CapituloCID: this.CapituloCID,
        nome : event.target.value,
        ativo: true
     };
     console.log(consultaFiltro);

      $('#divPesquisaCID').addClass('show');

      this.atendimentomedicoservice.ConsultarCIDByCapitulo(consultaFiltro)
        .subscribe(async (data: Return) => {

          console.log(data.result);

          this.listaCID = data.result;

        }, (error: HttpErrorResponse) => {
          Toastr.error("Falha ao consultar o CID");
          console.log(`Error. ${error.message}.`);
        });


    }

  }
  //end:: consulta CID

  //begin:: carregamento padrão de campos para a tela
  CarregaCID(cid: any) {

    this.CID = cid;
  
    $("input[name^=CID]").val(cid.nome);
  
  
  }
  //end:: carregamento padrão de campos para a tela
  
  
  //begin:: Carregamento do CID pela Busca
  onSelectedCID(cid: CID) {
  
    Toastr.info("CID carregado");
    this.CarregaCID(cid);
  
    $("#divPesquisaCID").removeClass('show');
      
  }
  //end::  Carregamento do CID pela Busca



  onLoadModal(){

    $(document).ready(function () {
     
      $("#DataHora1").val(new Date());
     
     });
 
     $(document).ready(function () {
      $("#colModalFinObito").val(new Date());
     });

  }


}





