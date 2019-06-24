import { AtendimentoMedico } from './AtendimentoMedico';



export interface AtendimentoMedicoPrescricaoReceita {
    atendimentoMedicoPrescricaoReceitaId?: string;
    AtendimentoMedico?: AtendimentoMedico;
    dataHora?: Date;
    ativo?: boolean;
}