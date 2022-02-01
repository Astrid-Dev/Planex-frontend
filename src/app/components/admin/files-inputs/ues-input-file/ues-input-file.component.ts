import { Component, OnInit } from '@angular/core';
import {FilesInputsService} from "../../../../_services/admin/files-inputs.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-ues-input-file',
  templateUrl: './ues-input-file.component.html',
  styleUrls: ['./ues-input-file.component.scss']
})
export class UesInputFileComponent implements OnInit {

  constructor(private filesInputsService: FilesInputsService) { }

  ngOnInit(): void {
  }

  on_extract_datas(datas_string: string)
  {
    this.filesInputsService.extract_data_from_ues_file(datas_string)
      .then((res) =>{
        console.log(res);
      })
      .catch((error) =>{
        console.error(error);
        Swal.fire({
          title: 'Erreur!',
          text: "Le fichier sélectionné n'est pas conforme! Veuillez vérifier ou changer de fichier !",
          icon: 'error',
          confirmButtonText: 'OK'
        });
      })
  }

}
