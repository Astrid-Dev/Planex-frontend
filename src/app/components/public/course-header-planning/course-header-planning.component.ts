import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-course-header-planning',
  templateUrl: './course-header-planning.component.html',
  styleUrls: ['./course-header-planning.component.scss']
})
export class CourseHeaderPlanningComponent implements OnInit {

  @Input() filiere = "Filiere";
  @Input() classe = "Classe"

  constructor() { }

  ngOnInit(): void {
  }

}
