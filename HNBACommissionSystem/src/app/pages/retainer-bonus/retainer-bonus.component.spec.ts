import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetainerBonusComponent } from './retainer-bonus.component';

describe('RetainerBonusComponent', () => {
  let component: RetainerBonusComponent;
  let fixture: ComponentFixture<RetainerBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetainerBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetainerBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
