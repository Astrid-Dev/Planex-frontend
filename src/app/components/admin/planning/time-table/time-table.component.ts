import {Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild} from '@angular/core';
import {Classe, defaultClasse} from "../../../../models/Classe";

declare var require: any;

const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {
	
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  @Input() classe : any = defaultClasse;
  @Input() jours: any = [];
  @Input() periodes: any = [];
  @Input("current") planning: any = [];
  @Input("all") all_plannings: any = [];

  @Input() all_ues:any = [];
  @Input() all_salles: any = [];
  @Input() all_enseignants: any = [];

  @Output("on-modified") modified_planning: EventEmitter<any> = new EventEmitter();

  horaires: any[] = [];
  possibles_ues: any = [];
  possibles_enseignants: any = [];
  possibles_enseignants2: any = [];
  possibles_salles: any = [];

  current_planning_index: number = 0;

  classe_name = "";
  filiere_name = "";

  current_day: string = "";
  current_period: any = {};

  current_planning_ceil : any = {};

  constructor() { }

  ngOnInit(): void {
    this.classe_name = this.get_classe_name();
    this.filiere_name = this.get_filiere_name();
    this.all_ues = this.classe.ues;
    this.possibles_ues = this.all_ues;
    this.possibles_enseignants = this.all_enseignants;
    this.possibles_enseignants2 = this.all_enseignants;
    this.possibles_salles = this.all_salles;
  }

  get_classe_name()
  {
    if(this.classe !== null)
    {
      return this.classe.code;
    }
    else
    {
      return "Classe";
    }
  }

  get_filiere_name()
  {
    if(this.classe !== null && typeof this.classe.filiere === "string")
    {
      return this.classe.filiere;
    }
    else if(this.classe !== null && typeof this.classe.filiere !== "string")
    {
      return this.classe.filiere.code;
    }
    else
    {
      return "Filiere";
    }
  }

  on_ceil_click(day_index: number, period_index: number)
  {
    this.current_day = this.jours[day_index].intitule;
    this.current_period = this.periodes[period_index];
    this.current_planning_index = ((this.jours.length * period_index) + day_index);
    this.current_planning_ceil = this.planning[this.current_planning_index];
    console.log(this.current_planning_ceil);
  }

  get_enseignant_name(period_index: number, day_index: number)
  {
    const index = (this.jours.length * period_index) + day_index;
    if(this.planning[index].enseignant === null)
      return "";
    else return typeof this.planning[index].enseignant !== "undefined" ? this.planning[index].enseignant.noms : "";
  }

  get_enseignant2_name(period_index: number, day_index: number)
  {
    const index = (this.jours.length * period_index) + day_index;
    if(this.planning[index].enseignant2 === null)
      return "";
    else return typeof this.planning[index].enseignant2 !== "undefined" ? this.planning[index].enseignant2.noms : "";
  }

  get_ue_code(period_index: number, day_index: number)
  {
    const index = (this.jours.length * period_index) + day_index;
    if(this.planning[index].ue === null)
      return "";
    else return typeof this.planning[index].ue !== "undefined" ? this.planning[index].ue.code : "";
  }

  get_salle_code(period_index: number, day_index: number)
  {
    const index = (this.jours.length * period_index) + day_index;
    if(this.planning[index].salle === null)
      return "";
    else return typeof this.planning[index].salle !== "undefined" ? this.planning[index].salle.code : "";
  }

  on_apply_modification()
  {
    this.modified_planning.emit(this.planning);
  }

  on_confirm(result: any)
  {
    console.log(this.current_planning_ceil);
    console.log(result);
    this.planning[this.current_planning_index] = {
      ...this.planning[this.current_planning_index],
      ...result,
    }
  }
  
  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html, pageSize: 'A4', pageOrientation: "landscape", pageMargins: [ 10, 10, 10, 10 ], info: {
    title: "emploi_de_temps_"+this.classe_name,
    author: 'Planex',
    subject: 'Course plannings',
    keywords: 'planning, course',
  } };
    pdfMake.createPdf(documentDefinition).download("emploi_de_temps_"+this.classe_name); 
     
  }

}
