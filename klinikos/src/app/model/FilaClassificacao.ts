import { RegistroBoletim } from './RegistroBoletim';
import { Acolhimento } from './Acolhimento';


export interface FilaClassificacao {

  filaClassificacaoId?: string;
  dataEntradaFilaClassificacao?: Date;
  RegistroBoletim?: RegistroBoletim;
  Acolhimento?: Acolhimento;
  ativo?: boolean;

}

