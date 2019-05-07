import { Pipe, PipeTransform } from '@angular/core';
import { EscalaDor } from '../../model/EscalaDor';

@Pipe({ name: 'filtroSemDor' })
export class ClassificacaoRiscoPipe implements PipeTransform {



  transform(items: Array<EscalaDor>, value: number[]): any {
    if (!items) { return []; }

    return items.filter(x => value.includes(x.codigoEscalaDor));
  }

}
