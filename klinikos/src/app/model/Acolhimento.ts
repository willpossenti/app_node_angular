import { Especialidade } from './Especialidade';
import { Preferencial } from './Preferencial';
import { PessoaPaciente } from './PessoaPaciente';

export interface Acolhimento {

  acolhimentoId?: string;
  PessoaPaciente?: PessoaPaciente;
  especialidadeId?: string;
  preferencialId?: string;
  risco?: boolean;
  peso?: string;
  altura?: string;
  imc?: string;
  temperatura?: string;
  PressaoArterialSistolica?: string;
  PressaoArterialDiastolica?: string;
  pulso?: string;
  frequenciaRespiratoria?: string;
  saturacao?: string;
  ativo?: boolean;
}
