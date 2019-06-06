import { ClassificacaoRisco } from './ClassificacaoRisco';
import { Alergia } from './Alergia';
import { TipoAlergia } from './TipoAlergia';
import { LocalizacaoAlergia } from './LocalizacaoAlergia';
import { ReacaoAlergia } from './ReacaoAlergia';
import { SeveridadeAlergia } from './SeveridadeAlergia';

export interface ClassificacaoRiscoAlergia {

  classificacaoRiscoAlergiaId?: string;
  ClassificacaoRisco?: ClassificacaoRisco;
  alergiaId?: string;
  tipoAlergiaId?: string;
  localizacaoAlergiaId?: string;
  reacaoAlergiaId?: string;
  severidadeAlergiaId?: string;
  dataSintomas?: Date;
  alergiaSituacao?: boolean;
  ativo?: boolean;
}

