
import { Pessoa } from "./Pessoa";
import { TipoProfissional } from './TipoProfissional';
import { OrgaoEmissor } from './OrgaoEmissor';


export interface PessoaProfissional extends Pessoa {

  codigoLogin?: string;
  login?: string;
}