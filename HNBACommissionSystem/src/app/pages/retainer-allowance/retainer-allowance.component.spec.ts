import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetainerAllowanceComponent } from './retainer-allowance.component';

describe('RetainerAllowanceComponent', () => {
  let component: RetainerAllowanceComponent;
  let fixture: ComponentFixture<RetainerAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetainerAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetainerAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
