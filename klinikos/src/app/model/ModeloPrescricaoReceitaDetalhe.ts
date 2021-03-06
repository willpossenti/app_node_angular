import { ModeloPrescricaoReceita } from './ModeloPrescricaoReceita';
import { GrupoMedicamento } from './GrupoMedicamento';

export interface ModeloPrescricaoReceitaDetalhe {

  modeloPrescricaoReceitaDetalheId?: string;
  ModeloPrescricaoReceita?: ModeloPrescricaoReceita;
  GrupoMedicamento?: GrupoMedicamento;
  medicamentoId?: string;
  viaAdministracaoMedicamentoId?: string;
  unidadeMedicamentoId?: string;
  intervaloMedicamentoId?: string;
  observacao?: string;
  prescricao?: boolean;
  receita?: boolean;
  ativo?: boolean;
}

