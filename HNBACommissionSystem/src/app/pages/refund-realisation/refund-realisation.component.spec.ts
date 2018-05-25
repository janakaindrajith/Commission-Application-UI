import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundRealisationComponent } from './refund-realisation.component';

describe('RefundRealisationComponent', () => {
  let component: RefundRealisationComponent;
  let fixture: ComponentFixture<RefundRealisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundRealisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundRealisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
