/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BankBranchService } from './bankBranch.service';

describe('BankBranchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankBranchService]
    });
  });

  it('should ...', inject([BankBranchService], (service: BankBranchService) => {
    expect(service).toBeTruthy();
  }));
});
