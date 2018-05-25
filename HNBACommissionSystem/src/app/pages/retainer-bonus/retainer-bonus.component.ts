import { Component, OnInit } from '@angular/core';

import { LevelService } from '../../shared/services/Level/level.service';
import { ILevel } from '../../shared/models/Level.models';

@Component({
  selector: 'app-retainer-bonus',
  templateUrl: './retainer-bonus.component.html',
  styleUrls: ['./retainer-bonus.component.css']
})
export class RetainerBonusComponent implements OnInit {

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
