import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncevtiveConfigBancComponent } from './incevtive-config-banc.component';

describe('IncevtiveConfigBancComponent', () => {
  let component: IncevtiveConfigBancComponent;
  let fixture: ComponentFixture<IncevtiveConfigBancComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncevtiveConfigBancComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncevtiveConfigBancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
