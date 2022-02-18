import { Injectable } from '@angular/core';
import {BACKEND_URL} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

const JOUR_URL = BACKEND_URL + "jours/";
const JOURS_KEY = "jours";

@Injectable({
  providedIn: 'root'
})
export class JoursService {

  constructor(private http: HttpClient) { }

  getAllJours()
  {
    return new Promise((resolve, reject) =>{
      setTimeout(() =>{
        const jours: string | null = localStorage.getItem(JOURS_KEY);
        if(jours === null)
        {
          this.http.get(JOUR_URL)
            .subscribe(
              res =>{
                localStorage.setItem(JOURS_KEY, JSON.stringify(res));
                resolve(res);
            }, err =>{
                reject(err);
            })
        }
        else
        {
          resolve(JSON.parse(jours));
        }
      }, 300)
    })
  }
}
