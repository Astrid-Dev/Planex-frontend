import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Attribution_Result, ClasseService} from "./classe.service";
import {UE} from "../../models/UE";
import {BACKEND_URL} from "../../../environments/environment";
import {Etudiant} from "../../models/Etudiant";

const ETUDIANT_URL = BACKEND_URL + "etudiants";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {


  classes : any = [];

  constructor(private classeService: ClasseService, private http: HttpClient) { }

  getAllEtudiants(){
    return new Promise<Etudiant[] | Object>((resolve, reject) =>{
      this.http.get(ETUDIANT_URL)
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

  createNewEtudiant(data: Etudiant){
    return new Promise((resolve, reject) => {
      this.http.post(ETUDIANT_URL, data)
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

  canUploadEtudiantsFile()
  {
    return new Promise<boolean>((resolve, reject) => {
      this.classeService.getAllClasses()
        .then(
          (classes) =>{
            this.classes = classes;
            if(Array.isArray(classes) && classes.length > 0)
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
    });
  }

  attributeClasseToEtudiant(etudiants: Etudiant[]): Attribution_Result{
    let has_attributed = true;
    let result:Etudiant[] = [];
    let bads: any[] = [];

    for(let i = 0; i < etudiants.length; i++)
    {
      const classe = this.getClasseByCode(etudiants[i].classe.toString());
      if(classe === null)
      {
        has_attributed = false;
        result.push(etudiants[i]);
        bads.push(
          {
            ...etudiants[i],
            index : i,
            classe_is_bad: true,
            default_classe_code: etudiants[i].classe
          }
        );
      }
      else
      {
        result.push(
          {
            ...etudiants[i],
            classeId: classe.id,
          }
        );
      }
    }

    return {has_attributed: has_attributed, result: result, bads: bads};
  }

  getClasseByCode(classeCode: string)
  {
    let result = null;
    for(let i = 0; i < this.classes.length; i++)
    {
      if(classeCode === this.classes[i].code)
      {
        result = this.classes[i];
        break;
      }
    }

    return result;
  }
}
