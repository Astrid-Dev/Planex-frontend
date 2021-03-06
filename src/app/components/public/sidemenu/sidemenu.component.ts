import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  current_menu = -1;

  constructor(private router: Router) {

    router.events
      .subscribe(event =>
      {
        if(event instanceof NavigationEnd)
        {
          const url = event.url;
          console.log(url);
          switch (url) {
            case "/admin/files/filieres" :{
              this.current_menu = 1;
              break;
            }
            case "/admin/files/niveaux" :{
              this.current_menu = 2;
              break;
            }
            case "/admin/files/ues" :{
              this.current_menu = 3;
              break;
            }
            case "/admin/files/salles" :{
              this.current_menu = 4;
              break;
            }
            case "/admin/files/classes" :{
              this.current_menu = 5;
              break;
            }
            case "/admin/files/enseignants" :{
              this.current_menu = 6;
              break;
            }
            case "/admin/files/etudiants" :{
              this.current_menu = 8;
              break;
            }
            case "/admin/planning/courses" :{
              this.current_menu = 7;
              break;
            }
            case "/admin/home":{
              this.current_menu = 0;
              break;
            }
            case "/admin":{
              this.current_menu = 0;
              break;
            }
          }

          console.log(this.current_menu);
        }
      });

  }

  ngOnInit(): void {

  }

}
