import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Enseignant} from "../../models/Enseignant";
import {BACKEND_URL} from "../../../environments/environment";

const UE_URL = BACKEND_URL + "ues/";

@Injectable({
  providedIn: 'root'
})
export class UeService {

  constructor(private http: HttpClient) { }

  getAllUEs(){
    return new Promise<Enseignant[] | Object>((resolve, reject) =>{
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
}
