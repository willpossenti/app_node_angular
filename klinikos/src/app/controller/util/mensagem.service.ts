
import { Injectable } from '@angular/core';
import * as Toastr from 'toastr';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {


  constructor() {

    Toastr.options = {
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
        Toastr.success(mensagem);
        break;
      }
      case "erro": {
        Toastr.error(mensagem);
        break;
      }
      case "info": {
        Toastr.info(mensagem);
        break;
      }
      case "warning": {
        Toastr.warning(mensagem);
        break;
      }
      default: {
        break;
      }
    }



  }
  //end:: Mensagens de Exibição Padrão
}
