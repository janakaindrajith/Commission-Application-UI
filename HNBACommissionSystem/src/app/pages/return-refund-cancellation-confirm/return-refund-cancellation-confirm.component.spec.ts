import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRefundCancellationConfirmComponent } from './return-refund-cancellation-confirm.component';

describe('ReturnRefundCancellationConfirmComponent', () => {
  let component: ReturnRefundCancellationConfirmComponent;
  let fixture: ComponentFixture<ReturnRefundCancellationConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnRefundCancellationConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRefundCancellationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
