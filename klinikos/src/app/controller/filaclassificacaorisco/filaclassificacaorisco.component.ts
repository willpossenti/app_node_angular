import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-filaclassificacaorisco',
  templateUrl: './filaclassificacaorisco.component.html',
  styleUrls: ['./filaclassificacaorisco.component.css']
})
export class FilaclassificacaoriscoComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function () {
 

      document.title = 'Fila de Classificação | Klinikos';
      $("h3[class^=k-subheader__title]").html("Fila de Classificação");

      $.getScript("../../../assets/app/custom/general/interface.js", function (data: any, textStatus: any, jqxhr: any) {
      });

    });
  }

}
