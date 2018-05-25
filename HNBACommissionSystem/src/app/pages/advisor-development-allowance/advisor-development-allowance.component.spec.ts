import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorDevelopmentAllowanceComponent } from './advisor-development-allowance.component';

describe('AdvisorDevelopmentAllowanceComponent', () => {
  let component: AdvisorDevelopmentAllowanceComponent;
  let fixture: ComponentFixture<AdvisorDevelopmentAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorDevelopmentAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorDevelopmentAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
