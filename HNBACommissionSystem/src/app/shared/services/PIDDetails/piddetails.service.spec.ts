import { TestBed, inject } from '@angular/core/testing';

import { PIDDetailsService } from './piddetails.service';

describe('PIDDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PIDDetailsService]
    });
  });

  it('should be created', inject([PIDDetailsService], (service: PIDDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
