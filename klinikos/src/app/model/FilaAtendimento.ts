
import { Acolhimento } from './Acolhimento';
import { ClassificacaoRisco } from './ClassificacaoRisco';

export interface FilaAtendimento {

  filaAtendimentoId?: string;
  dataEntradaFilaAtendimento?: Date;
  ClassificacaoRisco?: ClassificacaoRisco;
  Acolhimento?: Acolhimento;
  preferencial?: boolean;
  idoso80?: boolean;
  ativo?: boolean;

}

