import { AtendimentoMedico } from './AtendimentoMedico';
import { GrupoExame } from './GrupoExame';
import { PessoaProfissional } from './PessoaProfissional';
import { GrupoExameDetalhe } from './GrupoExameDetalhe';
import { Exame } from './Exame';

export interface AtendimentoMedicoExame {

  atendimentoMedicoExameId?: string;
  AtendimentoMedico?: AtendimentoMedico;
  // GrupoExameDetalhe?: GrupoExameDetalhe;
  GrupoExame?: GrupoExame;
  Exame?: Exame;
  observacaoExame?: string;
  dataExame?: Date;
  Profissional?: PessoaProfissional;
  ativo?: boolean;
}

