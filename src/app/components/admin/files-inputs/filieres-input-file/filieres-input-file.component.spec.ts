import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilieresInputFileComponent } from './filieres-input-file.component';

describe('FilieresInputFileComponent', () => {
  let component: FilieresInputFileComponent;
  let fixture: ComponentFixture<FilieresInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilieresInputFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilieresInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
