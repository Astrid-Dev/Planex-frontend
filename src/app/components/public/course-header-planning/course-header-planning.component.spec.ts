import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseHeaderPlanningComponent } from './course-header-planning.component';

describe('CourseHeaderPlanningComponent', () => {
  let component: CourseHeaderPlanningComponent;
  let fixture: ComponentFixture<CourseHeaderPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseHeaderPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseHeaderPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
