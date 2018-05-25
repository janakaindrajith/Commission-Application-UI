import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualUploadsComponent } from './manual-uploads.component';

describe('ManualUploadsComponent', () => {
  let component: ManualUploadsComponent;
  let fixture: ComponentFixture<ManualUploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualUploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
