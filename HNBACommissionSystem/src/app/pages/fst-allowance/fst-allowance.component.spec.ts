import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FstAllowanceComponent } from './fst-allowance.component';

describe('FstAllowanceComponent', () => {
  let component: FstAllowanceComponent;
  let fixture: ComponentFixture<FstAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FstAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FstAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
