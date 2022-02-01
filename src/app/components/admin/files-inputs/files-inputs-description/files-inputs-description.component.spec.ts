import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesInputsDescriptionComponent } from './files-inputs-description.component';

describe('FilesInputsDescriptionComponent', () => {
  let component: FilesInputsDescriptionComponent;
  let fixture: ComponentFixture<FilesInputsDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesInputsDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesInputsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
