import { GrupoMedicamento } from './GrupoMedicamento';


export interface AtendimentoMedicoPrescricaoReceitaDetalhe {

  AtendimentoMedicoPrescricaoReceitaDetalheId?: string;
  GrupoMedicamento?: GrupoMedicamento;
  medicamentoId?: string;
  dose?: string;
  viaAdministracaoMedicamentoId?: string;
  unidadeMedicamentoId?: string;
  intervaloMedicamentoId?: string;
  observacao?: string;
  prescricao?: boolean;
  receita?: boolean;
  ativo?: boolean;
}

