import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminHomeComponent } from "./components/admin/home/home.component";
import {FilieresInputFileComponent} from "./components/admin/files-inputs/filieres-input-file/filieres-input-file.component";
import {UesInputFileComponent} from "./components/admin/files-inputs/ues-input-file/ues-input-file.component";
import {EnseignantsInputFileComponent} from "./components/admin/files-inputs/enseignants-input-file/enseignants-input-file.component";
import {ClassesInputFileComponent} from "./components/admin/files-inputs/classes-input-file/classes-input-file.component";
import {NiveauxInputFileComponent} from "./components/admin/files-inputs/niveaux-input-file/niveaux-input-file.component";
import {SallesInputFileComponent} from "./components/admin/files-inputs/salles-input-file/salles-input-file.component";
import {FilesInputsDescriptionComponent} from "./components/admin/files-inputs/files-inputs-description/files-inputs-description.component";
import {CoursesComponent} from "./components/admin/schedule/courses/courses.component";

const routes: Routes = [
  { path: 'admin',
    children: [
      { path: 'home', component: AdminHomeComponent },
      {
        path: 'files',
        children: [
          { path: 'filieres', component: FilieresInputFileComponent },
          { path: 'ues', component: UesInputFileComponent },
          { path: 'enseignants', component: EnseignantsInputFileComponent },
          { path: 'classes', component: ClassesInputFileComponent },
          { path: 'niveaux', component: NiveauxInputFileComponent },
          { path: 'salles', component: SallesInputFileComponent },
        ]
      },
      {
        path: 'schedule',
        children: [
          { path: 'courses', component: CoursesComponent },
        ]
      }
    ]
  },
  { path: '', pathMatch: 'full', component: AdminHomeComponent },
  { path: '**', redirectTo: 'admin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
