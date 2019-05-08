import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { Raca } from '../../../model/Raca';
import { Etnia } from '../../../model/Etnia';
import { Justificativa } from '../../../model/Justificativa';
import { Nacionalidade } from '../../../model/Nacionalidade';
import { Estado } from '../../../model/Estado';
import { Cidade } from '../../../model/Cidade';
import { Ocupacao } from '../../../model/Ocupacao';
import { PessoaPaciente } from '../../../model/PessoaPaciente';
import { PessoaProfissional } from '../../../model/PessoaProfissional';
import { OrgaoEmissor } from '../../../model/OrgaoEmissor';
import { Escolaridade } from '../../../model/Escolaridade';
import { Pais } from '../../../model/Pais';
import { TipoCertidao } from '../../../model/TipoCertidao';
import { SituacaoFamiliarConjugal } from '../../../model/SituacaoFamiliarConjugal';
import { TipoProfissional } from '../../../model/TipoProfissional';
import { LotacaoProfissional } from '../../../model/LotacaoProfissional';
import { PessoaService } from './pessoa.service';
import * as RemoveAcentos from 'remove-accents';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { sortBy } from 'sort-by-typescript';
import { Pessoa } from '../../../model/Pessoa';
import { Return } from '../../../model/Return';
import { AgeFromDate } from 'age-calculator';
import * as swal from '../../../../assets/vendors/general/sweetalert2/dist/sweetalert2.js';
import { Cep } from '../../../model/Cep';
import { CpfService } from '../../util/cpf.service';
import * as moment from 'moment';
import * as Toastr from 'toastr';


@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html'
})
export class PessoaComponent implements OnInit {

  listaRaca: Array<Raca>;
  listaEtnia: Array<Etnia>;
  listaJustificativa: Array<Justificativa>;
  listaNacionalidade: Array<Nacionalidade>;
  listaEstado: Array<Estado>;
  listaUFIdentidade: Array<Estado>;
  listaCidade: Array<Cidade>;
  listaOrgaoEmissor: Array<OrgaoEmissor>;
  listaCidadeEndereco: Array<Cidade>;
  listaOcupacao: Array<Ocupacao>;
  listaPais: Array<Pais>;
  listaTipoCertidao: Array<TipoCertidao>;
  listaEscolaridade: Array<Escolaridade>;
  listaSituacaoFamiliarConjugal: Array<SituacaoFamiliarConjugal>;
  listaTipoProfissional: Array<TipoProfissional>;
  listaLotacaoProfissional: Array<LotacaoProfissional>;
  listaCep: Array<Cep>;
  listaPessoaProfissional: Array<PessoaProfissional>;
  listaPessoaPaciente: Array<PessoaPaciente>;

  Pessoa: any;
  Raca: Raca;
  Etnia: Etnia;
  Justificativa: Justificativa;
  Nacionalidade: Nacionalidade;
  Estado: Estado;
  Cidade: Cidade;
  UfIdentidade: Estado;
  OrgaoEmissor: OrgaoEmissor;
  orderNome: string = 'nome';
  orderDescricao: string = 'descricao';
  orderUf: string = 'uf';
  EstadoEndereco: Estado;
  CidadeEndereco: Cidade;
  Ocupacao: Ocupacao;
  Pais: Pais;
  TipoCertidao: TipoCertidao;
  UfCtps: Estado;
  UfProfissional: Estado;
  OrgaoEmissorProfissional: OrgaoEmissor;
  TipoProfissional: TipoProfissional;
  LotacaoProfissional: LotacaoProfissional;
  Escolaridade: Escolaridade;
  SituacaoFamiliarConjugal: SituacaoFamiliarConjugal;
  foto: string;


  constructor(private pessoaService: PessoaService,
    private cpfService: CpfService, private router: Router) {
    this.listaLotacaoProfissional = new Array<LotacaoProfissional>();
    this.listaOcupacao = new Array<Ocupacao>();
    this.listaPais = new Array<Pais>();
    this.listaTipoCertidao = new Array<TipoCertidao>();
    this.listaEstado = new Array<Estado>();
    this.listaEscolaridade = new Array<Escolaridade>();
    this.listaSituacaoFamiliarConjugal = new Array<SituacaoFamiliarConjugal>();
    this.Pessoa = null;

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

  //begin:: Carregamento Básico da tela
  public ngOnInit() {

    var page = this;

    var dataAtual = moment(new Date()).format('DD/MM/YYYY');
    var horaAtual = moment(new Date()).format('HH:mm:ss');

    this.pessoaService.BindRaca().subscribe(async (data: Return) => {
      this.listaRaca = data.result;

      $(document).ready(function () { $("select[name^=DP_Cor]").val($("select[name^=DP_Cor] option:first").val()); });


    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Raças na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });


    this.pessoaService.BindJustificativa().subscribe(async (data: Return) => {
      this.listaJustificativa = data.result;

      $(document).ready(function () { $("select[name^=DP_JustificativaCPF]").val($("select[name^=DP_JustificativaCPF] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Justificativas na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });

    this.pessoaService.BindNacionalidade().subscribe(async (data: Return) => {

      this.listaNacionalidade = data.result;

      $(document).ready(function () { $("select[name^=DP_Nacionalidade]").val($("select[name^=DP_Nacionalidade] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Nacionalidades na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });

    this.pessoaService.BindEstado().subscribe(async (data: Return) => {
      this.listaEstado = data.result;
      this.listaUFIdentidade = data.result;

      $(document).ready(function () {
        $("select[name^=DP_NaturalidadeUF]").val($("select[name^=DP_NaturalidadeUF] option:first").val());
        $("select[name^=DP_NaturalidadeCidade]").val($("select[name^=DP_NaturalidadeCidade] option:first").val());
        $("select[name^=DP_IdentidadeUF]").val($("select[name^=DP_IdentidadeUF] option:first").val());
        $("select[name^=DP_Endereco_Estado]").val($("select[name^=DP_Endereco_Estado] option:first").val());
        $("select[name^=DP_UF_Ctps]").val($("select[name^=DP_UF_Ctps] option:first").val());
        $("select[name^=DP_ProfUF]").val($("select[name^=DP_ProfUF] option:first").val());
        $("select[name^=DP_Endereco_Cidade]").val($("select[name^=DP_Endereco_Cidade] option:first").val());

      });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Estados Naturalidade na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });




    this.pessoaService.BindOrgaoEmissor().subscribe(async (data: Return) => {
      this.listaOrgaoEmissor = data.result;
      $(document).ready(function () {
        $("select[name^=DP_OrgaoEmissor]").val($("select[name^=DP_OrgaoEmissor] option:first").val());
        $("select[name^=DP_Prof_OrgaoEmissor]").val($("select[name^=DP_Prof_OrgaoEmissor] option:first").val());
      });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Orgãos Emissores na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });



    $(document).ready(function () {

      document.title = 'Cadastro | Klinikos';
      $("h3[class^=k-subheader__title]").html("Cadastro");



      $("select[name^=DP_Etnia]").val($("select[name^=DP_Etnia] option:first").val());

      $("select[name^=DP_OrgaoEmissor]").val($("select[name^=DP_OrgaoEmissor] option:first").val());
      $("select[name^=DP_Prof_OrgaoEmissor]").val($("select[name^=DP_Prof_OrgaoEmissor] option:first").val());

      $('#k_table_1').on('click', 'input[name^=Prof_Coord]', function () {
        var id = '#' + $(this).attr('id') + '';
        if ($(this).prop('checked') === true) {
          $(this).prop('checked', false);
          swal({ title: 'Deseja torná-lo como coordenador?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })
            .then(function (result) {
              if (result.value) {
                $(id).prop('checked', true);
              }
            });
        } else {
          $(id).prop('checked', true);
          swal({ title: 'Deseja tirá-lo como coordenador?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })
            .then(function (result) {
              if (result.value) {
                $(id).prop('checked', false);
              }
            });
        }
      });
      $('#k_table_1').on('click', 'input[name^=Prof_Ativo]', function () {
        var id = '#' + $(this).attr('id') + '';
        if ($(this).prop('checked') === true) {
          $(this).prop('checked', false);
          swal({ title: 'Deseja ativar a lotação?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })
            .then(function (result) {
              if (result.value) {
                $(id).prop('checked', true);
              }
            });
        } else {
          $(id).prop('checked', true);
          swal({ title: 'Deseja desativar a lotação?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })
            .then(function (result) {
              if (result.value) {
                $(id).prop('checked', false);
              }
            });
        }
      });


      var _URL = window.URL;


      $('input[type^=file]').change(function () {

        var file = $(this)[0].files[0];

        var reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onload = function () {

          var imagem = new Image();
          imagem.src = _URL.createObjectURL(file);

          imagem.onload = function () {

            if ($(this)[0].width === $(this)[0].height)
              $('.k-avatar__holder').css('background-size', '120px 120px');
            else
              $('.k-avatar__holder').css('background-size', '160px 120px');
          };

          page.foto = reader.result.toString();
          $('.k-avatar__holder').css('background-image', 'url("' + reader.result + '")');

          $('.k-avatar__holder').css('background-position', 'center');
        };

      });

      var labelID;

      $('label[for^=imgFoto]').click(function () {
        alert('teste');
      });

    });


    var dataAtual2 = moment(new Date()).format('DD/MM/YYYY');
    var horaAtual2 = moment(new Date()).format('HH:mm:ss');





  }
  //end:: Carregamento Básico da tela




  //begin:: Consulta o nome do paciente/ Consulta e monta um grid com as opções
  onConsultaNomeCompleto() {

    var dp_nomecompleto = $("input[name^=DP_NomeCompleto]").val().trim().toUpperCase();

    $('#divPesquisaNomeCompleto').addClass('show');

    this.pessoaService.ConsultaNomeCompletoProfissional(dp_nomecompleto)
      .subscribe(async (data: Return) => {

        this.listaPessoaProfissional = data.result;


      }, (error: HttpErrorResponse) => {
        console.log(`Error. ${error.message}.`);
      });



    this.pessoaService.ConsultaNomeCompletoPaciente(dp_nomecompleto)
      .subscribe(data => {

        this.listaPessoaPaciente = data.result;

      }, (error: HttpErrorResponse) => {
        console.log(`Error. ${error.message}.`);
      });




  }
  //end:: Consulta o nome do paciente

  //begin:: Consulta o nome social do paciente/ Consulta e monta um grid com as opções
  onConsultaNomeSocial() {

    var dp_nomesocial = $("input[name^=DP_NomeSocial]").val().trim().toUpperCase();

    $('#divPesquisaNomeSocial').addClass('show');
    $('#divPesquisaNomeCompleto').removeClass('show');

    this.pessoaService.ConsultaNomeSocialProfissional(dp_nomesocial)
      .subscribe(async (data: Return) => {

        this.listaPessoaProfissional = data.result;


      }, (error: HttpErrorResponse) => {
        console.log(`Error. ${error.message}.`);
      });



    this.pessoaService.ConsultaNomeSocialPaciente(dp_nomesocial)
      .subscribe(async (data: Return) => {

        this.listaPessoaPaciente = data.result;

      }, (error: HttpErrorResponse) => {
        console.log(`Error. ${error.message}.`);
      });

  }
  //end:: Consulta o nome do paciente

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

  //begin:: validacao de formatação do cns
  validaCNS(cns) {

    var pis;
    var resto;
    var dv;
    var soma;
    var resultado;
    var result;
    var tamCNS = cns.length;
    result = 0;


    if ((cns.substring(0, 1) !== "7") && (cns.substring(0, 1) !== "8") && (cns.substring(0, 1) !== "9")) {

      if ((tamCNS) !== 15) {
        return false;
      }
      pis = cns.substring(0, 11);

      soma = (((parseInt(pis.substring(0, 1))) * 15) +
        ((parseInt(pis.substring(1, 2))) * 14) +
        ((parseInt(pis.substring(2, 3))) * 13) +
        ((parseInt(pis.substring(3, 4))) * 12) +
        ((parseInt(pis.substring(4, 5))) * 11) +
        ((parseInt(pis.substring(5, 6))) * 10) +
        ((parseInt(pis.substring(6, 7))) * 9) +
        ((parseInt(pis.substring(7, 8))) * 8) +
        ((parseInt(pis.substring(8, 9))) * 7) +
        ((parseInt(pis.substring(9, 10))) * 6) +
        ((parseInt(pis.substring(10, 11))) * 5));


      resto = soma % 11;
      dv = 11 - resto;
      if (dv === 11) {
        dv = 0;
      }


      if (dv === 10) {
        soma = (((parseInt(pis.substring(0, 1))) * 15) +
          ((parseInt(pis.substring(1, 2))) * 14) +
          ((parseInt(pis.substring(2, 3))) * 13) +
          ((parseInt(pis.substring(3, 4))) * 12) +
          ((parseInt(pis.substring(4, 5))) * 11) +
          ((parseInt(pis.substring(5, 6))) * 10) +
          ((parseInt(pis.substring(6, 7))) * 9) +
          ((parseInt(pis.substring(7, 8))) * 8) +
          ((parseInt(pis.substring(8, 9))) * 7) +
          ((parseInt(pis.substring(9, 10))) * 6) +
          ((parseInt(pis.substring(10, 11))) * 5) + 2);
        resto = soma % 11;
        dv = 11 - resto;
        resultado = pis + "001" + String(dv);
      } else {
        resultado = pis + "000" + String(dv);
      }
      if (cns !== resultado) {
        return false;
      } else {
        return true;
      }
    }


    if (pis === "") {
      return false;
    }


    soma = ((parseInt(pis.substring(0, 1), 10)) * 15)
      + ((parseInt(pis.substring(1, 2), 10)) * 14)
      + ((parseInt(pis.substring(2, 3), 10)) * 13)
      + ((parseInt(pis.substring(3, 4), 10)) * 12)
      + ((parseInt(pis.substring(4, 5), 10)) * 11)
      + ((parseInt(pis.substring(5, 6), 10)) * 10)
      + ((parseInt(pis.substring(6, 7), 10)) * 9)
      + ((parseInt(pis.substring(7, 8), 10)) * 8)
      + ((parseInt(pis.substring(8, 9), 10)) * 7)
      + ((parseInt(pis.substring(9, 10), 10)) * 6)
      + ((parseInt(pis.substring(10, 11), 10)) * 5)
      + ((parseInt(pis.substring(11, 12), 10)) * 4)
      + ((parseInt(pis.substring(12, 13), 10)) * 3)
      + ((parseInt(pis.substring(13, 14), 10)) * 2)
      + ((parseInt(pis.substring(14, 15), 10)) * 1);

    resto = soma % 11;
    if (resto === 0) {
      return true;
    }
    else {
      return false;
    }

  }
  //end:: validacao de formatação do cns

  //begin:: validacao de formatação do pis
  validaPIS(pis) {

    var multiplicador = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    var soma = 0;
    var resto = 0;

    if (pis.trim().length !== 11)
      return false;

    pis = pis.trim();
    pis = pis.replace("-", "").replace(".", "").padStart(11, '0');

    for (var i = 0; i < 10; i++)
      soma += parseInt(pis.charAt(i)) * multiplicador[i];

    resto = soma % 11;

    if (resto < 2)
      resto = 0;
    else
      resto = 11 - resto;

    return pis.endsWith(resto.toString());
  }
  //end:: validacao de formatação do pis

  //begin:: calcula idade
  public onCalculaIdade() {


    var data = $("input[name='DP_Nascimento']").val().split("/");
    let ageFromDate = new AgeFromDate(new Date(data[2], data[1], data[0])).age;

    if (ageFromDate > 0)
      $("input[name='DP_IdadeAparente']").val(ageFromDate > 1 ? ageFromDate + " ANOS" : ageFromDate + " ANO");
    else {


      var today = new Date();
      var start = new Date(data[2], data[1], data[0]);
      var end = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
      var millisecondsPerDay = 1000 * 60 * 60 * 24;
      var millisBetween = end.getTime() - start.getTime();
      var days = millisBetween / millisecondsPerDay;

      var today = new Date();
      var currentDay = today.getDate();
      var currentMonth = today.getMonth() + 1;
      var currentYear = today.getFullYear();


      if (currentMonth > parseInt(data[1]) && currentYear === parseInt(data[2])) {
        if (data[0] <= currentDay) {
          var monthDiff = currentMonth - data[1];
          $("input[name='DP_IdadeAparente']").val(monthDiff > 1 ? monthDiff + " MESES" : monthDiff + " MÊS");

        } else {
          var monthDiff = (currentMonth - data[1]) - 1;
          if (monthDiff > 0)
            $("input[name='DP_IdadeAparente']").val(monthDiff > 1 ? monthDiff + " MESES" : monthDiff + " MÊS");
        }
      } else if (currentYear > parseInt(data[2]) && days > 30) {

        var monthDiff = days / 30 | 0;

        if (parseInt(data[1]) == currentMonth && parseInt(data[0]) > currentDay)
          monthDiff--;

        if (monthDiff >= 12) {

          $("input[name='DP_IdadeAparente']").val("1 ANO");
        } else {
          $("input[name='DP_IdadeAparente']").val(monthDiff > 1 ? monthDiff + " MESES" : monthDiff + " MÊS");
        }
      }

      else {

        if (days > 0)
          $("input[name='DP_IdadeAparente']").val(days > 1 ? days + " DIAS" : days + " DIA");
        else
          $("input[name='DP_IdadeAparente']").val("");
      }
    }

  }
  //end:: calcula idade

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

        this.pessoaService.ConsultaCpfProfissional(cpf).subscribe(async (data: Return) => {

          if (data.statusCode != "302") {

            this.pessoaService.ConsultaCpfPaciente(cpf).subscribe(async (subdata: Return) => {

              if (subdata.statusCode == "302") {

                Toastr.info("Paciente encontrado");

                var paciente = subdata.result;

                if (paciente.recemnascido == true) {

                  $("input[name^=DP_RecemNascido]").prop("checked", true);
                  $('#box_numprontmae, #box_nomeRN').removeClass('oculta');
                  $('#box_nomecomp, #box_nomesocial').addClass('oculta');
                  $("input[name^=DP_NomeRN]").val(paciente.nomeCompleto);
                  $("input[name^=DP_NumProntuarioMae]").val(paciente.numeroProntuario);

                }

                this.CarregaPessoa(paciente);
              }
            }, (error: HttpErrorResponse) => {
              Toastr.error("Falha ao carregar Raças na aba Dados Pessoais");
              console.log(`Error. ${error.message}.`);
            });
          } else {


            this.onSelectedProfissional(data.result);
            Toastr.info("Profissional encontrado");
          }

        }, (error: HttpErrorResponse) => {
          Toastr.error("Falha ao carregar Raças na aba Dados Pessoais");
          console.log(`Error. ${error.message}.`);
        });
      }
    }

  }
  //end:: validacao e consulta de CPF

  //begin:: validacao e consulta de CNS
  onConsultaCns(e) {

    // var
    var dp_cns = e.target.value.replace(' ', '').replace(' ', '').replace(' ', '').replace('_', '');

    // não vazio/mask
    // retorno validação
    var verifica = this.validaCNS(dp_cns);
    // exibe mensagem de erro
    if (verifica === false) {
      $('#msg_cns').removeClass('oculta');
    }
    else {
      // oculta mensagem de erro
      $('#msg_cns').addClass('oculta');


      this.pessoaService.ConsultaCnsProfissional(dp_cns).subscribe(async (data: Return) => {

        if (data.statusCode != "302") {

          this.pessoaService.ConsultaCnsPaciente(dp_cns).subscribe(async (subdata: Return) => {

            if (subdata.statusCode == "302") {
              Toastr.info("Paciente encontrado");

              var paciente = subdata.result;

              if (paciente.recemnascido == true) {

                $("input[name^=DP_RecemNascido]").prop("checked", true);
                $('#box_numprontmae, #box_nomeRN').removeClass('oculta');
                $('#box_nomecomp, #box_nomesocial').addClass('oculta');
                $("input[name^=DP_NomeRN]").val(paciente.nomeCompleto);
                $("input[name^=DP_NumProntuarioMae]").val(paciente.numeroProntuario);

              }

              this.CarregaPessoa(paciente);
            }
          }, (error: HttpErrorResponse) => {
            Toastr.error("Falha ao carregar Pessoas na aba Dados Pessoais");
            console.log(`Error. ${error.message}.`);
          });
        } else {


          this.onSelectedProfissional(data.result);
          Toastr.info("Profissional encontrado");
        }

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Raças na aba Dados Pessoais");
        console.log(`Error. ${error.message}.`);
      });

    }


  }
  //end:: validacao e consulta de CNS

  //begin:: validacao e consulta de PIS
  onConsultaPis(e) {

    // var
    var dp_pis = e.target.value.replace('.', '').replace('.', '').replace('-', '').replace('_', '');

    // não vazio/mask
    // retorno validação
    var verifica = this.validaPIS(dp_pis);
    // exibe mensagem de erro
    if (verifica === false) {
      $('#msg_pis').removeClass('oculta');
    }
    else {
      // oculta mensagem de erro
      $('#msg_pis').addClass('oculta');


      this.pessoaService.ConsultaPisProfissional(dp_pis).subscribe(async (data: Return) => {

        if (data.statusCode != "302") {

          this.pessoaService.ConsultaPisPaciente(dp_pis).subscribe(async (subdata: Return) => {

            if (subdata.statusCode == "302") {
              Toastr.info("Paciente encontrado");
              var paciente = subdata.result;

              if (paciente.recemnascido == true) {

                $("input[name^=DP_RecemNascido]").prop("checked", true);
                $('#box_numprontmae, #box_nomeRN').removeClass('oculta');
                $('#box_nomecomp, #box_nomesocial').addClass('oculta');
                $("input[name^=DP_NomeRN]").val(paciente.nomeCompleto);
                $("input[name^=DP_NumProntuarioMae]").val(paciente.numeroProntuario);

              }

              this.CarregaPessoa(paciente);
            }
          }, (error: HttpErrorResponse) => {
            Toastr.error("Falha ao carregar Raças na aba Dados Pessoais");
            console.log(`Error. ${error.message}.`);
          });
        } else {


          this.onSelectedProfissional(data.result);
          Toastr.info("Falha ao carregar Raças na aba Dados Pessoais");
        }

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Raças na aba Dados Pessoais");
        console.log(`Error. ${error.message}.`);
      });

    }


  }
  //end:: validacao e consulta de PIS

  //begin:: Carregamento do Profissional pela Busca
  onSelectedProfissional(profissional: PessoaProfissional) {

    $("input[name^=DP_CPF]").val(profissional.cpf);

    this.CarregaPessoa(profissional);

    $('#DP_TipoCadastro').prop('checked', true);
    $('#box_dadosprof').removeClass('oculta');

    this.pessoaService.ConsultaLotacoesProfissional(profissional.pessoaId).subscribe(async (data: Return) => {

      this.listaLotacaoProfissional = data.result;
    }, error => {
      Toastr.error("Falha ao carregar Raças na aba Dados Pessoais");
      console.log(`Error. ${error._body}.`);;
    });


    this.onFechaPesquisa();

  }
  //end::  Carregamento do Profissional pela Busca

  //begin:: Carregamento do Paciente pela Busca
  onSelectedPaciente(paciente: PessoaPaciente) {


    $("input[name^=DP_CPF]").val(paciente.cpf);


    if (paciente.recemNascido == true) {

      $("input[name^=DP_RecemNascido]").prop("checked", true);
      $('#box_numprontmae, #box_nomeRN').removeClass('oculta');
      $('#box_nomecomp, #box_nomesocial').addClass('oculta');
      $("input[name^=DP_NomeRN]").val(paciente.nomeCompleto);
      $("input[name^=DP_NumProntuarioMae]").val(paciente.numeroProntuario);

    }

    this.CarregaPessoa(paciente);

    this.onFechaPesquisa();

  }
  //end::  Carregamento do Paciente pela Busca

  //begin:: carregamento padrão de campos para a tela
  CarregaPessoa(pessoa: any) {

    this.Pessoa = pessoa;

    $("input[name^=DP_NomeCompleto]").val(pessoa.nomeCompleto);
    $("input[name^=DP_NomeSocial]").val(pessoa.nomeSocial);


    if (pessoa.foto !== null) {

      var _URL = window.URL;

      var imagem = new Image();
      imagem.src = pessoa.foto;

      imagem.onload = function () {

        $('.k-avatar__holder').css('background-image', 'url("' + pessoa.foto + '")');

        if ($(this)[0].width === $(this)[0].height)
          $('.k-avatar__holder').css('background-size', '120px 120px');
        else
          $('.k-avatar__holder').css('background-size', '160px 120px');
      };

      $('.k-avatar__holder').css('background-position', 'center');
    }


    if (pessoa.sexo === "M")
      $("label[for^=DP_Sexo_Masculino]").addClass("active");
    if (pessoa.sexo === "F")
      $("label[for^=DP_Sexo_Feminino]").addClass("active");

    if (pessoa.nascimento != null) {

      var nascimento = new Date(pessoa.nascimento),
        month = '' + (nascimento.getMonth() + 1),
        day = '' + nascimento.getDate(),
        year = nascimento.getFullYear();

      $("input[name^=DP_Nascimento]").val(("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year);
    }

    this.onCalculaIdade();

    if (pessoa.raca !== null) {

      this.Raca = this.listaRaca.find(x => x.racaId === pessoa.raca.racaId);

      if (pessoa.etnia !== null) {

        this.Etnia = pessoa.etnia;
        this.onSelectedRaca();
      }
    }

    $("input[name^=DP_NomePai]").val(pessoa.nomePai);
    $("input[name^=DP_NomeMae]").val(pessoa.nomeMae);

    if (pessoa.justificativa !== null)
      this.Justificativa = this.listaJustificativa.find(x => x.justificativaId === pessoa.justificativa.justificativaId);
    if (pessoa.nacionalidade !== null)
      this.Nacionalidade = this.listaNacionalidade.find(x => x.nacionalidadeId === pessoa.nacionalidade.nacionalidadeId);

    if (pessoa.naturalidade !== null) {

      this.Estado = this.listaEstado.find(x => x.estadoId === pessoa.naturalidade.estado.estadoId);
      this.Cidade = pessoa.naturalidade;
      this.onSelectedUf();
    }

    $("input[name^=DP_Identidade]").val(pessoa.identidade);
    this.UfIdentidade = this.listaEstado.find(x => x.uf === pessoa.uf);

    if (pessoa.orgaoEmissor !== null)
      this.OrgaoEmissor = this.listaOrgaoEmissor.find(x => x.orgaoEmissorId === pessoa.orgaoEmissor.orgaoEmissorId);

    if (pessoa.emissao != null) {
      var emissao = new Date(pessoa.emissao),
        month = '' + (emissao.getMonth() + 1),
        day = '' + emissao.getDate(),
        year = emissao.getFullYear();
      $("input[name^=DP_OrgaoEmissorData]").val(("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year);
    }

    $("input[name^=DP_CNS]").val(pessoa.cns);

    $("input[name^=DP_CEP]").val(pessoa.cep);
    $("input[name^=DP_Logradouro]").val(pessoa.logradouro);
    $("input[name^=DP_Numero]").val(pessoa.numero);
    $("input[name^=DP_Complemento]").val(pessoa.complemento);

    if (pessoa.estado !== null) {
      this.EstadoEndereco = this.listaEstado.find(x => x.estadoId === pessoa.estado.estadoId);
      this.onSelectedUfEndereco();
      this.CidadeEndereco = pessoa.cidade;
    }

    $("input[name^=DP_Bairro]").val(pessoa.bairro);

    $("input[name^=Cont_Contato1]").val(pessoa.contato1);
    $("input[name^=Cont_Contato2]").val(pessoa.contato2);
    $("input[name^=Cont_Contato3]").val(pessoa.contato3);
    $("input[name^=Cont_Email]").val(pessoa.email);



    if (pessoa.pisPasep != null || pessoa.ocupacao != null || pessoa.paisOrigem != null || pessoa.dataEntradaPis != null ||
      pessoa.tipoCertidao != null || pessoa.nomeCartorio != null || pessoa.numeroLivro != null || pessoa.numeroFolha != null ||
      pessoa.numeroTermo != null || pessoa.dataEmissaoCertidao != null || pessoa.numeroCtps != null || pessoa.serieCtps != null ||
      pessoa.ufCtps != null || pessoa.dataEmissaoCtps != null || pessoa.tituloEleitor != null || pessoa.zona != null || pessoa.secao != null ||
      pessoa.frequentaEscola != null) {


      $("input[name^=DC_PISPASEP]").val(pessoa.pisPasep);

      if (pessoa.ocupacao != null)
        this.Ocupacao = pessoa.ocupacao;

      if (pessoa.paisOrigem != null)
        this.Pais = pessoa.paisOrigem;

      if (pessoa.dataEntradaPis != null) {

        var entradaPis = new Date(pessoa.dataEntradaPis),
          month = '' + (entradaPis.getMonth() + 1),
          day = '' + entradaPis.getDate(),
          year = entradaPis.getFullYear();

        $("input[name^=DC_DataEntrada_Pis]").val(("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year);
      }

      if (pessoa.tipoCertidao != null)
        this.TipoCertidao = pessoa.tipoCertidao;

      $("input[name^=DC_NomeDoCartorio]").val(pessoa.nomeCartorio);
      $("input[name^=DC_NumeroDoLivro]").val(pessoa.numeroLivro);
      $("input[name^=DC_NumeroDaFolha]").val(pessoa.numeroFolha);
      $("input[name^=DC_NumeroDoTermo]").val(pessoa.numeroTermo);

      if (pessoa.dataEmissaoCertidao != null) {

        var emissaoCertidao = new Date(pessoa.dataEmissaoCertidao),
          month = '' + (emissaoCertidao.getMonth() + 1),
          day = '' + emissaoCertidao.getDate(),
          year = emissaoCertidao.getFullYear();

        $("input[name^=DC_DataEmissao]").val(("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year);
      }


      $("input[name^=DC_NumeroCTPS]").val(pessoa.numeroCtps);
      $("input[name^=DC_SerieCTPS]").val(pessoa.serieCtps);

      if (pessoa.ufCtps != null)
        this.UfCtps = this.listaEstado.find(x => x.uf === pessoa.ufCtps);


      if (pessoa.dataEmissaoCtps != null) {

        var dataEmissaoCtps = new Date(pessoa.dataEmissaoCtps),
          month = '' + (dataEmissaoCtps.getMonth() + 1),
          day = '' + dataEmissaoCtps.getDate(),
          year = dataEmissaoCtps.getFullYear();

        $("input[name^=DC_DataEmissao_Ctps]").val(("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year);
      }


      $("input[name^=DC_TituloEleitor]").val(pessoa.tituloEleitor);
      $("input[name^=DC_Zona]").val(pessoa.zona);
      $("input[name^=DC_Secao]").val(pessoa.secao);

      if (pessoa.frequentaEscola === true)
        $("label[for^=FreqEsc1]").addClass("active");
      if (pessoa.frequentaEscola === false)
        $("label[for^=FreqEsc2]").addClass("active");

      if (pessoa.escolaridade != null)
        this.Escolaridade = pessoa.escolaridade;

      if (pessoa.situacaoFamiliarConjugal != null)
        this.SituacaoFamiliarConjugal = pessoa.situacaoFamiliarConjugal;


      this.onCarregaCamposDadosComplemenares();
    }
  }
  //end:: carregamento padrão de campos para a tela

  //begin:: Habilita combo indigena / habilita a combo para caso selecionar indígena
  onSelectedRaca() {

    if (this.Raca.nome == "INDÍGENA") {
      $("select[name^=DP_Etnia]").removeAttr("disabled");


      this.pessoaService.BindEtnia().subscribe(data => {
        this.listaEtnia = data.result;

        if (this.Etnia != null) {

          var etniaId = this.Etnia.etniaId;
          this.Etnia = this.listaEtnia.find(x => x.etniaId === etniaId);
        }
        else
          $(document).ready(function () { $("select[name^=DP_Etnia]").val($("select[name^=DP_Etnia] option:first").val()); });

      }, error => {
        Toastr.error("Falha ao carregar Etnias na aba Dados Pessoais");
        console.log(`Error. ${error._body}.`);;
      });

    }
    else
      $("select[name^=DP_Etnia]").prop('disabled', 'disabled');
  }
  //end:: Habilita combo indigena

  //begin:: Selecao UF Naturalidade / Selecionado a uf, habilita e carrega as cidades correspondente a uf selecionada na aba dados pessoais
  onSelectedUf() {

    $(document).ready(function () { $("select[name^=DP_NaturalidadeCidade]").val($("select[name^=DP_NaturalidadeCidade] option:first").val()); });

    this.pessoaService.BindCidade(this.Estado).subscribe(async (data: Return) => {
      this.listaCidade = data.result;

      if (this.Cidade != null) {

        var cidadeId = this.Cidade.cidadeId;
        this.Cidade = this.listaCidade.find(x => x.cidadeId === cidadeId);
      }
      else
        $(document).ready(function () { $("select[name^=DP_NaturalidadeCidade]").val($("select[name^=DP_NaturalidadeCidade] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar UF(s) na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });


  }
  //end:: Selecao UF Naturalidade

  //begin:: Selecao UF Endereco / Selecionado a uf, habilita e carrega as cidades correspondente a uf selecionada na aba endereço
  onSelectedUfEndereco() {

    $(document).ready(function () { $("select[name^=DP_Endereco_Cidade]").val($("select[name^=DP_Endereco_Cidade] option:first").val()); });

    this.pessoaService.BindCidade(this.EstadoEndereco).subscribe(async (data: Return) => {
      this.listaCidadeEndereco = data.result;

      if (this.CidadeEndereco != null) {

        var cidadeId = this.CidadeEndereco.cidadeId;
        this.CidadeEndereco = this.listaCidadeEndereco.find(x => x.cidadeId === cidadeId);
      }
      else
        $(document).ready(function () { $("select[name^=DP_Endereco_Cidade]").val($("select[name^=DP_Endereco_Cidade] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar os Estados na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });


  }
  //end::  Selecao UF Endereco

  //begin:: Carregamento Tipo Profissional / carrega os tipos do profissional na aba profissional
  onHabilitaProfissional() {


    this.pessoaService.BindTipoProfissional().subscribe(async (data: Return) => {
      this.listaTipoProfissional = data.result;

      $(document).ready(function () { $("select[name^=DP_ProfTipo]").val($("select[name^=DP_ProfTipo] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Paises na aba Dados Complementares");
      console.log(`Error. ${error.message}.`);
    });


  }
  //end::  Carregamento Tipo Profissional

  //begin:: Carregamento Dados Complementares / carrega todas as combos na aba dados complementares
  onCarregaCamposDadosComplemenares() {


    if (this.listaOcupacao.length == 0) {

      $("select[name^=DC_Ocupacao]").val($("select[name^=DC_Ocupacao] option:first").val());

      this.pessoaService.BindOcupacao().subscribe(async (data: Return) => {
        this.listaOcupacao = data.result;

        if (this.Ocupacao != null) {

          var ocupacaoId = this.Ocupacao.ocupacaoId;
          this.Ocupacao = this.listaOcupacao.find(x => x.ocupacaoId === ocupacaoId);
        }
        else
          $(document).ready(function () { $("select[name^=DC_Ocupacao]").val($("select[name^=DC_Ocupacao] option:first").val()); });
      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Ocupações na aba Dados Complementares");
        console.log(`Error. ${error.message}.`);
      });
    }


    if (this.listaPais.length == 0) {

      $("select[name^=DC_PaisDeOrigem]").val($("select[name^=DC_PaisDeOrigem] option:first").val());

      this.pessoaService.BindPais().subscribe(async (data: Return) => {
        this.listaPais = data.result;

        if (this.Pais != null) {

          var paisId = this.Pais.paisId;
          this.Pais = this.listaPais.find(x => x.paisId === paisId);
        }
        else
          $(document).ready(function () { $("select[name^=DC_PaisDeOrigem]").val($("select[name^=DC_PaisDeOrigem] option:first").val()); });
      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Paises na aba Dados Complementares");
        console.log(`Error. ${error.message}.`);
      });
    }

    if (this.listaTipoCertidao.length == 0) {

      $("select[name^=DC_TipoCertidao]").val($("select[name^=DC_TipoCertidao] option:first").val());

      this.pessoaService.BindTipoCertidao().subscribe(async (data: Return) => {
        this.listaTipoCertidao = data.result;

        if (this.TipoCertidao != null) {

          var tipocertidaoId = this.TipoCertidao.tipocertidaoId;
          this.TipoCertidao = this.listaTipoCertidao.find(x => x.tipocertidaoId === tipocertidaoId);
        }
        else
          $(document).ready(function () { $("select[name^=DC_TipoCertidao]").val($("select[name^=DC_TipoCertidao] option:first").val()); });

      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Paises na aba Dados Complementares");
        console.log(`Error. ${error.message}.`);
      });

    }

    if (this.listaEscolaridade.length === 0) {


      this.pessoaService.BindEscolaridade().subscribe(async (data: Return) => {
        this.listaEscolaridade = data.result.sort(sortBy('codigoEscolaridade'));

        for (let i = 0; i < this.listaEscolaridade.length; i++) {

          if (i < 5)
            $("#divEscolaridadeColuna1").append("<label class='k-radio k-radio--brand' id='escolaridade" + i + "'></label>");
          else
            $("#divEscolaridadeColuna2").append("<label class='k-radio k-radio--brand' id='escolaridade" + i + "'></label>");

          if (this.Escolaridade != null) {
            if (this.Escolaridade.escolaridadeId === this.listaEscolaridade[i].escolaridadeId)
              $("#escolaridade" + i).append("<input type='radio' name='DC_Escolaridade' tabindex='50' checked='true' id='" + this.listaEscolaridade[i].escolaridadeId + "'>" + this.listaEscolaridade[i].descricao + "<span></span>");
            else
              $("#escolaridade" + i).append("<input type='radio' name='DC_Escolaridade' tabindex='50'  id='" + this.listaEscolaridade[i].escolaridadeId + "'>" + this.listaEscolaridade[i].descricao + "<span></span>");
          } else {
            $("#escolaridade" + i).append("<input type='radio' name='DC_Escolaridade' tabindex='50'  id='" + this.listaEscolaridade[i].escolaridadeId + "'>" + this.listaEscolaridade[i].descricao + "<span></span>");
          }

        }


      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Escolaridade na aba Dados Complementares");
        console.log(`Error. ${error.message}.`);
      });
    }

    if (this.listaSituacaoFamiliarConjugal.length === 0) {


      this.pessoaService.BindSituacaoFamiliarConjugal().subscribe(async (data: Return) => {
        this.listaSituacaoFamiliarConjugal = data.result.sort(sortBy('codigoSituacaoFamiliarConjugal'));

        for (let i = 0; i < this.listaSituacaoFamiliarConjugal.length; i++) {

          $("#divSituacaoFamiliarConjugal").append("<label class='k-radio k-radio--brand' id='radioSituacaoFamiliarConjugal" + i + "'></label>");

          if (this.SituacaoFamiliarConjugal != null) {
            if (this.SituacaoFamiliarConjugal.situacaoFamiliarConjugalId === this.listaSituacaoFamiliarConjugal[i].situacaoFamiliarConjugalId)
              $("#radioSituacaoFamiliarConjugal" + i).append("<input type='radio' name='DC_SituacaoFamiliar' tabindex='50' checked='true' id='" + this.listaSituacaoFamiliarConjugal[i].situacaoFamiliarConjugalId + "'>" + this.listaSituacaoFamiliarConjugal[i].descricao + "<span></span>");
            else
              $("#radioSituacaoFamiliarConjugal" + i).append("<input type='radio' name='DC_SituacaoFamiliar' tabindex='50' id='" + this.listaSituacaoFamiliarConjugal[i].situacaoFamiliarConjugalId + "'>" + this.listaSituacaoFamiliarConjugal[i].descricao + "<span></span>");
          } else
            $("#radioSituacaoFamiliarConjugal" + i).append("<input type='radio' name='DC_SituacaoFamiliar' tabindex='50' id='" + this.listaSituacaoFamiliarConjugal[i].situacaoFamiliarConjugalId + "'>" + this.listaSituacaoFamiliarConjugal[i].descricao + "<span></span>");
        }


      }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Situação Familiar na aba Dados Complementares");
        console.log(`Error. ${error.message}.`);
      });

    }


  }
  //end::  Carregamento Dados Complementares

  //begin:: Adiciona Lotacao Profissional / Adiciona uma nova lotação ao profissional na aba profissional
  onAdicionaLotacao() {

    if (this.TipoProfissional !== undefined) {

      if (this.listaLotacaoProfissional.find(x => x.TipoProfissional.tipoProfissionalId === this.TipoProfissional.tipoProfissionalId) !== undefined) {

        $(document).ready(function () { swal('Já existe esse tipo de profissional'); });
      }



      var numeroconselho = $("input[name^=Prof_NumConselho]").val();

      var lotacaoProfissional: LotacaoProfissional = {

        TipoProfissional: this.TipoProfissional,
        ativo: true
      }

      if (numeroconselho !== "")
        lotacaoProfissional.numeroConselho = numeroconselho;

      if (this.UfProfissional !== undefined)
        lotacaoProfissional.ufProfissional = this.UfProfissional.uf;

      if (this.OrgaoEmissorProfissional !== undefined)
        lotacaoProfissional.OrgaoEmissorProfissional = this.OrgaoEmissorProfissional;



      if (this.listaLotacaoProfissional.find(x => x.TipoProfissional === this.TipoProfissional) === undefined && this.LotacaoProfissional === undefined) {

        console.log(lotacaoProfissional);

        this.listaLotacaoProfissional.push(lotacaoProfissional);
        this.onLimparCamposProfissional();


      } else if (this.LotacaoProfissional !== undefined) {

        if (this.LotacaoProfissional.TipoProfissional != lotacaoProfissional.TipoProfissional)
          if (this.listaLotacaoProfissional.find(x => x.TipoProfissional === this.TipoProfissional))
            return;

        var index = this.listaLotacaoProfissional.findIndex(x => x.TipoProfissional === this.LotacaoProfissional.TipoProfissional);
        lotacaoProfissional.coordenador = this.LotacaoProfissional.coordenador;
        this.listaLotacaoProfissional[index] = lotacaoProfissional;
        this.onLimparCamposProfissional();




      }

    } else {

      $(document).ready(function () {

        $('#msg_tipoprofissional').removeClass('oculta');
      });

    }
  }
  //end::  Adiciona Lotacao Profissional

  //begin:: Edita Lotacao Profissional / Permite o usuário editar as lotações lançadas na aba profissional
  onEditarLotacao(lotacaoprofissional: LotacaoProfissional) {
    this.TipoProfissional = lotacaoprofissional.TipoProfissional;
    $("input[name='Prof_NumConselho']").val(lotacaoprofissional.numeroConselho);
    this.UfProfissional = this.listaUFIdentidade.find(x => x.uf === lotacaoprofissional.ufProfissional);
    this.OrgaoEmissorProfissional = lotacaoprofissional.OrgaoEmissorProfissional;
    var index = this.listaLotacaoProfissional.findIndex(x => x.TipoProfissional === lotacaoprofissional.TipoProfissional);
    lotacaoprofissional.coordenador = $("#ckcoordenador" + index).prop('checked');
    this.LotacaoProfissional = lotacaoprofissional;

    $("#btnAddNovaLotacao").html("<i class='fa fa-plus'></i>Salvar");
    $('#btnCancelarLotacao').removeClass('oculta');

  }
  //end::  Edita Lotacao Profissional


  //begin:: Exibe Mensagem Excluir / Alerta o usuário da confirmação da exclusão na aba profissional
  onExibeMensagemExcluir(lotacaoprofissional: LotacaoProfissional) {

    var page = this;

    return swal({ title: 'Deseja excluir essa lotação?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })

      .then(function (result) {
        if (result.value) {
          page.onExcluirLotacao(lotacaoprofissional);
        }

      });

  }
  //end:: Exibe Mensagem Excluir

  //begin:: Exclui lotacao Profissional / Alerta o usuário da confirmação da exclusão na aba profissional
  onExcluirLotacao(lotacaoprofissional: LotacaoProfissional) {

    var index = this.listaLotacaoProfissional.findIndex(x => x.TipoProfissional === lotacaoprofissional.TipoProfissional);
    this.listaLotacaoProfissional.splice(index, 1);
  }
  //end:: Exibe Mensagem Excluir

  //begin:: Limpa Campos lotacao Profissional / Limpa os campos ao adicionar e editar da lotação do profissional na aba profissional
  onLimparCamposProfissional() {

    $("input[name^=Prof_NumConselho]").val("");
    this.TipoProfissional = undefined;
    this.UfProfissional = undefined;
    this.OrgaoEmissorProfissional = undefined;
    this.LotacaoProfissional = undefined;

    $(document).ready(function () {
      $("select[name^=DP_ProfTipo]").val($("select[name^=DP_ProfTipo] option:first").val());
      $("select[name^=DP_ProfUF]").val($("select[name^=DP_ProfUF] option:first").val());
      $("select[name^=DP_Prof_OrgaoEmissor]").val($("select[name^=DP_Prof_OrgaoEmissor] option:first").val());
      $('#msg_tipoprofissional').addClass('oculta');
      $('#btnCancelarLotacao').addClass('oculta');
      $("#btnAddNovaLotacao").html('<i class="fa fa-plus"></i>Adicionar');
    });
  }
  //end:: Limpa Campos lotacao Profissional

  //begin:: Consulta Cep / Consulta tanto o CEP, quanto o logradouro e atribui aos campos correspondentes
  onBuscaCep() {

    var dp_cep = $("input[name^='DP_CEP']").val().replace('-', '');
    var dp_logradouro = $.trim($("input[name^=DP_Logradouro]").val());

    var cep: Cep = {}

    if ($.isNumeric(dp_cep) && dp_cep.length === 8)
      cep.cep = dp_cep;

    if (this.EstadoEndereco != undefined)
      cep.uf = this.EstadoEndereco.uf.toLowerCase();

    if (this.CidadeEndereco != undefined)
      cep.localidade = this.CidadeEndereco.nome.toLowerCase();

    if (dp_logradouro !== "")
      cep.logradouro = dp_logradouro.toLowerCase();


    if ($.isNumeric(dp_cep) && dp_cep.length === 8 && dp_logradouro === "") {


      this.pessoaService.BuscarCep(cep)
        .subscribe(async (data: Cep) => {

          if (data.logradouro === undefined) {
            Toastr.warning("CEP não encontrado");

          } else {

            console.log('1');

            $("input[name^=DP_Logradouro]").val(data.logradouro.toUpperCase())
            $("input[name^=DP_Bairro]").val(data.bairro.toUpperCase())

            this.EstadoEndereco = this.listaEstado.find(x => x.uf == data.uf.toUpperCase())

            this.pessoaService.BindCidade(this.EstadoEndereco).subscribe(subdata => {

              this.listaCidadeEndereco = subdata.result;

              var cidadeSelecionada = RemoveAcentos.remove(data.localidade);

              this.CidadeEndereco = this.listaCidadeEndereco.find(x => x.nome == cidadeSelecionada.toUpperCase());


            }, (error: HttpErrorResponse) => {
              Toastr.error("Falha ao carregar cidades na aba endereço");
              console.log(`Error. ${error.message}.`);
            });

          }
        }, (error: HttpErrorResponse) => {
          Toastr.error("Falha ao consultar cep na aba endereço");
          console.log(`Error. ${error.message}.`);
        });
    } else {

      if (dp_logradouro !== "" && !$.isNumeric(dp_cep) && dp_cep.length === 0) {
        if (dp_logradouro.length > 3) {


          $('#divPesquisaLogradouro').removeClass('oculta');
          $('#divPesquisaLogradouro').addClass('show');
          this.pessoaService.BuscarCepPorLogradouro(cep)
            .subscribe(async (data: Array<Cep>) => {

              this.listaCep = data;
            }, (error: HttpErrorResponse) => {
              Toastr.error("Falha ao consultar cep na aba endereço");
              console.log(`Error. ${error.message}.`);
            });

        } else {
          $('#divPesquisaLogradouro').removeClass('show');
          //$('#divPesquisaLogradouro').addClass('oculta');
        }
      }
    }
  }
  //end:: Consulta Cep

  //begin:: Seleciona Endereco / Responsável por selecionar o cep vindo da consulta cep logradouro
  public onSelectedCep(cep: any) {

    $("input[name^=DP_CEP]").val(cep.cep);
    $("input[name^=DP_Logradouro]").val(cep.logradouro.toUpperCase());
    $("input[name^=DP_Bairro]").val(cep.bairro.toUpperCase());
    $("input[name^=DP_Complemento]").val(cep.complemento.toUpperCase());
    $('#divPesquisaLogradouro').addClass('oculta');
  }
  //end:: Seleciona Endereco

  //begin:: Salvar Pessoa / Salva as informações da tela
  public onSalvarPessoa(p: NgForm) {

    $("#k_scrolltop").trigger("click");

    var cpf = $("input[name^=DP_CPF]").val();



    var pessoa: Pessoa = {};
    var pessoaPaciente: PessoaPaciente;
    var pessoaProfissional: PessoaProfissional;

    var recemNascido = p.value.DP_RecemNascido === "" ? false : true;
    var nascimento = $("input[name^=DP_Nascimento]").val();
    var emissao = $("input[name^=DP_OrgaoEmissorData]").val();

    var identidade = $("input[name^=DP_Identidade]").val();
    var cns = $("input[name^=DP_CNS]").val();
    var cep = $("input[name^=DP_CEP]").val();
    var bairro = $("input[name^=DP_Bairro]").val();
    var pisPasep = $("input[name^=DC_PISPASEP]").val();
    var dataEntradaPis = $("input[name^=DC_DataEntrada_Pis]").val();
    var dataEmissaoCertidao = $("input[name^=DC_DataEmissao]").val();
    var dataEmissaoCtps = $("input[name^=DC_DataEmissao_Ctps]").val();
    var tituloEleitor = $("input[name^=DC_TituloEleitor]").val();
    var escolaridadeId = $('input[type=radio][name=DC_Escolaridade]:checked').attr('id');
    var situacaoFamiliarConjugalId = $('input[type=radio][name=DC_SituacaoFamiliar]:checked').attr('id');
    var contato1 = $("input[name^=Cont_Contato1]").val();
    var contato2 = $("input[name^=Cont_Contato2]").val();
    var contato3 = $("input[name^=Cont_Contato3]").val();
    var idadeAparente = $("input[name^=DP_IdadeAparente]").val();

    if (p.value.DP_NaoIdentificado === true) {

      pessoa.nomeCompleto = "NÃO IDENTIFICADO";

    } else {

      if (p.value.DP_RecemNascido === true)
        pessoa.nomeCompleto = p.value.DP_NomeRN.toUpperCase();
      else {

        pessoa.nomeCompleto = p.value.DP_NomeCompleto.toUpperCase();

        if (p.value.DP_NomeSocial !== "")
          pessoa.nomeSocial = p.value.DP_NomeSocial.toUpperCase();

      }
    }




    if ($("label[for^=DP_Sexo_Masculino]").hasClass("active"))
      pessoa.sexo = "M";

    if ($("label[for^=DP_Sexo_Feminino]").hasClass("active"))
      pessoa.sexo = "F";

    if (nascimento !== "") {

      var data = nascimento.split("/");
      pessoa.nascimento = new Date(data[2] + '-' + data[1] + '-' + data[0]);

    }

    if (emissao !== "") {
      var data = emissao.split("/");
      pessoa.emissao = new Date(data[2] + '-' + data[1] + '-' + data[0]);
    }

    if (cns !== "")
      pessoa.cns = cns.replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '');

    if (identidade !== "")
      pessoa.identidade = identidade.replace('.', '').replace('.', '').replace('-', '');

    if (cpf !== "")
      pessoa.cpf = cpf.replace('.', '').replace('.', '').replace('-', '');

    if (p.value.DP_NomeMae !== "")
      pessoa.nomemae = p.value.DP_NomeMae.toUpperCase();

    if (p.value.DP_NomePai !== "")
      pessoa.nomepai = p.value.DP_NomePai.toUpperCase();

    if (idadeAparente !== "")
      pessoa.idadeAparente = idadeAparente.toUpperCase();

    if (this.Raca !== undefined)
      pessoa.Raca = this.Raca;

    if (this.Etnia !== undefined)
      pessoa.Etnia = this.Etnia;

    if (this.Justificativa !== undefined)
      pessoa.Justificativa = this.Justificativa;

    if (this.Nacionalidade !== undefined)
      pessoa.Nacionalidade = this.Nacionalidade;

    if (this.Cidade !== undefined) {
      this.Cidade.Estado = this.Estado;
      pessoa.Naturalidade = this.Cidade;

    }

    if (this.OrgaoEmissor !== undefined)
      pessoa.OrgaoEmissor = this.OrgaoEmissor;

    if (this.UfIdentidade !== undefined)
      pessoa.uf = this.UfIdentidade.uf;

    if (contato1 !== "")
      pessoa.contato1 = contato1.replace('(', '').replace(')', '').replace('-', '');

    if (contato2 !== "")
      pessoa.contato2 = contato2.replace('(', '').replace(')', '').replace('-', '');

    if (contato3 !== "")
      pessoa.contato3 = contato3.replace('(', '').replace(')', '').replace('-', '');

    if (p.value.Cont_Email !== "")
      pessoa.email = p.value.Cont_Email.toUpperCase();

    if (cep !== "")
      pessoa.cep = cep.replace('-', '');

    if (p.value.DP_Logradouro !== "")
      pessoa.logradouro = p.value.DP_Logradouro.toUpperCase();

    if (p.value.DP_Numero !== "")
      pessoa.numero = p.value.DP_Numero.toUpperCase();

    if (p.value.DP_Complemento !== "")
      pessoa.complemento = p.value.DP_Complemento.toUpperCase();

    if (bairro !== "")
      pessoa.bairro = bairro;

    if (this.EstadoEndereco !== undefined)
      pessoa.Estado = this.EstadoEndereco;

    if (this.CidadeEndereco !== undefined)
      pessoa.Cidade = this.CidadeEndereco;

    if (pisPasep !== "")
      pessoa.pisPasep = pisPasep.replace('.', '').replace('.', '').replace('-', '');

    if (this.Ocupacao !== undefined)
      pessoa.Ocupacao = this.Ocupacao;

    if (this.Pais !== undefined)
      pessoa.PaisOrigem = this.Pais;

    if (dataEntradaPis !== "")
      pessoa.dataEntradaPis = dataEntradaPis;

    if (this.TipoCertidao !== undefined)
      pessoa.TipoCertidao = this.TipoCertidao;

    if (p.value.DC_NomeDoCartorio !== "")
      pessoa.nomeCartorio = p.value.DC_NomeDoCartorio.toUpperCase();

    if (p.value.DC_NumeroDoLivro !== "")
      pessoa.numeroLivro = p.value.DC_NumeroDoLivro.toUpperCase();

    if (p.value.DC_NumeroDaFolha !== "")
      pessoa.numeroFolha = p.value.DC_NumeroDaFolha.toUpperCase();

    if (p.value.DC_NumeroDoTermo !== "")
      pessoa.numeroTermo = p.value.DC_NumeroDoTermo.toUpperCase();

    if (dataEmissaoCertidao !== "")
      pessoa.dataEmissaoCertidao = dataEmissaoCertidao;

    if (p.value.DC_NumeroCTPS !== "")
      pessoa.numeroCtps = p.value.DC_NumeroCTPS.toUpperCase();

    if (p.value.DC_SerieCTPS !== "")
      pessoa.serieCtps = p.value.DC_SerieCTPS.toUpperCase();

    if (this.UfCtps !== undefined)
      pessoa.ufCtps = this.UfCtps.uf;

    if (dataEmissaoCtps !== "")
      pessoa.dataEmissaoCtps = dataEmissaoCtps;

    if (tituloEleitor !== "")
      pessoa.tituloEleitor = tituloEleitor;

    if (p.value.DC_Zona !== "")
      pessoa.zona = p.value.DC_Zona.toUpperCase();

    if (p.value.DC_Secao !== "")
      pessoa.secao = p.value.DC_Secao.toUpperCase();

    if ($("label[for^=FreqEsc1]").hasClass("active"))
      pessoa.frequentaeEscola = true;

    if ($("label[for^=FreqEsc2]").hasClass("active"))
      pessoa.frequentaeEscola = false;


    if (escolaridadeId !== undefined)
      pessoa.Escolaridade = this.listaEscolaridade.find(x => x.escolaridadeId === escolaridadeId);

    if (situacaoFamiliarConjugalId !== undefined)
      pessoa.SituacaoFamiliarConjugal = this.listaSituacaoFamiliarConjugal.find(x => x.situacaoFamiliarConjugalId === situacaoFamiliarConjugalId);


    if (p.value.DP_Prof_Login !== "")
      pessoa.login = p.value.DP_Prof_Login.toUpperCase();

    if (this.foto !== "")
      pessoa.foto = this.foto;

    pessoa.ativo = true;

    var msgCamposObrigatorios = "";

    if (pessoa.nomeCompleto === "")
      msgCamposObrigatorios = "Informe o nome\n";

    if (this.listaLotacaoProfissional.length > 0 && cpf === "")
      msgCamposObrigatorios = msgCamposObrigatorios + "CPF para o profissional";

    if (msgCamposObrigatorios !== "") {
      swal("Campos Obrigatórios", msgCamposObrigatorios, "error");
      return;
    }

    if (this.Pessoa == null) {

      if (this.listaLotacaoProfissional.length > 0) {

        pessoaProfissional = {};
        pessoaProfissional = pessoa;

        pessoaProfissional.lotacoesProfissional = [];
        pessoaProfissional.lotacoesProfissional = this.listaLotacaoProfissional;

        this.pessoaService.SalvarPessoaProfissional(pessoaProfissional).subscribe(async (data: Return) => {

          if (data.statusCode == "409") {
            swal("Profissional já cadastrado!", "CPF ou CNS ou PIS/PASEP já existente na Base", "error");

          } else {
            Toastr.success("Profissional salvo com sucesso");
            this.LimparCampos(p);

          }
        }, (error: HttpErrorResponse) => {
          Toastr.error("Falha ao comunicar com API");
          console.log(`Error. ${error.message}.`);
        },
        );


      } else {

        pessoaPaciente = {};
        pessoaPaciente = pessoa;

        pessoaPaciente.recemNascido = p.value.DP_RecemNascido === true;

        if (p.value.DP_NumProntuarioMae !== "")
          pessoaPaciente.numeroProntuario = p.value.DP_NumProntuarioMae.toUpperCase();

        if (p.value.DP_Descricao_Nao_Identificado !== "")
          pessoaPaciente.descricaoNaoIdentificado = p.value.DP_Descricao_Nao_Identificado.toUpperCase();


        this.pessoaService.SalvarPessoaPaciente(pessoaPaciente).subscribe(async (data: Return) => {
          Toastr.success("Paciente salvo com sucesso");
          this.LimparCampos(p);

        }, (error: HttpErrorResponse) => {
          Toastr.error("Falha ao comunicar com API");
          console.log(`Error. ${error.message}.`);
        },
        );
      }
    }
  }
  //end:: Salvar Pessoa

  //begin:: Limpa Campos/ Mensagens responsáveis pelos avisos com integrações externas
  public LimparCampos(p: NgForm) {

    $("#btn_formclear").trigger("click");

    p.value.DP_NomeCompleto = "";
    p.value.DP_NomeSocial = "";
    p.value.DP_NomeRN = "";
    p.value.DP_NumProntuarioMae = "";
    p.value.descricaonaoidentificado = "";
    p.value.DP_IdadeAparente = "";
    p.value.DP_NomeMae = "";
    p.value.DP_NomePai = "";

    this.listaEtnia = new Array<Etnia>();
    this.listaCidade = new Array<Cidade>();
    this.listaLotacaoProfissional = new Array<LotacaoProfissional>();

    $("div").find("#box_newcontact1").remove();
    $("div").find("#box_newcontact2").remove();
    $("div").find("#box_newcontact3").remove();
    $("div").find("#box_newcontact4").remove();
    $("div").find("#box_newcontact5").remove();
    $('.k-avatar__holder').css('background-image', 'url(../../assets/media/users/default.jpg)');
  }
  //end:: Limpa Campos


}


