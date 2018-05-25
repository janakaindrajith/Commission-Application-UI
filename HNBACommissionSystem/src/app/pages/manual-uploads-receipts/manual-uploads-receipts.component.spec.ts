import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualUploadsReceiptsComponent } from './manual-uploads-receipts.component';

describe('ManualUploadsReceiptsComponent', () => {
  let component: ManualUploadsReceiptsComponent;
  let fixture: ComponentFixture<ManualUploadsReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualUploadsReceiptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualUploadsReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
