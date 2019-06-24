import { AtendimentoMedico } from './AtendimentoMedico';

export interface AtendimentoMedicoAlergia {

  atendimentoMedicoAlergiaId?: string;
  AtendimentoMedico?: AtendimentoMedico;
  alergiaId?: string;
  tipoAlergiaId?: string;
  localizacaoAlergiaId?: string;
  reacaoAlergiaId?: string;
  severidadeAlergiaId?: string;
  dataSintomas?: Date;
  alergiaSituacao?: boolean;
  ativo?: boolean;
}

