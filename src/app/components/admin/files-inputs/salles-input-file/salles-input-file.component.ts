import { Component, OnInit } from '@angular/core';
import {FilesInputsService} from "../../../../_services/admin/files-inputs.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-salles-input-file',
  templateUrl: './salles-input-file.component.html',
  styleUrls: ['./salles-input-file.component.scss']
})
export class SallesInputFileComponent implements OnInit {

  constructor(private filesInputsService: FilesInputsService) { }

  ngOnInit(): void {
  }

  on_extract_datas(datas_string: string)
  {
    this.filesInputsService.extract_data_from_salles_file(datas_string)
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
