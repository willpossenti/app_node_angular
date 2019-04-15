
import { Pessoa } from "./Pessoa";


export interface PessoaPaciente extends Pessoa{

  numeroProntuario?: string;
  descricaoNaoIdentificado?: string;
  recemNascido?: boolean;
}
