
import { PessoaProfissional } from './PessoaProfissional';
import { FilaAtendimento } from './FilaAtendimento';

export interface FilaAtendimentoEvento {

  filaAtendimentoEventoId?: string;
  dataFilaAtendimentoEvento?: Date;
  FilaAtendimento?: FilaAtendimento;
  PessoaProfissional?: PessoaProfissional;
  eventoId?: string;
  ativo?: boolean;

}

