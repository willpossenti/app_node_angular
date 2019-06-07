import * as $ from 'jquery';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class SinaisVitais {


  constructor() {

  }

  ValidaTemperatura(_temperatura: any) {

    if (_temperatura !== '') {
      if (_temperatura < 33 || _temperatura > 45) 
        return 'bloquear';
      else if ((_temperatura >= 33 && _temperatura <= 34) || (_temperatura > 40 && _temperatura <= 45)) 
        return 'recomendar';
      else
        return 'normal';
    }
      return 'normal';

  }


  ValidaSaturacao(_saturacao: any) {

    if (_saturacao !== '') {
      if (_saturacao > 100) 
        return 'bloquear';
      else if (_saturacao < 85) 
        return 'recomendar';
      else 
        return 'normal';
    }

    return 'normal';
  }

  ValidaFrequenciaRespiratoria(_freq_resp: any) {

    if (_freq_resp !== '') {
      if (_freq_resp < 10 || _freq_resp > 66)
        return 'bloquear';
      else if ((_freq_resp > 9 && _freq_resp <= 11) || (_freq_resp > 60 && _freq_resp <= 66)) 
        return 'recomendar';
      else 
        return 'normal';
    }

    return 'normal';
  }


  ValidaPulso(_pulso: any) {

    if (_pulso !== '') {
      if (_pulso < 40 || _pulso > 150) 
        return 'bloquear';
      else if ((_pulso > 39 && _pulso <= 59) || (_pulso > 120 && _pulso <= 150))
        return 'recomendar';
      else 
        return 'normal';
    }

    return 'normal';
  }

  ValidaPressaoArterialSistolica(_pressao_sistolica: any) {

    if (_pressao_sistolica !== '') {
      if  (_pressao_sistolica < 50 || _pressao_sistolica > 250)
        return 'bloquear';
      else if ((_pressao_sistolica > 49 && _pressao_sistolica <= 59) || (_pressao_sistolica > 180 && _pressao_sistolica <= 250))  
        return 'recomendar';
      else 
        return 'normal';
    }

    return 'normal';
  }

  ValidaPressaoArterialDiastolica(_pressao_diastolica: any) {

    if (_pressao_diastolica !== '') {
      if (_pressao_diastolica < 20 || _pressao_diastolica > 160)
        return 'bloquear';
      else if ((_pressao_diastolica > 19 && _pressao_diastolica <= 29) || (_pressao_diastolica > 110 && _pressao_diastolica <= 160)) 
        return 'recomendar';
      else 
        return 'normal';
    }

    return 'normal';
  }
}
