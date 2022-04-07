import { TestBed } from '@angular/core/testing';

import { GroupesCoursService } from './groupes-cours.service';

describe('GroupesCoursService', () => {
  let service: GroupesCoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupesCoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
