import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UesInputFileComponent } from './ues-input-file.component';

describe('UesInputFileComponent', () => {
  let component: UesInputFileComponent;
  let fixture: ComponentFixture<UesInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UesInputFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UesInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
