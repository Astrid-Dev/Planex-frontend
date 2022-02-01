import { Injectable } from '@angular/core';
import {BACKEND_URL} from "../../../environments/environment";
import {Enseignant} from "../../models/Enseignant";
import { HttpClient } from "@angular/common/http";

const ENSEIGNANT_URL = BACKEND_URL + "enseignants/";

@Injectable({
  providedIn: 'root'
})

export class EnseignantService {

  constructor(private http: HttpClient) { }

  getAllEnseignants(){
    return new Promise((resolve, reject) =>{
        this.http.get(ENSEIGNANT_URL)
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

  createNewEnseignant(data: Enseignant){
    return new Promise<any>((resolve, reject) => {
      this.http.post(ENSEIGNANT_URL, data)
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
}
