

import { FilaClassificacao } from './FilaClassificacao';
import { PessoaProfissional } from './PessoaProfissional';

export interface FilaClassificacaoEvento {

  filaClassificacaoEventoId?: string;
  dataFilaClassificacaoEvento?: Date;
  FilaClassificacao?: FilaClassificacao;
  PessoaProfissional?: PessoaProfissional;
  eventoId?: string;
  ativo?: boolean;

}

