import { Especialidade } from './Especialidade';
import { Prioridade } from './Prioridade';
import { PessoaPaciente } from './PessoaPaciente';

export interface Acolhimento {

  acolhimentoId?: string;
  Pessoa?: PessoaPaciente;
  Especialidade?: Especialidade;
  Prioridade?: Prioridade;
  risco?: boolean;
  peso?: number;
  altura?: number;
  imc?: string;
  temperatura?: number;
  PressaoArterialSistolica?: number;
  PressaoArterialDiastolica?: number;
  pulso?: number;
  frequenciaRespiratoria?: number;
  saturacao?: number;
  ativo?: boolean;
}
