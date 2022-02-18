import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND_URL} from "../../../environments/environment";

const HORAIRES_URL = BACKEND_URL + "horaires/";
const HORAIRES_KEY = "horaires";

@Injectable({
  providedIn: 'root'
})
export class HorairesService {

  constructor(private http: HttpClient) { }

  getAllHoraires()
  {
    return new Promise((resolve, reject) =>{
      setTimeout(() =>{
        const horaires: string | null = localStorage.getItem(HORAIRES_KEY);
        if(horaires === null)
        {
          this.http.get(HORAIRES_URL)
            .subscribe(
              res =>{
                localStorage.setItem(HORAIRES_KEY, JSON.stringify(res));
                resolve(res);
              }, err =>{
                reject(err);
              })
        }
        else
        {
          resolve(JSON.parse(horaires));
        }
      }, 300)
    })
  }
}
