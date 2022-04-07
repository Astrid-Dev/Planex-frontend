import { Injectable } from '@angular/core';
import {BACKEND_URL} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Classe} from "../../models/Classe";
import {FiliereService} from "./filiere.service";
import {NiveauService} from "./niveau.service";
import {Filiere} from "../../models/Filiere";
import {Niveau} from "../../models/Niveau";
import {UE} from "../../models/UE";
import {Etudiant} from "../../models/Etudiant";

const CLASSE_URL = BACKEND_URL + "classes/";
const CLASSE_WITH_ETD_URL = BACKEND_URL + "classes/withetudiants";

export type Attribution_Result = {has_attributed: boolean, result: Classe[] | UE[] | Etudiant[], bads: Classe[]}

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  public filieres: any = [];
  public niveaux: any = [];

  constructor(
    private http: HttpClient,
    private filiereService: FiliereService,
    private niveauService: NiveauService,
  ) { }

  getAllClasses(){
    return new Promise<Classe[] | Object>((resolve, reject) =>{
      this.http.get(CLASSE_URL)
        .subscribe(
          res =>{
            resolve(res);
          },
          err =>{
            reject(err);
          }
        )
    });
  }

  getAllClassesWithEtudiants(){
    return new Promise<Classe[] | Object>((resolve, reject) =>{
      this.http.get(CLASSE_WITH_ETD_URL)
        .subscribe(
          res =>{
            resolve(res);
          },
          err =>{
            reject(err);
          }
        )
    });
  }

  createNewClasse(data: Classe){
    return new Promise((resolve, reject) => {
      this.http.post(CLASSE_URL, data)
        .subscribe(
          res =>{
            resolve(res);
          },
          err =>{
            reject(err);
          }
        )
    });
  }

  updateOneClasse(data: any, id: number){
    return new Promise(((resolve, reject) => {
      this.http.put(CLASSE_URL+""+id+"/", data)
        .subscribe(
          res =>{
            resolve(res);
          },
          err =>{
            reject(err);
          }
        )
    }));
  }

  canUploadClassesFile()
  {
    return new Promise<boolean>((resolve, reject) => {
      this.filiereService.getAllFilieres()
        .then(
          (filieres) =>{
            this.filieres = filieres;
            console.log(filieres);
            this.niveauService.getAllNiveaux()
              .then(
                (niveaux) =>{
                  this.niveaux = niveaux;
                  console.log(niveaux);
                  if((Array.isArray(niveaux) && niveaux.length > 0) && (Array.isArray(filieres) && filieres.length > 0))
                  {
                    resolve(true);
                  }
                  else
                  {
                    resolve(false);
                  }
                }
              )
              .catch((err) =>{
                reject(err);
              })
          }
        )
        .catch((err) =>{
          reject(err);
        });
    });
  }

  attributeFiliereAndNiveauToClasse(classes: Classe[]):Attribution_Result{
    let has_attributed = true;
    let result: Classe[] = [];
    let bads: any[] = [];

    for(let i = 0; i < classes.length; i++)
    {
      const filiere = this.getFiliereByCode(classes[i].filiere.toString());
      const niveau = this.getNiveauByCode(classes[i].niveau.toString());
      if(filiere === null || niveau === null)
      {
        has_attributed = false;
        result.push(classes[i]);
        bads.push(
          {
            ...classes[i],
            index : i,
            filiere_is_bad: (filiere === null),
            niveau_is_bad: (niveau === null),
            default_filiere_code: (filiere === null ? classes[i].filiere : filiere.code),
            default_niveau_code: (niveau === null ? classes[i].niveau : niveau.code)
          }
        );
      }
      else
      {
        result.push(
          {
            ...classes[i],
            filiereId: filiere.id,
            niveauId: niveau.id
          }
        );
      }
    }

    return {has_attributed: has_attributed, result: result, bads: bads};
  }

  getFiliereByCode(filiereCode: string): Filiere
  {
    let result = null;
    for(let i = 0; i < this.filieres.length; i++)
    {
      if(filiereCode === this.filieres[i].code)
      {
        result = this.filieres[i];
        break;
      }
    }

    return result;
  }

  getNiveauByCode(niveauCode: string): Niveau
  {
    let result = null;
    for(let i = 0; i < this.niveaux.length; i++)
    {
      if(niveauCode === this.niveaux[i].code)
      {
        result = this.niveaux[i];
        break;
      }
    }

    return result;
  }
}
