import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { MomentModule } from 'angular2-moment';

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { NgZone, Inject, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { IUser } from '../../shared/models/user/user.model';

import { IFSTAllowance } from '../../shared/models/FSTAllowance.models';

import { FSTAllowanceService } from '../../shared/services/FSTAllowance/fstallowance.service';

import { ToastrService } from "toastr-ng2/toastr";


@Component({
  selector: 'app-fst-allowance',
  templateUrl: './fst-allowance.component.html',
  styleUrls: ['./fst-allowance.component.css']
})
export class FstAllowanceComponent implements OnInit {

  User: IUser;


  selectedRow: Number;

  ID: number = 0;
  CODE: string = '';
  DESCRIPTION: string = '';
  MAX_YEARS: number = 0;
  MAX_ALLOWANCE: number = 0;
  POLICY_COUNT: number = 0;
  FST_MIN_AMT: number = 0;
  FST_MAX_AMT: number = 0;
  ALLOWANCE: number = 0;
  SQL: string = '';
  DATE_FROM: Date = null;
  DATE_TO: Date = null;
  ACTIVE_STATUS: number = 0;
  CREATED_BY: string = '';

  rtnDate: Date = null;

  FSTAllowanceList: Array<IFSTAllowance> = [];

  isNEWDisabled: boolean = false;
  isEDITDisabled: boolean = false;
  isSAVEDisabled: boolean = false;
  isCANCELDisabled: boolean = false;


  datepickerOpts = {
    format: 'dd/mm/yyyy'
  }

  constructor(private FSTAllowanceService: FSTAllowanceService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.FormButtonStatusChange('LOAD');
    this.getFSTAllowance();
    this.User = JSON.parse(localStorage.getItem('currentCOMUser'));
  }


  private setFSTID = function (index, ID) {

    this.selectedRow = index;

    this.GetFSTDetails(ID);

    this.FormButtonStatusChange('SELECT');

  }

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



  private GetFSTDetails(ID) {
    this.FSTAllowanceService.getFSTAllowance(ID)
      .subscribe((data) => {
        console.log(data);

        let obj: IFSTAllowance = JSON.parse(JSON.stringify(data));

        this.ID = obj.Id;
        this.CODE = obj.Code;
        this.DESCRIPTION = obj.Description;
        this.MAX_YEARS = obj.MaximumYears;
        this.MAX_ALLOWANCE = obj.MaximumAllowance;
        this.POLICY_COUNT = obj.PolicyCount;
        this.FST_MIN_AMT = obj.FstMinimumAmt;
        this.FST_MAX_AMT = obj.FstMaximumAmt;
        this.ALLOWANCE = obj.Allowance;
        this.SQL = obj.Sql;
        this.DATE_FROM = this.SetDateFormatNew(obj.FromDate.toString()),
          this.DATE_TO = this.SetDateFormatNew(obj.ToDate.toString()),
          this.ACTIVE_STATUS = obj.ActiveStatus;
        this.CREATED_BY = obj.CreatedBy;

      });

  }


  getFSTAllowance() {
    this.FSTAllowanceService.getFSTAllowances()
      .subscribe((data) => {

        this.FSTAllowanceList = data;
        console.log(JSON.stringify(data));
      },
      (err) => console.log(err));
  }


  showSuccess(message) {
    this.toastrService.success(message, 'Success!');
  }

  showError(message) {
    this.toastrService.error(message, 'Oops!');
  }

  showWarning(message) {
    this.toastrService.warning(message, 'Alert!');
  }

  showInfo(message) {
    this.toastrService.info(message);
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

      let obj: IFSTAllowance = {
        Id: 0,
        Code: this.CODE,
        Description: this.DESCRIPTION,
        MaximumYears: this.MAX_YEARS,
        MaximumAllowance: this.MAX_ALLOWANCE,
        PolicyCount: this.POLICY_COUNT,
        FstMinimumAmt: this.FST_MIN_AMT,
        FstMaximumAmt: this.FST_MAX_AMT,
        Allowance: this.ALLOWANCE,
        Sql: this.SQL,
        FromDate: this.SetDateFormat(this.DATE_FROM).toString(),
        ToDate: this.SetDateFormat(this.DATE_TO).toString(),
        ActiveStatus: this.ACTIVE_STATUS,
        CreatedBy: this.User.UserName


      }
      console.log(obj);

      this.FSTAllowanceService.saveFSTAllowance(obj).subscribe((data: any) => {
        console.log(data);

        this.getFSTDetails();

        if (data.toString().replace(/"/g, '') == "ERROR") {
          this.showError("Error saving FST Allowance.");
        } else {
          this.showSuccess("FST Allowance Successfully Saved.");
        }
      },
        (err) => {
          this.showError("Error saving FST Allowance.");
        },
        () => console.log('done'));

    } catch (error) {

    }


    this.FormButtonStatusChange('SAVE');
  }


  getFSTDetails() {
    this.FSTAllowanceService.getFSTAllowances()
      .subscribe((data) => {

        this.FSTAllowanceList = data;
        console.log(JSON.stringify(data));
      },
      (err) => console.log(err));
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
      this.MAX_YEARS = null;
      this.MAX_ALLOWANCE = null;
      this.POLICY_COUNT = null;
      this.FST_MIN_AMT = null;
      this.FST_MAX_AMT = null;
      this.ALLOWANCE = null;
      this.DATE_FROM = null;
      this.DATE_TO = null;
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
      this.CODE = '';
      this.DESCRIPTION = '';
      this.MAX_YEARS = null;
      this.MAX_ALLOWANCE = null;
      this.POLICY_COUNT = null;
      this.FST_MIN_AMT = null;
      this.FST_MAX_AMT = null;
      this.ALLOWANCE = null;
      this.DATE_FROM = null;
      this.DATE_TO = null;
      this.ACTIVE_STATUS = 0;
    }
    if (Status == 'CANCEL') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.ID = 0;
      this.CODE = '';
      this.DESCRIPTION = '';
      this.MAX_YEARS = null;
      this.MAX_ALLOWANCE = null;
      this.POLICY_COUNT = null;
      this.FST_MIN_AMT = null;
      this.FST_MAX_AMT = null;
      this.ALLOWANCE = null;
      this.DATE_FROM = null;
      this.DATE_TO = null;
      this.ACTIVE_STATUS = 0;
    }
    if (Status == 'LOAD') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      // this.ID = 0;
      // this.CODE = "";
      // this.DESCRIPTION = "";
      // this.ACTIVE_STATUS = 0;
    }
  }


}
