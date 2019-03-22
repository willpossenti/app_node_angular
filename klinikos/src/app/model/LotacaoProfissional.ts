import { TipoProfissional } from './TipoProfissional';
import { OrgaoEmissor } from './OrgaoEmissor';
import { PessoaProfissional } from './PessoaProfissional';

export interface LotacaoProfissional {

  lotacaoProfissionalId?: string;
  Pessoa?: PessoaProfissional;
  TipoProfissional?: TipoProfissional;
  numeroConselho?: string;
  ufProfissional?: string;
  OrgaoEmissorProfissional?: OrgaoEmissor;
  coordenador?: boolean;
  ativo?: boolean;

}
