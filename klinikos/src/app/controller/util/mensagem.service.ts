import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Return } from 'src/app/model/Return';
import * as toastr from 'toastr';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {


  constructor() {

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


  }


  //begin:: Mensagens de Exibição Padrão/ Mensagens responsáveis pelos avisos com integrações externas
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
  //end:: Mensagens de Exibição Padrão
}
