
import { ClassificacaoRiscoAlergia } from './ClassificacaoRiscoAlergia';
import { PessoaProfissional } from './PessoaProfissional';
import { PessoaPaciente } from './PessoaPaciente';


export interface ClassificacaoRisco {

  classificacaoRiscoId?: string;
  dataClassificaoRisco?: Date;
  PessoaPaciente?: PessoaPaciente;
  PessoaProfissional?: PessoaProfissional;
  descricaoQueixa?: string;
  causaExternaId?: string;
  nivelConscienciaId?: string;
  escalaDorId?: string;
  sutura?: boolean;
  peso?: string;
  altura?: string;
  imc?: string;
  temperatura?: string;
  pressaoArterialDiastolica?: string;
  pressaoArterialSistolica?: string;
  pulso?: string;
  frequenciaRespiratoria?: string;
  saturacao?: string;
  cardiopata?: boolean;
  diabete?: boolean;
  hipertensao?: boolean;
  outros?: boolean;
  observacaoOutros?: string;
  renalCronico?: boolean;
  respiratoriaCronica?: boolean;
  observacaoRespiratoriaCronica?: string;
  avaliacao?: string;
  tipoChegadaId?: string;
  especialidadeId?: string;
  riscoId?: string;
  ClassificacoesRiscoAlergia?: Array<ClassificacaoRiscoAlergia>;
  aberturaOcularId?: string;
  respostaVerbalId?: string;
  respostaMotoraId?: string;
  status?: string;
  procedencia?: string;
  tipoOcorrenciaId?: string;
  dataOcorrencia?: Date;
  pab?: boolean;
  paf?: boolean;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  estadoId?: string;
  cidadeId?: string;
  ativo?: boolean;
}

