
import { GrupoExame } from './GrupoExame';
import { Exame } from './Exame';

export interface GrupoExameDetalhe {

  grupoExameDetalheId?: string;
  GrupoExame?: GrupoExame
  Exame?: Exame
  ativo?: boolean;

}
  