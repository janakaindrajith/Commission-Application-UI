import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionRateChartComponent } from './commission-rate-chart.component';

describe('CommissionRateChartComponent', () => {
  let component: CommissionRateChartComponent;
  let fixture: ComponentFixture<CommissionRateChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionRateChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionRateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
