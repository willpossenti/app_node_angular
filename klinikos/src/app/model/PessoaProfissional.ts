
import { Pessoa } from "./Pessoa";
import { TipoProfissional } from './TipoProfissional';
import { OrgaoEmissor } from './OrgaoEmissor';


export interface PessoaProfissional extends Pessoa {

  TipoProfissional?: TipoProfissional;
  numeroConselho?: string;
  ufProfissional?: string;
  OrgaoEmissorProfissional?: OrgaoEmissor;
  codigoLogin?: string;
  login?: string;
}
