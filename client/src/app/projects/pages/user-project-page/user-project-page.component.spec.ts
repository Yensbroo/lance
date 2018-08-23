import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectPageComponent } from './user-project-page.component';

describe('UserProjectPageComponent', () => {
  let component: UserProjectPageComponent;
  let fixture: ComponentFixture<UserProjectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProjectPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
