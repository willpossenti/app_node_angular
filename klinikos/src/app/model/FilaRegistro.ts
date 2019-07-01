
import { Acolhimento } from './Acolhimento';

export interface FilaRegistro {

  filaRegistroId?: string;
  dataEntradaFilaRegistro?: Date;
  Acolhimento?: Acolhimento;
  preferencial?: boolean;
  idoso80?: boolean;
  ativo?: boolean;

}

