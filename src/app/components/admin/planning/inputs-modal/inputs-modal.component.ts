import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-inputs-modal',
  templateUrl: './inputs-modal.component.html',
  styleUrls: ['./inputs-modal.component.scss']
})
export class InputsModalComponent implements OnInit {

  @Input() periode: any = {};
  @Input() jour: string = "";
  @Input() ues: any = [];
  @Input() enseignants: any = [];
  @Input() enseignants2: any = [];
  @Input() salles: any = [];
  @Input("default") defaultItem: any = {};

  @Output("on-confirm") confirm: EventEmitter<any> = new EventEmitter();

  result: any = {
    ueId: null,
    ue: null,
    salleId: null,
    salle: null,
    enseignantId: null,
    enseignant: null,
    enseignant2Id: null,
    enseignant2: null
  }

  constructor() { }

  ngOnInit(): void {
  }

  on_select_ue(value: any)
  {
    this.result = {...this.result, ueId: value.id, ue: value}
  }

  on_select_salle(value: any)
  {
    this.result = {...this.result, salleId: value.id, salle: value}
  }

  on_select_enseignant_principal(value: any)
  {
    this.result = {...this.result, enseignantId: value.id, enseignant: value}
  }

  on_select_enseignant_secondaire(value: any)
  {
    this.result = {...this.result, enseignant2Id: value.id, enseignant2: value}
  }

  on_confirm()
  {
    this.confirm.emit(this.result);
    this.on_close();
  }

  on_close()
  {
    this.result = {
      ueId: null,
      ue: null,
      salleId: null,
      salle: null,
      enseignantId: null,
      enseignant: null,
      enseignant2Id: null,
      enseignant2: null
    }

  }

}
