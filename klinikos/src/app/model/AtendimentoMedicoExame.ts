import { AtendimentoMedico } from './AtendimentoMedico';
import { GrupoExame } from './GrupoExame';
import { Exame } from './Exame';
import { PessoaProfissional } from './PessoaProfissional';

export interface AtendimentoMedicoExame {

  atendimentoMedicoExameId?: string;
  AtendimentoMedico?: AtendimentoMedico;
  GrupoExame?: GrupoExame;
  Exame?: Exame;
  observacaoExame?: string;
  dataExame?: Date;
  Profissional?: PessoaProfissional;
  ativo?: boolean;
}

