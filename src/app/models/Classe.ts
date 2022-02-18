import {Filiere} from "./Filiere";
import {Niveau} from "./Niveau";

export interface Classe{
  id: number,
  code: string,
  intitule: string,
  niveau: string | Niveau,
  filiere: string | Filiere,
  niveauId: number,
  filiereId: number,
  est_divisee: boolean,
}

export const defaultClasse: Classe = {
  id: -1,
  code: "",
  intitule: "",
  niveau: "",
  filiere: "",
  niveauId: -1,
  filiereId: -1,
  est_divisee: false
}
