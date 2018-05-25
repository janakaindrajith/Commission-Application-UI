import { TestBed, inject } from '@angular/core/testing';

import { PIDSearchService } from './pidsearch.service';

describe('PIDSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PIDSearchService]
    });
  });

  it('should be created', inject([PIDSearchService], (service: PIDSearchService) => {
    expect(service).toBeTruthy();
  }));
});
