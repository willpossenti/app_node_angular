import { GrupoMedicamento } from './GrupoMedicamento';

export interface Medicamento {

  medicamentoId?: string;
  GrupoMedicamento?: GrupoMedicamento;
  nome?: string;
  ativo?: boolean;
}

