import { TestBed, inject } from '@angular/core/testing';

import { UploadDocTypeService } from './upload-doc-type.service';

describe('UploadDocTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadDocTypeService]
    });
  });

  it('should be created', inject([UploadDocTypeService], (service: UploadDocTypeService) => {
    expect(service).toBeTruthy();
  }));
});
