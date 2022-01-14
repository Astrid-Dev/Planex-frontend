import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauxInputFileComponent } from './niveaux-input-file.component';

describe('NiveauxInputFileComponent', () => {
  let component: NiveauxInputFileComponent;
  let fixture: ComponentFixture<NiveauxInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveauxInputFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveauxInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
