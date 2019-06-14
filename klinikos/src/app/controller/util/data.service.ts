import * as $ from 'jquery';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DataService {


  constructor() {

  }

  //begin:: validacao de formatação do cpf
  validarData(data_input: any) {

    var data = data_input.split("/");

    var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])      [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;


    var dataInfTela = moment(new Date(data[2], data[1], data[0])).format('YYYY-MM-DD').split('-');
    var newDataInfTela =  moment(new Date(+dataInfTela[0], +dataInfTela[1]-2, +dataInfTela[2])).format('YYYY-MM-DD');
    var dataAtual = moment(new Date()).format('YYYY-MM-DD').split('-');
    var newData =  moment(new Date(+dataAtual[0], +dataAtual[1]-1, +dataAtual[2])).format('YYYY-MM-DD');

    if(data_input.match(RegExPattern) === null || data_input ==='' || newDataInfTela > newData)
      return false;
    
    return true;
  }
}
