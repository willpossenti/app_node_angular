import { GrupoMedicamentoDetalhe } from './GrupoMedicamentoDetalhe';
import { Medicamento } from './Medicamento';

export interface GrupoMedicamento {

  grupoMedicamentoId?: string;
  GrupoMedicamentoDetalhe: GrupoMedicamentoDetalhe;
  Medicamento?: Medicamento;
  ativo?: boolean;
}

