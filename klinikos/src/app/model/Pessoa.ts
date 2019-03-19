import { Cidade } from "./Cidade";
import { Estado } from './Estado';
import { Ocupacao } from './Ocupacao';
import { Pais } from './Pais';
import { TipoCertidao } from './TipoCertidao';
import { Escolaridade } from './Escolaridade';
import { SituacaoFamiliarConjugal } from './SituacaoFamiliarConjugal';


export interface Pessoa  {

  pessoaId?: string;
  nomecompleto?: string;
  sexo?: string;
  cpf?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  Estado?: Estado;
  Cidade?: Cidade;
  pispasep?: string;
  Ocupacao?: Ocupacao;
  PaisOrigem?: Pais;
  dataentradapis?: Date;
  TipoCertidao?: TipoCertidao;
  nomecartorio?: string;
  numerolivro?: string;
  numerofolha?: string;
  numerotermo?: string;
  dataemissaocertidao?: Date;
  numeroctps?: string;
  seriectps?: string;
  ufctps?: string;
  dataemissaoctps?: Date;
  tituloeleitor?: string;
  zona?: string;
  secao?: string;
  frequentaescola?: boolean;
  Escolaridade?: Escolaridade;
  SituacaoFamiliarConjugal?: SituacaoFamiliarConjugal;
  ativo?: boolean;


}
