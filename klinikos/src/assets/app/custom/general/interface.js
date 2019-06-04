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

// Validação CEP
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

// Check CNS
function validaCNS(cns) {
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

// Check PIS
function validaPIS(pis) {
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



// Comportamentos de Interface ----------------------------------
$(document).ready(function () {
  "use strict";

  // Start Popovers
  $("[data-toggle=popover]").popover({
    trigger: 'hover'
  });
  // Start Tooltips
  $('[data-toggle="tooltip"]').tooltip();


  // Verifica CEP
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

  // /*=CPF Validação ---------- */
  $('#DP_CPF').on('focusout', function () {
    // var
    var dp_cpf = $(this).val();
    // não vazio/mask
    if (dp_cpf !== '___.___.___-__') {
      // retorno validação
      var verifica = validarCPF(dp_cpf);
      // exibe mensagem de erro
      if (verifica === false) {
        $('#msg_cpf').removeClass('oculta');
      }
      else {
        // oculta mensagem de erro
        $('#msg_cpf').addClass('oculta');
      }
    }
  });

  //*=CNS Validação ---------- */
  $('#DP_CNS').on('focusout', function () {
    // var
    var dp_cns = $(this).val().replace(' ', '').replace(' ', '').replace(' ', '').replace('_', '');
    // não vazio/mask
    // retorno validação
    var verifica = validaCNS(dp_cns);
    // exibe mensagem de erro
    if (verifica === false) {
      $('#msg_cns').removeClass('oculta');
    }
    else {
      // oculta mensagem de erro
      $('#msg_cns').addClass('oculta');
    }

  });

  // /*=PIS Validação ---------- */
  $('#DP_PIS').on('focusout', function () {
    // var
    var dp_pis = $(this).val().replace('.', '').replace('.', '').replace('-', '').replace('_', '');
    // não vazio/mask
    // retorno validação
    var verifica = validaPIS(dp_pis);

    // exibe mensagem de erro
    if (verifica === false) {
      $('#msg_pis').removeClass('oculta');
    }
    else {
      // oculta mensagem de erro
      $('#msg_pis').addClass('oculta');
    }
  });


  // CPF requerido em Dados Profissionais 
  $('#btn_dadosprof').on('change', function () {
    //vars
    var dp_cpf = $('#DP_CPF').val();
    var dp_cpf_check = validarCPF(dp_cpf);
    // vazio ou falso requer CPF
    if ((dp_cpf === '') || (dp_cpf_check === false)) {
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
    $(".mask_hour").mask("99:99"); // Titulo Eleitor

  });
  jQuery(".telefone")
    .mask("(99) 9999-9999?9")
    .focusout(function (event) {
      var target, phone, element;
      target = (event.currentTarget) ? event.currentTarget : event.srcElement;
      phone = target.value.replace(/\D/g, '');
      element = $(target);
      element.unmask();
      if (phone.length > 10) {
        element.mask("(99) 99999-999?9");
      } else {
        element.mask("(99) 9999-9999?9");
      }
    });



  /*=CadastroDePessoas: ------------------------------------------- */

  // Permite apenas Números
  $(function () {
    //$('#DC_Zona, #DC_Secao, #DC_NumeroCTPS, #SV_PressaoArterial_1, #SV_PressaoArterial_2, #SV_Pulso, #SV_FreqResp').bind('keypress', function(e){
    $('.sn').bind('keypress', function (e) {
      var keyCode = e.which ? e.which : event.keyCode;
      return !(keyCode > 31 && (keyCode < 48 || keyCode > 57));
    });
  });

  // Adiciona Novos Campos de Contato ???
  //$('#btn_addContact').on('click', function(){
  //$('#box_newcontact').clone().appendTo('#bodyContact');
  //});


  // Limpar Formulário -------------------------
  $('#btn_formclear').on('click', function () {

    // Reestrutura campos iniciais de Dados Pessoais -------------------
    if ($('input[name="DP_RecemNascido"]').is(":checked")) {
      // Reexibe : Nome Completo, Nome Social (opção: Recém Nascido)
      $('#box_nomecomp, #box_nomesocial').removeClass('oculta');
      $('#box_numprontmae, #box_nomeRN').addClass('oculta');
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
      // campos com opacidade : escala de dor
      $('.clear').addClass('ed-opac');
    }
    // limpra combos dinâmicos
    $('select[name="DP_Etnia"]').find('option').remove().end().append('<option value="-1">-- Selecione --</option>');
    $('select[name="DP_NaturalidadeCidade"]').find('option').remove().end().append('<option value="-1">-- Selecione --</option>');
    $("select[name^=DP_Etnia]").val($("select[name^=DP_Etnia] option:first").val());
    $("select[name^=DP_NaturalidadeCidade]").val($("select[name^=DP_NaturalidadeCidade] option:first").val());

    var btnchk = $(this).find('input[name^=DP_TipoCadastro]');

    $(btnchk).prop('checked', false);
    $('#box_dadosprof').addClass('oculta');

    //oculta todas as mensagens de erro abaixo dos campos: <span class="cm"> -> 'clean message'
    $('.cm').addClass('oculta');

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
      $('#box_numprontmae, #box_nomeRN').removeClass('oculta');
    }
    // Oculta
    else {
      $(btnchk).prop('checked', false);
      $('#box_nomecomp, #box_nomesocial').removeClass('oculta');
      $('#box_numprontmae, #box_nomeRN').addClass('oculta');
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




  /*=Acolhimento: --------------------------------------------------- */

  // Sinais Vitais 
  // begin::Sistólica
  $('#SV_PressaoArterial_1').on('keyup', function () {
    // var
    var pre_art_1 = $(this).val();

    if (pre_art_1 !== '') {

      if ((pre_art_1 > 49 && pre_art_1 <= 59) || (pre_art_1 > 180 && pre_art_1 <= 250)) {
        $('#msg_pa1_a').removeClass('oculta');
        $('#msg_pa1_b').addClass('oculta');
      }
      if (pre_art_1 < 50 || pre_art_1 > 250) {
        $('#msg_pa1_b').removeClass('oculta');
        $('#msg_pa1_a').addClass('oculta');
      }

      if ((pre_art_1 <= 180) && (pre_art_1 >= 60)) {
        $('#msg_pa1_a, #msg_pa1_b').addClass('oculta');
      }

    } else {
      $('#msg_pa1_a, #msg_pa1_b').addClass('oculta');
    }
  });
  //end::Sistólica

  //begin::Disatólica
  $('#SV_PressaoArterial_2').on('keyup', function () {
    // var
    var pre_art_2 = $(this).val();

    if (pre_art_2 !== '') {

      if ((pre_art_2 > 19 && pre_art_2 <= 29) || (pre_art_2 > 110 && pre_art_2 <= 160)) {
        $('#msg_pa2_a').removeClass('oculta');
        $('#msg_pa2_b').addClass('oculta');
      }
      if (pre_art_2 < 20 || pre_art_2 > 160) {
        $('#msg_pa2_b').removeClass('oculta');
        $('#msg_pa2_a').addClass('oculta');
      }

      if (pre_art_2 <= 110 && pre_art_2 >= 30) {
        $('#msg_pa2_a, #msg_pa2_b').addClass('oculta');
      }

    } else {
      $('#msg_pa2_a, #msg_pa2_b').addClass('oculta');
    }
  });
  //end::Diastólica

  //begin::Pulso
  $('#SV_Pulso').on('keyup', function () {
    // var
    var pulso = $(this).val();

    if (pulso !== '') {

      if ((pulso > 39 && pulso <= 59) || (pulso > 120 && pulso <= 150)) {
        $('#msg_pulso_a').removeClass('oculta');
        $('#msg_pulso_b').addClass('oculta');
      }
      if (pulso < 40 || pulso > 150) {
        $('#msg_pulso_b').removeClass('oculta');
        $('#msg_pulso_a').addClass('oculta');
      }
      if (pulso <= 120 && pulso >= 60) {
        $('#msg_pulso_a, #msg_pulso_b').addClass('oculta');
      }

    } else {
      $('#msg_pulso_a, #msg_pulso_b').addClass('oculta');
    }
  });
  //end::Pulso

  //begin::Temperatura
  $('#SV_Temperatura').on('keyup', function () {
    // var
    var temp = $(this).val();

    if (temp !== '') {

      if ((temp >= 33 && temp <= 34) || (temp > 40 && temp <= 45)) {
        $('#msg_temp_a').removeClass('oculta');
        $('#msg_temp_b').addClass('oculta');
      }
      if (temp < 33 || temp > 45) {
        $('#msg_temp_b').removeClass('oculta');
        $('#msg_temp_a').addClass('oculta');
      }
      if (temp >= 35 && temp <= 40) {
        $('#msg_temp_a, #msg_temp_b').addClass('oculta');
      }
    }
    else {
      $('#msg_temp_a, #msg_temp_b').addClass('oculta');
    }

  });
  //end::Temperatura

  //begin::Saturação
  $('#SV_Saturacao').on('keyup', function () {
    // var
    var sat = $(this).val();

    if (sat !== '') {

      if (sat > 100) {
        $('#msg_sat_b').removeClass('oculta');
        $('#msg_sat_a').addClass('oculta');
      }
      if (sat < 85) {
        $('#msg_sat_a').removeClass('oculta');
        $('#msg_sat_b').addClass('oculta');
      }
      if ((sat >= 85) && (sat <= 100)) {
        $('#msg_sat_a, #msg_sat_b').addClass('oculta');
      }

    } else {
      $('#msg_sat_a, #msg_sat_b').addClass('oculta');
    }
  });
  //end::Temperatura

  //begin::Frequencia Respiratoria
  $('#SV_FreqResp').on('keyup', function () {

    var freq_resp = $(this).val();

    if (freq_resp !== '') {

      if ((freq_resp > 9 && freq_resp <= 11) || (freq_resp > 60 && freq_resp <= 66)) {
        $('#msg_freqresp_a').removeClass('oculta');
        $('#msg_freqresp_b').addClass('oculta');
      }
      if (freq_resp < 10 || freq_resp > 66) {
        $('#msg_freqresp_b').removeClass('oculta');
        $('#msg_freqresp_a').addClass('oculta');
      }
      if (freq_resp <= 60 && freq_resp >= 12) {
        $('#msg_freqresp_a, #msg_freqresp_b').addClass('oculta');
      }

    } else {
      $('#msg_freqresp_a, #msg_freqresp_b').addClass('oculta');
    }
  });
  //end::Frequencia Respiratoria

  // Outros -------
  //begin:: Mostra/Oculta: Unidade de Referência
  $('#PacGuiaRefer').on('change', function () {
    if ($('input[type="checkbox"][name="PacGuiaRefer"]').is(':checked')) {
      $('#Especialidade').removeAttr('disabled');
    }
    else {
      $('#Especialidade').prop('disabled', true);
    }
  });
  //end:: Mostra/Oculta: Unidade de Referência)

  //begin: Outras Condições (Ao marcar 'Dor Torácica força a marcação da opção Risco) -----
  $('#OC_DorToracica').on('click', function () {
    var dortoracica = $(this).find('input[type="checkbox"]');
    var risco = $('#OC_Risco').find('input[type="checkbox"]');

    if (!dortoracica.is(':checked') && !risco.is(':checked')) {
      $('#OC_Risco').addClass('active');
      $(risco).prop('checked', true);
    }
    if (dortoracica.is(':checked') && risco.is(':checked')) {
      $('#OC_Risco').removeClass('active');
      $(risco).prop('checked', false);
    }
    if (!dortoracica.is(':checked') && risco.is(':checked')) {
      $('#OC_Risco').addClass('active');
      $(risco).prop('checked', true);
    }
  });

  $('#OC_Risco').on('click', function () {
    var risco = $(this).find('input[type="checkbox"]');
    var dortoracica = $('#OC_DorToracica').find('input[type="checkbox"]');

    if (dortoracica.is(':checked') && risco.is(':checked')) {
      $('#OC_DorToracica').removeClass('active');
      $(dortoracica).prop('checked', false);
    }
    if (!dortoracica.is(':checked') && !risco.is(':checked')) {
      $('#OC_DorToracica').removeClass('active');
      $(dortoracica).prop('checked', false);
    }
  });
  //end: Outras Condições (Ao marcar 'Dor Torácica força a marcação da opção Risco) -----


  /*=Classificação de Risco: --------------------------------------------------- */
  // Escala de Dor : Sweep label [radio buttons] with class: "ed" ------
  $('.ed').on('click', function () {
    // sweep radio-buttons
    var escala = $(this);
    var radios = $('input[type="radio"][name="EscalaDor"]').parent();

    // check
    if (!$(escala).hasClass('active')) {
      $(escala).removeClass('ed-opac');
      // restore opacity other options
      $(radios).each(function (i, e) {
        // check each
        if ($(e) !== escala) {
          if ($(e).hasClass('active')) {
            $(e).removeClass('active');
            $(e).addClass('ed-opac');
          }
        }

      });
    }
  });

  // Sinais Vitais : Calcular IMC -----------
  $('#SV_Peso, #SV_Altura').on('keyup', function () {
    // vars
    var peso = $('#SV_Peso').val();
    var altura = $('#SV_Altura').val();
    altura = altura / 100;
    var imc = peso / (altura * altura);
    var imc_r = imc.toFixed(2);

    // check results
    if (imc !== 'Infinity' && imc !== '') {

      var result = '';
      // Abaixo do Peso
      if (imc_r < 18.5) {
         result = imc_r + ' - Ab. do Peso';
        $("#SV_IMC").attr("data-content", "Abaixo do Peso");
      }
      // Peso Normal
      if (imc_r >= 18.5 && imc_r <= 24.9) {
         result = imc_r + ' - Peso Normal';
        $("#SV_IMC").attr("data-content", "Peso Normal");
      }
      // Sobrepeso
      if (imc_r >= 25 && imc_r <= 29.9) {
         result = imc_r + ' - Sobrepeso';
        $("#SV_IMC").attr("data-content", "Sobrepeso");
      }
      // Obeso Grau 1
      if (imc_r >= 30 && imc_r <= 34.9) {
         result = imc_r + ' - Ob.: Grau 1';
        $("#SV_IMC").attr("data-content", "Obesidade: Grau 1");
      }
      // Obeso Grau 2
      if (imc_r >= 35 && imc_r <= 39.9) {
         result = imc_r + ' - Ob.: Grau 2';
        $("#SV_IMC").attr("data-content", "Obesidade: Grau 2");
      }
      // Obeso Grau 3
      if (imc_r > 40) {
        result = imc_r + ' - Ob.: Grau 3';
        $("#SV_IMC").attr("data-content", "Obesidade: Grau 3");
      }
      // append with rounded
      $('#SV_IMC').val(result);
    }
  });

  // Doenças Pre-Existentes -------------
  $('#dpe_respcron').on('click', function () {
    // Respiratória Crônica
    var dpe_respcron = $('input[type="checkbox"][name="DPE_RespCronico"]').prop('checked');
    if (dpe_respcron === true) {
      $('#dpe_respcron_box').removeClass('oculta');
      $('textarea[name="DoencaPreExistRespCron"]').focus();
    } else {
      $('#dpe_respcron_box').addClass('oculta');
    }
  });
  $('#dpe_outros').on('click', function () {
    // Outros
    var dpe_outros = $('input[type="checkbox"][name="DPE_Outros"]').prop('checked');
    if (dpe_outros === true) {
      $('#dpe_outros_box').removeClass('oculta');
      $('textarea[name="DoencaPreExistOutros"]').focus();
    } else {
      $('#dpe_outros_box').addClass('oculta');
    }
  });

  // Possui Alergia
  $('#PossuiAlergia').on('change', function () {
    if ($(this).val() == 1) {
      // show card : Alergia
      $('#AlergiaCard').removeClass('oculta');
      $('#collapseOne3').addClass('show');
      // scrolltop animate
      $("html, body").delay(300).animate({ scrollTop: $('#boxAlergiaScroll').offset().top - 75 }, 800);
    } else {
      $('#AlergiaCard').addClass('oculta');
      $('#collapseOne3').removeClass('show');
    }
  });



  /*=Atendimento Médico: --------------------------------------------------- */
  // Diagnóstico > Condutas > Exames ----
  $('#CondutaExames').on('click', function () {
    if (!$(this).find('input[type="checkbox"]').is(':checked')) {
      $('#boxExames').removeClass('oculta');
      $('#collapseOne5').addClass('show');
      // scroll animated
      $("html, body").delay(300).animate({ scrollTop: $('#boxExamesScroll').offset().top - 75 }, 800);
    } else {
      $('#boxExames').addClass('oculta');
      $('#collapseOne5').removeClass('show');
    }
  });
  // Diagnóstico > Condutas > Prescricao ou Receita ----
  $('#CondutaPrescricao').on('click', function () {
    if (!$(this).find('input[type="checkbox"]').is(':checked')) {
      $('#boxPrescricaoReceita').removeClass('oculta');
      $('#collapseOne6').addClass('show');
      // scroll animated
      $("html, body").delay(300).animate({ scrollTop: $('#boxPrescricaoReceitaScroll').offset().top - 75 }, 800);

    } else {
      $('#boxPrescricaoReceita').addClass('oculta');
      $('#collapseOne6').removeClass('show');
    }
  });
  // Diagnóstico > Condutas > Atestado ----
  $('#CondutaAtestado').on('click', function () {
    if (!$(this).find('input[type="checkbox"]').is(':checked')) {
      $('#boxAtestado').removeClass('oculta');
      $('#collapseOne7').addClass('show');
      // scroll animated
      $("html, body").delay(300).animate({ scrollTop: $('#boxAtestadoScroll').offset().top - 75 }, 800);
    } else {
      $('#boxAtestado').addClass('oculta');
      $('#collapseOne7').removeClass('show');
    }
  });

  // Botões Auxiliares Fixos Auxiliares : Opções de Diagnóstico
  $('#btnAuxExames').on('click', function () {
    $('#CondutaExames').trigger('click');
  });
  $('#btnAuxPrescricao').on('click', function () {
    $('#CondutaPrescricao').trigger('click');
  });
  $('#btnAuxAtestado').on('click', function () {
    $('#CondutaAtestado').trigger('click');
  });

  // Finalização do Atendimento Médico --- botão [Finalizar]
  $('#AtendMedTipoSaida').on('change', function () {
    if ($(this).val() == 1) {
      $('#colModalFinAlta').addClass('oculta');
      $('#colModalFinObito').removeClass('oculta');
    } else {
      $('#colModalFinAlta').removeClass('oculta');
      $('#colModalFinObito').addClass('oculta');
    }
  });


});
// close: Interface
