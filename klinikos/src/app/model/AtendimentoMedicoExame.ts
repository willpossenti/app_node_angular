import { AtendimentoMedico } from './AtendimentoMedico';
import { GrupoExame } from './GrupoExame';
import { Exame } from './Exame';

export interface AtendimentoMedicoExame {

  atendimentoMedicoExameId?: string;
  AtendimentoMedico?: AtendimentoMedico;
  GrupoExame?: GrupoExame;
  Exame?: Exame;
  observacaoExame?: string;
  dataExame?: Date;
  ativo?: boolean;
}

