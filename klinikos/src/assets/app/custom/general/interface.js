// Check CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf === '') return false;
  // Elimina CPFs invalidos conhecidos	
  if (cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999")
    return false;
  // Valida digito	
  add = 0;
  for (i = 0; i < 9; i++)
    add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11)
    rev = 0;
  if (rev !== parseInt(cpf.charAt(9)))
    return false;
  // Valida 2o digito	
  add = 0;
  for (i = 0; i < 10; i++)
    add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11)
    rev = 0;
  if (rev !== parseInt(cpf.charAt(10)))
    return false;
  return true;
}


function validarCEP(cep) {
  cep = cep.replace(/[^\d]+/g, '');

  if (cep === "00000000" ||
    cep === "11111111" ||
    cep === "22222222" ||
    cep === "33333333" ||
    cep === "44444444" ||
    cep === "55555555" ||
    cep === "66666666" ||
    cep === "77777777" ||
    cep === "88888888" ||
    cep === "99999999")
    return false;
  else
    return true;

}

// Comportamentos de Interface ----------------------------------
$(document).ready(function () {
  "use strict";


  // Start Popovers
  $("[data-toggle=popover]").popover({
    trigger: 'hover'
  });
  // Start Tooltips
  $('[data-toggle="tooltip"]').tooltip();
  
  

  $('#DP_CEP').on('focusout', function () {
    // var
    var dp_cep = $(this).val();
    // não vazio/mask
    if (dp_cep !== '_____-___') {
      // retorno validação
      var verifica = validarCEP(dp_cep);
      // exibe mensagem de erro
      if (verifica === false) {
        $('#msg_cep').removeClass('oculta');
      }
      else {
        // oculta mensagem de erro
        $('#msg_cep').addClass('oculta');
      }
    }
  });


  // CPF requerido em Dados Profissionais 
  $('#btn_dadosprof').on('change', function () {
    //vars
    var dp_cpf = $('#DP_CPF').val();
    var dp_cpf_check = validarCPF(dp_cpf);
    // vazio ou falso requer CPF
    if (dp_cpf === '' || dp_cpf_check === false) {
      $('#msg_cpf').removeClass('oculta');
      $('#DP_CPF').focus();

    }
    else {
      $('#msg_cpf').addClass('oculta');

    }
  });


  /*=InputMasks ---------- */
  //$.noConflict();
  $(function () {
    $(".mask_data").mask("99/99/9999"); // Data Pt-br
    $(".mask_cpf").mask("999.999.999-99");
    $(".mask_rg").mask("99.999.999-9"); // Identidade
    $(".mask_cns").mask("999 9999 9999 9999"); // Cartão Nacional de Saúde
    $(".mask_phone").mask("(99)9999-9999"); // Telefone Fixo
    $(".mask_mobile").mask("(99)99999-9999"); // Celular
    $(".mask_cep").mask("99999-999");
    $(".mask_pis").mask("999.9999.999-9"); // PIS PASEP
    $(".mask_te").mask("999999999999"); // Titulo Eleitor

  });


  /*=CadastroDePessoas: ------------------------------------------- */

  // Permite apenas Números
  $(function () {
    $('#DC_Zona, #DC_Secao, #DC_NumeroCTPS').bind('keypress', function (e) {
      var keyCode = (e.which) ? e.which : event.keyCode;
      return !(keyCode > 31 && (keyCode < 48 || keyCode > 57));
    });
  });

  // Adiciona Novos Campos de Contato
  $('#btn_addContact').on('click', function () {
    $('#box_newcontact').clone().appendTo('#bodyContact');
  });


  // Limpar Formulário -------------------------
  $('#btn_formclear').on('click', function () {

    // Reestrutura campos iniciais de Dados Pessoais -------------------
    if ($('input[name="DP_RecemNascido"]').is(":checked")) {
      // Reexibe : Nome Completo, Nome Social (opção: Recém Nascido)
      $('#box_nomecomp, #box_nomesocial').removeClass('oculta');
      $('#box_numprontmae, #box_nomeRN, #msg_mae').addClass('oculta');
    }
    // Reexibe : Nome Completo, Nome Social  - Oculta Descrição (opção: Não Identificado)
    if ($('input[name="DP_NaoIdentificado"]').is(":checked")) {
      $('#box_nomecompleto, #box_social, #box_nomesocial').removeClass('oculta');
      $('#box_descricao, #box_nomeRN').addClass('oculta');

      
    }

    /* Varre formulário que possui a classe '.clean_on') -------------------- */
    // limpa: input, textarea
    $('.clean_on').find('input, textarea').val('');
    // limpa: checkbox, radio
    $('.clean_on').find('input[type="radio"], input[type="checkbox"]').prop('checked', false);
    // limpa: select
    $('.clean_on').find('option:selected').prop('selected', false);
    // limpa: elementos com a classe 'clear' (bootstrap label buttons)
    if ($('.clear').hasClass('active')) {
      $('.clear').removeClass('active');
    }

    $('select[name="DP_Etnia"]').find('option').remove().end().append('<option value="-1">-- Selecione --</option>');
    $('select[name="DP_NaturalidadeCidade"]').find('option').remove().end().append('<option value="-1">-- Selecione --</option>');
    $("select[name^=DP_Etnia]").val($("select[name^=DP_Etnia] option:first").val());
    $("select[name^=DP_NaturalidadeCidade]").val($("select[name^=DP_NaturalidadeCidade] option:first").val());

    var btnchk = $(this).find('input[name^=DP_TipoCadastro]');

    $(btnchk).prop('checked', false);
    $('#box_dadosprof').addClass('oculta');

  });


  //Mostra/Oculta : Campos: Nome Completo e Nome Social
  $('#btn_naoidentificado').on('click', function () {
    // find
    var btncheck = $(this).find('input[type="checkbox"]');
    // Mostra
    if ($(btncheck).is(":checked")) {
      $('#box_nomecompleto, #box_social, #box_nomesocial').addClass('oculta');
      $('#box_descricao').removeClass('oculta');
    }
    // Oculta
    else {
      $(btncheck).prop('checked', false);
      $('#box_nomecompleto, #box_social, #box_nomesocial').removeClass('oculta');
      $('#box_descricao, #box_nomeRN').addClass('oculta');
    }
  });

  //Mostra/Oculta : Campo: Número Prontuário da Mãe e Nome RN
  $('#btn_recemnasc').on('click', function () {
    // find
    var btnchk = $(this).find('input[type="checkbox"]');
    // Mostra
    if ($(btnchk).is(":checked")) {
      $('#box_nomecomp, #box_nomesocial').addClass('oculta');
      $('#box_numprontmae, #box_nomeRN, #msg_mae').removeClass('oculta');
    }
    // Oculta
    else {
      $(btnchk).prop('checked', false);
      $('#box_nomecomp, #box_nomesocial').removeClass('oculta');
      $('#box_numprontmae, #box_nomeRN, #msg_mae').addClass('oculta');
    }
  });

  //Mostra/Oculta : Portlet: Dados Profissionais
  $('#btn_dadosprof').on('click', function () {
    // find
    var btnchk = $(this).find('input[type="checkbox"]');
    // Mostra
    if ($(btnchk).is(":checked")) {
      $('#box_dadosprof').removeClass('oculta');
      $('#collapseTwo1').addClass('show');
      //$('#Prof_Login').focus();
    }
    // Oculta
    else {
      $(btnchk).prop('checked', false);
      $('#box_dadosprof').addClass('oculta');
    }
  });




  /*=Acolhimento: ------------------------------------------- */


});
