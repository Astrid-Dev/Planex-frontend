import { Component, OnInit } from '@angular/core';
import {FilesInputsService} from "../../../../_services/admin/files-inputs.service";
import Swal from "sweetalert2";
import {SalleService} from "../../../../_services/public/salle.service";

@Component({
  selector: 'app-salles-input-file',
  templateUrl: './salles-input-file.component.html',
  styleUrls: ['./salles-input-file.component.scss']
})
export class SallesInputFileComponent implements OnInit {

  salles: any = [];
  has_failed = true;
  is_sending = false;
  value_of_progress = 0;
  step = 0;
  message = "Envoie des informations sur les salles";

  is_loading: boolean = true;

  constructor(private filesInputsService: FilesInputsService, private salleService: SalleService) { }

  ngOnInit(): void {
    this.salleService.getAllSalles()
      .then(
        (data) =>{
          this.salles = data;
          console.log(data);
          this.has_failed = false;
          this.is_loading = false;
        }
      )
      .catch(
        (err) =>{
          console.error(err);
          this.has_failed = true;
          this.is_loading = false;
        }
      );
  }

  on_extract_datas(datas_string: string)
  {
    this.filesInputsService.extract_data_from_salles_file(datas_string)
      .then((salles) =>{
        this.is_sending = true;

        this.step = Math.ceil(100/salles.length);
        let number_of_sends = 0;

        for(let i = 0; i < salles.length; i++)
        {
          const salle = salles[i];

          this.salleService.createNewNiveau(salle)
            .then(
              (res) =>{
                console.log(res);
                ++number_of_sends;
                this.check_sending_is_finish(number_of_sends, salles.length);
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
      text: "Les salles ont été importées avec succès !",
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
      text: "Une erreur est survenue lors de l'importation des salles !",
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

}
