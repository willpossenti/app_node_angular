import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import * as Toastr from 'toastr';
import { PessoaService } from '../cadastro/pessoa/pessoa.service';
import { PessoaPaciente } from '../../model/PessoaPaciente';
import { PessoaProfissional } from '../../model/PessoaProfissional';
import { Return } from '../../model/Return';
import { HttpErrorResponse } from '@angular/common/http';
import * as swal from '../../../assets/vendors/general/sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-klinikos',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],


})
export class MasterComponent implements OnInit {


  listaPessoaPaciente: Array<PessoaPaciente>;


  constructor(private router: ActivatedRoute,
    private route: Router, private location: Location, private pessoaService: PessoaService) {



  }

  public ngOnInit() {




    $(document).ready(function () {



      $('body').css("background", "");
      $('body').addClass("k-header--fixed k-header-mobile--fixed k-subheader--enabled k-subheader--transparent k-aside--enabled k-aside--fixed k-page--loading");
      document.title = 'Home | Klinikos';

      $('.k-grid-nav-v2__item').on("click", function () {

        var id = $(this).attr("id");

        $("#k_offcanvas_toolbar_quick_actions").removeClass("k-offcanvas-panel--on");
        $("body").removeClass("k-offcanvas-panel--on");
        $("div").remove(".k-offcanvas-panel-overlay");
        $("#kt_blockui_3_5").click();

        if (id === "registroboletim")
          setTimeout(() =>

            //this.route.navigate(['registroboletim'], { relativeTo: this.router })
            window.location.replace("http://localhost:4200/klinikos/registroboletim")
            , 1000);
        else if (id === "acolhimento")
          setTimeout(() =>

            //this.route.navigate(['registroboletim'], { relativeTo: this.router })
            window.location.replace("http://localhost:4200/klinikos/acolhimento")
            , 1000);
        else if (id === "classificacaorisco")
          setTimeout(() =>

            //this.route.navigate(['registroboletim'], { relativeTo: this.router })
            window.location.replace("http://localhost:4200/klinikos/classificacaorisco")
            , 1000);

        else if (id === "atendimentomedico")
          setTimeout(() =>

            //this.route.navigate(['registroboletim'], { relativeTo: this.router })
            window.location.replace("http://localhost:4200/klinikos/atendimentomedico")
            , 1000);
        else if (id === "cadastro")
          setTimeout(() =>
            window.location.replace("http://localhost:4200/klinikos/cadastro")
            //this.route.navigate(['cadastro'], { relativeTo: this.router })

            , 1000);
      })

    });

    if (localStorage['paciente'] != null) {
      var paciente = JSON.parse(localStorage.getItem('paciente'));
      this.onSelectedPaciente(paciente);
    }



    if (window.location.href === "http://localhost:4200/klinikos") {
      if (localStorage['url_recuperada'] != undefined) {

        console.log(localStorage['url_recuperada']);
        swal({ title: 'Deseja retornar para a tela anterior ao logout?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })
          .then(function (result) {
            if (result.value) {
              window.location.replace(localStorage.getItem('url_recuperada'))
            }
          });

      }
    } else
      localStorage.setItem('url_recuperada', window.location.href);



  }

  onConsultaNome() {

    var dp_nomecompleto = $("input[name^=DP_NomeCompleto_PesquisaGeral]").val().trim().toUpperCase();

    $('#divPesquisaNome').addClass('show');



    this.pessoaService.ConsultaNomeCompletoPaciente(dp_nomecompleto)
      .subscribe(data => {

        this.listaPessoaPaciente = data.result;

      }, (error: HttpErrorResponse) => {
        //Toastr.error("Falha ao consultar cep na aba endereço");
        console.log(`Error. ${error.message}.`);
      });


  }

  onSelectedPaciente(paciente: PessoaPaciente) {


    $("#nomePaciente").html(paciente.nomeSocial);
    $("#nomeCompletoPaciente").html(paciente.nomeCompleto);

    if (paciente.idadeAparente !== null)
      $("#idade").html(paciente.idadeAparente.split(' ')[0]);

    if (paciente.cns !== null)
      $("#cns").html("<strong>CNS: </strong>" + paciente.cns);

    if (paciente.foto !== null)
      $("#imgAvatar").prop("src", paciente.foto);
    else
      $("#imgAvatar").prop("src", "../../assets/media/users/default.jpg");

    $("#divPesquisaNome").removeClass('show');

    localStorage.setItem('paciente', JSON.stringify(paciente));

    $("input[name^=DP_NomeCompleto_PesquisaGeral]").val("");
  }




  logout() {

    localStorage.clear();
    this.route.navigate(['login']);
  }


}
