import {Injectable} from '@angular/core';
import {BACKEND_URL} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Filiere} from "../../models/Filiere";

const FILIERE_URL = BACKEND_URL + "filieres/";

@Injectable({
  providedIn: 'root'
})
export class FiliereService{

  constructor(private http: HttpClient) { }

  getAllFilieres(){
    return new Promise<Filiere[] | Object>((resolve, reject) =>{
      this.http.get(FILIERE_URL)
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

  createNewFiliere(data: Filiere){
    return new Promise((resolve, reject) => {
      this.http.post(FILIERE_URL, data)
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

  updateFiliere(id: number, data: Filiere){
    return new Promise((resolve, reject) =>{
      this.http.put(FILIERE_URL+"/"+id, data)
        .subscribe(
          res =>{
            resolve(res);
          },
          err =>{
            reject(err);
          }
        )
    })
  }
}
