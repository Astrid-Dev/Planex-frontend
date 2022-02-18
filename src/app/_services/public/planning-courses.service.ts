import {Injectable} from '@angular/core';
import {FiliereService} from "./filiere.service";
import {NiveauService} from "./niveau.service";
import {EnseignantService} from "./enseignant.service";
import {UeService} from "./ue.service";
import {SalleService} from "./salle.service";
import {ClasseService} from "./classe.service";
import {JoursService} from "./jours.service";
import {HorairesService} from "./horaires.service";
import {BACKEND_URL} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

const COURSE_PLANNING_URL = BACKEND_URL+"planning/cours";
export const COURSES_PLANNING_KEY = "PLANNING_COURS";

@Injectable({
  providedIn: 'root'
})
export class PlanningCoursesService{

  filieres: any = [];
  niveaux: any = [];
  salles: any = [];
  ues: any = [];
  enseignants: any = [];
  classes: any = [];
  jours: any = [];
  horaires: any = [];
  plannings: any = [];


  has_failed : boolean = true;

  constructor(
    private filiereService: FiliereService,
    private niveauService: NiveauService,
    private enseignantService: EnseignantService,
    private ueService: UeService,
    private salleService: SalleService,
    private classeService: ClasseService,
    private joursService: JoursService,
    private horairesService: HorairesService,
    private http: HttpClient
  ) {
    this.syncPlannings()
  }

  canCreateCoursesPlanning()
  {
    return new Promise<boolean>((resolve, reject) =>{
      if(!this.has_failed)
      {
        resolve(true);
      }
      else
      {
        this.filiereService.getAllFilieres()
          .then((filieres) =>{
              this.filieres = filieres;

              this.classeService.getAllClasses()
                .then((classes) =>{
                  this.classes = classes;

                  this.salleService.getAllSalles()
                    .then((salles) =>{
                      this.salles = salles;

                      this.enseignantService.getAllEnseignants()
                        .then((enseignants) =>{
                          this.enseignants = enseignants;

                          this.ueService.getAllUEs()
                            .then((ues) =>{
                              this.ues = ues;

                              this.niveauService.getAllNiveaux()
                                .then((niveaux) =>{
                                  this.niveaux = niveaux;

                                  this.joursService.getAllJours()
                                    .then((jours) =>{
                                      this.jours = jours;

                                      this.horairesService.getAllHoraires()
                                        .then((horaires) =>{
                                          this.horaires = horaires;

                                          this.has_failed = false;

                                          const result = (this.niveaux.length > 0 && this.filieres.length > 0 &&
                                            this.salles.length > 0 && this.enseignants.length > 0 &&
                                            this.ues.length > 0 && this.classes.length > 0 &&
                                              this.horaires.length > 0 && this.jours.length > 0
                                          );

                                          resolve(result);

                                        })
                                        .catch((err) =>{
                                          this.has_failed = true;
                                          reject(err);
                                        });
                                    })
                                    .catch((err) =>{
                                      this.has_failed = true;
                                      reject(err);
                                    });
                                })
                                .catch((err) =>{
                                  this.has_failed = true;
                                  reject(err);
                                });
                            })
                            .catch((err) =>{
                              this.has_failed = true;
                              reject(err);
                            });
                        })
                        .catch((err) =>{
                          this.has_failed = true;
                          reject(err);
                        });
                    })
                    .catch((err) =>{
                      this.has_failed = true;
                      reject(err);
                    });
                })
                .catch((err) =>{
                  this.has_failed = true;
                  reject(err);
                });
            }
          )
          .catch((err) =>{
            this.has_failed = true;
            reject(err);
          });
      }
    });
  }

  createCoursePlanningRow(planning: any)
  {
    return new Promise((resolve, reject) => {
      this.http.post(COURSE_PLANNING_URL, planning)
        .subscribe(
          res =>{
            resolve(res);
          },
          err =>{
            reject(err);
          }
        );
    });
  }

  updateCoursePlanning(id:number, planning: any)
  {
    return new Promise((resolve, reject) => {
      this.http.put(COURSE_PLANNING_URL+"/"+id, planning)
        .subscribe(
          res =>{
            resolve(res);
          },
          err =>{
            reject(err);
          }
        );
    });
  }



  getCoursesPlanningForAllClasses(){
    return new Promise((resolve, reject) =>{
      if(this.plannings.length > 0)
      {
        resolve(this.plannings);
      }
      else
      {
        this.http.get(COURSE_PLANNING_URL)
          .subscribe(
            res =>{
              localStorage.setItem(COURSES_PLANNING_KEY, JSON.stringify(res));
              this.plannings = res;
              resolve(res);
            },
            err =>{
              reject(err);
            }
          );
      }
    });
  }

  getCoursesPlanningForOneClasse(classeId: number){
    return new Promise((resolve, reject) =>{
      if(this.plannings.length > 0)
      {
        let result:any = [];
        this.plannings.forEach((planning: any) =>{
          if(planning.classeId === classeId)
          {
            result.push(planning);
          }
        });
        resolve(result);
      }
      else
      {
        this.http.get(COURSE_PLANNING_URL+"/classe/"+ classeId)
          .subscribe(
            res =>{
              resolve(res);
            },
            err =>{
              reject(err);
            }
          );
      }
    });
  }

  syncPlannings()
  {
    setTimeout(() =>{
      const plannings:any = localStorage.getItem(COURSES_PLANNING_KEY);
      this.plannings = JSON.parse(plannings) === null ? [] : JSON.parse(plannings);
    }, 300);
  }

  refreshPlannings()
  {
    return new Promise((resolve, reject) => {
      this.http.get(COURSE_PLANNING_URL)
        .subscribe(
          res =>{
            localStorage.setItem(COURSES_PLANNING_KEY, JSON.stringify(res));
            this.plannings = res;
            resolve(res);
          },
          err =>{
            reject(err);
          }
        );
    });
  }

  setPlannings(plannings: any)
  {
    localStorage.setItem(COURSES_PLANNING_KEY, JSON.stringify(plannings));
    this.plannings = plannings;
  }

  addCoursesPlanningForClasseToLocalStorage(classe_planning: any)
  {
    setTimeout(() =>{
      const result = localStorage.getItem(COURSES_PLANNING_KEY);
      let plannings: any = [];
      if(result !== null)
      {
        plannings = JSON.parse(result);
        for(let i = 0; i < classe_planning.length; i++)
        {
          plannings.push(classe_planning[i]);
        }
      }
      else
      {
        plannings = classe_planning;
      }
      this.plannings = plannings;
      localStorage.setItem(COURSES_PLANNING_KEY, JSON.stringify(plannings));
    }, 500);
  }

  getLoadDataStatus()
  {
    return this.has_failed;
  }

  getFilieres()
  {
    return this.filieres;
  }

  getNiveaux()
  {
    return this.niveaux;
  }

  getClasses()
  {
    return this.classes;
  }

  getEnseignants()
  {
    return this.enseignants;
  }

  getSalles()
  {
    return this.salles;
  }

  getUes()
  {
    return this.ues;
  }

  getHoraires()
  {
    return this.horaires;
  }

  getJours()
  {
    return this.jours;
  }

  getPeriodesWithHoraireId(id: number)
  {
    let periodes = [];
    for(let i = 0; i < this.horaires.length; i++)
    {
      if(this.horaires[i].id === id)
      {
        periodes = this.horaires[i].periodes;
        break;
      }
    }

    return periodes;
  }
}
