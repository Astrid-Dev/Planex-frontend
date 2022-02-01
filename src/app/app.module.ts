import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";

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
import { FilieresListComponent } from './components/admin/schedule/filieres-list/filieres-list.component';
import { CoursesComponent } from './components/admin/schedule/courses/courses.component';
import { ClassesListComponent } from './components/admin/schedule/classes-list/classes-list.component';
import { KnobComponent } from './components/admin/files-inputs/knob/knob.component';

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
    KnobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
