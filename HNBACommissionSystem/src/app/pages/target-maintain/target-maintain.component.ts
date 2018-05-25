import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/models/user/user.model';
import { TargetsService } from '../../shared/services/Targets/targets.service';
import { Itarget } from '../../shared/models/Targets.models';

import { LevelService } from '../../shared/services/Level/level.service';
import { ILevel } from '../../shared/models/Level.models';

@Component({
  selector: 'app-target-maintain',
  templateUrl: './target-maintain.component.html',
  styleUrls: ['./target-maintain.component.css']
})
export class TargetMaintainComponent implements OnInit {


  User: IUser;

  ID: number = 0;
  LEVEL_ID: number = 0;
  TYPE_ID: number = 0;
  YEAR: number = 0;
  YEARLY_TARGET: number = 0;
  CREATED_BY: string = '';
  ACTIVE_STATUS: number = 0;


  TargetList: Array<Itarget> = [];

  AgentLevelList: Array<ILevel> = [];

  isNEWDisabled: boolean = false;
  isEDITDisabled: boolean = false;
  isSAVEDisabled: boolean = false;
  isCANCELDisabled: boolean = false;

  constructor(private TargetsService: TargetsService, private LevelService: LevelService) { }

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


  SaveRecord() {


    try {

      let obj: Itarget = {
        Id: this.ID,
        LevelId: this.LEVEL_ID,
        TypeId: this.TYPE_ID,
        Year: this.YEAR,
        YearlyTarget: this.YEARLY_TARGET,
        CreatedBy: this.User.UserName,
        ActiveStatus: this.ACTIVE_STATUS


      }
      console.log(obj);

      this.TargetsService.savetarget(obj).subscribe((data: any) => {
        console.log(data);

        this.getTargets();

        if (data.toString().replace(/"/g, '') == "ERROR") {
          console.log("Error saving Target");
          alert("Error Occured.");
        } else {
          console.log("Target Successfully Saved.");
          alert("Successfully Saved.");
        }
      },
        (err) => {
          console.log(err);
          console.log("Error saving Target");
          alert("Error Occured.");
        },
        () => console.log('done'));

    } catch (error) {

    }


    //this.FormButtonStatusChange('SAVE');


  }



  getTargets() {
    try {

      this.TargetsService.gettargets()
        .subscribe((data) => {

          this.TargetList = data;

          console.log(this.TargetList);

        },
        (err) => console.log(err));

    } catch (error) {

    }

  }


}
