import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND_URL} from "../../../environments/environment";

const GROUPES_COURS_URL = BACKEND_URL + "groupes_cours/";
const GROUPES_COURS_KEY = "GROUPES_COURS";

@Injectable({
  providedIn: 'root'
})
export class GroupesCoursService {

  groupes: any = [];

  constructor(private http: HttpClient) { }

  createGroupsForOneClasse(groupes: any)
  {
    return new Promise(((resolve, reject) => {
      this.http.post(GROUPES_COURS_URL, groupes)
        .subscribe(
          res =>{
            this.groupes = res;
            resolve(res);
          },
          err =>{
            reject(err);
          }
        )
    }));
  }

  saveGroupsToLocalStorage()
  {
    localStorage.setItem(GROUPES_COURS_KEY, JSON.stringify(this.groupes));
  }

  loadGroupsFromLocalStorage()
  {
    return new Promise(((resolve, reject) => {
      setTimeout(() =>{
        let result = localStorage.getItem(GROUPES_COURS_KEY);
        if(result === null)
        {
          resolve([]);
        }
        else
        {
          this.groupes = JSON.parse(result);
          resolve(this.groupes);
        }
      }, 400);
    }));
  }

  getGroups()
  {
    return this.groupes;
  }
}
