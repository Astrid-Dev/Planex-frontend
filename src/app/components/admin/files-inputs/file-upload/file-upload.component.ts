import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import Swal from 'sweetalert2';
import {FilesInputsService} from "../../../../_services/admin/files-inputs.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  files: any[] = [];
  url = "";
  is_analysed: boolean = false;
  is_read_file: boolean = false;
  has_uploaded_file: boolean = false;

  constructor(private filesInputsService: FilesInputsService) { }

  ngOnInit(): void {
  }

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(evt: any) {
    const files = evt.target.files;
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;

            if(this.files[index].progress === 100)
            {
              this.has_uploaded_file = true;
            }
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    this.has_uploaded_file = false;

    const lastFile = this.files[0];
    const item = files[0];
    if(item.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || item.type === ".csv" || item.type === "application/vnd.ms-excel")
    {
      item.progress = 0;
      this.files[0] = item;
    }
    if(lastFile !== this.files[0])
    {
      this.uploadFilesSimulator(0);
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number, decimals: number) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  read_file()
  {
    this.is_read_file = true;

    this.filesInputsService.read_file_with_blob(this.files[0])
      .then((res) =>{
        console.log(res);
        this.is_read_file = false;
      })
      .catch((error) =>{
        console.error(error);
        this.is_read_file = false;
      })
  }

  analyse_url(){
    if(!this.is_valid_url(this.url))
    {
      Swal.fire({
        title: 'Erreur!',
        text: "l'url entrée est invalide",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
    else{
      this.is_analysed = true;

      this.filesInputsService.read_file_with_url(this.url)
        .then((res) =>{
          console.log(res);
          this.is_analysed = false;
      })
        .catch((error) =>{
            this.is_analysed = false;
            console.log(error.message);
            console.error(error);
        });
    }
  }

  is_valid_url(str: string) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

}
