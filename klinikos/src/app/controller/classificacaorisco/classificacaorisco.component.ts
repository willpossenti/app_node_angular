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
import { DoencaPreExistente } from '../../model/DoencaPreExistente';
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
  listaDoencasPreExitente: Array<DoencaPreExistente>;
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

  CausaExterna: CausaExterna;
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
  orderDescricao: string = 'descricao';
  orderNome: string = 'nome';
  orderVariavel: string = 'variavel';

  constructor(private classificacaoriscoservice: ClassificaoRiscoService) { }

  ngOnInit() {

    $(document).ready(function () {

      document.title = 'Classificação de Risco | Klinikos';
      $("h3[class^=k-subheader__title]").html("Classificação de Risco");

    });

    this.classificacaoriscoservice.BindCausaExterna().subscribe(async (data: Return) => {
      this.listaCausasExterna = data.result;


      $(document).ready(function () { $("select[name^=CausaExterna]").val($("select[name^=CausaExterna] option:first").val()); });


    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Raças na aba Classificação de Risco");
      console.log(`Error. ${error.message}.`);
    });

    this.classificacaoriscoservice.BindEscalaDor().subscribe(async (data: Return) => {
      this.listaEscalasDor = data.result;

      var orderby = this.listaEscalasDor.sort((n1, n2) => {
        if (n1.codigoEscalaDor > n2.codigoEscalaDor) {
          return 1;
        }

        if (n1.codigoEscalaDor < n2.codigoEscalaDor) {
          return -1;
        }

        return 0;
      });


      $(document).ready(function () {
        $("#EscalaDor0").val(orderby[0].codigoEscalaDor);
        $("#lblSemDor").append(orderby[0].descricao);

        $("#EscalaDor1").val(orderby[1].codigoEscalaDor);
        $("#EscalaDor2").val(orderby[2].codigoEscalaDor);
        $("#lblleve").append(orderby[1].descricao);

        $("#EscalaDor3").val(orderby[3].codigoEscalaDor);
        $("#EscalaDor4").val(orderby[4].codigoEscalaDor);
        $("#EscalaDor5").val(orderby[5].codigoEscalaDor);
        $("#lblmoderada").append(orderby[3].descricao);

        $("#EscalaDor6").val(orderby[6].codigoEscalaDor);
        $("#EscalaDor7").val(orderby[7].codigoEscalaDor);
        $("#EscalaDor8").val(orderby[8].codigoEscalaDor);
        $("#lblforte").append(orderby[5].descricao);

        $("#EscalaDor9").val(orderby[9].codigoEscalaDor);
        $("#EscalaDor10").val(orderby[10].codigoEscalaDor);
        $("#lblintensa").append(orderby[7].descricao);
      });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Escala de Dor na aba Classificação de Risco");
      console.log(`Error. ${error.message}.`);
    });

    this.classificacaoriscoservice.BindNivelConsciencia().subscribe(async (data: Return) => {
      this.listaNiveisConsciencia = data.result;


    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Nível de Consciência na aba Classificação de Risco");
      console.log(`Error. ${error.message}.`);
    });

    this.classificacaoriscoservice.BindDoencaPreExistente().subscribe(async (data: Return) => {
      this.listaDoencasPreExitente = data.result;


    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Doença Pré Existente na aba Classificação de Risco");
      console.log(`Error. ${error.message}.`);
    });


    this.classificacaoriscoservice.BindTipoChegada().subscribe(async (data: Return) => {
      this.listaTiposChegada = data.result;
      $(document).ready(function () { $("select[name^=TipoChegada]").val($("select[name^=TipoChegada] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Tipo de Chegada na aba Classificação de Risco");
      console.log(`Error. ${error.message}.`);
    });



    this.classificacaoriscoservice.BindEspecialidade().subscribe(async (data: Return) => {
      this.listaEspecialidade = data.result;
      $(document).ready(function () { $("select[name^=Especialidade]").val($("select[name^=Especialidade] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Especialidade na aba Classificação de Risco");
      console.log(`Error. ${error.message}.`);
    });


    this.ListaPossuiAlergia = [{ 'id': '0', 'descricao': 'SIM' }, { 'id': '1', 'descricao': 'NÃO' }, { 'id': '2', 'descricao': 'NÃO INFORMADO' }];
    $(document).ready(function () { $("select[name^=PossuiAlergia]").val($("select[name^=PossuiAlergia] option:first").val()); });


    this.classificacaoriscoservice.BindAberturaOcular().subscribe(async (data: Return) => {
      this.listaAberturaOcular = data.result;
      $(document).ready(function () { $("select[name^=AberturaOcular]").val($("select[name^=AberturaOcular] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Abertura Ocular na aba Alergia");
      console.log(`Error. ${error.message}.`);
      });

    this.classificacaoriscoservice.BindRespostaVerbal().subscribe(async (data: Return) => {
      this.listaRespostaVerbal = data.result;
      $(document).ready(function () { $("select[name^=RespostaVerbal]").val($("select[name^=RespostaVerbal] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Resposta Verbal na aba Escala de Glasgow");
      console.log(`Error. ${error.message}.`);
    });

    this.classificacaoriscoservice.BindRespostaVerbal().subscribe(async (data: Return) => {
      this.listaRespostaVerbal = data.result;
      $(document).ready(function () { $("select[name^=RespostaVerbal]").val($("select[name^=RespostaVerbal] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Resposta Verbal na aba Escala de Glasgow");
      console.log(`Error. ${error.message}.`);
    });


    this.classificacaoriscoservice.BindRespostaMotora().subscribe(async (data: Return) => {
      this.listaRespostaMotora = data.result;
      $(document).ready(function () { $("select[name^=RespostaMotora]").val($("select[name^=RespostaMotora] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Resposta Motora na aba Escala de Glasgow");
      console.log(`Error. ${error.message}.`);
    });
  }


  onSelectDoencaPreExistente(e) {


    if (e.target.id === "inputdoencapreexistente5") {

      if (e.target.checked === true) {
        $('#dpe_respcron_box').removeClass('oculta');
        $('textarea[name="DoencaPreExistRespCron"]').focus();
      } else {
        $('#dpe_respcron_box').addClass('oculta');
      }

    }

    if (e.target.id === "inputdoencapreexistente3") {

      if (e.target.checked === true) {
        $('#dpe_outros_box').removeClass('oculta');
        $('textarea[name="DoencaPreExistOutros"]').focus();
      } else {
        $('#dpe_outros_box').addClass('oculta');
      }

    }

  }


  onPossuiAlergia() {

    if (this.PossuiAlergia.id == 0) {


      this.classificacaoriscoservice.BindTipoAlergia().subscribe(async (data: Return) => {
        this.listaTipoAlergia = data.result;
        $(document).ready(function () { $("select[name^=TipoAlergia]").val($("select[name^=TipoAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Tipo da Alergia na aba Alergia");
        console.log(`Error. ${error.message}.`);
      });

      this.classificacaoriscoservice.BindAlergia().subscribe(async (data: Return) => {
        this.listaAlergia = data.result;
        $(document).ready(function () { $("select[name^=Alergia]").val($("select[name^=Alergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Alergia na aba Alergia");
        console.log(`Error. ${error.message}.`);
      });


      this.classificacaoriscoservice.BindLocalizacaoAlergia().subscribe(async (data: Return) => {
        this.listaLocalizacaoAlergia = data.result;
        $(document).ready(function () { $("select[name^=LocalizacaoAlergia]").val($("select[name^=LocalizacaoAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Localização Alergia na aba Alergia");
        console.log(`Error. ${error.message}.`);
      });

      this.classificacaoriscoservice.BindReacaoAlergia().subscribe(async (data: Return) => {
        this.listaReacaoAlergia = data.result;
        $(document).ready(function () { $("select[name^=ReacaoAlergia]").val($("select[name^=ReacaoAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Alergia na aba Alergia");
        console.log(`Error. ${error.message}.`);
        });

      this.classificacaoriscoservice.BindSeveridade().subscribe(async (data: Return) => {
        this.listaSeveridadeAlergia = data.result;
        $(document).ready(function () { $("select[name^=SeveridadeAlergia]").val($("select[name^=SeveridadeAlergia] option:first").val()); });

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Severidade na aba Alergia");
        console.log(`Error. ${error.message}.`);
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

}







