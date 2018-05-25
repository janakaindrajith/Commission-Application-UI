import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../shared/services/Level/level.service';
import { ILevel } from '../../shared/models/Level.models';

@Component({
  selector: 'app-group-achievement',
  templateUrl: './group-achievement.component.html',
  styleUrls: ['./group-achievement.component.css']
})
export class GroupAchievementComponent implements OnInit {

  AgentLevelList: Array<ILevel> = [];

  constructor(private LevelService: LevelService) { }

  ngOnInit() {
    this.getLevels();
  }

  getLevels() {
    this.LevelService.getLevel()
      .subscribe((data) => {

        this.AgentLevelList = data;
        console.log(JSON.stringify(data));
      },
      (err) => console.log(err));
  }

}
