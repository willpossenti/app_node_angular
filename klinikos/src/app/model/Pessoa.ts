import { Cidade } from "./Cidade";
import { Estado } from './Estado';
import { Ocupacao } from './Ocupacao';
import { Pais } from './Pais';
import { TipoCertidao } from './TipoCertidao';
import { Escolaridade } from './Escolaridade';
import { SituacaoFamiliarConjugal } from './SituacaoFamiliarConjugal';
import { Raca } from "./Raca";
import { Etnia } from "./Etnia";
import { Justificativa } from "./Justificativa";
import { Nacionalidade } from "./Nacionalidade";
import { OrgaoEmissor } from "./OrgaoEmissor";
import { LotacaoProfissional } from './LotacaoProfissional';


export interface Pessoa  {

  pessoaId?: string;
  nomeCompleto?: string;
  nomeSocial?: string;
  sexo?: string;
  nascimento?: Date;
  idadeAparente?: string;
  Raca?: Raca;
  Etnia?: Etnia;
  nomepai?: string;
  nomemae?: string;
  cpf?: string;
  Justificativa?: Justificativa;
  Nacionalidade?: Nacionalidade;
  Naturalidade?: Cidade;
  OrgaoEmissor?: OrgaoEmissor;
  identidade?: string;
  uf?: string;
  emissao?: Date;
  cns?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  Estado?: Estado;
  Cidade?: Cidade;
  contato1?: string;
  contato2?: string;
  contato3?: string;
  email?: string;
  pisPasep?: string;
  Ocupacao?: Ocupacao;
  PaisOrigem?: Pais;
  dataEntradaPis?: Date;
  TipoCertidao?: TipoCertidao;
  nomeCartorio?: string;
  numeroLivro?: string;
  numeroFolha?: string;
  numeroTermo?: string;
  dataEmissaoCertidao?: Date;
  numeroCtps?: string;
  serieCtps?: string;
  ufCtps?: string;
  dataEmissaoCtps?: Date;
  tituloEleitor?: string;
  zona?: string;
  secao?: string;
  frequentaeEscola?: boolean;
  Escolaridade?: Escolaridade;
  SituacaoFamiliarConjugal?: SituacaoFamiliarConjugal;
  pacienteProfissional?: boolean;
  codigoLogin?: string;
  login?: string;
  senha?: string;
  ativo?: boolean;


}
