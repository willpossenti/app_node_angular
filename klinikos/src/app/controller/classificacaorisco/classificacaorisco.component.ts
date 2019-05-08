import { Component, OnInit, Pipe } from '@angular/core';
import * as $ from 'jquery';
import { ClassificaoRiscoService } from './classificacaorisco.service';
import { Return } from '../../model/Return';
import { CausaExterna } from '../../model/CausaExterna';
import { HttpErrorResponse } from '@angular/common/http';
import * as Toastr from 'toastr';
import { EscalaDor } from '../../model/EscalaDor';
import { NivelConsciencia } from '../../model/NivelConsciencia';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-classificacaorisco',
  templateUrl: './classificacaorisco.component.html',
  styleUrls: ['./classificacaorisco.component.css']
})
export class ClassificacaoRiscoComponent implements OnInit {


  listaCausasExterna: Array<CausaExterna>;
  listaEscalasDor: Array<EscalaDor>;
  listaNiveisConsciencia: Array<NivelConsciencia>;
  orderDescricao: string = 'descricao';



  constructor(private classificacaoriscoservice: ClassificaoRiscoService) { }

  ngOnInit() {

    $(document).ready(function () {

      document.title = 'Classificação de Risco | Klinikos';
      $("h3[class^=k-subheader__title]").html("Classificação de Risco");

    });

    this.classificacaoriscoservice.BindCausaExterna().subscribe(async (data: Return) => {
      this.listaCausasExterna = data.result;

      $(document).ready(function () { $("select[name^=CausaExterna]").val($("select[name^=CausaExterna] option:first").val()); });


    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Raças na aba Classificação de Risco");
      console.log(`Error. ${error.message}.`);
    });

    this.classificacaoriscoservice.BindEscalaDor().subscribe(async (data: Return) => {
      this.listaEscalasDor = data.result;


    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar Escala de Dor na aba Classificação de Risco");
      console.log(`Error. ${error.message}.`);
    });

    this.classificacaoriscoservice.BindNivelConsciencia().subscribe(async (data: Return) => {
      this.listaNiveisConsciencia = data.result;


    }, (error: HttpErrorResponse) => {
        Toastr.error("Falha ao carregar Nível de Consciência na aba Classificação de Risco");
        console.log(`Error. ${error.message}.`);
      });
  }



  //@Pipe({
  //  name: 'flyingHeroesImpure',
  //  pure: false
  //})

}
