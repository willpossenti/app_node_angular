
import { PessoaPaciente } from './PessoaPaciente';
import { PessoaProfissional } from './PessoaProfissional';

export interface RegistroBoletim {

  registroBoletimId?: string;
  numeroBoletim?: string;
  dataBoletim?: Date;
  PessoaPaciente?: PessoaPaciente;
  PessoaProfissional?: PessoaProfissional;
  tipoChegadaId?: string;
  especialidadeId?: string;
  nomeInformante?: string;
  enderecoInformante?: string;
  telefoneInformante?: string;
  grauParentesco?: string;
  ativo?: boolean;
}
