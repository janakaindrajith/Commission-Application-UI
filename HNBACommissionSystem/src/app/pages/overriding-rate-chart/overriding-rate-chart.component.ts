import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/models/user/user.model';

import { DatePipe } from '@angular/common';
import { MomentModule } from 'angular2-moment';

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { NgZone, Inject, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { AgentTypeService } from '../../shared/services/AgentType/AgentType.service';
import { IAgentType } from '../../shared/models/AgentType.models';

import { PropertyService } from '../../shared/services/Property/property.service';
import { Iproperty } from '../../shared/models/Property.models';

import { CommissionORDRateChartService } from '../../shared/services/CommissionORD-rate-chart/commission-ord-rate-chart.service';
import { ICommissionORDRateChart } from '../../shared/models/CommissionORDRateChart.models';




@Component({
  selector: 'app-overriding-rate-chart',
  templateUrl: './overriding-rate-chart.component.html',
  styleUrls: ['./overriding-rate-chart.component.css']
})
export class OverridingRateChartComponent implements OnInit {

  AgentTypeList: Array<IAgentType> = [];
  LevelList: Array<IAgentType> = [];

  ORDRateChartList: Array<ICommissionORDRateChart> = [];

  User: IUser;

  datepickerOpts = {
    format: 'dd/mm/yyyy'
  }

  ID: number = 0;
  CODE: string = '';
  DESCRIPTION: string = '';
  AGENT_TYPE: string = '';
  COM_LEVEL: string = '';
  COM_YEAR: string = '';
  COM_RATE: string = '';
  SQL_WHERE: string = '';
  DATE_FROM: Date = null;
  DATE_TO: Date = null;
  ACTIVE_STATUS: number = 0;
  rtnDate: Date = null;

  CODE_CLS = "form-group";
  DESCRIPTION_CLS = "form-group";
  AGENT_TYPE_CLS = "form-group";
  COM_LEVEL_CLS = "form-group";
  COM_YEAR_CLS = "form-group";
  COM_RATE_CLS = "form-group";
  SQL_WHERE_CLS = "form-group";
  DATE_FROM_CLS = "form-group";
  DATE_TO_CLS = "form-group";
  ACTIVE_STATUS_CLS = "form-group";


  CREATED_BY: string = '';

  isNEWDisabled: boolean = false;
  isEDITDisabled: boolean = false;
  isSAVEDisabled: boolean = false;
  isCANCELDisabled: boolean = false;

  selectedRow : Number;

  constructor(private AgentTypeService: AgentTypeService, private PropertyService: PropertyService, private CommissionORDRateChartService: CommissionORDRateChartService) { }
  //constructor(private AgentTypeService: AgentTypeService,private PropertyService: PropertyService) { }


  ngOnInit() {

    this.getAgentTypes();

    this.getLevelDetails();

    this.getComORDRateDetails();

    this.FormButtonStatusChange('LOAD');

    this.User = JSON.parse(localStorage.getItem('currentCOMUser'));

  }


  getComORDRateDetailsByID(ID) {
    this.CommissionORDRateChartService.getCommissionORDRateChart(ID)
      .subscribe((data) => {
        console.log(data);

        let obj: ICommissionORDRateChart = JSON.parse(JSON.stringify(data));

        this.ID = obj.Id,
          this.CODE = obj.Code,
          this.DESCRIPTION = obj.Description,
          this.AGENT_TYPE = obj.AgtTypeId.toString(),
          this.COM_LEVEL = obj.ComLevelId.toString(),
          this.COM_YEAR = obj.ComYearId.toString(),
          this.COM_RATE = obj.Rate.toString(),
          this.SQL_WHERE = obj.Sql.toString(),
          this.DATE_FROM = this.SetDateFormatNew(obj.FromDate.toString()),
          this.DATE_TO = this.SetDateFormatNew(obj.ToDate.toString()),
          this.ACTIVE_STATUS = obj.ActiveStatus

      });
  }

  private setORDRateID = function (index, ID) {

    this.selectedRow = index;
    this.getComORDRateDetailsByID(ID);
    this.FormButtonStatusChange('SELECT');

  }


  getComORDRateDetails() {
    this.CommissionORDRateChartService.getCommissionORDRateCharts()
      .subscribe((data) => {

        this.ORDRateChartList = data;
        console.log(JSON.stringify(data));

      },
      (err) => console.log(err));
  }


  getLevelDetails() {
    this.PropertyService.getpropertyByType('LEVEL')
      .subscribe((data) => {

        this.LevelList = data;
        console.log(JSON.stringify(data));


      },
      (err) => console.log(err));
  }

  getAgentTypes() {
    try {

      this.AgentTypeService.getAgents()
        .subscribe((data) => {

          this.AgentTypeList = data;

          console.log(this.AgentTypeList);

        },
        (err) => console.log(err));

    } catch (error) {

    }

  }

  SaveRecord() {

    try {

      if (this.CODE == '') {
        this.CODE_CLS = "has-error";
        return;
      } else {
        this.CODE_CLS = "form-group"; //AgentTypeClass
      }
      if (this.DESCRIPTION == '') {
        this.DESCRIPTION_CLS = "has-error";
        return;
      } else {
        this.DESCRIPTION_CLS = "form-group"; //AgentTypeClass
      }
      if (this.AGENT_TYPE == '') {
        this.AGENT_TYPE_CLS = "has-error";
        return;
      } else {
        this.AGENT_TYPE_CLS = "form-group"; //AgentTypeClass
      }
      if (this.COM_LEVEL == '') {
        this.COM_LEVEL_CLS = "has-error";
        return;
      } else {
        this.COM_LEVEL_CLS = "form-group"; //AgentTypeClass
      }
      if (this.COM_YEAR == '') {
        this.COM_YEAR_CLS = "has-error";
        return;
      } else {
        this.COM_YEAR_CLS = "form-group"; //AgentTypeClass
      }
      if (this.COM_RATE == '') {
        this.COM_RATE_CLS = "has-error";
        return;
      } else {
        this.COM_RATE_CLS = "form-group"; //AgentTypeClass
      }
      if (this.ACTIVE_STATUS == undefined) {
        this.ACTIVE_STATUS_CLS = "has-error";
      } else {
        this.ACTIVE_STATUS_CLS = "form-group"; //AgentTypeClass
      }

      if (Number(this.DATE_FROM).toString() == 'NaN') {
        this.DATE_FROM_CLS = "has-error";
        return;
      } else {
        this.DATE_FROM_CLS = "form-group"; //AgentTypeClass
      }

      if (Number(this.DATE_TO).toString() == 'NaN') {
        this.DATE_TO_CLS = "has-error";
        return;
      } else {
        this.DATE_TO_CLS = "form-group"; //AgentTypeClass
      }

      let obj1: ICommissionORDRateChart = {
        Id: this.ID,
        Code: this.CODE,
        Description: this.DESCRIPTION,
        AgtTypeId: parseInt(this.AGENT_TYPE),
        ComLevelId: parseInt(this.COM_LEVEL),
        ComYearId: parseInt(this.COM_YEAR),
        Rate: parseFloat(this.COM_RATE.toString()),
        Sql: this.SQL_WHERE,
        FromDate: this.SetDateFormat(this.DATE_FROM).toString(),
        ToDate: this.SetDateFormat(this.DATE_TO).toString(),
        CreatedBy: this.User.UserName,
        ActiveStatus: this.ACTIVE_STATUS,

      }


      console.log(obj1);

      this.CommissionORDRateChartService.saveCommissionORDRateChart(obj1).subscribe((data: any) => {
        console.log(data);


        this.getComORDRateDetails();

        if (data.toString().replace(/"/g, '') == "ERROR") {
          console.log("Error saving Designation");
          alert("Error Occured.");
        } else {
          console.log("Commission Rates Successfully Saved.");
          alert("Successfully Saved.");

          this.FormButtonStatusChange('SAVE');
        }
      },
        (err) => {
          console.log(err);
          console.log("Error saving Designation");
          alert("Error Occured.");
        },
        () => console.log('done'));

    } catch (error) {
      console.error(error);

      this.getComORDRateDetails();

      
    }
  }


  CancelRecord() {


    this.CODE_CLS = "form-group";
    this.DESCRIPTION_CLS = "form-group";
    this.AGENT_TYPE_CLS = "form-group";
    this.COM_LEVEL_CLS = "form-group";
    this.COM_YEAR_CLS = "form-group";
    this.COM_RATE_CLS = "form-group";
    this.SQL_WHERE_CLS = "form-group";
    this.DATE_FROM_CLS = "form-group";
    this.DATE_TO_CLS = "form-group";
    this.ACTIVE_STATUS_CLS = "form-group";

    this.FormButtonStatusChange('CANCEL');
  }


  NewRecord() {

    this.CODE_CLS = "form-group";
    this.DESCRIPTION_CLS = "form-group";
    this.AGENT_TYPE_CLS = "form-group";
    this.COM_LEVEL_CLS = "form-group";
    this.COM_YEAR_CLS = "form-group";
    this.COM_RATE_CLS = "form-group";
    this.SQL_WHERE_CLS = "form-group";
    this.DATE_FROM_CLS = "form-group";
    this.DATE_TO_CLS = "form-group";
    this.ACTIVE_STATUS_CLS = "form-group";

    this.FormButtonStatusChange('NEW');
  }

  EditRecord() {
    this.FormButtonStatusChange('EDIT');
  }

  FormButtonStatusChange(Status) {
    if (Status == 'NEW') {
      this.isNEWDisabled = true;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = false;
      this.isCANCELDisabled = false;


      this.ID = 0;
      this.CODE = '';
      this.DESCRIPTION = '';
      this.AGENT_TYPE = '';
      this.COM_LEVEL = '';
      this.COM_YEAR = '';
      this.COM_RATE = '';
      this.SQL_WHERE = '';
      this.DATE_FROM = null;
      this.DATE_TO = null;
      this.ACTIVE_STATUS = 0;
      this.rtnDate = null;

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
      alert();
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.ID = 0;
      this.CODE = '';
      this.DESCRIPTION = '';
      this.AGENT_TYPE = '';
      this.COM_LEVEL = '';
      this.COM_YEAR = '';
      this.COM_RATE = '';
      this.SQL_WHERE = '';
      this.DATE_FROM = null;
      this.DATE_TO = null;
      this.ACTIVE_STATUS = 0;
      this.rtnDate = null;
    }
    if (Status == 'CANCEL') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.ID = 0;
      this.CODE = '';
      this.DESCRIPTION = '';
      this.AGENT_TYPE = '';
      this.COM_LEVEL = '';
      this.COM_YEAR = '';
      this.COM_RATE = '';
      this.SQL_WHERE = '';
      this.DATE_FROM = null;
      this.DATE_TO = null;
      this.ACTIVE_STATUS = 0;
      this.rtnDate = null;
    }
    if (Status == 'LOAD') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.ID = 0;
      this.CODE = '';
      this.DESCRIPTION = '';
      this.AGENT_TYPE = '';
      this.COM_LEVEL = '';
      this.COM_YEAR = '';
      this.COM_RATE = '';
      this.SQL_WHERE = '';
      this.DATE_FROM = null;
      this.DATE_TO = null;
      this.ACTIVE_STATUS = 0;
      this.rtnDate = null;
    }
  }

  //--------------Check Date when Save--------------------------------------------------
  SetDateFormat(vDate): Date {
    var moment = require('moment');

    // console.log('SetDateFormat');
    // console.log(vDate);

    if (vDate == undefined || vDate == '') {//alert(vDate);
      this.rtnDate = moment('01/01/1900'.toString()).format('DD/MM/YYYY');
    } else {
      this.rtnDate = moment(vDate).format('DD/MM/YYYY');
    }
    return this.rtnDate;
  }
  //------------------------------------------------------------------------------------

  //-------------Check Date when Retrive------------------------------------------------

  SetDateFormatNew(vDate): Date {
    var moment = require('moment');

    // console.log('SetDateFormatNew');
    // console.log(vDate);

    if ((vDate == '01/01/2000 12:00:00 AM') || (vDate == '01/01/2000 00:00:00') || (moment(vDate.toString().substr(0, 10), 'DD/MM/YYYY').toDate() == moment('01/01/1900 00:00:00'.toString().substr(0, 10), 'DD/MM/YYYY').toDate()) || (vDate == '01/01/1900 12:00:00 AM') || (vDate == '01/01/1900 00:00:00')) {//alert(vDate);
      this.rtnDate = null;//moment('01/01/1900'.toString()).format('DD/MM/YYYY');
    } else {
      this.rtnDate = moment(vDate.toString().substr(0, 10), 'DD/MM/YYYY').toDate();// moment(vDate).format('DD/MM/YYYY');
    }
    return this.rtnDate;
  }
  //------------------------------------------------------------------------------------

}
