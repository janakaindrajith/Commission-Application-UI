import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancaOfficerComponent } from './banca-officer.component';

describe('BancaOfficerComponent', () => {
  let component: BancaOfficerComponent;
  let fixture: ComponentFixture<BancaOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancaOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancaOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
