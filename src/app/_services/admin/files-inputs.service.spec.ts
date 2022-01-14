import { TestBed } from '@angular/core/testing';

import { FilesInputsService } from './files-inputs.service';

describe('FilesInputsService', () => {
  let service: FilesInputsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesInputsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
