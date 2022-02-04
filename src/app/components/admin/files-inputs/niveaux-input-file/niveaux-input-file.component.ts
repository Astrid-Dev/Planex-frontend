import { Component, OnInit } from '@angular/core';
import {FilesInputsService} from "../../../../_services/admin/files-inputs.service";
import Swal from "sweetalert2";
import {NiveauService} from "../../../../_services/public/niveau.service";

@Component({
  selector: 'app-niveaux-input-file',
  templateUrl: './niveaux-input-file.component.html',
  styleUrls: ['./niveaux-input-file.component.scss']
})
export class NiveauxInputFileComponent implements OnInit {

  niveaux: any = [];
  has_failed = true;
  is_sending = false;
  value_of_progress = 0;
  step = 0;
  message = "Envoie des informations sur les niveaux";

  constructor(private filesInputsService: FilesInputsService, private niveauService: NiveauService) { }

  ngOnInit(): void {
    this.niveauService.getAllNiveaux()
      .then(
        (data) =>{
          this.niveaux = data;
          console.log(data);
          this.has_failed = false;
        }
      )
      .catch(
        (err) =>{
          console.error(err);
          this.has_failed = true;
        }
      );
  }

  on_extract_datas(datas_string: string)
  {
    this.filesInputsService.extract_data_from_niveaux_file(datas_string)
      .then((niveaux) =>{
        this.is_sending = true;

        this.step = Math.ceil(100/niveaux.length);
        let number_of_sends = 0;

        for(let i = 0; i < niveaux.length; i++)
        {
          const niveau = niveaux[i];

          this.niveauService.createNewNiveau(niveau)
            .then(
              (res) =>{
                console.log(res);
                ++number_of_sends;
                this.check_sending_is_finish(number_of_sends, niveaux.length);
              }
            )
            .catch((err) =>{
              console.error(err);
              this.sending_has_aborted();
            });
        }
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

  check_sending_is_finish(current_index: number, datas_length: number)
  {
    this.value_of_progress += this.step;
    if(current_index === datas_length)
    {
      this.value_of_progress = 100;
      this.sending_is_finish_with_success();
    }
  }

  sending_is_finish_with_success()
  {
    this.is_sending = false;
    Swal.fire({
      title: 'Données enregistrées!',
      text: "Les niveaux ont été importés avec succès !",
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() =>{
      window.location.reload();
    });
  }

  sending_has_aborted()
  {
    this.is_sending = false;
    Swal.fire({
      title: 'Erreur!',
      text: "Une erreur est survenue lors de l'importation des niveaux !",
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

}
