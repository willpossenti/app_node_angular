import { GrupoMedicamento } from './GrupoMedicamento';
import { Medicamento } from './Medicamento';
import { ViaAdministracaoMedicamento } from './ViaAdministracaoMedicamento';
import { UnidadeMedicamento } from './UnidadeMedicamento';
import { IntervaloMedicamento } from './IntervaloMedicamento';

export interface AtendimentoMedicoPrescricaoReceita {

  AtendimentoMedicoPrescricaoReceitaId?: string;
  GrupoMedicamento?: GrupoMedicamento;
  Medicamento?: Medicamento;
  dose?: string;
  ViaAdministracaoMedicamento?: ViaAdministracaoMedicamento;
  UnidadeMedicamento?: UnidadeMedicamento;
  IntervaloMedicamento?: IntervaloMedicamento;
  observacao?: string;
  prescricao?: boolean;
  receita?: boolean;
  ativo?: boolean;
}

