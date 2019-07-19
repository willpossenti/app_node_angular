
import { FilaRegistro } from './FilaRegistro';
import { PessoaProfissional } from './PessoaProfissional';

export interface FilaRegistroEvento {

  filaRegistroEventosId?: string;
  dataFilaRegistroEvento?: Date;
  filaRegistro?: FilaRegistro;
  PessoaProfissional?: PessoaProfissional
  eventoId?: string;
  ativo?: boolean;

}

