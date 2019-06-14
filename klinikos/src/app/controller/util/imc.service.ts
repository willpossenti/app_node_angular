import * as $ from 'jquery';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ImcService {


  constructor() {

  }


  ValidaImc(value: any){

    if(isNaN(value.replace(',','.')))
        return false;
    return true;
  }

  //begin:: validacao de formatação do cpf
  CalculaImc(_peso: any, _altura: any) {

    var peso = _peso.replace(',', '.');
    var altura = _altura.replace(',', '').replace('.', '');

    if ($.isNumeric(peso) && $.isNumeric(altura)) {
      // vars
      if (peso !== '' && altura !== '') {
        // calc
        var newaltura = altura / 100;
        var imc = peso / (newaltura * newaltura);
        var imc_r = imc.toFixed(1).replace('.', ',');

        // check 
        if (imc < 18.5) {
          var msg = ' - Abaixo do Peso';
        }
        if (imc >= 18.5) {
          var msg = ' - Peso Normal';
        }
        if (imc >= 25) {
          var msg = ' - Sobrepeso';
        }
        if (imc >= 30) {
          var msg = ' - Obesidade: Grau 1';
        }
        if (imc >= 35) {
          var msg = ' - Obesidade: Grau 2';
        }
        if (imc >= 40) {
          var msg = ' - Obesidade: Grau 3';
        }
        // show result
          return imc_r + msg;
      } 
    }
  }
}
