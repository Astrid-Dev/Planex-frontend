import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {HelpService} from "../../../../_services/public/help.service";

@Component({
  selector: 'app-select-classe-groups',
  templateUrl: './select-classe-groups.component.html',
  styleUrls: ['./select-classe-groups.component.scss']
})
export class SelectClasseGroupsComponent implements OnInit {

  @Input() classe: any = {};

  @Output("on_cancel") cancel: EventEmitter<any> = new  EventEmitter();
  @Output("on_continue") result: EventEmitter<any> = new EventEmitter();


  classe_has_groups: boolean = false;

  has_continued: boolean = false;
  is_loading: boolean = false;

  etudiants: any = [];
  groups: any = [];

  letters: any = [];

  constructor(private helpService: HelpService) { }

  ngOnInit(): void {

  }

  change_classe_groups_state(value: boolean)
  {
    this.classe_has_groups = value;
  }

  on_continue()
  {
    if((!this.classe_has_groups) || (this.classe_has_groups && this.has_continued))
    {
      this.result.emit(this.groups);
    }
    else if(this.classe_has_groups && !this.has_continued)
    {
      this.initialise_groups();
      this.has_continued = true;
    }
  }

  on_cancel()
  {
    this.cancel.emit(null);
  }

  initialise_groups()
  {
    this.letters = this.helpService.getLettersToUpperCase();
    this.etudiants = this.classe.etudiants;

    this.add_new_group();
    this.add_new_group();
  }

  add_new_group()
  {
    this.groups.push({
      id: this.helpService.generateUniqueKey(),
      nom: "",
      lettre_debut: "",
      lettre_fin: "",
      classeId: this.classe.id,
      nbre_etudiants: 0,
      possibles_letters_debut: [],
      possibles_letters_fin: []
    });

    if(this.groups.length > 1)
    {
      this.sync_all();
    }
  }

  remove_one_groupe(id: string)
  {
    let temp: any = [];

    this.groups.forEach((group: any) =>{
      if(group.id !== id)
      {
        temp.push(group);
      }
    });

    this.groups = temp;
    this.sync_all();
  }

  sync_groups_letters()
  {
    const nbre_groupes: number = this.groups.length;

    let index_debut: number = -1;
    let index_fin: number = -1;

    const nbre_de_lettres: number = parseInt(String(this.letters.length/nbre_groupes));

    this.groups.forEach((group: any, i: number) =>{
      index_debut = index_fin + 1;
      index_fin = index_debut + nbre_de_lettres - 1;
      if(i === 0)
      {
        index_fin += this.letters.length - (nbre_groupes * nbre_de_lettres);
      }

      group.nom = "Groupe " + (i+1);
      group.lettre_debut = this.letters[index_debut];
      group.lettre_fin = this.letters[index_fin];
    });
  }

  sync_etudiants_number_per_groups()
  {
    this.groups.forEach((group: any) =>{
      let temp: any = [];
      temp = this.etudiants.filter((a: any) =>{
        return (a.noms.charAt(0).localeCompare(group.lettre_debut) >= 0 && a.noms.charAt(0).localeCompare(group.lettre_fin) <= 0);
      });

      group.nbre_etudiants = temp.length;
    });
  }

  sync_possibles_letters()
  {
    this.groups[0].possibles_letters_debut = [this.letters[0]];
    this.groups[this.groups.length - 1].possibles_letters_fin = [this.letters[this.letters.length - 1]];

    for(let i = 1; i < this.groups.length; i++)
    {
      let letter1: string = this.groups[i-1].lettre_fin;
      let letter2: string = this.groups[i].lettre_fin;

      this.groups[i].possibles_letters_debut = this.getLettersInInterval(letter1, letter2, false, true);
    }
    for(let i = 0; i < this.groups.length - 1; i++)
    {
      let letter1: string = this.groups[i].lettre_debut;
      let letter2: string = this.groups[i+1].lettre_debut;

      this.groups[i].possibles_letters_fin = this.getLettersInInterval(letter1, letter2, true, false);
    }

    let first_group = this.groups[0];
    let second_group = this.groups[1];

    let last_group = this.groups[this.groups.length - 1];
    let prev_last_group = this.groups[this.groups.length - 2]
    this.groups[0].possibles_letters_fin = this.getLettersInInterval(first_group.lettre_debut, second_group.lettre_debut, true, false);
    this.groups[this.groups.length - 1].possibles_letters_debut = this.getLettersInInterval(prev_last_group.lettre_fin, last_group.lettre_fin, false, true);
  }

  sync_all()
  {
    this.sync_groups_letters();
    this.sync_possibles_letters();
    this.sync_etudiants_number_per_groups();
    console.log(this.groups);
  }

  getLetterIndex(letter: string)
  {
    return this.letters.indexOf(letter);
  }

  getLettersInInterval(letter1: string, letter2: string, first_inside: boolean = false, last_inside: boolean = false)
  {
    let init = this.getLetterIndex(letter1) + 1;
    let end = this.getLetterIndex(letter2);

    if(first_inside)
    {
      --init;
    }

    if(last_inside)
    {
      ++end;
    }

    let result: any = [];

    for(let i = init; i < end; i++)
    {
      result.push(this.letters[i]);
    }

    return result;
  }

  on_lettre_debut_change(id: string, event: any)
  {
    const value = event.target.value;
    let temp: any = [];
    let i = -1;

    this.groups.forEach((group: any, index: number) =>{
      if(group.id === id)
      {
        i = index;
        temp.push({
          ...group,
          lettre_debut: value
        });
      }
      else
      {
        temp.push(group);
      }
    });

    if(i !== -1 && i > 0)
    {
      let temp_letters = this.getLettersInInterval(temp[i-1].lettre_fin, temp[i].lettre_debut);

      if(temp_letters.length > 0)
      {
        temp[i-1].lettre_fin = temp_letters[temp_letters.length - 1];
      }
    }

    this.groups = temp;
    this.sync_possibles_letters();
    this.sync_etudiants_number_per_groups();
  }

  on_lettre_fin_change(id: string, event: any)
  {
    const value = event.target.value;
    let temp: any = [];
    let i = -1;

    this.groups.forEach((group: any, index: number) =>{
      if(group.id === id)
      {
        i = index;
        temp.push({
          ...group,
          lettre_fin: value
        });
      }
      else
      {
        temp.push(group);
      }
    });

    if(i !== -1 && i < this.groups.length - 1)
    {
      let temp_letters = this.getLettersInInterval(temp[i].lettre_fin, temp[i+1].lettre_debut);
      if(temp_letters.length > 0)
      {
        temp[i+1].lettre_debut = temp_letters[0];
      }
    }

    this.groups = temp;
    this.sync_possibles_letters();
    this.sync_etudiants_number_per_groups();
  }

}
