import { ModeloPrescricaoReceita } from './ModeloPrescricaoReceita';
import { GrupoMedicamento } from './GrupoMedicamento';
import { Medicamento } from './Medicamento';
import { ViaAdministracaoMedicamento } from './ViaAdministracaoMedicamento';
import { UnidadeMedicamento } from './UnidadeMedicamento';
import { IntervaloMedicamento } from './IntervaloMedicamento';

export interface ModeloPrescricaoReceitaDetalhe {

  modeloPrescricaoReceitaDetalheId?: string;
  ModeloPrescricaoReceita?: ModeloPrescricaoReceita;
  GrupoMedicamento?: GrupoMedicamento;
  Medicamento?: Medicamento;
  ViaAdministracaoMedicamento?: ViaAdministracaoMedicamento;
  UnidadeMedicamento?: UnidadeMedicamento;
  IntervaloMedicamento?: IntervaloMedicamento;
  observacao?: string;
  prescricao?: boolean;
  receita?: boolean;
  ativo?: boolean;
}

