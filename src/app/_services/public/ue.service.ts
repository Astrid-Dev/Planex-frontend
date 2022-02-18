import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND_URL} from "../../../environments/environment";
import {UE} from "../../models/UE";
import {Attribution_Result, ClasseService} from "./classe.service";
import {Classe} from "../../models/Classe";

const UE_URL = BACKEND_URL + "ues/";

@Injectable({
  providedIn: 'root'
})
export class UeService {

  classes : any = [];

  constructor(private http: HttpClient, private classeService: ClasseService) { }

  getAllUEs(){
    return new Promise<UE[] | Object>((resolve, reject) =>{
      this.http.get(UE_URL)
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

  createNewUE(data: UE){
    return new Promise((resolve, reject) => {
      this.http.post(UE_URL, data)
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

  canUploadUEsFile()
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

  attributeClasseToUE(ues: UE[]): Attribution_Result{
    let has_attributed = true;
    let result: UE[] = [];
    let bads: any[] = [];

    for(let i = 0; i < ues.length; i++)
    {
      const classe = this.getClasseByCode(ues[i].classe.toString());
      if(classe === null)
      {
        has_attributed = false;
        result.push(ues[i]);
        bads.push(
          {
            ...ues[i],
            index : i,
            classe_is_bad: true,
            default_classe_code: ues[i].classe
          }
        );
      }
      else
      {
        result.push(
          {
            ...ues[i],
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
