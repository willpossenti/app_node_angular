import { TipoProfissional } from './TipoProfissional';
import { OrgaoEmissor } from './OrgaoEmissor';
import { PessoaProfissional } from './PessoaProfissional';

export interface LotacaoProfissional {

  lotacaoProfissionalId?: string;
  Pessoa?: PessoaProfissional;
  tipoProfissionalId?: string;
  numeroConselho?: string;
  ufProfissional?: string;
  orgaoEmissorProfissionalId?: string;
  coordenador?: boolean;
  ativo?: boolean;

}
