import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncevtiveRateBancComponent } from './incevtive-rate-banc.component';

describe('IncevtiveRateBancComponent', () => {
  let component: IncevtiveRateBancComponent;
  let fixture: ComponentFixture<IncevtiveRateBancComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncevtiveRateBancComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncevtiveRateBancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
