import { TestBed, inject } from '@angular/core/testing';

import { AgentHistoryService } from './agent-history.service';

describe('AgentHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentHistoryService]
    });
  });

  it('should be created', inject([AgentHistoryService], (service: AgentHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
