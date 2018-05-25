import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangereasonComponent } from './changereason.component';

describe('ChangereasonComponent', () => {
  let component: ChangereasonComponent;
  let fixture: ComponentFixture<ChangereasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangereasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangereasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
