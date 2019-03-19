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
import { PessoaContato } from '../../../model/PessoaContato';
import { Pais } from '../../../model/Pais';
import { TipoCertidao } from '../../../model/TipoCertidao';
import { SituacaoFamiliarConjugal } from '../../../model/SituacaoFamiliarConjugal';
import { TipoProfissional } from '../../../model/TipoProfissional';
import { LotacaoProfissional } from '../../../model/LotacaoProfissional';
import { PessoaService } from './pessoa.service';
import * as RemoveAcentos from 'remove-accents';
import * as toastr from 'toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { sortBy } from 'sort-by-typescript';




@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',

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
  listaContatos: Array<PessoaContato>;
  listaCidadeEndereco: Array<Cidade>;
  listaOcupacao: Array<Ocupacao>;
  listaPais: Array<Pais>;
  listaTipoCertidao: Array<TipoCertidao>;
  listaEscolaridade: Array<Escolaridade>;
  listaSituacaoFamiliarConjugal: Array<SituacaoFamiliarConjugal>;
  listaTipoProfissional: Array<TipoProfissional>;
  listaLotacaoProfissional: Array<LotacaoProfissional>;

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
  Ocupacao: Ocupacao
  Pais: Pais
  TipoCertidao: TipoCertidao;
  UfCtps: Estado;
  UfProfissional: Estado;
  OrgaoEmissorProfissional: OrgaoEmissor;
  TipoProfissional: TipoProfissional;

  constructor(private pessoaService: PessoaService, private router: Router) {
    this.listaContatos = new Array<PessoaContato>();

  }


  public ngOnInit() {


    toastr.options = {
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

    this.pessoaService.BindRaca().subscribe(data => {
      this.listaRaca = data.result;

      $(document).ready(function () { $("select[name^=DP_Cor]").val($("select[name^=DP_Cor] option:first").val()); });

    }, (error: HttpErrorResponse) => {

      this.Mensagens("erro", "Falha ao carregar Raças na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });


    this.pessoaService.BindJustificativa().subscribe(data => {
      this.listaJustificativa = data.result;

      $(document).ready(function () { $("select[name^=DP_JustificativaCPF]").val($("select[name^=DP_JustificativaCPF] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao carregar Justificativas na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });

    this.pessoaService.BindNacionalidade().subscribe(data => {

      this.listaNacionalidade = data.result;

      $(document).ready(function () { $("select[name^=DP_Nacionalidade]").val($("select[name^=DP_Nacionalidade] option:first").val()); });

    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao carregar Nacionalidades na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });

    this.pessoaService.BindEstado().subscribe(data => {
      this.listaEstado = data.result;
      this.listaUFIdentidade = data.result;

      $(document).ready(function () {
        $("select[name^=DP_NaturalidadeUF]").val($("select[name^=DP_NaturalidadeUF] option:first").val());
        $("select[name^=DP_NaturalidadeCidade]").val($("select[name^=DP_NaturalidadeCidade] option:first").val());
        $("select[name^=DP_IdentidadeUF]").val($("select[name^=DP_IdentidadeUF] option:first").val());
        $("select[name^=DP_Endereco_Estado]").val($("select[name^=DP_Endereco_Estado] option:first").val());
        $("select[name^=DP_UF_Ctps]").val($("select[name^=DP_UF_Ctps] option:first").val());
        $("select[name^=DP_ProfUF]").val($("select[name^=DP_ProfUF] option:first").val());
      });

    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao carregar Estados Naturalidade na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });


    this.pessoaService.BindOrgaoEmissor().subscribe(data => {
      this.listaOrgaoEmissor = data.result;
      $(document).ready(function () {
        $("select[name^=DP_OrgaoEmissor]").val($("select[name^=DP_OrgaoEmissor] option:first").val());
        $("select[name^=DP_Prof_OrgaoEmissor]").val($("select[name^=DP_Prof_OrgaoEmissor] option:first").val());
      });

    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao carregar Orgãos Emissores na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });

    this.pessoaService.BindOcupacao().subscribe(data => {
      this.listaOcupacao = data.result;

      $(document).ready(function () { $("select[name^=DC_Ocupacao]").val($("select[name^=DC_Ocupacao] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao carregar Ocupações na aba Dados Complementares");
      console.log(`Error. ${error.message}.`);
    });

    this.pessoaService.BindPais().subscribe(data => {
      this.listaPais = data.result;

      $(document).ready(function () { $("select[name^=DC_PaisDeOrigem]").val($("select[name^=DC_PaisDeOrigem] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao carregar Paises na aba Dados Complementares");
      console.log(`Error. ${error.message}.`);
    });

    this.pessoaService.BindTipoCertidao().subscribe(data => {
      this.listaTipoCertidao = data.result;

      $(document).ready(function () { $("select[name^=DC_TipoCertidao]").val($("select[name^=DC_TipoCertidao] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao carregar Paises na aba Dados Complementares");
      console.log(`Error. ${error.message}.`);
    });

    this.pessoaService.BindEscolaridade().subscribe(data => {
      this.listaEscolaridade = data.result.sort(sortBy('codigoEscolaridade'));

      for (let i = 0; i < this.listaEscolaridade.length; i++) {

        if (i < 5)
          $("#divEscolaridadeColuna1").append("<label class='k-radio k-radio--brand' id='radioEscolaridade" + i + "'></label>");
        else
          $("#divEscolaridadeColuna2").append("<label class='k-radio k-radio--brand' id='radioEscolaridade" + i + "'></label>");

        $("#radioEscolaridade" + i).append("<input type='radio' name='DC_Escolaridade' tabindex='50' id='" + i + "'>" + this.listaEscolaridade[i].descricao + "<span></span>");

      }


    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao carregar Paises na aba Dados Complementares");
      console.log(`Error. ${error.message}.`);
    });

    this.pessoaService.BindSituacaoFamiliarConjugal().subscribe(data => {
      this.listaSituacaoFamiliarConjugal = data.result.sort(sortBy('codigoSituacaoFamiliarConjugal'));
      console.log(data.result.sort(sortBy('codigoSituacaoFamiliarConjugal')));

      for (let i = 0; i < this.listaSituacaoFamiliarConjugal.length; i++) {

        $("#divSituacaoFamiliarConjugal").append("<label class='k-radio k-radio--brand' id='radioSituacaoFamiliarConjugal" + i + "'></label>");
        $("#radioSituacaoFamiliarConjugal" + i).append("<input type='radio' name='DC_SituacaoFamiliar' tabindex='50' id='" + i + "'>" + this.listaSituacaoFamiliarConjugal[i].descricao + "<span></span>");
      }


    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao carregar Paises na aba Dados Complementares");
      console.log(`Error. ${error.message}.`);
    });

    this.pessoaService.BindTipoProfissional().subscribe(data => {
      this.listaTipoProfissional = data.result;

      $(document).ready(function () { $("select[name^=DP_ProfTipo]").val($("select[name^=DP_ProfTipo] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao carregar Paises na aba Dados Complementares");
      console.log(`Error. ${error.message}.`);
    });



    $(document).ready(function () {


      $("select[name^=DP_Etnia]").val($("select[name^=DP_Etnia] option:first").val());

      $('body').css("background-image", "");
      $('body').addClass("k-header--fixed k-header-mobile--fixed k-subheader--enabled k-subheader--transparent k-aside--enabled k-aside--fixed k-page--loading");

      $("select[name^=DP_Cor]").change(function () {

        var selectedRaca = $(this).children("option:selected").text();

        if (selectedRaca == "INDÍGENA") {

          $("select[name^=DP_Etnia]").removeAttr("disabled");

        } else {
          $("select[name^=DP_Etnia]").prop('disabled', 'disabled');

        }
      });


    });
  }

  selectedRaca() {

    if (this.Raca.nome == "INDÍGENA") {

      this.pessoaService.BindEtnia().subscribe(data => {
        this.listaEtnia = data.result;

        $(document).ready(function () { $("select[name^=DP_Etnia]").val($("select[name^=DP_Etnia] option:first").val()); });

      }, error => {
        this.Mensagens("erro", "Falha ao carregar Etnias na aba Dados Pessoais");
        console.log(`Error. ${error._body}.`);;
      });

    } else {

      this.listaEtnia = [];
      $(document).ready(function () { $("select[name^=DP_Etnia]").val($("select[name^=DP_Etnia] option:first").val()); });
    }
  }

  selectedUf() {

    $(document).ready(function () { $("select[name^=DP_NaturalidadeCidade]").val($("select[name^=DP_NaturalidadeCidade] option:first").val()); });

    this.pessoaService.BindCidade(this.Estado).subscribe(data => {
      this.listaCidade = data.result;
      $(document).ready(function () { $("select[name^=DP_NaturalidadeCidade]").val($("select[name^=DP_NaturalidadeCidade] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao carregar UF(s) na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });


  }

  selectedUfEndereco() {

    $(document).ready(function () { $("select[name^=DP_Endereco_Cidade]").val($("select[name^=DP_Endereco_Cidade] option:first").val()); });

    this.pessoaService.BindCidade(this.EstadoEndereco).subscribe(data => {
      this.listaCidadeEndereco = data.result;
      $(document).ready(function () { $("select[name^=DP_Endereco_Cidade]").val($("select[name^=DP_Endereco_Cidade] option:first").val()); });
    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao carregar os Estados na aba Dados Pessoais");
      console.log(`Error. ${error.message}.`);
    });


  }



  onAdicionaNovosCamposContato() {


    if (this.listaContatos.length < 4) {
      var pessoacontato: PessoaContato = {};
      this.listaContatos.push(pessoacontato);


      var idDivBody = "box_newcontact" + this.listaContatos.length;
      var idDivColumnTelefone = idDivBody + "_telefone" + this.listaContatos.length;
      var idDivColumnCelular = idDivBody + "_celular" + this.listaContatos.length;
      var idDivColumnEmail = idDivBody + "_email" + this.listaContatos.length;
      var idDivColumnButton = idDivBody + "_button" + this.listaContatos.length;


      if ($('#bodyContact').find('#' + idDivBody).length == 0) {

        $("#bodyContact").append("<div class='form-group row' id='" + idDivBody + "'></div>");

        $("#" + idDivBody).append("<div class='col-lg-3' id='" + idDivColumnTelefone + "'></div>");

        $("#" + idDivColumnTelefone).append("<label>Telefone</label>");
        $("#" + idDivColumnTelefone).append("<input type='text' class='form-control mask_phone_contato' name='Cont_Telefone" + this.listaContatos.length + "' maxlength='20' value='' tabindex='21'>");

        $("#" + idDivBody).append("<div class='col-lg-3' id='" + idDivColumnCelular + "'></div>");
        $("#" + idDivColumnCelular).append("<label>Celular</label>");
        $("#" + idDivColumnCelular).append("<input type='text' class='form-control mask_mobile_contato' name='Cont_Celular" + this.listaContatos.length + "' maxlength='20' value='' tabindex='22'>");

        $("#" + idDivBody).append("<div class='col-lg-5' id='" + idDivColumnEmail + "'></div>");
        $("#" + idDivColumnEmail).append("<label>E-mail</label>");
        $("#" + idDivColumnEmail).append("<input type='email' class='form-control minus' style='text-transform:lowercase;' name='Cont_Email" + this.listaContatos.length + "' value='' tabindex='23'>");
        $("#" + idDivColumnEmail).append("<span class='form-text text-muted'>Campo obrigatório após preenchimento de Dados Profissionais</span>");


        $("#" + idDivBody).append("<div class='col-lg-1' id='" + idDivColumnButton + "'></div>");
        $("#" + idDivColumnButton).append("<label class='d-block'>&nbsp;</label>");
        $("#" + idDivColumnButton).append("<button class='btn btn-outline-secondary' type='button' title='Excluir' id='btnExcluirContato" + this.listaContatos.length + "'><i class='fa fa-trash fa-fw'></i></button>");


        //As mascaras genéricas não funcionam com html dinâmico, por isso, é aplicado o script para cada div gerada pelo append.

        var code = "<script> $(document).ready(function () {  $('.mask_phone_contato').mask('(99)9999-9999'); $('.mask_mobile_contato').mask('(99)99999-9999'); $('#btnExcluirContato" + this.listaContatos.length + "').click(function(){ swal({title: 'Deseja excluir esse contato?', text: '', type: 'warning', showCancelButton: true, cancelButtonText:'Não', confirmButtonText: 'Sim' }).then(function(result) { if (result.value) {  $('#" + idDivBody + "').remove(); } }); });   }); </script>";

        $("#" + idDivBody).append($(code)[0]);
      }
    }
  }



  onBuscaCep(cep: string) {
    this.pessoaService.BuscarCep(cep.replace('-', '')).subscribe(data => {

      $("input[name='DP_Logradouro']").val(data.logradouro.toUpperCase());
      $("input[name='DP_Bairro']").val(data.bairro.toUpperCase());

      this.EstadoEndereco = this.listaEstado.find(x => x.uf == data.uf.toUpperCase())

      this.pessoaService.BindCidade(this.EstadoEndereco).subscribe(subdata => {

        this.listaCidadeEndereco = subdata.result;

        var cidadeSelecionada = RemoveAcentos.remove(data.localidade);

        this.CidadeEndereco = this.listaCidadeEndereco.find(x => x.nome == cidadeSelecionada.toUpperCase());


      }, (error: HttpErrorResponse) => {
        this.Mensagens("erro", "Falha ao carregar cidades na aba endereço");
        console.log(`Error. ${error.message}.`);
      });


    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao consultar cep na aba endereço");
      console.log(`Error. ${error.message}.`);
    });


  }


  public onSubmit(p: NgForm) {



    $("#k_scrolltop").trigger("click");

    let pessoa: any;





    if (p.value.DP_Prof_Login === "") {

      var pessoapaciente: PessoaPaciente = {

        recemnascido: recemnascido,
        ativo: true
      }

      pessoa: pessoapaciente;

    } else {

      var pessoaprofissional: PessoaProfissional = {

        login: p.value.DP_Prof_Login,
        ativo: true
      }

      pessoa: pessoapaciente;
    }



    var recemnascido = p.value.DP_RecemNascido === "" ? false : true;
    var nascimento = $("input[name='DP_Nascimento']").val();
    var emissao = $("input[name='DP_OrgaoEmissorData']").val();
    var cpf = $("input[name='DP_CPF']").val();
    var identidade = $("input[name='DP_Identidade']").val();
    var cns = $("input[name='DP_CNS']").val();
    var cep = $("input[name='DP_CEP']").val();
    var bairro = $("input[name='DP_Bairro']").val();
    var pispasep = $("input[name='DC_PISPASEP']").val();
    var dataentradapis = $("input[name='DC_DataEntrada_Pis']").val();
    var dataemissaocertidao = $("input[name='DC_DataEmissao']").val();
    var dataemissaoctps = $("input[name='DC_DataEmissao_Ctps']").val();
    var tituloeleitor = $("input[name='DC_TituloEleitor']").val();
    var escolaridadeId = $('input[type=radio][name=DC_Escolaridade]:checked').attr('id');
    var situacaoFamiliarConjugalId = $('input[type=radio][name=DC_SituacaoFamiliar]:checked').attr('id');


    if (p.value.DP_NaoIdentificado === true) {

      pessoa.nomecompleto = "NÃO IDENTIFICADO";
      pessoa.descricaonaoidentificado = p.value.DP_Descricao_Nao_Identificado.toUpperCase();

    } else {

      if (p.value.DP_RecemNascido === true) {

        pessoa.nomecompleto = p.value.DP_NomeRN.toUpperCase();
        pessoa.numeroprontuario = p.value.DP_NumProntuarioMae;

      } else {

        pessoa.nomecompleto = p.value.DP_NomeCompleto.toUpperCase();
        pessoa.nomesocial = p.value.DP_NomeSocial.toUpperCase();
      }
    }

    if ($("label[for='DP_Sexo_Masculino']").hasClass("active"))
      pessoa.sexo = "M";

    if ($("label[for='DP_Sexo_Feminino']").hasClass("active"))
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

    if (p.value.DP_IdadeAparente !== "")
      pessoa.idadeaparente = p.value.DP_IdadeAparente.toUpperCase();

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

    if (pispasep !== "")
      pessoa.pispasep = pispasep.replace('.', '').replace('.', '').replace('-', '');

    if (this.Ocupacao !== undefined)
      pessoa.Ocupacao = this.Ocupacao;

    if (this.Pais !== undefined)
      pessoa.PaisOrigem = this.Pais;

    if (dataentradapis !== "")
      pessoa.dataentradapis = dataentradapis;

    if (this.TipoCertidao !== undefined)
      pessoa.TipoCertidao = this.TipoCertidao;

    if (p.value.DC_NomeDoCartorio !== "")
      pessoa.nomecartorio = p.value.DC_NomeDoCartorio.toUpperCase();

    if (p.value.DC_NumeroDoLivro !== "")
      pessoa.numerolivro = p.value.DC_NumeroDoLivro.toUpperCase();

    if (p.value.DC_NumeroDaFolha !== "")
      pessoa.numerofolha = p.value.DC_NumeroDaFolha.toUpperCase();

    if (p.value.DC_NumeroDoTermo !== "")
      pessoa.numerotermo = p.value.DC_NumeroDoTermo.toUpperCase();

    if (dataemissaocertidao !== "")
      pessoa.dataemissaocertidao = dataemissaocertidao;

    if (p.value.DC_NumeroCTPS !== "")
      pessoa.numeroctps = p.value.DC_NumeroCTPS.toUpperCase();

    if (p.value.DC_SerieCTPS !== "")
      pessoa.seriectps = p.value.DC_SerieCTPS.toUpperCase();

    if (this.UfCtps !== undefined)
      pessoa.ufctps = this.UfCtps.uf;

    if (dataemissaoctps !== "")
      pessoa.dataemissaoctps = dataemissaoctps;

    if (tituloeleitor !== "")
      pessoa.tituloeleitor = tituloeleitor;

    if (p.value.DC_Zona !== "")
      pessoa.zona = p.value.DC_Zona.toUpperCase();

    if (p.value.DC_Secao !== "")
      pessoa.secao = p.value.DC_Secao.toUpperCase();

    if ($("label[for='FreqEsc1']").hasClass("active"))
      pessoa.frequentaescola = true;

    if ($("label[for='FreqEsc2']").hasClass("active"))
      pessoa.frequentaescola = false;


    if (escolaridadeId !== undefined)
      pessoa.Escolaridade = this.listaEscolaridade[escolaridadeId];

    if (situacaoFamiliarConjugalId !== undefined)
      pessoa.SituacaoFamiliarConjugal = this.listaSituacaoFamiliarConjugal[situacaoFamiliarConjugalId];

    this.pessoaService.Salvar(pessoa).subscribe(data => {

      var pessoapacientecomid = data.result as PessoaPaciente;


      var novalistaContatos = new Array<PessoaContato>();


      for (let i = 0; i <= this.listaContatos.length; i++) {

        var telefone = $("input[name='Cont_Telefone" + i + "']").val();
        var celular = $("input[name='Cont_Celular" + i + "']").val();
        var email = $("input[name='Cont_Email" + i + "']").val();

        if (telefone !== "" || celular !== "" || email !== "") {

          var pessoacontato: PessoaContato = {
            Pessoa: pessoapacientecomid,
            ativo: true
          }

          if (telefone !== "")
            pessoacontato.telefone = telefone.replace('(', '').replace(')', '').replace('-', '');

          if (celular !== "")
            pessoacontato.celular = celular.replace('(', '').replace(')', '').replace('-', '');

          if (email !== "")
            pessoacontato.email = email.replace('(', '').replace(')', '').replace('-', '');

          novalistaContatos.push(pessoacontato);
        }
      }

      this.Mensagens("sucesso", "Salvo com sucesso");

      if (novalistaContatos.length > 0) {


        this.pessoaService.SalvarContato(novalistaContatos).subscribe(data => {

          this.Mensagens("sucesso", "Contato salvo com sucesso");

        }, (error: HttpErrorResponse) => {
          this.Mensagens("erro", "Falha ao comunicar com API");
          console.log(`Error. ${error.message}.`);
        });

      }

      this.LimparCampos(p);

    }, (error: HttpErrorResponse) => {
      this.Mensagens("erro", "Falha ao comunicar com API");
      console.log(`Error. ${error.message}.`);
    },
    );
  }

  public Mensagens(tipo: string, mensagem: string) {

    switch (tipo) {
      case "sucesso": {
        toastr.success(mensagem);
        break;
      }
      case "erro": {
        toastr.error(mensagem);
        break;
      }
      case "info": {
        toastr.info(mensagem);
        break;
      }
      case "warning": {
        toastr.warning(mensagem);
        break;
      }
      default: {
        break;
      }
    }



  }


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

    this.listaContatos = new Array<PessoaContato>();
    this.listaEtnia = new Array<Etnia>();
    this.listaCidade = new Array<Cidade>();

    $("div").find("#box_newcontact1").remove();
    $("div").find("#box_newcontact2").remove();
    $("div").find("#box_newcontact3").remove();
    $("div").find("#box_newcontact4").remove();
    $("div").find("#box_newcontact5").remove();
  }



}


