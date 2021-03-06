import { Component, OnInit, NgZone } from '@angular/core';
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
import {transition, trigger, state, style, animate} from '@angular/animations';


@Component({
  selector: 'app-klinikos',
  animations: [
    trigger('changeDivSize', [
      state('aberto', style({
        width: '260px',
      })),
      state('contraido', style({
        width: '78px',
      })),

      transition('aberto=>contraido', animate('150ms')),
      transition('contraido=>aberto', animate('150ms'))
    ]),

    trigger('changeDivSizeMenuRapido', [
      state('aberto', style({
        right: '0',
      })),
      state('fechado', style({
        right: '-445px',
      })),

      transition('aberto=>fechado', animate('300ms')),
      transition('fechado=>aberto', animate('300ms'))
    ]),
  

  ],


  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
})
export class MasterComponent implements OnInit {

  shaObj: any;
  hash: String;
  listaPessoaPaciente: Array<PessoaPaciente>;

  currentStateMenu = 'aberto';
  currentStateMenuRapido: string;

  listItem = [];
  list_order: number = 1;

  changeState() {

    if (this.currentStateMenu === 'aberto')
      this.currentStateMenu = 'contraido'
    else
      this.currentStateMenu = 'aberto'

  }

  changeStateMenuRapido() {

      this.currentStateMenuRapido = 'aberto'

  }

  changeFechaMenuRapido() {

    this.currentStateMenuRapido = 'fechado'

  }

  changeStateHover() {
    if (this.currentStateMenu === 'contraido')
      this.currentStateMenu = 'abre';
  }

  constructor(
    private route: Router, private location: Location, private pessoaService: PessoaService, private router: ActivatedRoute,) {

    
  }



  public ngOnInit() {

   
    $(document).ready(function () {

   

      $.getScript("../../../assets/demo/default/base/scripts.bundle.js", function (data: any, textStatus: any, jqxhr: any) {
      });
      $.getScript("../../../assets/app/bundle/app.bundle.js", function (data: any, textStatus: any, jqxhr: any) {
      });
     
      


      $('body').css("background", "");
      $('body').addClass("k-header--fixed k-header-mobile--fixed k-subheader--enabled k-subheader--transparent k-aside--enabled k-aside--fixed k-page--loading");
      document.title = 'Home | Klinikos';

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

    var dp_nomecompletoPesquisaGeral = $("input[name^=DP_NomeCompleto_PesquisaGeral]").val().trim().toUpperCase();

    $('#divPesquisaNome').addClass('show');

    this.pessoaService.ConsultaNomeCompletoPaciente(dp_nomecompletoPesquisaGeral)
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

  changePage(page: any) {

    
    this.route.navigate([page], { relativeTo: this.router });
    this.changeFechaMenuRapido();

    $("#k_offcanvas_toolbar_quick_actions").removeClass("k-offcanvas-panel--on");
    $("body").removeClass("k-offcanvas-panel--on");
    $("div").remove(".k-offcanvas-panel-overlay");
    $("#kt_blockui_3_5").click();
    $("#k_scrolltop").trigger("click");


  }

}
