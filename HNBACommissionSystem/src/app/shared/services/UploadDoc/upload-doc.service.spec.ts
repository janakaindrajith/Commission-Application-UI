import { TestBed, inject } from '@angular/core/testing';

import { UploadDocService } from './upload-doc.service';

describe('UploadDocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadDocService]
    });
  });

  it('should be created', inject([UploadDocService], (service: UploadDocService) => {
    expect(service).toBeTruthy();
  }));
});
