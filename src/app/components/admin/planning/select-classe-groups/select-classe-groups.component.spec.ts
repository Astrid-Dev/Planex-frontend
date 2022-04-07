import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectClasseGroupsComponent } from './select-classe-groups.component';

describe('SelectClasseGroupsComponent', () => {
  let component: SelectClasseGroupsComponent;
  let fixture: ComponentFixture<SelectClasseGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectClasseGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectClasseGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
