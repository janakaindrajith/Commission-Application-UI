import { Component, OnInit } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { IUser } from '../../shared/models/user/user.model';
import { DatePipe } from '@angular/common';

import { NgZone, Inject, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { RefundService } from '../../shared/services/Refund/refund.service';
import { IRefund } from '../../shared/models/Refund';
import { ToastrService } from "toastr-ng2/toastr";

@Component({
  selector: 'app-rec-confirmation',
  templateUrl: './rec-confirmation.component.html',
  styleUrls: ['./rec-confirmation.component.css']
})
export class RecConfirmationComponent implements OnInit {

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
  RFD_CONFIRM: string = '';
  RFD_CANCELLATION_FEE: string = '';
  RFD_RECOVERY_FEE: string = '';

  RED_SELECTED_REFUND_ID: string = '';
  RED_SELECTED_RECIEPT_NO: string = '';
  RED_SELECTED_RECIEPT_AMT: string = '';
  RED_SELECTED_APPROVE_STATUS: string = '';
  RED_SELECTED_APPROVE_NARRATION: string = '';
  RED_SELECTED_PROPOSAL_NO: string = '';

  rtnDate: Date = null;
  User: IUser;

  datepickerOpts = {
    format: 'dd/mm/yyyy'
  }


  RefundList: Array<IRefund> = [];

  ChequeList: Array<IRefund> = [];

  SelectedList: any;

  isChecked: boolean = false;

  isLoading: string;

  constructor(private RefundService: RefundService, private toastrService: ToastrService) { }

  ngOnInit() {

    this.SelectedList = [];

    this.User = JSON.parse(localStorage.getItem('currentCOMUser'));

    this.GetRealisationRequiredRefunds();

    //this.GetRealisationRequiredRefundsForReconciliation();

  }

  private GetRefundRelatedCheque = function (RefundID) {

    this.isLoading = "loading";

    this.GetRealisationRequiredRefundsForReconciliation(RefundID);

    this.isLoading = "Unloading";

  }

  GetRealisationRequiredRefunds() {

    this.RefundService.GetRealisationRequiredRefunds()
      .subscribe((data) => {

        this.RefundList = data;

        console.log(JSON.stringify(data));

        if (this.RefundList.length == 0) {
          // alert('No Record Found....');
          this.RefundList = null;
          return;
        }
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

  GetRealisationRequiredRefundsForReconciliation(RefundID) {

    this.RefundService.GetRealisationRequiredRefundsForReconciliation(RefundID)
      .subscribe((data) => {

        this.ChequeList = data;

        console.log(JSON.stringify(data));

        if (this.RefundList.length == 0) {
          // alert('No Record Found....');
          this.RefundList = null;
          return;
        }
      });
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


  UpdateRecords() {


    let selectedRows = this.ChequeList.filter((data: any) => data.selected);
    let NotselectedRows = this.ChequeList.filter((data: any) => data.NotselectedRows);



    if (confirm("Are you sure you want to confirm selected records? ")) {

      //---------------Approve Cheque payments--------------
      for (let entry of selectedRows) {
        console.log(entry.RfdReceiptNo);

        try {
          let obj: IRefund = {
            RfdId: Number(entry.RfdId),
            RfdReceiptNo: entry.RfdReceiptNo,
            RfdRefundDate: null,
            RfdType: 0,
            RfdAmt: 0,
            RfdPercentage: 0,
            RfdBy: '',
            RfdReason: '',
            RfdAgtCode: '',
            RfdProcessInd: '',
            RfdRvNo: '',
            RfdPvNo: '',
            RfdBalType: '',
            RfdCreatedBy: '',
            RfdStatus: 2, //1-UPLOADED / 2-APPROVED / 3-REJECTED / 3-REFUNDED / 4-TRANSFERRED
            RfdProposalNo: '',
            RfdPolicyNo: '',
            RfdCancellationFee: 0,
            RfdRecoveryFee: 0,
            RfdRecStatus: '',
            RfdRecNarration: '',
            RfdRecUpdatedBy: this.User.UserName,
            RfdRecUpdatedDate: ''
          }

          console.log(obj);

          this.RefundService.UpdateRecStatus(obj).subscribe((data: any) => {
            console.log(data);

            if (data.toString().replace(/"/g, '') == "ERROR") {
              this.showError('Error Occured.');
            } else {
              this.showSuccess('Refund Successfully Saved.');
            }
          },
            (err) => {
              console.log(err);
              console.log("Error saving Designation");
              this.showError('Error Occured.');
            },
            () => console.log('done'));

        } catch (error) {

        }

      }
      //==================================================

      //--------------Reject cheque payments--------------
      for (let entry of NotselectedRows) {
        console.log(entry.RfdReceiptNo);

        try {
          let obj: IRefund = {
            RfdId: Number(entry.RfdId),
            RfdReceiptNo: entry.RfdReceiptNo,
            RfdRefundDate: null,
            RfdType: 0,
            RfdAmt: 0,
            RfdPercentage: 0,
            RfdBy: '',
            RfdReason: '',
            RfdAgtCode: '',
            RfdProcessInd: '',
            RfdRvNo: '',
            RfdPvNo: '',
            RfdBalType: '',
            RfdCreatedBy: '',
            RfdStatus: 3, //1-UPLOADED / 2-APPROVED / 3-REJECTED / 3-REFUNDED / 4-TRANSFERRED
            RfdProposalNo: '',
            RfdPolicyNo: '',
            RfdCancellationFee: 0,
            RfdRecoveryFee: 0,
            RfdRecStatus: '',
            RfdRecNarration: '',
            RfdRecUpdatedBy: this.User.UserName,
            RfdRecUpdatedDate: ''
          }

          console.log(obj);

          this.RefundService.UpdateRecStatus(obj).subscribe((data: any) => {
            console.log(data);

            if (data.toString().replace(/"/g, '') == "ERROR") {
              this.showError('Error Occured.');
            } else {
              this.showSuccess('Refund Successfully Saved.');
            }
          },
            (err) => {
              console.log(err);
              console.log("Error saving Designation");
              this.showError('Error Occured.');
            },
            () => console.log('done'));

        } catch (error) {

        }
      }
      //========================================================

    }

    //this.GetRealisationRequiredRefundsForReconciliation();

  }


  // RejectRecords() {

  //   if (this.RED_SELECTED_APPROVE_STATUS == "") {
  //     this.showError("Please select the status approve or reject....");
  //     return;
  //   }

  //   if (this.RED_SELECTED_RECIEPT_NO == "") {
  //     this.showError("Please select a record for update....");
  //     return;
  //   }

  //   if (confirm("Are you sure you want to reject selected records? ")) {
  //     // this.RejectUpdate().then((RfdBy) => {
  //     //   this.GetNonConfirmedRefunds();
  //     // });
  //   }
  // }


  private setREFUNDReceiptNo = function (index, REFUND_RECEIPT_NO, REFUND_ID, RED_PROPOSAL_NO, REFUND_AMT) {


    this.RED_SELECTED_RECIEPT_NO = REFUND_RECEIPT_NO;
    this.RED_SELECTED_REFUND_ID = REFUND_ID;
    this.RED_SELECTED_PROPOSAL_NO = RED_PROPOSAL_NO;
    this.RED_SELECTED_RECIEPT_AMT = REFUND_AMT;

  }

}
