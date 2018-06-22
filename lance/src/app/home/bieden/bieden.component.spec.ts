import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiedenComponent } from './bieden.component';

describe('BiedenComponent', () => {
  let component: BiedenComponent;
  let fixture: ComponentFixture<BiedenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiedenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiedenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
