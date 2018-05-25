import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/models/user/user.model';
import { LevelService } from '../../shared/services/Level/level.service';
import { ILevel } from '../../shared/models/Level.models';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {


  User: IUser;
  
    ID: number = 0;
    CODE: string = '';
    DESCRIPTION: string = '';
    ACTIVE_STATUS: number = 0;
    TYPE: number = 0;
    CREATED_BY: string = '';
  
    List: Array<ILevel> = [];
    isNEWDisabled: boolean = false;
    isEDITDisabled: boolean = false;
    isSAVEDisabled: boolean = false;
    isCANCELDisabled: boolean = false;
  
    constructor(private LevelService: LevelService) { }

  ngOnInit() {
    this.getLevels();
    this.FormButtonStatusChange('LOAD');
    this.User = JSON.parse(localStorage.getItem('currentCOMUser'));
  }

  getLevels() {
    this.LevelService.getLevel()
      .subscribe((data) => {

        this.List = data;
        console.log(JSON.stringify(data));
      },
      (err) => console.log(err));
  }

  CancelRecord() {
    this.FormButtonStatusChange('CANCEL');
  }

  NewRecord() {
    this.FormButtonStatusChange('NEW');
  }


  EditRecord() {
    this.FormButtonStatusChange('EDIT');
  }

  SaveRecord() {


    try {

      let obj: ILevel = {
        Id: this.ID,
        Code: this.CODE,
        Description: this.DESCRIPTION,
        ActiveStatus: this.ACTIVE_STATUS,
        Type: this.TYPE,
        CreatedBy: this.User.UserName,
        CreatedDate: null,
        EffectiveEndDate: null,
        SeqNo : 0

      }
      console.log(obj);

      this.LevelService.saveLevel(obj).subscribe((data: any) => {
        console.log(data);

        this.getLevels();

        if (data.toString().replace(/"/g, '') == "ERROR") {
          console.log("Error saving Designation");
          alert("Error Occured.");
        } else {
          console.log("Designation Successfully Saved.");
          alert("Successfully Saved.");
        }
      },
        (err) => {
          console.log(err);
          console.log("Error saving Designation");
          alert("Error Occured.");
        },
        () => console.log('done'));

    } catch (error) {

    }


    this.FormButtonStatusChange('SAVE');
  }


  FormButtonStatusChange(Status) {
    if (Status == 'NEW') {
      this.isNEWDisabled = true;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = false;
      this.isCANCELDisabled = false;


      this.ID = 0;
      this.CODE = "";
      this.DESCRIPTION = "";
      this.ACTIVE_STATUS = 0;
    }
    if (Status == 'EDIT') {
      this.isNEWDisabled = true;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = false;
      this.isCANCELDisabled = false;
    }
    if (Status == 'SELECT') {
      this.isNEWDisabled = true;
      this.isEDITDisabled = false;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = false;
    }
    if (Status == 'SAVE') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.ID = 0;
      this.CODE = "";
      this.DESCRIPTION = "";
      this.ACTIVE_STATUS = 0;
    }
    if (Status == 'CANCEL') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.ID = 0;
      this.CODE = "";
      this.DESCRIPTION = "";
      this.ACTIVE_STATUS = 0;
    }
    if (Status == 'LOAD') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.ID = 0;
      this.CODE = "";
      this.DESCRIPTION = "";
      this.ACTIVE_STATUS = 0;
    }
  }


  private setLevelID = function (index, ID) {


    this.GetLevelDetails(ID);

    this.FormButtonStatusChange('SELECT');

  }


  private GetLevelDetails(ID) {

    this.LevelService.getLevelByID(ID)
      .subscribe((data) => {
        console.log(data);

        let obj: ILevel = JSON.parse(JSON.stringify(data));

        this.ID = obj.Id;
        this.CODE = obj.Code;
        this.DESCRIPTION = obj.Description;
        this.ACTIVE_STATUS = obj.ActiveStatus;
        this.TYPE = obj.Type;

      });

  }

}
