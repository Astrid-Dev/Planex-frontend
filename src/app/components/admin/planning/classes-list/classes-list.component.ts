import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Niveau} from "../../../../models/Niveau";
import {Classe} from "../../../../models/Classe";

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss']
})
export class ClassesListComponent implements OnInit {

  @Input() niveaux: Niveau[] = [];
  @Input("list") all_classes: Classe[] = [];

  @Output("select-classe") classe = new EventEmitter<Classe>();

  current_list: any = [];

  search_value: string = "";
  previous_search_value: string = "";

  search_level: string = "0";
  previous_search_level = "0";

  constructor() { }

  ngOnInit(): void {
    this.current_list = this.all_classes;
    this.niveaux.sort((a, b) => {
      return a.code.localeCompare(b.code);
    });
  }

  handle_search()
  {
    if(this.search_value !== this.previous_search_value || this.search_level !== this.previous_search_level)
    {
      this.previous_search_value = this.search_value;
      this.previous_search_level = this.search_level;
      let value_check = (this.search_value === "");
      let level_check = (parseInt(this.search_level) === 0);

      this.current_list = this.all_classes.filter((a) =>{
        return ((value_check || a.code.toLowerCase().includes(this.search_value.toLowerCase())) && (level_check || a.niveauId ===  parseInt(this.search_level)))
      })
    }
  }

  handle_select_classe(index: number)
  {
    this.classe.emit(this.current_list[index]);
  }

}
