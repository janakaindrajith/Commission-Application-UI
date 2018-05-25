import { TestBed, inject } from '@angular/core/testing';

import { CommissionRateChartService } from './commission-rate-chart.service';

describe('CommissionRateChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommissionRateChartService]
    });
  });

  it('should be created', inject([CommissionRateChartService], (service: CommissionRateChartService) => {
    expect(service).toBeTruthy();
  }));
});
