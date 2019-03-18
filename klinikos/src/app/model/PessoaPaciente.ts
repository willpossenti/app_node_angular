import { Raca } from "./Raca";
import { Etnia } from "./Etnia";
import { Justificativa } from "./Justificativa";
import { Nacionalidade } from "./Nacionalidade";
import { Cidade } from "./Cidade";
import { OrgaoEmissor } from "./OrgaoEmissor";
import { Pessoa } from "./Pessoa";


export interface PessoaPaciente extends Pessoa {

  nomesocial?: string;
  numeroprontuario?: string;
  recemnascido?: boolean;
  cns?: string;
  nascimento?: Date;
  descricaonaoidentificado?: string;
  idadeaparente?: string;
  //obito: Date;
  Raca?: Raca;
  Etnia?: Etnia;
  nomepai?: string;
  nomemae?: string;
  Justificativa?: Justificativa;
  Nacionalidade?: Nacionalidade;
  Naturalidade?: Cidade;
  OrgaoEmissor?: OrgaoEmissor;
  identidade?: string;
  uf?: string;
  cpf?: string;
  emissao?: Date;
}
