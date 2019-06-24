


// Comportamentos de Interface ----------------------------------
$(document).ready(function () {
  "use strict";

  // Start Popovers
  // $("[data-toggle=popover]").popover({
  //   trigger: 'hover'
  // });
  // Start Tooltips
 //  $('[data-toggle="tooltip"]').tooltip();


  /*=CadastroDePessoas: ------------------------------------------- */

  // Permite apenas Somente Números
  $(function () {
    $('.sn').bind('keypress', function (e) {
      var keyCode = (e.which) ? e.which : event.keyCode;
      return !(keyCode > 31 && (keyCode < 48 || keyCode > 57));
    });
  });


  // Limpar Formulário -------------------------
  $('#btn_formclearCadastro').on('click', function () {

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

    // limpa combos dinâmicos
    $('select[name^=DP_Etnia]').find('option').remove().end().append('<option value="-1">-- Selecione --</option>');
    $('select[name^=DP_NaturalidadeCidade]').find('option').remove().end().append('<option value="-1">-- Selecione --</option>');
    $("select[name^=DP_Etnia]").val($("select[name^=DP_Etnia] option:first").val());
    $("select[name^=DP_NaturalidadeCidade]").val($("select[name^=DP_NaturalidadeCidade] option:first").val());

    var btnchk = $(this).find('input[name^=DP_TipoCadastro]');

    $(btnchk).prop('checked', false);
    $('#box_dadosprof').addClass('oculta');

    LimparTela();

  });


  $('#btnLimparClassificacaoRisco').on('click', function () {
    LimparTela();
  });

  function LimparTela(){

    /* Varre formulário que possui a classe '.clean_on') -------------------- */
    // limpa: input, textarea
    $('.clean_on').find('input, textarea').val('');
    // limpa: checkbox, radio
    $('.clean_on').find('input[type="radio"], input[type="checkbox"]').prop('checked', false);
    // limpa: select
    $('select').val($("select option:first").val());
    // limpa: elementos com a classe 'clear' (bootstrap label buttons)
    if ($('.clear').hasClass('active')) {
      $('.clear').removeClass('active');
      // class.risco > escala de dor : campos com opacidade
      $('.ed').addClass('ed-opac');
      // acolhimento > preferencial : icones svg
      $('.deficiente, .gestante, .idoso-a, idoso-b').removeClass('fill-hover');
    }
    

     //oculta todas as mensagens de erro abaixo dos campos: <span class="cm"> -> 'clean message'
     $('.cm').addClass('oculta');

     
  }
 


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


  // Ícone de Prioridade : Permite alterar cor de imagens SVG, classe 'fill'; -------
  $(function () {
    jQuery('img.svg').each(function () {
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      jQuery.get(imgURL, function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

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

        // Check if the viewport is set, else we gonna set it if we can.
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

      }, 'xml');

    });
  });

  // Ícone de Prioridade (Click) : Add and remove class 'fill' -------------------------------------
  $('#deficiente').on('click', function () {
    if (!$(this).hasClass('active')) {
      $('.deficiente').addClass('fill-hover');
      $('.gestante, .idoso-a, .idoso-b').removeClass('fill-hover');
    }
  });
  $('#gestante').on('click', function () {
    if (!$(this).hasClass('active')) {
      $('.gestante').addClass('fill-hover');
      $('.deficiente, .idoso-a, .idoso-b').removeClass('fill-hover');
    }
  });
  $('#idoso-a').on('click', function () {
    if (!$(this).hasClass('active')) {
      $('.idoso-a').addClass('fill-hover');
      $('.deficiente, .gestante, .idoso-b').removeClass('fill-hover');
    }
  });
  $('#idoso-b').on('click', function () {
    if (!$(this).hasClass('active')) {
      $('.idoso-b').addClass('fill-hover');
      $('.deficiente, .gestante, .idoso-a').removeClass('fill-hover');
    }
  });

  // Ícone de Prioridade (Hover) : Add and remove class 'fill' -------------------------------------
  $(function () {
    // Prioridades
    $('#deficiente').hover(
      function () {
        $('.deficiente').addClass('fill-hover');
      },
      function () {
        if (!$(this).hasClass('active')) {
          $('.deficiente').removeClass('fill-hover');
        }
      }
    );
    $('#gestante').hover(
      function () {
        $('.gestante').addClass('fill-hover');
      },
      function () {
        if (!$(this).hasClass('active')) {
          $('.gestante').removeClass('fill-hover');
        }
      }
    );
    $('#idoso-a').hover(
      function () {
        $('.idoso-a').addClass('fill-hover');
      },
      function () {
        if (!$(this).hasClass('active')) {
          $('.idoso-a').removeClass('fill-hover');
        }
      }
    );
    $('#idoso-b').hover(
      function () {
        $('.idoso-b').addClass('fill-hover');
      },
      function () {
        if (!$(this).hasClass('active')) {
          $('.idoso-b').removeClass('fill-hover');
        }
      }
    );
  });



  /*=Classificação de Risco: --------------------------------------------------- */

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

  // Escala de Glasgow
  $('#EG_AberturaOcular, #EG_RespostaVerbal, #EG_RespostaMotora').on('change', function () {
    //vars
    var ao = $('#EG_AberturaOcular').val();
    var rv = $('#EG_RespostaVerbal').val();
    var rm = $('#EG_RespostaMotora').val();

    if ((ao != '') && (rv != '') && (rm != '')) {
      // calc eg
      var calc = parseInt(ao) + parseInt(rv) + parseInt(rm);

      //check
      if (calc <= 8) {
        var eg = calc + ' - Trauma Grave';
      }
      if ((calc > 8) && (calc <= 12)) {
        var eg = calc + ' - Trauma Moderado';
      }
      if ((calc >= 13) && (calc <= 15)) {
        var eg = calc + ' - Trauma Moderado';
      }
      // show result
      $('#EscalaGlasgow').val(eg);
    }
  });
  // button clean options EG
  $('#EG_Clean').on('click', function () {
    // selects
    $('#EG_AberturaOcular, #EG_RespostaVerbal, #EG_RespostaMotora').find('option:selected').prop('selected', false);
    $('#EscalaGlasgow').val('');
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
