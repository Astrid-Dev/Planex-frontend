import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesInputFileComponent } from './classes-input-file.component';

describe('ClassesInputFileComponent', () => {
  let component: ClassesInputFileComponent;
  let fixture: ComponentFixture<ClassesInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesInputFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
