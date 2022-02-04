import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Enseignant} from "../../models/Enseignant";
import {BACKEND_URL} from "../../../environments/environment";
import { Salle } from 'src/app/models/Salle';

const SALLE_URL = BACKEND_URL + "salles/";

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  constructor(private http: HttpClient) { }

  getAllSalles(){
    return new Promise<Salle[] | Object>((resolve, reject) =>{
      this.http.get(SALLE_URL)
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

  createNewNiveau(data: Salle){
    return new Promise((resolve, reject) => {
      this.http.post(SALLE_URL, data)
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
