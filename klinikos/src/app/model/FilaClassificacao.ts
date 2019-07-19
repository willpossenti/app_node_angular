import { RegistroBoletim } from './RegistroBoletim';
import { Acolhimento } from './Acolhimento';


export interface FilaClassificacao {

  filaClassificacaoId?: string;
  dataEntradaFilaClassificacao?: Date;
  RegistroBoletim?: RegistroBoletim;
  Acolhimento?: Acolhimento;
  preferencial?: boolean;
  idoso80?: boolean;
  ativo?: boolean;

}

