import { TestBed, inject } from '@angular/core/testing';

import { FSTAllowanceService } from './fstallowance.service';

describe('FSTAllowanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FSTAllowanceService]
    });
  });

  it('should be created', inject([FSTAllowanceService], (service: FSTAllowanceService) => {
    expect(service).toBeTruthy();
  }));
});
