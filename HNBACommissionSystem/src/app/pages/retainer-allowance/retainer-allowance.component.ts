import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../shared/services/Level/level.service';
import { ILevel } from '../../shared/models/Level.models';

@Component({
  selector: 'app-retainer-allowance',
  templateUrl: './retainer-allowance.component.html',
  styleUrls: ['./retainer-allowance.component.css']
})
export class RetainerAllowanceComponent implements OnInit {

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
