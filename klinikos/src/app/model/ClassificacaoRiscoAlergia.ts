import { ClassificacaoRisco } from './ClassificacaoRisco';
import { Alergia } from './Alergia';
import { TipoAlergia } from './TipoAlergia';
import { LocalizacaoAlergia } from './LocalizacaoAlergia';
import { ReacaoAlergia } from './ReacaoAlergia';
import { SeveridadeAlergia } from './SeveridadeAlergia';

export interface ClassificacaoRiscoAlergia {

  classificacaoRiscoAlergiaId?: string;
  ClassificacaoRisco?: ClassificacaoRisco;
  Alergia?: Alergia;
  TipoAlergia?: TipoAlergia;
  LocalizacaoAlergia?: LocalizacaoAlergia;
  ReacaoAlergia?: ReacaoAlergia;
  SeveridadeAlergia?: SeveridadeAlergia;
  dataSintomas?: Date;
  alergiaSituacao?: boolean;
  ativo?: boolean;
}

