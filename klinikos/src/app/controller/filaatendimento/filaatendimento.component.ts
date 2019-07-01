import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-filaatendimento',
  templateUrl: './filaatendimento.component.html',
  styleUrls: ['./filaatendimento.component.css']
})
export class FilaatendimentoComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function () {
 

      document.title = 'Fila de Atendimento | Klinikos';
      $("h3[class^=k-subheader__title]").html("Fila de Atendimento");

      $.getScript("../../../assets/app/custom/general/interface.js", function (data: any, textStatus: any, jqxhr: any) {
      });

      $.getScript("../../../assets/vendors/custom/datatables/datatables.bundle.js", function (data: any, textStatus: any, jqxhr: any) {
      });

      $.getScript("../../../assets/app/custom/general/components/datatables/extensions/responsive.js", function (data: any, textStatus: any, jqxhr: any) {
      });

      $.getScript("../../../assets/demo/default/base/scripts.bundle.js", function (data: any, textStatus: any, jqxhr: any) {
      });

    

    });
  }

}
