
import { Pessoa } from "./Pessoa";
import { LotacaoProfissional } from './LotacaoProfissional';


export interface PessoaProfissional extends Pessoa {

 
  lotacoesProfissional?: Array<LotacaoProfissional>;



}
