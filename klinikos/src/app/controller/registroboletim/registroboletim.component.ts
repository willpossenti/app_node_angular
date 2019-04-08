import { Component, OnInit } from '@angular/core';
import { RegistroBoletimService } from './registroboletim.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Especialidade } from '../../model/Especialidade';
import { TipoChegada } from '../../model/TipoChegada';
import { TipoOcorrencia } from 'src/app/model/TipoOcorrencia';
import { HttpErrorResponse } from '@angular/common/http';
import { MensagemService } from '../util/mensagem.service';
import { Estado } from '../../model/Estado';
import { Cidade } from '../../model/Cidade';
import { Cep } from '../../model/Cep';
import { PessoaService } from '../cadastro/pessoa/pessoa.service';
import * as RemoveAcentos from 'remove-accents';
import { CpfService } from '../util/cpf.service';
import { NgForm } from '@angular/forms';
import { RegistroBoletim } from '../../model/RegistroBoletim';
import { Pessoa } from '../../model/Pessoa';
import { PessoaPaciente } from '../../model/PessoaPaciente';
import { PessoaProfissional } from '../../model/PessoaProfissional';
import { PessoaContato } from 'src/app/model/PessoaContato';


@Component({
  selector: 'app-registroboletim',
  templateUrl: './registroboletim.component.html'
})
export class RegistroBoletimComponent implements OnInit {
  
  listaEspecialidade: Array<Especialidade>;
  listaTipoChegada: Array<TipoChegada>;
  listaTipoOcorrencia: Array<TipoOcorrencia>;
  listaEstado: Array<Estado>;
  listaCidade: Array<Cidade>;
  listaCep: Array<Cep>;
  listaPessoaProfissional: Array<PessoaProfissional>;
  listaPessoaPaciente: Array<PessoaPaciente>;

  Especialidade: Especialidade;
  TipoChegada: TipoChegada;
  TipoOcorrencia: TipoOcorrencia;
  Estado: Estado;
  Cidade: Cidade;
  orderNome: string = 'nome';
  orderDescricao: string = 'descricao';
  orderUf: string = 'uf';
  Pessoa: any;

  constructor(private registroBoletimService: RegistroBoletimService, private mensagemService: MensagemService, private pessoaService: PessoaService, private cpfService: CpfService, private router: Router) {
   

  }


  public ngOnInit() {

    $(document).ready(function () { document.title = 'Registro Boletim | Klinikos'; });

    $(document).ready(function () { $("select[name^=DP_Endereco_Cidade]").val($("select[name^=DP_Endereco_Cidade] option:first").val()); });

    this.registroBoletimService.BindEspecialidade().subscribe(data => {
      this.listaEspecialidade = data.result;

      $(document).ready(function () { $("select[name^=IB_Especialidade]").val($("select[name^=IB_Especialidade] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      this.mensagemService.Mensagens("erro", "Falha ao carregar Especialidades na aba Informações do boletim");
      console.log(`Error. ${error.message}.`);
    });

    this.registroBoletimService.BindTipoChegada().subscribe(data => {
      this.listaTipoChegada = data.result;

      $(document).ready(function () { $("select[name^=IB_ComoChegou]").val($("select[name^=IB_ComoChegou] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      this.mensagemService.Mensagens("erro", "Falha ao carregar tipos de chegada na aba Informações do boletim");
      console.log(`Error. ${error.message}.`);
      });

    this.registroBoletimService.BindTipoOcorrencia().subscribe(data => {
      this.listaTipoOcorrencia = data.result;

      $(document).ready(function () { $("select[name^=DO_TipoOcorrencia]").val($("select[name^=DO_TipoOcorrencia] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      this.mensagemService.Mensagens("erro", "Falha ao carregar tipos de chegada na aba Informações do boletim");
      console.log(`Error. ${error.message}.`);
      });

    this.registroBoletimService.BindEstado().subscribe(data => {
      this.listaEstado = data.result;

      $(document).ready(function () { $("select[name^=DP_Endereco_Estado]").val($("select[name^=DP_Endereco_Estado] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      this.mensagemService.Mensagens("erro", "Falha ao carregar os estados na aba Informações do boletim");
      console.log(`Error. ${error.message}.`);
      });


  }


  onSelectedUf() {

    $(document).ready(function () { $("select[name^=DP_Endereco_Cidade]").val($("select[name^=DP_Endereco_Cidade] option:first").val()); });

    this.registroBoletimService.BindCidade(this.Estado).subscribe(data => {
      this.listaCidade = data.result;

      $(document).ready(function () { $("select[name^=DP_Endereco_Cidade]").val($("select[name^=DP_Endereco_Cidade] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      this.mensagemService.Mensagens("erro", "Falha ao carregar UF(s) na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });


  }

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

  //begin:: Consulta Cep / Consulta tanto o CEP, quanto o logradouro e atribui aos campos correspondentes
  onBuscaCep() {

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
            this.mensagemService.Mensagens("warning", "CEP não encontrado");
          } else {


            $("input[name^=DO_Logradouro]").val(data.logradouro.toUpperCase())
            $("input[name^=DO_Bairro]").val(data.bairro.toUpperCase())

            this.Estado = this.listaEstado.find(x => x.uf == data.uf.toUpperCase())

            this.pessoaService.BindCidade(this.Estado).subscribe(subdata => {

              this.listaCidade = subdata.result;

              var cidadeSelecionada = RemoveAcentos.remove(data.localidade);

              this.Cidade = this.listaCidade.find(x => x.nome == cidadeSelecionada.toUpperCase());


            }, (error: HttpErrorResponse) => {
              this.mensagemService.Mensagens("erro", "Falha ao carregar cidades na aba endereço");
              console.log(`Error. ${error.message}.`);
            });

          }
        }, (error: HttpErrorResponse) => {
          //this.Mensagens("erro", "Falha ao consultar cep na aba endereço");
          console.log(`Error. ${error.message}.`);
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
              //this.Mensagens("erro", "Falha ao consultar cep na aba endereço");
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
            this.mensagemService.Mensagens("sucesso", "Paciente encontrado");
         
            var paciente = data.result;
            this.CarregaPessoa(paciente);
          }
        }, (error: HttpErrorResponse) => {

          this.mensagemService.Mensagens("erro", "Falha ao carregar Raças na aba Dados Pessoais");
          console.log(`Error. ${error.message}.`);
        });
      }
    }

  }
  //end:: validacao e consulta de CPF

  //begin:: carregamento padrão de campos para a tela
  CarregaPessoa(pessoa: any) {

    this.Pessoa = pessoa;


    $("input[name^=IB_NomePaciente]").val(pessoa.nomeCompleto);

    if (pessoa.nascimento != null) {

      var nascimento = new Date(pessoa.nascimento),
        month = '' + (nascimento.getMonth() + 1),
        day = '' + nascimento.getDate(),
        year = nascimento.getFullYear();

      $("input[name^=IB_Nascimento]").val(("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year);
    }

    $("input[name^=DP_Telefone]").val(pessoa.telefone);
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


    if (dataBoletim !== "") {
      var data = dataBoletim.split("/");
      var newData = new Date(data[2] + '-' + data[1] + '-' + data[0]);

      if (horaBoletim !== "") {
        newData.setHours(newData.getHours() + parseInt(horaBoletim.substring(0, 2)));
        newData.setMinutes(newData.getMinutes() + parseInt(horaBoletim.substring(2, 4)));
      }

      registroboletim.dataBoletim = newData;
    }
    console.log(this.Pessoa);

    if (this.Pessoa == undefined) {

      var pessoa: PessoaPaciente = {};

      var cpf = $("input[name^=DO_CEP]").val();
      var nascimento = $("input[name^=IB_Nascimento]").val();
      var telefone = $("input[name^=DP_Telefone]").val();

      

      if (rb.value.IB_NomePaciente !== "")
        pessoa.nomeCompleto = rb.value.IB_NomePaciente.toUpperCase();

      if (cpf !== "")
        pessoa.cpf = cpf.replace('.', '').replace('.', '').replace('-', '');

      if (nascimento !== "") {

        var data = nascimento.split("/");
        pessoa.nascimento = new Date(data[2] + '-' + data[1] + '-' + data[0]);

      }


      if (telefone !== "") {
        pessoa.pessoaContatos = [];

        var pessoacontato: PessoaContato = {
          telefone: telefone,
          ativo: true
        }

        pessoa.pessoaContatos.push(pessoacontato);
      }

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

    }


    registroboletim.Pessoa = this.Pessoa;
    registroboletim.TipoChegada = this.TipoChegada;
    registroboletim.Especialidade = this.Especialidade;
    registroboletim.nomeInformante = rb.value.IN_NomeDoInformante;
    registroboletim.enderecoInformante = rb.value.IN_Endereco;
    registroboletim.telefoneInformante = rb.value.IN_Telefone;
    registroboletim.grauParentesco = rb.value.IN_GrauParentesco;
    registroboletim.procedencia = rb.value.DO_Procedencia;
    registroboletim.TipoOcorrencia = this.TipoOcorrencia;

    if (dataOcorrencia !== "") {
      var data = dataOcorrencia.split("/");
      var newData = new Date(data[2] + '-' + data[1] + '-' + data[0]);

      if (horaOcorrencia !== "") {
        newData.setHours(newData.getHours() + parseInt(horaOcorrencia.substring(0, 2)));
        newData.setMinutes(newData.getMinutes() + parseInt(horaOcorrencia.substring(2, 4)));
      }

      registroboletim.dataOcorrencia = newData;
    }


    if ($("label[for^=PAB]").hasClass("active"))
      registroboletim.tipoPerfuracao = "PAB";

    if ($("label[for^=PAF]").hasClass("active"))
      registroboletim.tipoPerfuracao = "PAF";

    registroboletim.cep = cepOcorrencia;
    registroboletim.logradouro = rb.value.DO_Logradouro;
    registroboletim.numero = rb.value.DO_Numero;
    registroboletim.complemento = rb.value.DO_Complemento;
    registroboletim.Estado = this.Estado;
    registroboletim.Cidade = this.Cidade;

    this.registroBoletimService.SalvarRegistroBoletim(registroboletim).subscribe(data => {

      this.mensagemService.Mensagens("sucesso", "Registro salvo com sucesso");

      this.LimparCampos(rb);

    }, (error: HttpErrorResponse) => {
      this.mensagemService.Mensagens("erro", "Falha ao comunicar com API");
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
        //this.Mensagens("erro", "Falha ao consultar cep na aba endereço");
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
        //this.Mensagens("erro", "Falha ao consultar cep na aba endereço");
        console.log(`Error. ${error.message}.`);
      });

    console.log(this.listaPessoaProfissional);
    console.log(this.listaPessoaPaciente);
  }
  //end:: Consulta o nome do paciente

  //begin:: Carregamento do Profissional pela Busca
  onSelectedProfissional(profissional: PessoaProfissional) {

    $("input[name^=DP_CPF]").val(profissional.cpf);


    this.CarregaPessoa(profissional);

    this.onFechaPesquisa();

  }
  //end::  Carregamento do Profissional pela Busca



  //begin:: Carregamento do Paciente pela Busca
  onSelectedPaciente(paciente: PessoaPaciente) {

    $("input[name^=DP_CPF]").val(paciente.cpf);


    this.CarregaPessoa(paciente);

    this.onFechaPesquisa();

  }
  //end::  Carregamento do Paciente pela Busca


  //begin:: Limpa Campos/ Mensagens responsáveis pelos avisos com integrações externas
  public LimparCampos(rb: NgForm) {

    $("#btn_formclear").trigger("click");

    rb.value.IN_Endereco = "";
    rb.value.IN_Telefone = "";
    rb.value.IN_GrauParentesco = "";
    rb.value.DO_Logradouro = "";
    rb.value.DO_Complemento = "";

  }
  //end:: Limpa Campos


}


