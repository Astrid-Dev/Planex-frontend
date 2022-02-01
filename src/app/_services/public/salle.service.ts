import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Enseignant} from "../../models/Enseignant";
import {BACKEND_URL} from "../../../environments/environment";

const SALLE_URL = BACKEND_URL + "salles/";

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  constructor(private http: HttpClient) { }

  getAllSalles(){
    return new Promise<Enseignant[] | Object>((resolve, reject) =>{
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
}
