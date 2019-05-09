import { Component, OnInit } from '@angular/core';
import { AcolhimentoService } from './acolhimento.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Especialidade } from '../../model/Especialidade';
import { TipoChegada } from '../../model/TipoChegada';
import { TipoOcorrencia } from 'src/app/model/TipoOcorrencia';
import { HttpErrorResponse } from '@angular/common/http';
import { Estado } from '../../model/Estado';
import { Cidade } from '../../model/Cidade';
import { Cep } from '../../model/Cep';
import { PessoaService } from '../cadastro/pessoa/pessoa.service';
import * as RemoveAcentos from 'remove-accents';
import { CpfService } from '../util/cpf.service';
import { NgForm } from '@angular/forms';
import { Acolhimento } from '../../model/Acolhimento';
import { Pessoa } from '../../model/Pessoa';
import { PessoaPaciente } from '../../model/PessoaPaciente';
import { PessoaProfissional } from '../../model/PessoaProfissional';
import * as moment from 'moment';
import { Return } from '../../model/Return';
import * as Toastr from 'toastr';
import { Preferencial } from '../../model/Preferencial';

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

  constructor(private AcolhimentoService: AcolhimentoService,
    private pessoaService: PessoaService, private cpfService: CpfService, private router: Router) {

    this.listaPreferencial = new Array<Preferencial>();
    this.listaEspecialidade = new Array<Especialidade>();
  }


  public ngOnInit() {


    $(document).ready(function () {

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


    console.log(localStorage['token_accessToken']);


    this.AcolhimentoService.BindEspecialidade().subscribe(async (data: Return) => {
      this.listaEspecialidade = data.result;

      $(document).ready(function () { $("select[name^=Especialidade]").val($("select[name^=Especialidade] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Especialidades na aba Informações do acolhimento");
      console.log(`Error. ${error.message}.`);
    });

    this.AcolhimentoService.BindPreferencial().subscribe(async (data: Return) => {
      this.listaPreferencial = data.result;

      
      $(document).ready(function () { $("select[name^=Preferencial]").val($("select[name^=Preferencial] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Preferenciais na aba Informações do acolhimento");
      console.log(`Error. ${error.message}.`);
    });


  }


  //begin:: validacao e consulta de CPF
  onConsultaCpf(e) {

    var cpf = e.target.value;

    if (cpf !== '___.___.___-__') {

      var verifica = this.cpfService.validarCPF(cpf);

      if (verifica === false) {
        $('#msg_cpf').removeClass('oculta');
      } else {
        $('#msg_cpf').addClass('oculta');

        var cpf = cpf.replace('.', '').replace('.', '').replace('.', '').replace('-', '');

        this.pessoaService.ConsultaCpfPaciente(cpf).subscribe(data => {
          if (data.statusCode == "302") {
            Toastr.info("Paciente encontrado");
            var paciente = data.result;
            this.CarregaPessoa(paciente);
          }
        }, (error: HttpErrorResponse) => {
          Toastr.error("Falha ao carregar Cpf na aba acolhimento");
          console.log(`Error. ${error.message}.`);
        });
      }
    }

  }
  //end:: validacao e consulta de CPF

  //begin:: carregamento padrão de campos para a tela
  CarregaPessoa(pessoa: any) {

    this.Pessoa = pessoa;

    if (pessoa.cpf !== "")
      $("input[name^=P_CPF]").val([pessoa.cpf.slice(0, 3)] + "." + [pessoa.cpf.slice(3, 6)] + "." + [pessoa.cpf.slice(6, 9)] + "-" + [pessoa.cpf.slice(9, 11)]);


    $("input[name^=NomeDoPaciente]").val(pessoa.nomeCompleto);


  }
  //end:: carregamento padrão de campos para a tela

  public onSalvarAcolhimento(rb: NgForm) {

    $("#k_scrolltop").trigger("click");

    var acolhimento: Acolhimento = {};


    var pessoa: PessoaPaciente = {};

    pessoa.ativo = true;

    var imc = $("input[name^=SV_IMC]").val();

    if (rb.value.IdentificacaoPaciente !== "")
      pessoa.nomeCompleto = rb.value.IdentificacaoPaciente.toUpperCase();


    if (rb.value.NomeSocial !== "")
      pessoa.nomeSocial = rb.value.NomeSocial.toUpperCase();


    acolhimento.Especialidade = this.Especialidade;

    if ($("label[for^=Cadeirante]").hasClass("active"))
      acolhimento.Preferencial = this.listaPreferencial.find(x => x.nome === "DEFICIENTE FISICO");

    if ($("label[for^=Gestante]").hasClass("active"))
      acolhimento.Preferencial = this.listaPreferencial.find(x => x.nome === "GESTANTE");

    if ($("label[for^=Idoso60]").hasClass("active"))
      acolhimento.Preferencial = this.listaPreferencial.find(x => x.nome === "IDOSO 60 ANOS: PESSOA COM IDADE ENTRE 60 E 79 ANOS");

    if ($("label[for^=Idoso80]").hasClass("active"))
      acolhimento.Preferencial = this.listaPreferencial.find(x => x.nome === "IDOSO 80 ANOS: PESSOA COM IDADE IGUAL OU SUPERIOR A 80 ANOS");

    if (rb.value.SV_Peso !== "")
      acolhimento.peso = rb.value.SV_Peso;

    if (rb.value.SV_Altura !== "")
      acolhimento.altura = rb.value.SV_Altura;

    if (imc !== "")
      acolhimento.imc = imc;

    if (rb.value.SV_Temperatura !== "")
      acolhimento.temperatura = rb.value.SV_Temperatura;

    if (rb.value.SV_PressaoArterial_Sistolica !== "")
      acolhimento.PressaoArterialSistolica = rb.value.SV_PressaoArterial_Sistolica;

    if (rb.value.SV_PressaoArterial_Diastolica !== "")
      acolhimento.PressaoArterialDiastolica = rb.value.SV_PressaoArterial_Diastolica;

    if (rb.value.SV_Pulso !== "")
      acolhimento.pulso = rb.value.SV_Pulso;

    if (rb.value.SV_FreqResp !== "")
      acolhimento.frequenciaRespiratoria = rb.value.SV_FreqResp;

    if (rb.value.SV_Saturacao !== "")
      acolhimento.saturacao = rb.value.SV_Saturacao;

    if ($("label[for^=PacienteRisco]").hasClass("active"))
      acolhimento.risco = true;
    else
      acolhimento.risco = false;



    //if (this.Pessoa === undefined)
      acolhimento.PessoaPaciente = pessoa;
    //else {

    //  pessoa.pessoaId = this.Pessoa.pessoaId;

    //  this.AcolhimentoService.AlterarRegistroPessoa(pessoa).subscribe(data => {

    //    acolhimento.Pessoa = pessoa;

    //  }, (error: HttpErrorResponse) => {
    //    Toastr.error("Falha ao comunicar com API");
    //    console.log(`Error. ${error.message}.`);
    //  },
    //  );



      //this.pessoaService.SalvarPessoaPaciente(pessoa).subscribe(data => {

      //  acolhimento.Pessoa = pessoa;

      //}, (error: HttpErrorResponse) => {
      //  Toastr.error("Falha ao comunicar com API");
      //  console.log(`Error. ${error.message}.`);
      //},
      //);

    //}
    console.log(JSON.stringify(acolhimento));

    console.log(localStorage['token_accessToken']);


    this.AcolhimentoService.SalvarAcolhimento(acolhimento).subscribe(data => {

      Toastr.success("Acolhimento salvo com sucesso");

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao comunicar com API");
      console.log(`Error. ${error.message}.`);
    },
    );

  }

  //begin:: Consulta o nome do paciente/ Consulta e monta um grid com as opções
  onConsultaNomeCompleto() {

    var dp_nomecompleto = $("input[name^=NomeDoPaciente]").val().trim().toUpperCase();

    $('#divPesquisaNomeCompleto').addClass('show');



    this.pessoaService.ConsultaNomeCompletoPaciente(dp_nomecompleto)
      .subscribe(data => {

        this.listaPessoaPaciente = data.result;

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao consultar o come completo do paciente");
        console.log(`Error. ${error.message}.`);
      });




  }
  //end:: Consulta o nome do paciente

  //begin:: Consulta o nome social do paciente/ Consulta e monta um grid com as opções
  onConsultaNomeSocial() {

    var dp_nomesocial = $("input[name^=NomeSocial]").val().trim().toUpperCase();

    $('#divPesquisaNomeSocial').addClass('show');
    $('#divPesquisaNomeCompleto').removeClass('show');

    this.pessoaService.ConsultaNomeSocialPaciente(dp_nomesocial)
      .subscribe(data => {

        this.listaPessoaPaciente = data.result;

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao consultar o nome social");
        console.log(`Error. ${error.message}.`);
      });
    console.log(this.listaPessoaPaciente);
  }
  //end:: Consulta o nome do paciente

  //begin:: Carregamento do Paciente pela Busca
  onSelectedPaciente(paciente: PessoaPaciente) {

    Toastr.info("Paciente carregado");
    this.CarregaPessoa(paciente);

    $("#divPesquisaNomeCompleto").removeClass('show');
    $("#divPesquisaNomeSocial").removeClass('show');
  }
  //end::  Carregamento do Paciente pela Busca


  //begin:: Limpa Campos/ mensagens responsáveis pelos avisos com integrações externas
  public LimparCampos(rb: NgForm) {


    this.Pessoa = undefined;
  }
  //end:: Limpa Campos


}

