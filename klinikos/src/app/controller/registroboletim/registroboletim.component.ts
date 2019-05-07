import { Component, OnInit } from '@angular/core';
import { RegistroBoletimService } from './registroboletim.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Especialidade } from '../../model/Especialidade';
import { TipoChegada } from '../../model/TipoChegada';
import { TipoOcorrencia } from 'src/app/model/TipoOcorrencia';
import { HttpErrorResponse } from '@angular/common/http';
import { Cep } from '../../model/Cep';
import { PessoaService } from '../cadastro/pessoa/pessoa.service';

import { CpfService } from '../util/cpf.service';
import { NgForm } from '@angular/forms';
import { RegistroBoletim } from '../../model/RegistroBoletim';
import { Pessoa } from '../../model/Pessoa';
import { PessoaPaciente } from '../../model/PessoaPaciente';
import { PessoaProfissional } from '../../model/PessoaProfissional';
import * as moment from 'moment';
import { Return } from '../../model/Return';
import * as Toastr from 'toastr';

@Component({
  selector: 'app-registroboletim',
  templateUrl: './registroboletim.component.html'
})
export class RegistroBoletimComponent implements OnInit {

  listaEspecialidade: Array<Especialidade>;
  listaTipoChegada: Array<TipoChegada>;
  listaPessoaProfissional: Array<PessoaProfissional>;
  listaPessoaPaciente: Array<PessoaPaciente>;

  Especialidade: Especialidade;
  TipoChegada: TipoChegada;
  TipoOcorrencia: TipoOcorrencia;
  orderNome: string = 'nome';
  orderDescricao: string = 'descricao';
  orderUf: string = 'uf';
  Pessoa: any;

  constructor(private registroBoletimService: RegistroBoletimService,
    private pessoaService: PessoaService, private cpfService: CpfService, private router: Router) {


  }


  public ngOnInit() {


    $(document).ready(function () {

      document.title = 'Registro Boletim | Klinikos';
      $("h3[class^=k-subheader__title]").html("Registro Boletim");

      $("#divPesquisaNomeCompleto")
        .mouseover(function () {
          $("#divPesquisaNomeCompleto").addClass('show');
        })
        .mouseout(function () {
          $("#divPesquisaNomeCompleto").removeClass('show');
        });

      $("input[name^=IB_NomePaciente]").focus(function () {
        if ($('input[name^=IB_NomePaciente]').val().length > 2 && $('input[name^=IB_NomePaciente]').is(':hover') === true)
          $("#divPesquisaNomeCompleto").addClass('show');
      });

      $("input[name^=IB_NomePaciente]").focusout(function () {
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


      $("input[name^=IB_NomeSocial]").focus(function () {
        if ($('input[name^=IB_NomeSocial]').val().length > 2 && $('input[name^=IB_NomeSocial]').is(':hover') === true)
          $("#divPesquisaNomeCompleto").addClass('show');
      });

      $("input[name^=IB_NomeSocial]").focusout(function () {
        if ($('#divPesquisaNomeSocial').is(':hover') === false)
          $("#divPesquisaNomeSocial").removeClass('show');
        else
          $("#divPesquisaNomeSocial").addClass('show');
      });





      $("#divPesquisaLogradouro")
        .mouseover(function () {
          $("#divPesquisaLogradouro").addClass('show');
        })
        .mouseout(function () {
          $("#divPesquisaLogradouro").removeClass('show');
        });


      $("input[name^=DO_CEP]").focus(function () {
        if ($('input[name^=DO_CEP]').val().length > 2 && $('input[name^=DO_CEP]').is(':hover') === true)
          $("#divPesquisaLogradouro").addClass('show');
      });

      $("input[name^=DO_CEP]").focusout(function () {
        if ($('#divPesquisaLogradouro').is(':hover') === false)
          $("#divPesquisaLogradouro").removeClass('show');
        else
          $("#divPesquisaLogradouro").addClass('show');
      });


    });

    var dataAtual = moment(new Date()).format('DD/MM/YYYY');
    var horaAtual = moment(new Date()).format('HH:mm');

    $(document).ready(function () {
      $("input[name^=IB_Data]").val(dataAtual);
      $("input[name^=IB_Hora]").val(horaAtual);
      $("select[name^=DP_Endereco_Cidade]").val($("select[name^=DP_Endereco_Cidade] option:first").val());
    });





    this.registroBoletimService.BindEspecialidade().subscribe(async (data: Return) => {
      this.listaEspecialidade = data.result;

      $(document).ready(function () { $("select[name^=IB_Especialidade]").val($("select[name^=IB_Especialidade] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Especialidades na aba Informações do boletim");
      console.log(`Error. ${error.message}.`);
    });

    this.registroBoletimService.BindTipoChegada().subscribe(async (data: Return) => {
      this.listaTipoChegada = data.result;

      $(document).ready(function () { $("select[name^=IB_ComoChegou]").val($("select[name^=IB_ComoChegou] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar tipos de chegada na aba Informações do boletim");
      console.log(`Error. ${error.message}.`);
    });

   

   


  }


  //begin:: Seleciona Endereco / Responsável por selecionar o cep vindo da consulta cep logradouro
  public onSelectedCep(cep: any) {

    $("input[name^=DO_CEP]").val(cep.cep);
    $("input[name^=DO_Logradouro]").val(cep.logradouro.toUpperCase());
    $("input[name^=DO_Bairro]").val(cep.bairro.toUpperCase());
    $("input[name^=DO_Complemento]").val(cep.complemento.toUpperCase());
    $('#divPesquisaLogradouro').addClass('oculta');
  }
  //end:: Seleciona Endereco

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
          Toastr.error("Falha ao carregar Raças na aba Dados Pessoais");
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


    $("input[name^=IB_NomePaciente]").val(pessoa.nomeCompleto);

    if (pessoa.nascimento != null) {

      var nascimento = new Date(pessoa.nascimento),
        month = '' + (nascimento.getMonth() + 1),
        day = '' + nascimento.getDate(),
        year = nascimento.getFullYear();

      $("input[name^=IB_Nascimento]").val(("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year);
    }

    if (pessoa.contato1.length === 10)
      $("input[name^=DP_Telefone]").val("(" + [pessoa.contato1.slice(0, 2)] + ")" + [pessoa.contato1.slice(2, 6)] + "-" + [pessoa.contato1.slice(6, 10)]);
    else
      $("input[name^=DP_Telefone]").val("(" + [pessoa.contato1.slice(0, 2)] + ")" + [pessoa.contato1.slice(2, 7)] + "-" + [pessoa.contato1.slice(7, 11)]);



    $("input[name^=IB_NomeSocial]").val(pessoa.nomeSocial);
    $("input[name^=DP_Logradouro]").val(pessoa.logradouro);
    $("input[name^=DP_Numero]").val(pessoa.numero);
    $("input[name^=DP_Complemento]").val(pessoa.complemento);
    $("input[name^=DP_Bairro]").val(pessoa.bairro);

  }
  //end:: carregamento padrão de campos para a tela

  public onSalvarRegistroBoletim(rb: NgForm) {

    $("#k_scrolltop").trigger("click");

    var registroboletim: RegistroBoletim = {};

    var dataBoletim = $("input[name^=IB_Data]").val();
    var horaBoletim = $("input[name^=IB_Hora]").val();
    var dataOcorrencia = $("input[name^=DO_Data]").val();
    var horaOcorrencia = $("input[name^=DO_Hora]").val();
    var cepOcorrencia = $("input[name^=DO_CEP]").val();
    var telefoneInformante = $("input[name^=IN_Telefone]").val();

    if (dataBoletim !== "") {
      var data = dataBoletim.split("/");
      var newData = new Date(data[2] + '-' + data[1] + '-' + data[0]);

      if (horaBoletim !== "") {
        var hora = horaBoletim.split(":");
        newData.setHours(newData.getHours() + parseInt(hora[0]));
        newData.setMinutes(newData.getMinutes() + parseInt(hora[1]));
      }
      registroboletim.dataBoletim = newData;
    }


    var pessoa: PessoaPaciente = {};

    pessoa.ativo = true;


    var cpf = $("input[name^=P_CPF]").val();
    var nascimento = $("input[name^=IB_Nascimento]").val();
    var telefone = $("input[name^=DP_Telefone]").val();
    var nome = $("input[name^=IB_NomePaciente]").val();


    if (nome !== "")
      pessoa.nomeCompleto = nome.toUpperCase();

    if (cpf !== "")
      pessoa.cpf = cpf.replace('.', '').replace('.', '').replace('-', '');

    if (nascimento !== "") {

      var data = nascimento.split("/");
      pessoa.nascimento = new Date(data[2] + '-' + data[1] + '-' + data[0]);

    }

    if (telefone !== "")
      pessoa.contato1 = telefone.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');

    if (rb.value.IB_NomeSocial !== "")
      pessoa.nomeSocial = rb.value.IB_NomeSocial.toUpperCase();

    if (rb.value.DP_Logradouro !== "")
      pessoa.logradouro = rb.value.DP_Logradouro.toUpperCase();

    if (rb.value.DP_Numero !== "")
      pessoa.numero = rb.value.DP_Numero.toUpperCase();

    if (rb.value.DP_Complemento !== "")
      pessoa.complemento = rb.value.DP_Complemento.toUpperCase();

    if (rb.value.DP_Bairro !== "")
      pessoa.bairro = rb.value.DP_Bairro.toUpperCase();


    registroboletim.TipoChegada = this.TipoChegada;
    registroboletim.Especialidade = this.Especialidade;

    if (rb.value.IN_NomeDoInformante !== "")
      registroboletim.nomeInformante = rb.value.IN_NomeDoInformante.toUpperCase();

    if (rb.value.IN_Endereco !== "")
      registroboletim.enderecoInformante = rb.value.IN_Endereco.toUpperCase();

    if (telefoneInformante !== "")
      registroboletim.telefoneInformante = telefoneInformante.replace('(', '').replace(')', '').replace('-', '');

    if (rb.value.IN_GrauParentesco !== "")
      registroboletim.grauParentesco = rb.value.IN_GrauParentesco.toUpperCase();

    if (this.Pessoa === undefined)
      registroboletim.Pessoa = pessoa;
    else {

      pessoa.pessoaId = this.Pessoa.pessoaId;

      this.registroBoletimService.AlterarRegistroPessoa(pessoa).subscribe(data => {

        registroboletim.Pessoa = pessoa;

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao comunicar com API");
        console.log(`Error. ${error.message}.`);
      },
      );

    }

    this.registroBoletimService.SalvarRegistroBoletim(registroboletim).subscribe(data => {

      Toastr.success("Registro Boletim salvo com sucesso");

      $("input[name^=IB_NumeroBoletim]").val(data.result.numeroBoletim);
      this.LimparCampos(rb);

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao comunicar com API");
      console.log(`Error. ${error.message}.`);
    },
    );

  }

  //begin:: Consulta o nome do paciente/ Consulta e monta um grid com as opções
  onConsultaNomeCompleto() {

    var dp_nomecompleto = $("input[name^=IB_NomePaciente]").val().trim().toUpperCase();

    $('#divPesquisaNomeCompleto').addClass('show');

    this.pessoaService.ConsultaNomeCompletoProfissional(dp_nomecompleto)
      .subscribe(data => {

        this.listaPessoaProfissional = data.result;


      }, (error: HttpErrorResponse) => {
        console.log(`Error. ${error.message}.`);
      });



    this.pessoaService.ConsultaNomeCompletoPaciente(dp_nomecompleto)
      .subscribe(data => {

        this.listaPessoaPaciente = data.result;

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao consultar cep na aba endereço");
        console.log(`Error. ${error.message}.`);
      });




  }
  //end:: Consulta o nome do paciente

  //begin:: Consulta o nome social do paciente/ Consulta e monta um grid com as opções
  onConsultaNomeSocial() {

    var dp_nomesocial = $("input[name^=IB_NomeSocial]").val().trim().toUpperCase();

    $('#divPesquisaNomeSocial').addClass('show');
    $('#divPesquisaNomeCompleto').removeClass('show');

    this.pessoaService.ConsultaNomeSocialProfissional(dp_nomesocial)
      .subscribe(data => {

        this.listaPessoaProfissional = data.result;


      }, (error: HttpErrorResponse) => {
        console.log(`Error. ${error.message}.`);
      });



    this.pessoaService.ConsultaNomeSocialPaciente(dp_nomesocial)
      .subscribe(data => {

        this.listaPessoaPaciente = data.result;

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao consultar cep na aba endereço");
        console.log(`Error. ${error.message}.`);
      });

    console.log(this.listaPessoaProfissional);
    console.log(this.listaPessoaPaciente);
  }
  //end:: Consulta o nome do paciente

  //begin:: Carregamento do Profissional pela Busca
  onSelectedProfissional(profissional: PessoaProfissional) {

    Toastr.info("Profissional carregado");
    this.CarregaPessoa(profissional);
    $("#divPesquisaNomeCompleto").removeClass('show');
    $("#divPesquisaNomeSocial").removeClass('show');

  }
  //end::  Carregamento do Profissional pela Busca

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

    rb.value.IN_Endereco = "";
    rb.value.IN_Telefone = "";
    rb.value.IN_GrauParentesco = "";
    rb.value.DO_Logradouro = "";
    rb.value.DO_Complemento = "";

  }
  //end:: Limpa Campos


}

