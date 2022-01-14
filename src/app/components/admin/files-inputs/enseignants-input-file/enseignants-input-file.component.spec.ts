import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantsInputFileComponent } from './enseignants-input-file.component';

describe('EnseignantsInputFileComponent', () => {
  let component: EnseignantsInputFileComponent;
  let fixture: ComponentFixture<EnseignantsInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignantsInputFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnseignantsInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
