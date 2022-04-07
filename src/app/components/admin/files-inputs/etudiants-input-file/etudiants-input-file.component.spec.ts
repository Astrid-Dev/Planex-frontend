import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantsInputFileComponent } from './etudiants-input-file.component';

describe('EtudiantsInputFileComponent', () => {
  let component: EtudiantsInputFileComponent;
  let fixture: ComponentFixture<EtudiantsInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantsInputFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtudiantsInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
