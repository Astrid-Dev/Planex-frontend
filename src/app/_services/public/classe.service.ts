import { Injectable } from '@angular/core';
import {BACKEND_URL} from "../../../environments/environment";
import {Enseignant} from "../../models/Enseignant";
import {HttpClient} from "@angular/common/http";

const CLASSE_URL = BACKEND_URL + "classes/";

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  constructor(private http: HttpClient) { }

  getAllClasses(){
    return new Promise<Enseignant[] | Object>((resolve, reject) =>{
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
}
