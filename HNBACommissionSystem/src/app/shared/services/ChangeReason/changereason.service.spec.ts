import { TestBed, inject } from '@angular/core/testing';

import { ChangereasonService } from './changereason.service';

describe('ChangereasonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangereasonService]
    });
  });

  it('should be created', inject([ChangereasonService], (service: ChangereasonService) => {
    expect(service).toBeTruthy();
  }));
});
