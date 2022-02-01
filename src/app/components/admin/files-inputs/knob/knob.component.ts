import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss']
})
export class KnobComponent implements OnInit {

  @Input() value: number = 0;
  @Input() message: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
