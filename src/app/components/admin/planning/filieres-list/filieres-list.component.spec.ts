import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilieresListComponent } from './filieres-list.component';

describe('FilieresListComponent', () => {
  let component: FilieresListComponent;
  let fixture: ComponentFixture<FilieresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilieresListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilieresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
