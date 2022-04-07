import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {utf8Encode} from "@angular/compiler/src/util";
import {Enseignant} from "../../models/Enseignant";
import {Salle} from "../../models/Salle";
import {Filiere} from "../../models/Filiere";
import { Niveau } from 'src/app/models/Niveau';
import {Classe} from "../../models/Classe";
import {UE} from "../../models/UE";
import {Etudiant} from "../../models/Etudiant";

@Injectable({
  providedIn: 'root'
})
export class FilesInputsService {

  constructor(private http: HttpClient) { }

  read_file_with_url(url: string){
    return new Promise<string>((resolve, reject) =>
      this.http.get(url, {responseType: 'text'}).subscribe(
        (response) =>{
          resolve(response);
        },
        (error) =>{
          console.error(error);
          reject(error);
        }
      )
    );
  }

  convert_csv_file_to_url(file: File){
    return new Promise<string|ArrayBuffer>((resolve, reject) =>{
      const reader = new FileReader();
      reader.onloadend = function () {
        const url = reader.result;
        if(url === null)
        {
          reject(reader.error)
        }
        else{
          resolve(url);
        }
      };

      reader.onerror = function(){
        reject(reader.error);
      }
      reader.readAsDataURL(file);

    });

  }

  read_file_with_blob(file: File){
    return new Promise<string>((resolve, reject) =>{
      this.convert_csv_file_to_url(file)
        .then((res) =>{
          if(typeof res === "string")
          {
            const url = res;
            this.read_file_with_url(url)
              .then((res) =>{
                resolve(res);
              })
              .catch((error) =>{
                console.error(error);
                console.log(":: url ::");
                reject(error);
              });
          }
          else{
            reject(":: Erreur :: Impossible de lire le fichier !!!");
          }
        })
        .catch((error) =>{
          console.error(error);
          console.log(":: convert ::");
          reject(error);
        });
    })
  }

  extract_data_from_enseignants_file(data_string: string)
  {
    console.log(data_string);
    return new Promise<Enseignant[]>((resolve, reject) =>{
      const datas = data_string.split("\n");
      let result : Enseignant[] = [];
      let i = 1;

      const entete = datas[0];
      const number_of_lines = entete.split(",").length;
      if(number_of_lines !== 4 && number_of_lines !== 5)
      {
        reject("Fichier non conforme");
      }
      else
      {
        //the file doesn't contain the horodating column if number of lines = 4 and it contain the horodating column else

        while(i < datas.length)
        {
          const line = datas[i].split(",");

          let j = 0;

          if(number_of_lines === 5)
          {
            ++j;
          }

          const new_enseignant:Enseignant = {
            id: i,
            noms: line[j].replace("\r", "").replace("\t", "").trim().toUpperCase(),
            telephone: line[j+1].replace("\r", "").replace("\t", "").trim(),
            email: line[j+2].replace("\r", "").replace("\t", "").trim(),
            bureau: line[j+3].replace("\r", "").replace("\t", "").trim()
          }

          result.push(new_enseignant);
          ++i;
        }

        resolve(result);

      }

    });
  }

  extract_data_from_salles_file(data_string: string)
  {
    console.log(data_string);
    return new Promise<Salle[]>((resolve, reject) =>{
      const datas = data_string.split("\n");
      let result : Salle[] = [];
      let i = 1;

      const entete = datas[0];
      const number_of_lines = entete.split(",").length;
      if(number_of_lines !== 4 && number_of_lines !== 5)
      {
        reject("Fichier non conforme");
      }
      else
      {
        //the file doesn't contain the horodating column if number of lines = 4 and it contain the horodating column else

        while(i < datas.length)
        {
          const line = datas[i].split(",");

          let j = 0;

          if(number_of_lines === 5)
          {
            ++j;
          }

          const new_salle:Salle = {
            id: i,
            code: line[j].replace("\r", "").replace("\t", "").trim().toUpperCase(),
            capacite: parseInt(line[j+1].replace("\r", "").replace("\t", "").trim()),
            capacite_barr: parseInt(line[j+2].replace("\r", "").replace("\t", "").trim()),
            capacite_exam: parseInt(line[j+3].replace("\r", "").replace("\t", "").trim())
          }

          result.push(new_salle);
          ++i;
        }

        resolve(result);

      }

    });
  }

  extract_data_from_filieres_file(data_string: string)
  {
    console.log(data_string);
    return new Promise<Filiere[]>((resolve, reject) =>{
      const datas = data_string.split("\n");
      let result : Filiere[] = [];
      let i = 1;

      const entete = datas[0];
      const number_of_lines = entete.split(",").length;
      console.log(number_of_lines)
      if(number_of_lines !== 3 && number_of_lines !== 2)
      {
        reject("Fichier non conforme");
      }
      else
      {
        //the file doesn't contain the horodating column if number of lines = 4 and it contain the horodating column else

        while(i < datas.length)
        {
          const line = datas[i].split(",");

          let j = 0;

          if(number_of_lines === 3)
          {
            ++j;
          }

          const code = line[j].replace("\r", "").replace("\t", "").trim().toUpperCase();
          const intitule = line[j+1].replace("\r", "").replace("\t", "").trim();

          const new_filiere:Filiere = {
            id: i,
            code: code,
            intitule: intitule === "" ? code : intitule,
            typeHoraireId: null
          }

          result.push(new_filiere);
          ++i;
        }

        resolve(result);

      }

    });
  }

  extract_data_from_niveaux_file(data_string: string)
  {
    console.log(data_string);
    return new Promise<Niveau[]>((resolve, reject) =>{
      const datas = data_string.split("\n");
      let result : Niveau[] = [];
      let i = 1;

      const entete = datas[0];
      const number_of_lines = entete.split(",").length;
      if(number_of_lines !== 3 && number_of_lines !== 2)
      {
        reject("Fichier non conforme");
      }
      else
      {
        //the file doesn't contain the horodating column if number of lines = 4 and it contain the horodating column else

        while(i < datas.length)
        {
          const line = datas[i].split(",");

          let j = 0;

          if(number_of_lines === 3)
          {
            ++j;
          }

          const code = line[j].replace("\r", "").replace("\t", "").trim().toUpperCase();
          const intitule = line[j+1].replace("\r", "").replace("\t", "").trim();
          const new_niveau:Niveau = {
            id: i,
            code: code,
            intitule: intitule
          }

          result.push(new_niveau);
          ++i;
        }

        resolve(result);

      }

    });
  }

  extract_data_from_classes_file(data_string: string)
  {
    console.log(data_string);
    return new Promise<Classe[]>((resolve, reject) =>{
      const datas = data_string.split("\n");
      let result : Classe[] = [];
      let i = 1;

      const entete = datas[0];
      const number_of_lines = entete.split(",").length;
      if(number_of_lines !== 5 && number_of_lines !== 4)
      {
        reject("Fichier non conforme");
      }
      else
      {
        //the file doesn't contain the horodating column if number of lines = 4 and it contain the horodating column else

        while(i < datas.length)
        {
          const line = datas[i].split(",");

          let j = 0;

          if(number_of_lines === 5)
          {
            ++j;
          }

          const code = line[j].replace("\r", "").replace("\t", "").trim().toUpperCase();
          const intitule = line[j+1].replace("\r", "").replace("\t", "").trim();
          const niveau = line[j+2].replace("\r", "").replace("\t", "").trim();
          const filiere = line[j+3].replace("\r", "").replace("\t", "").trim();
          const new_classe:Classe = {
            id: i,
            code: code,
            intitule: intitule === "" ? code : intitule,
            niveau: niveau,
            filiere: filiere,
            niveauId: 0,
            filiereId: 0,
            est_divisee: false,
          }

          result.push(new_classe);
          ++i;
        }

        resolve(result);

      }

    });
  }

  extract_data_from_ues_file(data_string: string)
  {
    console.log(data_string);
    return new Promise<UE[]>((resolve, reject) =>{
      const datas = data_string.split("\n");
      let result : UE[] = [];
      let i = 1;

      const entete = datas[0];
      const number_of_lines = entete.split(",").length;
      if(number_of_lines !== 5 && number_of_lines !== 4)
      {
        reject("Fichier non conforme");
      }
      else
      {
        //the file doesn't contain the horodating column if number of lines = 4 and it contain the horodating column else

        while(i < datas.length)
        {
          const line = datas[i].split(",");

          let j = 0;

          if(number_of_lines === 5)
          {
            ++j;
          }

          const code = line[j].replace("\r", "").replace("\t", "").trim().toUpperCase();
          const intitule = line[j+1].replace("\r", "").replace("\t", "").trim();
          const optionel = line[j+2].replace("\r", "").replace("\t", "").trim().toLowerCase() === "non" ? false : true;
          const classe = line[j+3].replace("\r", "").replace("\t", "").trim();
          const new_ue:UE = {
            id: i,
            code: code,
            intitule: intitule,
            optionel: optionel,
            classe: classe,
            classeId: 0
          }

          result.push(new_ue);
          ++i;
        }

        resolve(result);

      }

    });
  }

  extract_data_from_etudiants_file(data_string: string)
  {
    console.log(data_string);
    return new Promise<Etudiant[]>((resolve, reject) =>{
      const datas = data_string.split("\n");
      let result : Etudiant[] = [];
      let i = 1;

      const entete = datas[0];
      const number_of_lines = entete.split(",").length;
      if(number_of_lines !== 4 && number_of_lines !== 3)
      {
        reject("Fichier non conforme");
      }
      else
      {
        //the file doesn't contain the horodating column if number of lines = 4 and it contain the horodating column else

        while(i < datas.length)
        {
          const line = datas[i].split(",");

          let j = 0;

          if(number_of_lines === 4)
          {
            ++j;
          }

          const noms = line[j].replace("\r", "").replace("\t", "").trim().toUpperCase();
          const matricule = line[j+1].replace("\r", "").replace("\t", "").trim().toUpperCase();
          const classe = line[j+2].replace("\r", "").replace("\t", "").trim().toUpperCase();

          const new_etd:Etudiant = {
            id: i,
            noms: noms,
            matricule: matricule,
            classeId: 0,
            classe: classe,
          }

          result.push(new_etd);
          ++i;
        }

        resolve(result);

      }

    });
  }
}
