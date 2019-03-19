import { Pessoa } from './Pessoa';
import { TipoProfissional } from './TipoProfissional';

export interface LotacaoProfissional {

  lotacaoProfissionalId?: string;
  Pessoa?: Pessoa;
  TipoProfissional?: TipoProfissional;
  coordenador?: boolean;
  ativo?: boolean;


}
