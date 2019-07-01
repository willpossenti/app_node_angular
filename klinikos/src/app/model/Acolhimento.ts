import { Especialidade } from './Especialidade';
import { Preferencial } from './Preferencial';
import { PessoaPaciente } from './PessoaPaciente';
import { PessoaProfissional } from './PessoaProfissional';

export interface Acolhimento {

  acolhimentoId?: string;
  dataAcolhimento?: Date;
  PessoaPaciente?: PessoaPaciente;
  PessoaProfissional?: PessoaProfissional;
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
