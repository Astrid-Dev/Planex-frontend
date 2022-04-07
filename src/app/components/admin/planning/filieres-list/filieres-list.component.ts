import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filiere} from "../../../../models/Filiere";
import {Classe} from "../../../../models/Classe";
import deleteProperty = Reflect.deleteProperty;
import {Niveau} from "../../../../models/Niveau";

@Component({
  selector: 'app-filieres-list',
  templateUrl: './filieres-list.component.html',
  styleUrls: ['./filieres-list.component.scss']
})
export class FilieresListComponent implements OnInit {

  @Input("list") all_filieres: any = [];
  @Output("select-filiere") classes = new EventEmitter<Classe[]>();

  current_list: any = [];

  search_value: string = "";
  previous_search_value: string = "";

  constructor() { }

  ngOnInit(): void {
    setTimeout(() =>{
      this.all_filieres.sort((a: any, b: any) =>{return a.code.localeCompare(b.code)});
      this.current_list = this.all_filieres;
    }, 1)
  }

  handle_search_field()
  {
    if(this.previous_search_value !== this.search_value)
    {
      this.previous_search_value = this.search_value;
      if(this.search_value === "")
      {
        this.current_list = this.all_filieres;
      }
      else{
        this.current_list = this.all_filieres
                                  .filter(
                                    (filiere: Filiere) =>{
                                      return (filiere.code.toLowerCase().includes(this.search_value.toLowerCase()) || filiere.intitule.toLowerCase().includes(this.search_value.toLowerCase()))}
                                  );
      }
    }
  }

  handle_filiere_click(index: number)
  {
    this.classes.emit(this.current_list[index]);
  }

}
