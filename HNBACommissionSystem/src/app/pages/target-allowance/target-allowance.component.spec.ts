import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetAllowanceComponent } from './target-allowance.component';

describe('TargetAllowanceComponent', () => {
  let component: TargetAllowanceComponent;
  let fixture: ComponentFixture<TargetAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
