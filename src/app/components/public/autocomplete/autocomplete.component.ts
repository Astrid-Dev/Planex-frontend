import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input() data = [];
  @Input() keyword: string = "";
  @Input() placeholder = "";
  @Input() notFound = "Aucun résultat trouvé !";
  @Input() initialValue: any = {}

  @Output("on-select") selected_value: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectEvent(value: any){
    this.selected_value.emit(value);
  }

}
