import { Pessoa } from './Pessoa';
import { TipoProfissional } from './TipoProfissional';
import { OrgaoEmissor } from './OrgaoEmissor';

export interface LotacaoProfissional {

  lotacaoProfissionalId?: string;
  Pessoa?: Pessoa;
  TipoProfissional?: TipoProfissional;
  numeroConselho?: string;
  ufProfissional?: string;
  OrgaoEmissorProfissional?: OrgaoEmissor;
  coordenador?: boolean;
  ativo?: boolean;

}
