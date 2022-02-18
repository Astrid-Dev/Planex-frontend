import { TestBed } from '@angular/core/testing';

import { JoursService } from './jours.service';

describe('JoursService', () => {
  let service: JoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
