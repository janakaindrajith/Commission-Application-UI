import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/models/user/user.model';

import { DatePipe } from '@angular/common';
import { MomentModule } from 'angular2-moment';

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { Iproductcategory } from '../../shared/models/ProductCategory.models';
import { ProductcategoryService } from '../../shared/services/ProductCategory/productcategory.service';

import { AgentTypeService } from '../../shared/services/AgentType/AgentType.service';
import { IAgentType } from '../../shared/models/AgentType.models';

import { PropertyService } from '../../shared/services/Property/property.service';
import { Iproperty } from '../../shared/models/Property.models';

import { CommissionRateChartService } from '../../shared/services/Commission-rate-chart/commission-rate-chart.service';
import { ICommissionRateChart } from '../../shared/models/CommissionRateChart.models';

import { NgZone, Inject, EventEmitter, ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-commission-rate-chart',
  templateUrl: './commission-rate-chart.component.html',
  styleUrls: ['./commission-rate-chart.component.css']
})
export class CommissionRateChartComponent implements OnInit {

  ProductCategoryList: Array<Iproductcategory> = [];
  AgentTypeList: Array<IAgentType> = [];

  TermList: Array<Iproperty> = [];
  YearList: Array<Iproperty> = [];

  RateChartList: Array<ICommissionRateChart> = [];

  User: IUser;

  datepickerOpts = {
    format: 'dd/mm/yyyy'
  }

  ID: number = 0;
  CODE: string = '';
  DESCRIPTION: string = '';
  PRODUCT_CAT: string = '';
  AGENT_TYPE: string = '';
  TERM_LOWER: string = '';
  TERM_UPPER: string = '';
  YEAR_LOWER: string = '';
  YEAR_UPPER: string = '';
  COM_RATE: string = '';
  SQL_WHERE: string = '';
  DATE_FROM: Date=null;
  DATE_TO: Date=null;
  rtnDate: Date=null;

  ACTIVE_STATUS: number = 0;
  CREATED_BY: string = '';

  isNEWDisabled: boolean = false;
  isEDITDisabled: boolean = false;
  isSAVEDisabled: boolean = false;
  isCANCELDisabled: boolean = false;


  CODE_CLS: string = '';
  DESCRIPTION_CLS: string = '';
  PRODUCT_CAT_CLS: string = '';
  AGENT_TYPE_CLS: string = '';
  TERM_LOWER_CLS: string = '';
  TERM_UPPER_CLS: string = '';
  YEAR_LOWER_CLS: string = '';
  YEAR_UPPER_CLS: string = '';
  COM_RATE_CLS: string = '';
  DATE_FROM_CLS: string = '';
  DATE_TO_CLS: string = '';


  constructor(private ProductcategoryService: ProductcategoryService, private AgentTypeService: AgentTypeService, private PropertyService: PropertyService,private CommissionRateChartService:CommissionRateChartService) { }

  ngOnInit() {

    this.getProductCategories();
    this.getAgentTypes();
    this.getTermDetails();
    this.getYearDetails();

    this.getComRateDetails();

    this.User = JSON.parse(localStorage.getItem('currentCOMUser'));

    this.CODE_CLS = "form-group";
    this.DESCRIPTION_CLS = "form-group";
    this.PRODUCT_CAT_CLS= "form-group";
    this.AGENT_TYPE_CLS= "form-group";
    this.TERM_LOWER_CLS= "form-group";
    this.TERM_UPPER_CLS= "form-group";
    this.YEAR_LOWER_CLS= "form-group";
    this.YEAR_UPPER_CLS= "form-group";
    this.COM_RATE_CLS= "form-group";
    this.DATE_FROM_CLS= "form-group";
    this.DATE_TO_CLS= "form-group";

    this.FormButtonStatusChange('LOAD');

  }

  getTermDetails() {
    this.PropertyService.getpropertyByType('TERM')
      .subscribe((data) => {

        this.TermList = data;
        console.log(JSON.stringify(data));

        console.log(this.TermList);

      },
      (err) => console.log(err));
  }


  getComRateDetails() {
    this.CommissionRateChartService.getCommissionRateCharts()
      .subscribe((data) => {

        this.RateChartList = data;
        console.log(JSON.stringify(data));

        console.log(this.TermList);

      },
      (err) => console.log(err));
  }


  getComRateDetailsByID(ID) {
    this.CommissionRateChartService.getCommissionRateChartByID(ID)
    .subscribe((data) => {
      console.log(data);

      let obj: ICommissionRateChart = JSON.parse(JSON.stringify(data));

      this.ID = obj.Id,
      this.CODE = obj.Code,
      this.DESCRIPTION = obj.Description,
      this.PRODUCT_CAT = obj.CategoryId.toString(),
      this.AGENT_TYPE = obj.AgtTypeId.toString(),
      this.TERM_LOWER = obj.TermLowerLimit.toString(),
      this.TERM_UPPER = obj.TermUpperLimit.toString(),
      this.YEAR_LOWER = obj.YearLowerLimit.toString(),
      this.YEAR_UPPER = obj.YearUpperLimit.toString(),
      this.COM_RATE = obj.Rate.toString(),
      this.SQL_WHERE = obj.Sql.toString(),
      this.DATE_FROM = this.SetDateFormatNew(obj.FromDate.toString()),
      this.DATE_TO = this.SetDateFormatNew(obj.ToDate.toString()),
      this.ACTIVE_STATUS = obj.ActiveStatus


    });
  }


  getYearDetails() {
    this.PropertyService.getpropertyByType('YEAR')
      .subscribe((data) => {

        this.YearList = data;
        console.log(JSON.stringify(data));

        console.log(this.TermList);

      },
      (err) => console.log(err));
  }

  getProductCategories() {
    this.ProductcategoryService.getproductcategories()
      .subscribe((data) => {

        this.ProductCategoryList = data;
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

  CancelRecord() {
    this.CODE_CLS = "form-group";
    this.DESCRIPTION_CLS = "form-group";
    this.PRODUCT_CAT_CLS= "form-group";
    this.AGENT_TYPE_CLS= "form-group";
    this.TERM_LOWER_CLS= "form-group";
    this.TERM_UPPER_CLS= "form-group";
    this.YEAR_LOWER_CLS= "form-group";
    this.YEAR_UPPER_CLS= "form-group";
    this.COM_RATE_CLS= "form-group";
    this.DATE_FROM_CLS= "form-group";
    this.DATE_TO_CLS= "form-group";
    

    this.FormButtonStatusChange('CANCEL');
  }

  NewRecord() {
    this.CODE_CLS = "form-group";
    this.DESCRIPTION_CLS = "form-group";
    this.PRODUCT_CAT_CLS= "form-group";
    this.AGENT_TYPE_CLS= "form-group";
    this.TERM_LOWER_CLS= "form-group";
    this.TERM_UPPER_CLS= "form-group";
    this.YEAR_LOWER_CLS= "form-group";
    this.YEAR_UPPER_CLS= "form-group";
    this.COM_RATE_CLS= "form-group";
    this.DATE_FROM_CLS= "form-group";
    this.DATE_TO_CLS= "form-group";

    this.FormButtonStatusChange('NEW');
  }

  EditRecord() {
    this.FormButtonStatusChange('EDIT');
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
      if (this.PRODUCT_CAT == '') {
        this.PRODUCT_CAT_CLS = "has-error";
        return;
      } else {
        this.PRODUCT_CAT_CLS = "form-group"; //AgentTypeClass
      }
      if (this.AGENT_TYPE == '') {
        this.AGENT_TYPE_CLS = "has-error";
        return;
      } else {
        this.AGENT_TYPE_CLS = "form-group"; //AgentTypeClass
      }
      if (this.TERM_LOWER == '' || this.TERM_UPPER == '') {
        this.TERM_LOWER_CLS = "has-error";
        return;
      } else {
        this.TERM_LOWER_CLS = "form-group"; //AgentTypeClass
      }

      // if (this.TERM_UPPER == '') {
      //   this.TERM_UPPER_CLS = "has-error";
      //   return;
      // } else {
      //   this.TERM_UPPER_CLS = "form-group"; //AgentTypeClass
      // }
      if (this.YEAR_LOWER == '' || this.YEAR_UPPER == '') {
        this.YEAR_LOWER_CLS = "has-error";
        return;
      } else {
        this.YEAR_LOWER_CLS = "form-group"; //AgentTypeClass
      }
      // if (this.YEAR_UPPER == '') {
      //   this.YEAR_UPPER_CLS = "has-error";
      //   return;
      // } else {
      //   this.YEAR_UPPER_CLS = "form-group"; //AgentTypeClass
      // }
      if (this.COM_RATE == '' || Number(this.COM_RATE) == NaN) {
        this.COM_RATE_CLS = "has-error";
        return;
      } else {
        this.COM_RATE_CLS = "form-group"; //AgentTypeClass
      }

      if (Number(this.COM_RATE).toString() == 'NaN') {
        this.COM_RATE_CLS = "has-error";
        return;
      } else {
        this.COM_RATE_CLS = "form-group"; //AgentTypeClass
      }


      if (this.DATE_FROM == undefined) {
        this.DATE_FROM_CLS = "has-error";
        return;
      } else {
        this.DATE_FROM_CLS = "form-group"; //AgentTypeClass
      }

      if (this.DATE_TO == undefined) {
        this.DATE_TO_CLS = "has-error";
        return;
      } else {
        this.DATE_TO_CLS = "form-group"; //AgentTypeClass
      }




      let obj1: ICommissionRateChart = {
        Id : this.ID,
        CategoryId:parseInt(this.PRODUCT_CAT),
        AgtTypeId:parseInt(this.AGENT_TYPE),
        Code:this.CODE,
        Description:this.DESCRIPTION,
        TermLowerLimit:parseInt(this.TERM_LOWER),
        TermUpperLimit:parseInt(this.TERM_UPPER),
        YearLowerLimit:parseInt(this.YEAR_LOWER),
        YearUpperLimit:parseInt(this.YEAR_UPPER),
        CreatedBy:this.User.UserName,
        ActiveStatus:this.ACTIVE_STATUS,
        Rate:parseFloat(this.COM_RATE.toString()),
        Sql:this.SQL_WHERE,
        FromDate: this.SetDateFormat(this.DATE_FROM).toString(),
        ToDate:this.SetDateFormat(this.DATE_TO).toString(),
        
      }
      

      console.log(obj1);

      this.CommissionRateChartService.saveCommissionRateChart(obj1).subscribe((data: any) => {
        console.log(data);


        this.getComRateDetails();

        if (data.toString().replace(/"/g, '') == "ERROR") {
          console.log("Error saving Designation");
          alert("Error Occured.");
        } else {
          console.log("Commission Rates Successfully Saved.");
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
        console.error(error);
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
      this.CODE= "";
      this.DESCRIPTION= "";
      this.PRODUCT_CAT= "";
      this.AGENT_TYPE= "";
      this.TERM_LOWER= "";
      this.TERM_UPPER= "";
      this.YEAR_LOWER= "";
      this.YEAR_UPPER= "";
      this.COM_RATE= "";
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
      this.CODE= "";
      this.DESCRIPTION= "";
      this.PRODUCT_CAT= "";
      this.AGENT_TYPE= "";
      this.TERM_LOWER= "";
      this.TERM_UPPER= "";
      this.YEAR_LOWER= "";
      this.YEAR_UPPER= "";
      this.COM_RATE= "";
      this.ACTIVE_STATUS = 0;
    }
    if (Status == 'CANCEL') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.ID = 0;
      this.CODE= "";
      this.DESCRIPTION= "";
      this.PRODUCT_CAT= "";
      this.AGENT_TYPE= "";
      this.TERM_LOWER= "";
      this.TERM_UPPER= "";
      this.YEAR_LOWER= "";
      this.YEAR_UPPER= "";
      this.COM_RATE= "";
      this.ACTIVE_STATUS = 0;
    }
    if (Status == 'LOAD') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.ID = 0;
      this.CODE= "";
      this.DESCRIPTION= "";
      this.PRODUCT_CAT= "";
      this.AGENT_TYPE= "";
      this.TERM_LOWER= "";
      this.TERM_UPPER= "";
      this.YEAR_LOWER= "";
      this.YEAR_UPPER= "";
      this.COM_RATE= "";
      this.ACTIVE_STATUS = 0;
    }
  }

  private setRuleID = function (index, ID) {

    this.getComRateDetailsByID(ID);
    this.FormButtonStatusChange('SELECT');

  }

}
