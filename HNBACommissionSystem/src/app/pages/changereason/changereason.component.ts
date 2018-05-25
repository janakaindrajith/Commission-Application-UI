import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/models/user/user.model';
import { ChangereasonService } from '../../shared/services/ChangeReason/changereason.service';
import { IChangeReason } from '../../shared/models/ChangeReason.models';

@Component({
  selector: 'app-changereason',
  templateUrl: './changereason.component.html',
  styleUrls: ['./changereason.component.css']
})
export class ChangereasonComponent implements OnInit {

  User: IUser;

  ID: number = 0;
  CODE: string = '';
  DESCRIPTION: string = '';
  ACTIVE_STATUS: number = 0;
  CREATED_BY: string = '';

  List: Array<IChangeReason> = [];
  isNEWDisabled: boolean = false;
  isEDITDisabled: boolean = false;
  isSAVEDisabled: boolean = false;
  isCANCELDisabled: boolean = false;

  constructor(private ChangereasonService: ChangereasonService) { }

  ngOnInit() {

    this.getChangeReasons();
    this.FormButtonStatusChange('LOAD');
    this.User = JSON.parse(localStorage.getItem('currentCOMUser'));
  }

  getChangeReasons() {
    this.ChangereasonService.getchangereasons()
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

      let objChangeReason: IChangeReason = {
        Id: this.ID,
        Code: this.CODE,
        Description: this.DESCRIPTION,
        ActiveStatus: this.ACTIVE_STATUS,
        CreatedBy: this.User.UserName,
        CreatedDate: null,
        EffectiveEndDate: null

      }

      console.log(objChangeReason);
      this.ChangereasonService.savechangereason(objChangeReason).subscribe((data: any) => {
        console.log(data);

        this.getChangeReasons();

        if (data.toString().replace(/"/g, '') == "ERROR") {
          console.log("Error saving Change Reason");
          alert('Error saving Change Reason');
        } else {
          console.log("Change Reason Successfully Saved.");
          alert("Successfully Saved.");
        }
      },
        (err) => {
          console.log(err);
          console.log("Error saving Change Reason");
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


  private setDesignationID = function (index, ID) {

    this.GetChangeReasonDetails(ID);
    this.FormButtonStatusChange('SELECT');

  }


  private GetChangeReasonDetails(ID) {

    this.ChangereasonService.getchangereason(ID)
      .subscribe((data) => {
        console.log(data);

        let objDesig: IChangeReason = JSON.parse(JSON.stringify(data));

        this.ID = objDesig.Id;
        this.CODE = objDesig.Code;
        this.DESCRIPTION = objDesig.Description;
        this.ACTIVE_STATUS = objDesig.ActiveStatus;

      });

  }


}
