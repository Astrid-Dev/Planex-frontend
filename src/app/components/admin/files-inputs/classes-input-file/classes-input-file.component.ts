import { Component, OnInit } from '@angular/core';
import {FilesInputsService} from "../../../../_services/admin/files-inputs.service";
import Swal from "sweetalert2";
import deleteProperty = Reflect.deleteProperty;
import {ClasseService} from "../../../../_services/public/classe.service";
import {Classe} from "../../../../models/Classe";

@Component({
  selector: 'app-classes-input-file',
  templateUrl: './classes-input-file.component.html',
  styleUrls: ['./classes-input-file.component.scss']
})
export class ClassesInputFileComponent implements OnInit {

  classes: any = [];
  has_failed = true;
  is_sending = false;
  value_of_progress = 0;
  step = 0;
  can_upload = false;
  message = "Envoie des informations sur les classes";
  should_modify = false;
  extract_datas: any = [];
  bads_datas: any = [];

  constructor(
    private filesInputsService: FilesInputsService,
    private classeService: ClasseService
  ) { }

  ngOnInit(): void {
    this.classeService.canUploadClassesFile()
      .then(
        result =>{
          this.can_upload = result;
          if(result)
          {
            this.can_upload = true;
            this.classeService.getAllClasses()
              .then(
                (data) =>{
                  this.classes = data;
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
          else
          {
            Swal.fire({
              title: 'Fichiers requis!',
              text: "Veuillez d'abord importer les fichiers concernant les filières et les niveaux !",
              icon: 'warning',
              confirmButtonText: 'OK'
            });
          }

        }
      )
      .catch(err =>{
        console.error(err);
      })
  }

  on_extract_datas(datas_string: string)
  {
    this.filesInputsService.extract_data_from_classes_file(datas_string)
      .then((classes) =>{
        const temp = this.classeService.attributeFiliereAndNiveauToClasse(classes);
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
      text: "Les classes ont été importées avec succès !",
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
      text: "Une erreur est survenue lors de l'importation des classes !",
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  get_loaded_filieres()
  {
    return this.classeService.filieres;
  }

  get_loaded_niveaux(){
    return this.classeService.niveaux;
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
        filiere: this.bads_datas[i].filiere,
        niveau: this.bads_datas[i].niveau
      }
    }

    const temp = this.classeService.attributeFiliereAndNiveauToClasse(this.extract_datas);
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

  send_datas(classes: Classe[])
  {
    this.is_sending = true;

    this.step = Math.ceil(100/classes.length);
    let number_of_sends = 0;

    for(let i = 0; i < classes.length; i++)
    {
      const classe = classes[i];
      deleteProperty(classe, "filiere");
      deleteProperty(classe, "niveau");
      this.classeService.createNewClasse(classe)
        .then(
          (res) =>{
            console.log(res);
            ++number_of_sends;
            this.check_sending_is_finish(number_of_sends, classes.length);
          }
        )
        .catch((err) =>{
          console.error(err);
          this.sending_has_aborted();
        });
    }
  }

}
