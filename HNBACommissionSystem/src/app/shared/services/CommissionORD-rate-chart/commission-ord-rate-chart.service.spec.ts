import { TestBed, inject } from '@angular/core/testing';

import { CommissionORDRateChartService } from './commission-ord-rate-chart.service';

describe('CommissionORDRateChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommissionORDRateChartService]
    });
  });

  it('should be created', inject([CommissionORDRateChartService], (service: CommissionORDRateChartService) => {
    expect(service).toBeTruthy();
  }));
});
