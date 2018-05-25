import { TestBed, inject } from '@angular/core/testing';

import { LeaderCodeSearchService } from './leader-code-search.service';

describe('LeaderCodeSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaderCodeSearchService]
    });
  });

  it('should be created', inject([LeaderCodeSearchService], (service: LeaderCodeSearchService) => {
    expect(service).toBeTruthy();
  }));
});
