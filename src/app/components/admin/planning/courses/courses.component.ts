import { Component, OnInit } from '@angular/core';
import {PlanningCoursesService} from "../../../../_services/public/planning-courses.service";
import {Filiere} from "../../../../models/Filiere";
import {Classe, defaultClasse} from "../../../../models/Classe";
import {defaultNiveau, Niveau} from "../../../../models/Niveau";
import {Salle} from "../../../../models/Salle";
import {Enseignant} from "../../../../models/Enseignant";
import {UE} from "../../../../models/UE";
import {FiliereService} from "../../../../_services/public/filiere.service";
import Swal from "sweetalert2";
import {ClasseService} from "../../../../_services/public/classe.service";
import {GroupesCoursService} from "../../../../_services/public/groupes-cours.service";


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  has_failed: boolean = false;
  can_plan: boolean = false;

  has_selected_filiere: boolean = false;
  has_selected_classe: boolean = false;
  has_selected_horaire: boolean = false;
  has_selected_type_groupe: boolean = false;

  is_updating_filiere:boolean = false;

  is_loading: boolean = true;

  type_horaire: string = "1";

  filieres: Filiere[] = [];
  classes: Classe[] = [];
  niveaux: Niveau[] = [];
  salles: Salle[] = [];
  enseignants: Enseignant[] = [];
  ues: UE[] = [];
  jours: any = [];
  horaires: any = [];
  periodes: any = [];

  classe : any;
  current_filiere !: Filiere;

  classe_has_groups: boolean = false;

  all_plannings: any = [];
  planning_for_classe: any = [];

  constructor(
    private planningCoursesService: PlanningCoursesService,
    private classeService: ClasseService,
    private filiereService: FiliereService,
    private groupesCoursService: GroupesCoursService
  ) { }

  ngOnInit(): void {
    this.planningCoursesService.canCreateCoursesPlanning()
      .then((result) =>{
        this.can_plan = result;
        this.is_loading = false;
        if(this.can_plan)
        {
          this.filieres = this.planningCoursesService.getFilieres();
          this.niveaux = this.planningCoursesService.getNiveaux();
          this.horaires = this.planningCoursesService.getHoraires();
          this.jours = this.planningCoursesService.getJours();
          this.ues = this.planningCoursesService.getUes();
          this.enseignants = this.planningCoursesService.getEnseignants();
          this.salles = this.planningCoursesService.getSalles();
          this.jours.pop();

        }
      })
      .catch((err) =>{
        this.can_plan = false;
        this.has_failed = true;
        this.is_loading = false;
        console.error(err);
      });
    // setTimeout(() =>{
    //   this.is_loading = false;
    // }, 2000)
  }

  on_select_filiere(filiere: any)
  {
    let classes: any = [];
    this.current_filiere = {
      id: filiere.id,
      code: filiere.code,
      intitule: filiere.intitule,
      typeHoraireId: filiere.typeHoraireId
    }

    this.classes = this.planningCoursesService.getAllClassesOfOneFiliere(filiere.id);
    this.has_selected_filiere = true;

    if(this.current_filiere.typeHoraireId !== null)
    {
      this.has_selected_horaire = true;
      this.periodes = this.planningCoursesService.getPeriodesWithHoraireId(this.current_filiere.typeHoraireId);
    }
  }

  on_select_classe(classe: any)
  {
    this.classe = classe;
    this.has_selected_classe = true;
    if(!classe.est_divisee && (classe.createdAt === classe.updatedAt))
    {
      this.has_selected_type_groupe = false;
    }
    else
    {
      this.classe_has_groups = classe.est_divisee;
      this.has_selected_type_groupe = true;
    }
    this.is_loading = true;
    this.planningCoursesService.getCoursesPlanningForAllClasses()
      .then((plannings) =>{
        this.all_plannings = plannings;
        this.planningCoursesService.getCoursesPlanningForOneClasse(this.classe.id)
          .then((classe_pl) =>{
            this.planning_for_classe = classe_pl;
            this.is_loading = false;
          })
          .catch((err) =>{
            this.fetching_classe_has_failed(err);
          })
      })
      .catch((err) =>{
        this.fetching_classe_has_failed(err);
      });
    console.log(classe);
  }

  on_select_classe_groups(groups: any)
  {
    this.classe_has_groups = (groups.length > 0);
    let temp = {
      filiereId: this.classe.filiereId,
      code: this.classe.code,
      est_divisee: this.classe_has_groups,
      intitule: this.classe.intitule,
      niveauId: this.classe.niveauId,
      id: this.classe.id
    };

    this.is_loading = true;
    this.classeService.updateOneClasse(temp, temp.id)
      .then((res) =>{
        if(this.classe_has_groups)
        {
          let data: any = [];
          groups.forEach((group: any) =>{
            data.push({
              id: group.id,
              nom: group.nom,
              lettre_debut: group.lettre_debut,
              lettre_fin: group.lettre_fin,
              classeId: this.classe.id
            })
          });
          this.groupesCoursService.createGroupsForOneClasse(data)
            .then((res) =>{
              this.has_selected_type_groupe = true;
              this.classe = {
                ...this.classe,
                groupes_cours: data,
                updatedAt: new Date().toLocaleDateString()
              }
              this.update_one_classe_from_all_classes(this.classe);
              this.is_loading = false;
            })
            .catch((err) =>{
              this.updating_classe_has_failed(err);
            });
        }
        else
        {
          this.has_selected_type_groupe = true;
          this.classe = {
            ...this.classe,
            groupes_cours: [],
            updatedAt: new Date().toLocaleDateString()
          }
          this.update_one_classe_from_all_classes(this.classe);
          this.is_loading = false;
        }
      })
      .catch((err) =>{
        this.updating_classe_has_failed(err);
      })

  }

  get_horaire_description(horaire: any): string
  {
    let periodes = horaire.periodes;

    const desc = periodes[0].debut + " - " + periodes[0].fin + "  |  "+ periodes[1].debut + " - " + periodes[1].fin +  "  |  "+ periodes[2].debut + " - " + periodes[2].fin + "...";

    return desc;
  }

  handle_type_horaire_change(new_value: string)
  {
    this.type_horaire = new_value;
  }

  on_select_type_horaire()
  {
    this.is_updating_filiere = true;
    const filiere = {
      ...this.current_filiere,
      typeHoraireId: parseInt(this.type_horaire)
    }

    this.filiereService.updateFiliere(filiere.id, filiere)
      .then((res) =>{
        for(let i = 0; i < this.filieres.length; i++)
        {
          if(this.filieres[i].id === filiere.id)
          {
            this.filieres[i].typeHoraireId = filiere.typeHoraireId;
            break;
          }
        }

        this.periodes = this.planningCoursesService.getPeriodesWithHoraireId(filiere.typeHoraireId);
        let classes_sends = 0;
        let plannings_sends = 0;


        for(let i = 0; i < this.classes.length; i++)
        {
          let plannings: any = [];
          this.periodes.forEach((periode: any, index: number) =>{
            this.jours.forEach((jour: any) =>{
              plannings.push({
                ueId: null,
                enseignantId: null,
                enseignant2Id: null,
                salleId: null,
                classeId: this.classes[i].id,
                periodeId: periode.id,
                jourId: jour.id
              });
            });
          });

          for(let j = 0; j < plannings.length; j++)
          {
            const planning = plannings[j];
            this.planningCoursesService.createCoursePlanningRow(planning)
              .then((res) =>{
                plannings[j] = res;
                ++plannings_sends;
                if(classes_sends === this.classes.length && plannings_sends === plannings.length)
                {
                  this.has_selected_horaire = true;
                  this.is_updating_filiere = false;
                }
              })
              .catch((err) => {
                this.updating_filiere_has_failed(err);
                j = plannings.length;
                i = this.classes.length;
              });
          }

          this.planningCoursesService.addCoursesPlanningForClasseToLocalStorage(plannings);
          ++classes_sends;
        }
      })
      .catch((err) =>{
        this.updating_filiere_has_failed(err);
      })
  }

  updating_filiere_has_failed(err: any){
    this.is_updating_filiere = false;
    console.error(err);
    Swal.fire({
      title: 'Erreur!',
      text: "Une erreur s'est produite lors de la mise à jour de la filière. Veuillez réessayer !",
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  fetching_classe_has_failed(err: any){
    this.is_loading = false;
    console.error(err);
    Swal.fire({
      title: 'Erreur!',
      text: "Une erreur s'est produite lors de la récupération des données sur la classe !",
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  updating_classe_has_failed(err: any){
    this.is_loading = false;
    console.error(err);
    Swal.fire({
      title: 'Erreur!',
      text: "Une erreur s'est produite lors de la mise à jour des données de la classe !",
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  on_cancel_select_filiere()
  {
    this.has_selected_filiere = false;
  }

  previous_action()
  {
    if(this.has_selected_filiere && !this.has_selected_classe)
    {
      this.has_selected_filiere = false;
      this.has_selected_horaire = false;
    }
    else if(this.has_selected_filiere && this.has_selected_classe)
    {
      this.has_selected_classe = false;
    }
  }

  perform_modify_planning_for_classe(new_planning_for_classe: any)
  {
    this.is_loading = true;
    let plannings_to_update = new_planning_for_classe;

    let sends_rows = 0;
    for(let i = 0; i < plannings_to_update.length; i++)
    {
      const item: any = plannings_to_update[i];
      this.planningCoursesService.updateCoursePlanning(item.id, item)
        .then((res) =>{
          ++sends_rows;

          if(sends_rows === plannings_to_update.length)
          {
            this.planningCoursesService.refreshPlannings()
              .then((result) =>{
                this.all_plannings = result;
                this.modify_planning_has_succeed();
              })
              .catch((err) =>{
                this.send_local_data_to_storage();
                this.modify_planning_has_succeed();
              })
          }
        })
        .catch((err) =>{
          sends_rows = plannings_to_update.length + 1;
          this.planning_for_classe = new_planning_for_classe;
          this.send_local_data_to_storage();
          this.modify_planning_has_failed(err);
        })
    }

  }

  send_local_data_to_storage()
  {
    let new_all_plannings:any = [];
    this.all_plannings.forEach((planning: any) =>{
      this.planning_for_classe.forEach((classe_plan: any) =>{
        if(planning.id === classe_plan.id)
        {
          new_all_plannings.push(classe_plan);
        }
        else
        {
          new_all_plannings.push(planning);
        }
      })
    });

    this.planningCoursesService.setPlannings(new_all_plannings);
  }

  modify_planning_has_failed(err: any)
  {
    console.error(err);
    this.is_loading = false;
    Swal.fire({
      title: 'Erreur!',
      text: "Une erreur s'est produite lors de la mise à jour du planning. Veuillez réessayer !",
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  modify_planning_has_succeed()
  {
    this.is_loading = false;
    Swal.fire({
      title: 'Planning modifié !',
      text: "Le planning de " + this.classe.code+" a été modifié avec succès !",
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  getNiveauById(id: number): Niveau{
    let result: Niveau = defaultNiveau;

    for(let i = 0; i < this.niveaux.length; i++)
    {
      if(this.niveaux[i].id === id)
      {
        result = this.niveaux[i];
        break;
      }
    }

    return result;
  }

  getUesByClasseId(classeId: number){
    let result: any = [];

    this.ues.forEach((ue: UE) =>{
      if(ue.classeId === classeId)
      {
        result.push(ue);
      }
    });
    return result;
  }

  update_one_classe_from_all_classes(classe: any)
  {
    for(let i = 0; i < this.classes.length; i++)
    {
      if(classe.id === this.classes[i].id)
      {
        this.classes[i] = classe;
        break;
      }
    }
  }

}
