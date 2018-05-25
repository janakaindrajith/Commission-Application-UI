import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAchievementComponent } from './group-achievement.component';

describe('GroupAchievementComponent', () => {
  let component: GroupAchievementComponent;
  let fixture: ComponentFixture<GroupAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
