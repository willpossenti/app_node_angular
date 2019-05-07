import { Pessoa } from './Pessoa';
import { TipoChegada } from './TipoChegada';
import { Especialidade } from './Especialidade';
import { TipoOcorrencia } from './TipoOcorrencia';
import { Estado } from './Estado';
import { Cidade } from './Cidade';

export interface RegistroBoletim {

  registroBoletimId?: string;
  numeroBoletim?: string;
  dataBoletim?: Date;
  Pessoa?: Pessoa;
  TipoChegada?: TipoChegada;
  Especialidade?: Especialidade;
  nomeInformante?: string;
  enderecoInformante?: string;
  telefoneInformante?: string;
  grauParentesco?: string;
  ativo?: boolean;
}