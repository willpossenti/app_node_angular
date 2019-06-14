import { PessoaProfissional } from './PessoaProfissional';


export interface ModeloPrescricaoReceita {

  modeloPrescricaoReceitaId?: string;
  nome?: string;
  PessoaProfissional?: PessoaProfissional;
  ativo?: boolean;
}

