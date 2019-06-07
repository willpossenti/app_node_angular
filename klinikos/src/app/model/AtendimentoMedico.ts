import { AtendimentoMedicoAlergia } from './AtendimentoMedicoAlergia';
import { CID } from './CID';
import { ConsultaCID } from './ConsultaCID';
import { AtendimentoMedicoExame } from './AtendimentoMedicoExame';
import { ModeloPrescricaoReceitaDetalhe } from './ModeloPrescricaoReceitaDetalhe';
import { AtendimentoMedicoPrescricaoReceita } from './AtendimentoMedicoPrescricaoReceita';
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
  CID?: CID;
  ConsultaCID?: ConsultaCID;
  Prescricao?: boolean;
  Receita?: boolean;
  AtendimentoMedicoExame?: Array<AtendimentoMedicoExame>;
  ModeloPrescricaoReceitaDetalhe?: ModeloPrescricaoReceitaDetalhe;
  AtendimentoMedicoPrescricaoReceita?: Array<AtendimentoMedicoPrescricaoReceita>;
  ModeloAtestado?: ModeloAtestado;
  atestado?: string;
  validadeatestado?: string;
  tipoSaida?: string;
  dataSaida?: Date;
  ativo?: boolean;
}

