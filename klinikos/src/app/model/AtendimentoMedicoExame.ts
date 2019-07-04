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
  exameId?: string;
  observacaoExame?: string;
  dataExame?: Date;
  Profissional?: PessoaProfissional;
  ativo?: boolean;
}

