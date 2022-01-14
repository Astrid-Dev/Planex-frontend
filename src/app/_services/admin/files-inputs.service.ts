import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FilesInputsService {

  constructor(private http: HttpClient) { }

  read_file_with_url(url: string){
    return new Promise<String>((resolve, reject) =>
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
    return new Promise<String|ArrayBuffer>((resolve, reject) =>{
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
    return new Promise<String>((resolve, reject) =>{
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
}
