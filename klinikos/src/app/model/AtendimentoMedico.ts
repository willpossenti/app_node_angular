import { AtendimentoMedicoAlergia } from './AtendimentoMedicoAlergia';
import { AtendimentoMedicoExame } from './AtendimentoMedicoExame';
import { ModeloPrescricaoReceitaDetalhe } from './ModeloPrescricaoReceitaDetalhe';
import { AtendimentoMedicoPrescricaoReceitaDetalhe } from './AtendimentoMedicoPrescricaoReceitaDetalhe';
import { ModeloAtestado } from './ModeloAtestado';

export interface AtendimentoMedico {

  atendimentoMedicoId?: string;
  anamnese?: string;
  AtendimentoMedicoAlergia?: Array<AtendimentoMedicoAlergia>;
  peso?: string;
  altura?: string;
  imc?: string;
  temperatura?: string;
  pressaoArterialDiastolica?: string;
  pressaoArterialSistolica?: string;
  pulso?: string;
  frequenciaRespiratoria?: string;
  saturacao?: string;
  campoObservacao?: string;
  suspeitaDiagnostico?: string;
  CIDId?: string;
  CapituloCIDId?: string;
  Prescricao?: boolean;
  Receita?: boolean;
  AtendimentoMedicoExame?: Array<AtendimentoMedicoExame>;
  ModeloPrescricaoReceitaDetalhe?: ModeloPrescricaoReceitaDetalhe;
  AtendimentoMedicoPrescricaoReceitaDetalhe?: Array<AtendimentoMedicoPrescricaoReceitaDetalhe>;
  ModeloAtestado?: ModeloAtestado;
  atestado?: string;
  validadeatestado?: string;
  tipoSaida?: string;
  dataSaida?: Date;
  ativo?: boolean;
}

