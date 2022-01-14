import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SallesInputFileComponent } from './salles-input-file.component';

describe('SallesInputFileComponent', () => {
  let component: SallesInputFileComponent;
  let fixture: ComponentFixture<SallesInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SallesInputFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SallesInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
