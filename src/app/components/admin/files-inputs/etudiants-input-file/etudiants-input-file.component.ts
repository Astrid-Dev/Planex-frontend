import { Component, OnInit } from '@angular/core';
import {FilesInputsService} from "../../../../_services/admin/files-inputs.service";
import Swal from "sweetalert2";
import {EtudiantService} from "../../../../_services/public/etudiant.service";
import {Etudiant} from "../../../../models/Etudiant";
import deleteProperty = Reflect.deleteProperty;

@Component({
  selector: 'app-etudiants-input-file',
  templateUrl: './etudiants-input-file.component.html',
  styleUrls: ['./etudiants-input-file.component.scss']
})
export class EtudiantsInputFileComponent implements OnInit {


  etudiants: any = [];
  has_failed = true;
  is_sending = false;
  value_of_progress = 0;
  step = 0;
  can_upload = false;
  message = "Envoie des informations sur les étudiants";
  should_modify = false;
  extract_datas: any = [];
  bads_datas: any = [];

  is_loading: boolean = true;

  constructor(private filesInputsService: FilesInputsService, private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.etudiantService.canUploadEtudiantsFile()
      .then(
        result =>{
          this.can_upload = result;
          if(result)
          {
            this.can_upload = true;
            this.etudiantService.getAllEtudiants()
              .then(
                (data) =>{
                  this.etudiants = data;
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
            }).then(() =>{
              this.is_loading = false;
            });
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
    this.filesInputsService.extract_data_from_etudiants_file(datas_string)
      .then((etudiants) =>{
        const temp = this.etudiantService.attributeClasseToEtudiant(etudiants);
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
      text: "Les étudiants ont été importés avec succès !",
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
      text: "Une erreur est survenue lors de l'importation des étudiants !",
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  get_loaded_classes()
  {
    return this.etudiantService.classes;
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

    const temp = this.etudiantService.attributeClasseToEtudiant(this.extract_datas);
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

  send_datas(etudiants: Etudiant[])
  {
    this.is_sending = true;

    this.step = (100/etudiants.length);
    let number_of_sends = 0;

    for(let i = 0; i < etudiants.length; i++)
    {
      const etudiant = etudiants[i];
      deleteProperty(etudiant, "classe");
      this.etudiantService.createNewEtudiant(etudiant)
        .then(
          (res) =>{
            console.log(res);
            ++number_of_sends;
            this.check_sending_is_finish(number_of_sends, etudiants.length);
          }
        )
        .catch((err) =>{
          console.error(err);
          this.sending_has_aborted();
        });
    }
  }

}
