import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverridingRateChartComponent } from './overriding-rate-chart.component';

describe('OverridingRateChartComponent', () => {
  let component: OverridingRateChartComponent;
  let fixture: ComponentFixture<OverridingRateChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverridingRateChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverridingRateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
