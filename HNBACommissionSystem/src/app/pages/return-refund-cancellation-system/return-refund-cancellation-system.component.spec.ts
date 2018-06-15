import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRefundCancellationSystemComponent } from './return-refund-cancellation-system.component';

describe('ReturnRefundCancellationSystemComponent', () => {
  let component: ReturnRefundCancellationSystemComponent;
  let fixture: ComponentFixture<ReturnRefundCancellationSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnRefundCancellationSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRefundCancellationSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
