import { Estado } from "./Estado";

export interface Cidade {

  cidadeId: string;
  nome: string;
  Estado: Estado;
  ativo: boolean;


}
