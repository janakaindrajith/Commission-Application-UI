import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecConfirmationComponent } from './rec-confirmation.component';

describe('RecConfirmationComponent', () => {
  let component: RecConfirmationComponent;
  let fixture: ComponentFixture<RecConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
