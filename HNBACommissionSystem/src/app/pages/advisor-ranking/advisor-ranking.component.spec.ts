import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorRankingComponent } from './advisor-ranking.component';

describe('AdvisorRankingComponent', () => {
  let component: AdvisorRankingComponent;
  let fixture: ComponentFixture<AdvisorRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
