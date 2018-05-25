import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../shared/services/Level/level.service';
import { ILevel } from '../../shared/models/Level.models';


@Component({
  selector: 'app-advisor-development-allowance',
  templateUrl: './advisor-development-allowance.component.html',
  styleUrls: ['./advisor-development-allowance.component.css']
})
export class AdvisorDevelopmentAllowanceComponent implements OnInit {


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
