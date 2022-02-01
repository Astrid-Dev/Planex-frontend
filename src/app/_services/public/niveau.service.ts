import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Enseignant} from "../../models/Enseignant";
import {BACKEND_URL} from "../../../environments/environment";

const NIVEAU_URL = BACKEND_URL + "niveaux/";

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  constructor(private http: HttpClient) { }

  getAllNiveaux(){
    return new Promise<Enseignant[] | Object>((resolve, reject) =>{
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
}
