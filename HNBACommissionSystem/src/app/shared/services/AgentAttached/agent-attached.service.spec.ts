import { TestBed, inject } from '@angular/core/testing';

import { AgentAttachedService } from './agent-attached.service';

describe('AgentAttachedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentAttachedService]
    });
  });

  it('should be created', inject([AgentAttachedService], (service: AgentAttachedService) => {
    expect(service).toBeTruthy();
  }));
});
