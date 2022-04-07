import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";

import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { AppComponent } from './app.component';
import { AdminHomeComponent } from './components/admin/home/home.component';
import { SidemenuComponent } from './components/public/sidemenu/sidemenu.component';
import { HeaderComponent } from './components/public/header/header.component';
import { FooterComponent } from './components/public/footer/footer.component';
import { FileUploadComponent } from './components/admin/files-inputs/file-upload/file-upload.component';
import { FilieresInputFileComponent } from './components/admin/files-inputs/filieres-input-file/filieres-input-file.component';
import { NiveauxInputFileComponent } from './components/admin/files-inputs/niveaux-input-file/niveaux-input-file.component';
import { UesInputFileComponent } from './components/admin/files-inputs/ues-input-file/ues-input-file.component';
import { SallesInputFileComponent } from './components/admin/files-inputs/salles-input-file/salles-input-file.component';
import { ClassesInputFileComponent } from './components/admin/files-inputs/classes-input-file/classes-input-file.component';
import { EnseignantsInputFileComponent } from './components/admin/files-inputs/enseignants-input-file/enseignants-input-file.component';
import { DndDirective } from './_directives/dnd.directive';
import { ProgressComponent } from './components/admin/files-inputs/progress/progress.component';
import { FilesInputsDescriptionComponent } from './components/admin/files-inputs/files-inputs-description/files-inputs-description.component';
import { FilieresListComponent } from './components/admin/planning/filieres-list/filieres-list.component';
import { CoursesComponent } from './components/admin/planning/courses/courses.component';
import { ClassesListComponent } from './components/admin/planning/classes-list/classes-list.component';
import { KnobComponent } from './components/admin/files-inputs/knob/knob.component';
import { ConnectionErrorComponent } from './components/public/connection-error/connection-error.component';
import { TimeTableComponent } from './components/admin/planning/time-table/time-table.component';
import { LoaderComponent } from './components/public/loader/loader.component';
import { CourseHeaderPlanningComponent } from './components/public/course-header-planning/course-header-planning.component';
import { InputsModalComponent } from './components/admin/planning/inputs-modal/inputs-modal.component';
import { AutocompleteComponent } from './components/public/autocomplete/autocomplete.component';
import { EtudiantsInputFileComponent } from './components/admin/files-inputs/etudiants-input-file/etudiants-input-file.component';
import { SelectClasseGroupsComponent } from './components/admin/planning/select-classe-groups/select-classe-groups.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    SidemenuComponent,
    HeaderComponent,
    FooterComponent,
    FileUploadComponent,
    FilieresInputFileComponent,
    NiveauxInputFileComponent,
    UesInputFileComponent,
    SallesInputFileComponent,
    ClassesInputFileComponent,
    EnseignantsInputFileComponent,
    DndDirective,
    ProgressComponent,
    FilesInputsDescriptionComponent,
    FilieresListComponent,
    CoursesComponent,
    ClassesListComponent,
    KnobComponent,
    ConnectionErrorComponent,
    TimeTableComponent,
    LoaderComponent,
    CourseHeaderPlanningComponent,
    InputsModalComponent,
    AutocompleteComponent,
    EtudiantsInputFileComponent,
    SelectClasseGroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AutocompleteLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
