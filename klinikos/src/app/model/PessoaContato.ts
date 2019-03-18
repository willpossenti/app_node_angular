
import { Pessoa } from "./Pessoa";


export interface PessoaContato {

  pessoaContatoId?: string;
  Pessoa?: Pessoa;
  telefone?: string;
  celular?: string;
  email?: string;
  ativo?: boolean;
}
