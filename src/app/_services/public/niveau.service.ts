import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND_URL} from "../../../environments/environment";
import {Niveau} from "../../models/Niveau";

const NIVEAU_URL = BACKEND_URL + "niveaux/";

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  constructor(private http: HttpClient) { }

  getAllNiveaux(){
    return new Promise<Niveau[] | Object>((resolve, reject) =>{
      this.http.get(NIVEAU_URL)
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

  createNewNiveau(data: Niveau){
    return new Promise((resolve, reject) => {
      this.http.post(NIVEAU_URL, data)
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
