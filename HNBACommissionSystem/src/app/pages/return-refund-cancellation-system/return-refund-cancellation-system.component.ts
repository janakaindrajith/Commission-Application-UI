
import { Component, OnInit } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { IUser } from '../../shared/models/user/user.model';
import { DatePipe } from '@angular/common';

import { PIDSearchService } from '../../shared/services/PIDSearch/pidsearch.service';
import { IPIDSearch } from '../../shared/models/PIDSearch';

import { PIDDetailsService } from '../../shared/services/PIDDetails/piddetails.service';
import { IPID } from '../../shared/models/PID';

import { RefundService } from '../../shared/services/Refund/refund.service';
import { IRefund } from '../../shared/models/Refund';

import { CommonService } from '../../shared/services/Common/common.service';
import { ICommon } from '../../shared/models/Common';

import { NgZone, Inject, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { ToastrService } from "toastr-ng2/toastr";

@Component({
  selector: 'app-return-refund-cancellation-system',
  templateUrl: './return-refund-cancellation-system.component.html',
  styleUrls: ['./return-refund-cancellation-system.component.css']
})
export class ReturnRefundCancellationSystemComponent implements OnInit {

  datepickerOpts = {
    format: 'dd/mm/yyyy'
  }


  PID_RECEIPT_NO_SEARCH: string = '';
  PID_RECEIPT_DATE_SEARCH: string = '';
  PID_PROPOSAL_NO_SEARCH: string = '';
  PID_POLICY_NO_SEARCH: string = '';
  PID_AGT_CODE_SEARCH: string = '';


  PID_RECEIPT_NO: string = '';
  PID_RECEIPT_DATE: string = '';
  PID_CUSTOMER: string;
  PID_PROPOSAL_NO: string;
  PID_POLICY_NO: string;
  PID_RECEIPT_AMT: string;
  PID_TIME_SLAB: string;
  PID_CONFIRM_AMT: string;
  PID_CONFIRM_DATE: string;
  PID_RV_NO: string;
  PID_BAL_TYPE: string;
  PID_AGT_CODE: string;
  PID_AVAILABLE_AMT: string;
  PID_CHEQUE_NO: string;

  PID_RECEIPT_NO_CLS: string = '';
  PID_RECEIPT_DATE_CLS: string = '';
  PID_CUSTOMER_CLS: string;
  PID_PROPOSAL_NO_CLS: string;
  PID_POLICY_NO_CLS: string;
  PID_RECEIPT_AMT_CLS: string;
  PID_TIME_SLAB_CLS: string;
  PID_CONFIRM_AMT_CLS: string;
  PID_CONFIRM_DATE_CLS: string;
  PID_RV_NO_CLS: string;
  PID_BAL_TYPE_CLS: string;
  PID_AGT_CODE_CLS: string;


  RFD_ID: number = 0;
  RFD_RECEIPT_NO: string = '';
  RFD_REFUND_DATE: string = '';
  RFD_TYPE: number = 0;
  RFD_AMT: string = '';
  RFD_PERCENTAGE: number = 0;
  RFD_BY: string = '';
  RFD_REASON: string = '';
  RFD_AGT_CODE: string = '';
  RFD_PROCESS_IND: string = '';
  RFD_RV_NO: string = '';
  RFD_PV_NO: string = '';
  RFD_BAL_TYPE: string = '';
  RFD_CREATED_BY: string = '';
  RFD_STATUS: number = 0;
  RFD_CANCELLATION_FEE: string = '';
  RFD_RECOVERY_FEE: string = '';
  RFD_ADVICE_REF: String = '';


  RFD_TYPE_CLS: string = '';
  RFD_AMT_CLS: string = '';
  RFD_CANCELLATION_FEE_CLS: string = '';
  RFD_RECOVERY_FEE_CLS: string = '';
  RFD_REFUND_DATE_CLS: string = '';
  RFD_ADVICE_REF_CLS: string = '';

  rtnDate: Date = null;
  User: IUser;

  PIDList: Array<IRefund> = [];

  RefundList: Array<ICommon> = [];

  CommissionList: Array<ICommon> = [];

  CommissionRefundList: Array<ICommon> = [];



  isNEWDisabled: boolean = false;
  isEDITDisabled: boolean = false;
  isSAVEDisabled: boolean = false;
  isCANCELDisabled: boolean = false;


  //--------------------Control Enabled Disabled variables----------------------
  isTypeDisabled: boolean = false;
  isCancellationFeeDisabled: boolean = false;
  isAdviceRefDisabled: boolean = false;
  isRecoveryFeeDisabled: boolean = false;
  isNarrationDisabled: boolean = false;
  isAmountDisabled: boolean = false;



  constructor(private PIDSearchService: PIDSearchService, private PIDDetailsService: PIDDetailsService, private RefundService: RefundService, private CommonService: CommonService, private toastrService: ToastrService) { }
  //constructor(private PIDSearchService: PIDSearchService) { }

  ngOnInit() {

    this.getMappingFailedRefunds();

    this.FormButtonStatusChange('LOAD');

    this.User = JSON.parse(localStorage.getItem('currentCOMUser'));

  }


  getMappingFailedRefunds() {

    this.RefundService.GetSystemMappingFailedRefunds()
      .subscribe((data) => {

        this.PIDList = data;

        console.log(JSON.stringify(data));

        if (this.PIDList.length == 0) {
          //alert('No Record Found....');
          this.showWarning('No Refund Records Found....');
          this.PIDList = null;
          return;
        }

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

  NewRecord() {


    this.PID_RECEIPT_NO_CLS = "form-group";
    this.PID_RECEIPT_DATE_CLS = "form-group";
    this.PID_CUSTOMER_CLS = "form-group";
    this.PID_PROPOSAL_NO_CLS = "form-group";
    this.PID_POLICY_NO_CLS = "form-group";
    //this.PID_RECEIPT_AMT_CLS = "form-group";
    this.PID_TIME_SLAB_CLS = "form-group";
    this.PID_CONFIRM_AMT_CLS = "form-group";
    this.PID_CONFIRM_DATE_CLS = "form-group";
    this.PID_RV_NO_CLS = "form-group";
    this.PID_BAL_TYPE_CLS = "form-group";
    this.PID_AGT_CODE_CLS = "form-group";

    this.FormButtonStatusChange('NEW');
  }


  clearRecord() {
    this.RFD_AMT = "";
    //this.RFD_REASON = "";
    this.RFD_CANCELLATION_FEE = "";
    this.RFD_RECOVERY_FEE = "";
    this.RFD_ADVICE_REF = "";



  }


  CancelRecord() {

    this.PID_RECEIPT_NO_CLS = "form-group";
    this.PID_RECEIPT_DATE_CLS = "form-group";
    this.PID_CUSTOMER_CLS = "form-group";
    this.PID_PROPOSAL_NO_CLS = "form-group";
    this.PID_POLICY_NO_CLS = "form-group";
    //this.PID_RECEIPT_AMT_CLS = "form-group";
    this.PID_TIME_SLAB_CLS = "form-group";
    this.PID_CONFIRM_AMT_CLS = "form-group";
    this.PID_CONFIRM_DATE_CLS = "form-group";
    this.PID_RV_NO_CLS = "form-group";
    this.PID_BAL_TYPE_CLS = "form-group";
    this.PID_AGT_CODE_CLS = "form-group";

    this.RFD_AMT_CLS = "form-group";
    this.RFD_CANCELLATION_FEE_CLS = "form-group";
    this.RFD_RECOVERY_FEE_CLS = "form-group";

    this.clearRecord();

    this.FormButtonStatusChange('CANCEL');
  }

  ClearSearch() {

    this.PID_RECEIPT_NO_SEARCH = "";
    this.PID_RECEIPT_DATE_SEARCH = "";
    this.PID_PROPOSAL_NO_SEARCH = "";
    this.PID_POLICY_NO_SEARCH = "";
    this.PID_AGT_CODE_SEARCH = "";

    this.PIDList = [];

  }

  FormButtonStatusChange(Status) {
    if (Status == 'NEW') {
      this.isNEWDisabled = true;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = false;
      this.isCANCELDisabled = false;

      this.RFD_AMT_CLS = "form-group";
      this.RFD_CANCELLATION_FEE_CLS = "form-group";
      this.RFD_RECOVERY_FEE_CLS = "form-group";
      this.RFD_ADVICE_REF_CLS = "form-group";


      this.isTypeDisabled = false;
      this.isCancellationFeeDisabled = false;
      this.isAdviceRefDisabled = false;
      this.isRecoveryFeeDisabled = false;
      this.isNarrationDisabled = false;
      this.isAmountDisabled = false;


      // this.PID_RECEIPT_NO = "";
      // this.PID_RECEIPT_DATE = "";
      // this.PID_CUSTOMER = "";
      // this.PID_PROPOSAL_NO = "";
      // this.PID_POLICY_NO = "";
      // this.PID_RECEIPT_AMT = "";
      // this.PID_TIME_SLAB = "";
      // this.PID_CONFIRM_AMT = "";
      // this.PID_CONFIRM_DATE = "";
      // this.PID_RV_NO = "";
      // this.PID_BAL_TYPE = "";
      // this.PID_AGT_CODE = "";

      this.clearRecord();

    }
    if (Status == 'EDIT') {
      this.isNEWDisabled = true;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = false;
      this.isCANCELDisabled = false;
    }
    if (Status == 'SAVE') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.isTypeDisabled = true;
      this.isCancellationFeeDisabled = true;
      this.isAdviceRefDisabled = true;
      this.isRecoveryFeeDisabled = true;
      this.isNarrationDisabled = true;
      this.isAmountDisabled = true;

      this.PID_RECEIPT_NO = "";
      this.PID_RECEIPT_DATE = "";
      this.PID_CUSTOMER = "";
      this.PID_PROPOSAL_NO = "";
      this.PID_POLICY_NO = "";
      //this.PID_RECEIPT_AMT = "";
      this.PID_TIME_SLAB = "";
      this.PID_CONFIRM_AMT = "";
      this.PID_CONFIRM_DATE = "";
      this.PID_RV_NO = "";
      this.PID_BAL_TYPE = "";
      this.PID_AGT_CODE = "";
    }
    if (Status == 'CANCEL') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.isTypeDisabled = true;
      this.isCancellationFeeDisabled = true;
      this.isAdviceRefDisabled = true;
      this.isRecoveryFeeDisabled = true;
      this.isNarrationDisabled = true;
      this.isAmountDisabled = true;

      this.PID_RECEIPT_NO = "";
      this.PID_RECEIPT_DATE = "";
      this.PID_CUSTOMER = "";
      this.PID_PROPOSAL_NO = "";
      this.PID_POLICY_NO = "";
      this.PID_RECEIPT_AMT = "";
      this.PID_TIME_SLAB = "";
      this.PID_CONFIRM_AMT = "";
      this.PID_CONFIRM_DATE = "";
      this.PID_RV_NO = "";
      this.PID_BAL_TYPE = "";
      this.PID_AGT_CODE = "";

      this.PID_RECEIPT_AMT = "";
      this.PID_AVAILABLE_AMT = "";
      this.RFD_PV_NO = "";
      this.RFD_TYPE = 0;
      this.RFD_REASON = "";
    }
    if (Status == 'LOAD') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.isTypeDisabled = true;
      this.isCancellationFeeDisabled = true;
      this.isAdviceRefDisabled = true;
      this.isRecoveryFeeDisabled = true;
      this.isNarrationDisabled = true;
      this.isAmountDisabled = true;

      // this.PID_RECEIPT_NO = "";
      // this.PID_RECEIPT_DATE = "";
      // this.PID_CUSTOMER = "";
      // this.PID_PROPOSAL_NO = "";
      // this.PID_POLICY_NO = "";
      // this.PID_RECEIPT_AMT = "";
      // this.PID_TIME_SLAB = "";
      // this.PID_CONFIRM_AMT = "";
      // this.PID_CONFIRM_DATE = "";
      // this.PID_RV_NO = "";
      // this.PID_BAL_TYPE = "";
      // this.PID_AGT_CODE = "";

      this.RFD_AMT_CLS = "form-group";
      this.RFD_CANCELLATION_FEE_CLS = "form-group";
      this.RFD_RECOVERY_FEE_CLS = "form-group";
      this.RFD_ADVICE_REF_CLS = "form-group";

    }
  }

  private setPIDReceiptNo = function (index, RFD_ID, RECIEPT_NO) {


    this.getRefundNOTRecordsByReceiptNo(RFD_ID);
    //this.FormButtonStatusChange('EDIT');

    if (RECIEPT_NO.length > 0) {

      // this.getRefundDetails(RECIEPT_NO);
      // this.getCommissionDetails(RECIEPT_NO);
      // this.getCommissionRefundDetails(RECIEPT_NO);

    }


  }

  getRefundDetails(ReceiptNo) {
    this.CommonService.getRefundsByReceiptNo(ReceiptNo)
      .subscribe((data) => {

        this.RefundList = data;

        console.log(JSON.stringify(data));

        if (this.RefundList.length == 0) {
          //alert('No Record Found....');
          this.showWarning('No Refund Records Found....');
          this.PIDList = null;
          return;
        }

      },
      (err) => console.log(err));
  }


  getCommissionDetails(ReceiptNo) {
    this.CommonService.getCommissionByReceiptNo(ReceiptNo)
      .subscribe((data) => {

        this.CommissionList = data;

        console.log(JSON.stringify(data));

        if (this.CommissionList.length == 0) {
          //alert('No Record Found....');
          this.showWarning('No Commission Records Found....');
          this.CommissionList = null;
          return;
        }

      },
      (err) => console.log(err));
  }


  getCommissionRefundDetails(ReceiptNo) {
    this.CommonService.getCommissionRefundByReceiptNo(ReceiptNo)
      .subscribe((data) => {

        this.CommissionRefundList = data;

        console.log(JSON.stringify(data));

        if (this.CommissionRefundList.length == 0) {
          //alert('No Record Found....');
          this.showWarning('No Commission Refund Records Found....');
          this.CommissionRefundList = null;
          return;
        }

      },
      (err) => console.log(err));
  }


  getRefundNOTRecordsByReceiptNo(RFD_ID) {

    this.RefundService.GetRefundNOT(RFD_ID)
      .subscribe((data) => {
        console.log(data);

        let obj: IRefund = JSON.parse(JSON.stringify(data));

        console.log(obj);
        // <!-- 1 - refund  / 2 - cancellation  3 - cheque returns -->
        this.RFD_ID = obj.RfdId,
          this.RFD_RECEIPT_NO = obj.RfdReceiptNo,
          this.PID_RECEIPT_AMT = obj.RfdAmt.toLocaleString(),
          this.RFD_REFUND_DATE = obj.RfdRefundDate.toString()
        this.RFD_TYPE = obj.RfdType;

        this.PID_PROPOSAL_NO = obj.RfdProposalNo;
        this.PID_POLICY_NO = obj.RfdPolicyNo;
        this.RFD_REASON = obj.RfdReason
        // this.rf = obj.RfdProposalNo.toString(),
        // this.PID_POLICY_NO = obj.RfdPolicyNo.toString(),
        // this.PID_CUSTOMER = '',
        // this.PID_AVAILABLE_AMT = '',
        // this.PID_AGT_CODE = obj.RfdAgtCode

      });
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

      if ((Number(this.RFD_AMT) + Number(this.RFD_CANCELLATION_FEE) + Number(this.RFD_RECOVERY_FEE) != Number(this.PID_RECEIPT_AMT.replace(',', '')))) {
        this.showError('Please check the amounts you have entered....');
        return;
      }


      this.RFD_AMT_CLS = "form-group";
      this.RFD_CANCELLATION_FEE_CLS = "form-group";
      this.RFD_RECOVERY_FEE_CLS = "form-group";
      this.RFD_REFUND_DATE_CLS = "form-group";

      if (this.RFD_REFUND_DATE == undefined) {
        this.RFD_REFUND_DATE_CLS = "has-error";
        return;
      } else {
        this.RFD_REFUND_DATE_CLS = "form-group"; //AgentTypeClass
      }

      if (this.RFD_TYPE == 0) {
        this.RFD_TYPE_CLS = "has-error";
        return;
      } else {
        this.RFD_TYPE_CLS = "form-group"; //AgentTypeClass
      }

      if (this.RFD_AMT == "" || Number(this.RFD_AMT) == NaN || Number(this.RFD_AMT).toString() == 'NaN') {
        this.RFD_AMT_CLS = "has-error";
        return;
      } else {
        this.RFD_AMT_CLS = "form-group"; //AgentTypeClass
      }

      if (this.RFD_CANCELLATION_FEE == "" || Number(this.RFD_CANCELLATION_FEE) == NaN || Number(this.RFD_CANCELLATION_FEE).toString() == 'NaN') {
        this.RFD_CANCELLATION_FEE_CLS = "has-error";
        return;
      } else {
        this.RFD_CANCELLATION_FEE_CLS = "form-group"; //AgentTypeClass
      }

      if (this.RFD_RECOVERY_FEE == "" || Number(this.RFD_RECOVERY_FEE) == NaN || Number(this.RFD_RECOVERY_FEE).toString() == 'NaN') {
        this.RFD_RECOVERY_FEE_CLS = "has-error";
        return;
      } else {
        this.RFD_RECOVERY_FEE_CLS = "form-group"; //AgentTypeClass
      }

      // if (this.RFD_AMT > this.PID_AVAILABLE_AMT) {
      // if (Number(this.RFD_AMT) > Number(this.PID_AVAILABLE_AMT)) {
      //   alert('Refund Amount Cannot be Exceeded than the Available Amount..');
      //   return;
      // }



      let obj: IRefund = {
        RfdId: this.RFD_ID,
        RfdReceiptNo: this.RFD_RECEIPT_NO,
        RfdRefundDate: this.SetDateFormat(this.RFD_REFUND_DATE).toString(),
        RfdType: this.RFD_TYPE,
        RfdAmt: parseFloat(this.RFD_AMT.toString()),
        RfdPercentage: this.RFD_PERCENTAGE,
        RfdBy: this.RFD_BY,
        RfdReason: this.RFD_REASON,
        RfdAgtCode: this.PID_AGT_CODE,
        RfdProcessInd: this.RFD_PROCESS_IND,
        RfdRvNo: this.RFD_RV_NO,
        RfdPvNo: this.RFD_PV_NO,
        RfdBalType: this.RFD_BAL_TYPE,
        RfdCreatedBy: this.User.UserName,
        RfdStatus: 1,
        RfdProposalNo: this.PID_PROPOSAL_NO,
        RfdPolicyNo: this.PID_POLICY_NO,
        RfdCancellationFee: parseFloat(this.RFD_CANCELLATION_FEE.toString()),//this.RFD_CANCELLATION_FEE,
        RfdRecoveryFee: parseFloat(this.RFD_RECOVERY_FEE.toString()),//this.RFD_RECOVERY_FEE
        RfdRecStatus: null,
        RfdRecNarration: null,
        RfdRecUpdatedBy: null,
        RfdRecUpdatedDate: null,
      }
      console.log(obj);

      this.RefundService.saveRefundNOT(obj).subscribe((data: any) => {
        console.log(data);

        let body = data.text()
        this.RFD_PV_NO = body.substring(1, 9);

        this.getMappingFailedRefunds();
        this.FormButtonStatusChange('LOAD');

        if (data.toString().replace(/"/g, '') == "ERROR") {
          console.log("Error saving Refund");
          //alert("Error Occured.");
          this.showError('Error Occured.');
        } else {
          console.log("Refund Successfully Saved.");
          //alert("Successfully Saved.");
          this.showSuccess('Refund Successfully Saved.');



        }
      },
        (err) => {
          console.log(err);
          console.log("Error saving Refund");
          //alert("Error Occured.");
          this.showError('Error Occured.');
        },
        () => console.log('done'));



    } catch (error) {

    }


    this.FormButtonStatusChange('SAVE');

  }


  SearchRecord() {

    let obj: IPIDSearch = {

      PID_RECEIPT_NO: this.PID_RECEIPT_NO_SEARCH,
      PID_RECEIPT_DATE: this.PID_RECEIPT_DATE,
      PID_CUSTOMER: this.PID_CUSTOMER,
      PID_PROPOSAL_NO: this.PID_PROPOSAL_NO_SEARCH,
      PID_POLICY_NO: this.PID_POLICY_NO_SEARCH,
      PID_RECEIPT_AMT: this.PID_RECEIPT_AMT,
      PID_TIME_SLAB: this.PID_TIME_SLAB,
      PID_CONFIRM_AMT: this.PID_CONFIRM_AMT,
      PID_CONFIRM_DATE: this.PID_CONFIRM_DATE,
      PID_RV_NO: this.PID_RV_NO,
      PID_BAL_TYPE: this.PID_BAL_TYPE,
      PID_AGT_CODE: this.PID_AGT_CODE_SEARCH,
      PID_CHEQUE_NO: this.PID_AGT_CODE_SEARCH

    }

    console.log(obj);

    this.PIDSearchService.GetPIDDetails(obj)
      .subscribe((data) => {

        this.PIDList = data;

        console.log(JSON.stringify(data));

        if (this.PIDList.length == 0) {
          // alert('No Record Found....');
          this.showWarning('No PID Records Found....');
          this.PIDList = null;
          return;
        }

      },
      (err) => console.log(err));
  }


}

