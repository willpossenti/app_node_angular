import { Component, OnInit } from '@angular/core';
import { AcolhimentoService } from './acolhimento.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Especialidade } from '../../model/Especialidade';
import { HttpErrorResponse } from '@angular/common/http';
import { PessoaService } from '../cadastro/pessoa/pessoa.service';
import { CpfService } from '../util/cpf.service';
import { NgForm } from '@angular/forms';
import { Acolhimento } from '../../model/Acolhimento';
import { PessoaPaciente } from '../../model/PessoaPaciente';
import { Return } from '../../model/Return';
import * as Toastr from 'toastr';
import { Preferencial } from '../../model/Preferencial';
import { AuthGuard } from '../../controller/auth/auth.guard';
import * as swal from '../../../assets/vendors/general/sweetalert2/dist/sweetalert2.js';
import { ImcService } from '../util/imc.service';
import { SinaisVitais } from '../util/sinaisvitais.service';


@Component({
  selector: 'app-acolhimento',
  templateUrl: './acolhimento.component.html'
})
export class AcolhimentoComponent implements OnInit {

  listaEspecialidade: Array<Especialidade>;
  listaPreferencial: Array<Preferencial>;
  listaPessoaPaciente: Array<PessoaPaciente>;

  Especialidade: Especialidade;
  Preferencial: Preferencial;
  orderNome: string = 'nome';
  orderDescricao: string = 'descricao';
  Pessoa: any;

  constructor(private AcolhimentoService: AcolhimentoService, private route: ActivatedRoute,
    private pessoaService: PessoaService, private cpfService: CpfService, private imcService: ImcService,
    private sinaisvitaisService: SinaisVitais, private router: Router, private auth: AuthGuard,) {

    this.listaPreferencial = new Array<Preferencial>();
    this.listaEspecialidade = new Array<Especialidade>();

    Toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
  }


  public ngOnInit() {

  

    $(document).ready(function () {



      $('img.svg').each(function () {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function (data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find('svg');

          // Add replaced image's ID to the new SVG
          if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');

          // Replace image with new SVG
          $img.replaceWith($svg);

        }, 'xml');

      });


      document.title = 'Acolhimento | Klinikos';
      $("h3[class^=k-subheader__title]").html("Acolhimento");

      $("#divPesquisaNomeCompleto")
        .mouseover(function () {
          $("#divPesquisaNomeCompleto").addClass('show');
        })
        .mouseout(function () {
          $("#divPesquisaNomeCompleto").removeClass('show');
        });

      $("input[name^=NomeDoPaciente]").focus(function () {
        if ($('input[name^=NomeDoPaciente]').val().length > 2 && $('input[name^=NomeDoPaciente]').is(':hover') === true)
          $("#divPesquisaNomeCompleto").addClass('show');
      });

      $("input[name^=NomeDoPaciente]").focusout(function () {
        if ($('#divPesquisaNomeCompleto').is(':hover') === false)
          $("#divPesquisaNomeCompleto").removeClass('show');
        else
          $("#divPesquisaNomeCompleto").addClass('show');
      });





      $("#divPesquisaNomeSocial")
        .mouseover(function () {
          $("#divPesquisaNomeSocial").addClass('show');
        })
        .mouseout(function () {
          $("#divPesquisaNomeSocial").removeClass('show');
        });


      $("input[name^=NomeSocial]").focus(function () {
        if ($('input[name^=NomeSocial]').val().length > 2 && $('input[name^=NomeSocial]').is(':hover') === true)
          $("#divPesquisaNomeCompleto").addClass('show');
      });

      $("input[name^=NomeSocial]").focusout(function () {
        if ($('#divPesquisaNomeSocial').is(':hover') === false)
          $("#divPesquisaNomeSocial").removeClass('show');
        else
          $("#divPesquisaNomeSocial").addClass('show');
      });




    });


    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();


    this.AcolhimentoService.BindEspecialidade().subscribe(async (data: Return) => {
      this.listaEspecialidade = data.result;

      $(document).ready(function () { $("select[name^=Especialidade]").val($("select[name^=Especialidade] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });

    this.AcolhimentoService.BindPreferencial().subscribe(async (data: Return) => {
      this.listaPreferencial = data.result;


      $(document).ready(function () { $("select[name^=Preferencial]").val($("select[name^=Preferencial] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });


  }




  //begin:: carregamento padrão de campos para a tela
  CarregaPessoa(pessoa: any) {

    this.Pessoa = pessoa;

    if (pessoa.nomeCompleto !== "")
      $("input[name^=IdentificacaoPacienteAcolhimento]").val(pessoa.nomeCompleto);

    if (pessoa.nomeSocial !== "")
      $("input[name^=NomeSocial]").val(pessoa.nomeSocial);


  }
  //end:: carregamento padrão de campos para a tela

  public onSalvarAcolhimento(a: NgForm) {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    $("#k_scrolltop").trigger("click");

    var acolhimento: Acolhimento = {};


    var pessoa: PessoaPaciente = {};

    pessoa.ativo = true;

    var imc = $("input[name^=SV_IMC]").val();

    if (a.value.IdentificacaoPacienteAcolhimento !== undefined)
      pessoa.nomeCompleto = a.value.IdentificacaoPacienteAcolhimento.toUpperCase();


    if (a.value.NomeSocial !== "")
      pessoa.nomeSocial = a.value.NomeSocial.toUpperCase();

    if (this.Especialidade != null)
      acolhimento.especialidadeId = this.Especialidade.especialidadeId;

    if ($("label[for^=Cadeirante]").hasClass("active"))
      acolhimento.preferencialId = this.listaPreferencial.find(x => x.nome === "DEFICIENTE FISICO").preferencialId;

    if ($("label[for^=Gestante]").hasClass("active"))
      acolhimento.preferencialId = this.listaPreferencial.find(x => x.nome === "GESTANTE").preferencialId;

    if ($("label[for^=Idoso60]").hasClass("active"))
      acolhimento.preferencialId = this.listaPreferencial.find(x => x.nome === "IDOSO 60 ANOS: PESSOA COM IDADE ENTRE 60 E 79 ANOS").preferencialId;

    if ($("label[for^=Idoso80]").hasClass("active"))
      acolhimento.preferencialId = this.listaPreferencial.find(x => x.nome === "IDOSO 80 ANOS: PESSOA COM IDADE IGUAL OU SUPERIOR A 80 ANOS").preferencialId;

    if (a.value.SV_Peso !== "")
      acolhimento.peso = a.value.SV_Peso + " kg";

    if (a.value.SV_Altura !== "")
      acolhimento.altura = a.value.SV_Altura + " cm";

    if (imc !== "")
      acolhimento.imc = imc;

    if (a.value.SV_Temperatura !== "")
      acolhimento.temperatura = a.value.SV_Temperatura + " °C";

    if (a.value.SV_PressaoArterial_Sistolica !== "")
      acolhimento.PressaoArterialSistolica = a.value.SV_PressaoArterial_Sistolica + " mmHg";

    if (a.value.SV_PressaoArterial_Diastolica !== "")
      acolhimento.PressaoArterialDiastolica = a.value.SV_PressaoArterial_Diastolica + " mmHg";

    if (a.value.SV_Pulso !== "")
      acolhimento.pulso = a.value.SV_Pulso + " bpm";

    if (a.value.SV_FreqResp !== "")
      acolhimento.frequenciaRespiratoria = a.value.SV_FreqResp + " rpm";

    if (a.value.SV_Saturacao !== "")
      acolhimento.saturacao = a.value.SV_Saturacao + " %";

    if ($("label[for^=PacienteRisco]").hasClass("active"))
      acolhimento.risco = true;
    else
      acolhimento.risco = false;

    acolhimento.PessoaPaciente = pessoa;

    var msgCamposObrigatorios = "";

    if (a.value.IdentificacaoPacienteAcolhimento === "")
    msgCamposObrigatorios = "Informe o nome\n";

    if (acolhimento.especialidadeId === undefined)
      if (a.value.IdentificacaoPacienteAcolhimento !== "")
        msgCamposObrigatorios += "Informe a especialidade\n";
      else
        msgCamposObrigatorios += "e a especialidade\n";

    if (msgCamposObrigatorios !== "") {
      swal("Campos Obrigatórios", msgCamposObrigatorios, "error");
      return;
    }


    this.AcolhimentoService.SalvarAcolhimento(acolhimento).subscribe(data => {


      Toastr.success("Acolhimento salvo com sucesso");

      this.onLimpaFormAcolhimento(a);

    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    },
    );

  }


  //begin:: Carregamento do Paciente pela Busca
  onSelectedPaciente(paciente: PessoaPaciente) {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    Toastr.info("Paciente carregado");
    this.CarregaPessoa(paciente);

    $("#divPesquisaNomeAcolhimento").removeClass('show');

  }
  //end::  Carregamento do Paciente pela Busca

  //begin:: Fecha as pesquisas
  onFechaPesquisa() {

    if ($("#divPesquisaNomeAcolhimento").hasClass('show'))
      $("#divPesquisaNomeAcolhimento").removeClass('show');


  }
  //end:: Fecha as pesquisas


  onConsultaNome() {

    if (this.auth.canActivate())
      this.auth.onSessaoAcrescimoTempo();

    var identificacaoPaciente = $("input[name^=IdentificacaoPacienteAcolhimento]").val().trim().toUpperCase();

    $('#divPesquisaNomeAcolhimento').addClass('show');



    this.AcolhimentoService.ConsultaPacienteAcolhimento(identificacaoPaciente)
      .subscribe(data => {

        this.listaPessoaPaciente = data.result;

      }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
      });


  }

  onLimpaFormAcolhimento(form: NgForm){

    $("#btn_formclear").trigger("click");
    form.reset();
    this.Pessoa = undefined;
    form.value.IdentificacaoPacienteAcolhimento = "";
    form.value.DP_NomeSocial = "";
    form.value.SV_Peso = "";
    form.value.SV_Altura = "";
    form.value.SV_Temperatura = "";
    form.value.SV_PressaoArterial_Sistolica = "";
    form.value.SV_PressaoArterial_Diastolica = "";
    form.value.SV_Pulso = "";
    form.value.SV_FreqResp = "";
    form.value.SV_Saturacao = "";
    $("select[name^=Especialidade]").val($("select[name^=Especialidade] option:first").val());

  }

  onCalculaImc(){

  var peso = $("input[name^=Peso]").val();
  var altura = $("input[name^=Altura]").val();

    if(peso !== "" && altura !== ""){

      var imc = this.imcService.CalculaImc(peso, altura);

      $('input[name^=IMC]').val(imc);
    }

    
  }

  onValidaTemperatura(){

     var temp = $('input[name^=SV_Temperatura]').val();

     var msg_validacao = this.sinaisvitaisService.ValidaTemperatura(temp);

     switch(msg_validacao) { 
      case 'normal': { 
        $('#msg_temp_acolhimento_a, #msg_temp_acolhimento_b').addClass('oculta');
         break; 
      } 
      case 'recomendar': { 
        $('#msg_temp_acolhimento_b').removeClass('oculta');
        $('#msg_temp_acolhimento_a').addClass('oculta');
         break; 
      } 
      case 'bloquear': { 
        $('#msg_temp_acolhimento_a').removeClass('oculta');
        $('#msg_temp_acolhimento_b').addClass('oculta');
        break; 
     } 
   } 

     }


     onValidaSaturacao(){

      var saturacao = $('input[name^=SV_Saturacao]').val();

     var msg_validacao = this.sinaisvitaisService.ValidaSaturacao(saturacao);

     switch(msg_validacao) { 
      case 'normal': { 
        $('#msg_sat_acolhimento_a, #msg_sat_acolhimento_b').addClass('oculta');
         break; 
      } 
      case 'recomendar': { 
        $('#msg_sat_acolhimento_a').removeClass('oculta');
        $('#msg_sat_acolhimento_b').addClass('oculta');
         break; 
      } 
      case 'bloquear': { 
        $('#msg_sat_acolhimento_b').removeClass('oculta');
        $('#msg_sat_acolhimento_a').addClass('oculta');
        
        break; 
     } 
   } 
     }


     onValidaFreqResp(){

      var freq_resp = $('input[name^=SV_FreqResp]').val();

      var msg_validacao = this.sinaisvitaisService.ValidaFrequenciaRespiratoria(freq_resp);

      switch(msg_validacao) { 
       case 'normal': { 
         $('#msg_freqResp_acolhimento_a, #msg_freqResp_acolhimento_b').addClass('oculta');
          break; 
       } 
       case 'recomendar': { 
         $('#msg_freqResp_acolhimento_a').removeClass('oculta');
         $('#msg_freqResp_acolhimento_b').addClass('oculta');
          break; 
       } 
       case 'bloquear': { 
         $('#msg_freqResp_acolhimento_b').removeClass('oculta');
         $('#msg_freqResp_acolhimento_a').addClass('oculta');
         
         break; 
      } 
    }

     }

     onValidaPulso(){

      var pulso = $('input[name^=SV_Pulso]').val();
  
      var msg_validacao = this.sinaisvitaisService.ValidaPulso(pulso);

      switch(msg_validacao) { 
       case 'normal': { 
        $('#msg_pulso_acolhimento_a, #msg_pulso_acolhimento_b').addClass('oculta');
          break; 
       } 
       case 'recomendar': { 
        $('#msg_pulso_acolhimento_a').removeClass('oculta');
        $('#msg_pulso_acolhimento_b').addClass('oculta');      
         break; 
       } 
       case 'bloquear': { 
        $('#msg_pulso_acolhimento_b').removeClass('oculta');
         $('#msg_pulso_acolhimento_a').addClass('oculta'); 
         break; 
      } 
    }

     }

     onValidaPresSistolica(){

      var pulso = $('input[name^=SV_PressaoArterial_Sistolica]').val();
  
      var msg_validacao = this.sinaisvitaisService.ValidaPressaoArterialSistolica(pulso);

      switch(msg_validacao) { 
       case 'normal': { 
        $('#msg_pressaosistolica_acolhimento_a, #msg_pressaosistolica_acolhimento_b').addClass('oculta');
          break; 
       } 
       case 'recomendar': { 
        $('#msg_pressaosistolica_acolhimento_a').removeClass('oculta');
        $('#msg_pressaosistolica_acolhimento_b').addClass('oculta');      
         break; 
       } 
       case 'bloquear': { 
        $('#msg_pressaosistolica_acolhimento_b').removeClass('oculta');
         $('#msg_pressaosistolica_acolhimento_a').addClass('oculta'); 
         break; 
      } 
    }

     }

     onValidaPresDiastolica(){

      var pulso = $('input[name^=SV_PressaoArterial_Diastolica]').val();
  
      var msg_validacao = this.sinaisvitaisService.ValidaPressaoArterialDiastolica(pulso);

      switch(msg_validacao) { 
       case 'normal': { 
        $('#msg_pressaodiastolica_acolhimento_a, #msg_pressaodiastolica_acolhimento_b').addClass('oculta');
          break; 
       } 
       case 'recomendar': { 
        $('#msg_pressaodiastolica_acolhimento_a').removeClass('oculta');
        $('#msg_pressaodiastolica_acolhimento_b').addClass('oculta');      
         break; 
       } 
       case 'bloquear': { 
        $('#msg_pressaodiastolica_acolhimento_b').removeClass('oculta');
         $('#msg_pressaodiastolica_acolhimento_a').addClass('oculta'); 
         break; 
      } 
    }

     }

}

