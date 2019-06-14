import { GrupoExame } from './GrupoExame';


export interface Exame {

  exameId?: string;
  GrupoExame?: GrupoExame;
  nome?: string;
  ativo?: boolean;
}

