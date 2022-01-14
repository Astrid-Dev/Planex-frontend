import { Component, OnInit } from '@angular/core';
import {FilesInputsService} from "../../../../_services/admin/files-inputs.service";

@Component({
  selector: 'app-filieres-input-file',
  templateUrl: './filieres-input-file.component.html',
  styleUrls: ['./filieres-input-file.component.scss']
})
export class FilieresInputFileComponent implements OnInit {

  constructor(private filesInputsService: FilesInputsService) { }

  ngOnInit(): void {
  }

}
