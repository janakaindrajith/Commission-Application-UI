import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchProcessComponent } from './batch-process.component';

describe('BatchProcessComponent', () => {
  let component: BatchProcessComponent;
  let fixture: ComponentFixture<BatchProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
