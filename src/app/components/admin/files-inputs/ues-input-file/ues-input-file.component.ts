import { Component, OnInit } from '@angular/core';
import {FilesInputsService} from "../../../../_services/admin/files-inputs.service";
import Swal from "sweetalert2";
import {UeService} from "../../../../_services/public/ue.service";
import {Classe} from "../../../../models/Classe";
import {UE} from "../../../../models/UE";
import deleteProperty = Reflect.deleteProperty;

@Component({
  selector: 'app-ues-input-file',
  templateUrl: './ues-input-file.component.html',
  styleUrls: ['./ues-input-file.component.scss']
})
export class UesInputFileComponent implements OnInit {

  ues: any = [];
  has_failed = true;
  is_sending = false;
  value_of_progress = 0;
  step = 0;
  can_upload = false;
  message = "Envoie des informations sur les Unités d'enseignement";
  is_loading: boolean = true;
  should_modify = false;
  extract_datas: any = [];
  bads_datas: any = [];

  constructor(private filesInputsService: FilesInputsService, private ueService: UeService) { }

  ngOnInit(): void {
    this.ueService.canUploadUEsFile()
      .then(
        result =>{
          this.can_upload = result;
          if(result)
          {
            this.can_upload = true;
            this.ueService.getAllUEs()
              .then(
                (data) =>{
                  this.ues = data;
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
          else
          {
            Swal.fire({
              title: 'Fichiers requis!',
              text: "Veuillez d'abord importer les fichiers concernant les classes !",
              icon: 'warning',
              confirmButtonText: 'OK'
            }).then(() =>{this.is_loading = false;});
          }

        }
      )
      .catch(err =>{
        console.error(err);
        this.is_loading = false;
      })
  }

  on_extract_datas(datas_string: string)
  {
    this.filesInputsService.extract_data_from_ues_file(datas_string)
      .then((ues) =>{
        const temp = this.ueService.attributeClasseToUE(ues);
        this.extract_datas = temp.result;
        this.bads_datas = temp.bads;
        this.should_modify = !temp.has_attributed;
        if(temp.has_attributed)
        {
          this.send_datas(this.extract_datas);
        }
        else
        {
          this.alert_inapropriated_datas();
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
      text: "Les Unités d'Enseignement ont été importées avec succès !",
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
      text: "Une erreur est survenue lors de l'importation des Unités d'Enseignement !",
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  get_loaded_classes()
  {
    return this.ueService.classes;
  }

  cancel_extraction()
  {
    this.should_modify = false;
    this.extract_datas = [];
    this.bads_datas = [];
  }

  continue_extraction()
  {
    this.should_modify = false;

    for(let i = 0; i < this.bads_datas.length; i++)
    {
      const index = this.bads_datas[i].index;
      this.extract_datas[index] = {
        ...this.extract_datas[index],
        classe: this.bads_datas[i].classe,
      }
    }

    const temp = this.ueService.attributeClasseToUE(this.extract_datas);
    this.extract_datas = temp.result;
    this.bads_datas = temp.bads;
    this.should_modify = !temp.has_attributed;

    if(temp.has_attributed)
    {
      this.send_datas(this.extract_datas);
    }
    else
    {
      this.alert_inapropriated_datas();
    }

  }

  alert_inapropriated_datas()
  {
    this.is_sending = false;
    Swal.fire({
      title: 'Incohérene!',
      text: "Des entrées incohérentes ont été retrouvées dans le fichier. Veuillez les corriger et continuer !",
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }

  send_datas(ues: UE[])
  {
    this.is_sending = true;

    this.step = Math.ceil(100/ues.length);
    let number_of_sends = 0;

    for(let i = 0; i < ues.length; i++)
    {
      const ue = ues[i];
      deleteProperty(ue, "classe");
      this.ueService.createNewUE(ue)
        .then(
          (res) =>{
            console.log(res);
            ++number_of_sends;
            this.check_sending_is_finish(number_of_sends, ues.length);
          }
        )
        .catch((err) =>{
          console.error(err);
          this.sending_has_aborted();
        });
    }
  }

}
