import { AtendimentoMedico } from './AtendimentoMedico';
import { GrupoExame } from './GrupoExame';

import { PessoaProfissional } from './PessoaProfissional';

export interface AtendimentoMedicoExame {

  atendimentoMedicoExameId?: string;
  AtendimentoMedico?: AtendimentoMedico;
  GrupoExame?: GrupoExame;
  exameId?: string;
  observacaoExame?: string;
  dataExame?: Date;
  Profissional?: PessoaProfissional;
  ativo?: boolean;
}

