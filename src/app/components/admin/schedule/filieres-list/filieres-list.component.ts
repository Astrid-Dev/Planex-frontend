import { Component, OnInit } from '@angular/core';
import { HelpService } from 'src/app/_services/public/help.service';

@Component({
  selector: 'app-filieres-list',
  templateUrl: './filieres-list.component.html',
  styleUrls: ['./filieres-list.component.scss']
})
export class FilieresListComponent implements OnInit {

  constructor(public helpService: HelpService) { }

  list: any[] =[
    {
      code: "ICT4D",
      intitule: "Information Communication and Technologies for development"
    },
    {
      code: "MATH",
      intitule: "Mathématiques"
    },
    {
      code: "INF",
      intitule: "Informatique Fondamentale"
    },
    {
      code: "CHIM",
      intitule: "Chimie"
    },
    {
      code: "PHY",
      intitule: "Physique"
    }
  ]

  all_filieres: any[] = this.list;

  search_value: string = "";

  ngOnInit(): void {
  }

  filter_filiere_list()
  {
    let a: string = "";
    console.log(a.startsWith(""));
    console.log(this.search_value);
    console.log(this.list.filter((item) => {
      return item.code.startsWith(this.search_value)
    }));
    console.log(this.list);
  }

}
