import { Component, OnInit } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { IUser } from '../../shared/models/user/user.model';
import { DatePipe } from '@angular/common';

import { RefundService } from '../../shared/services/Refund/refund.service';
import { IRefund } from '../../shared/models/Refund';

@Component({
  selector: 'app-return-refund-cancellation-confirm',
  templateUrl: './return-refund-cancellation-confirm.component.html',
  styleUrls: ['./return-refund-cancellation-confirm.component.css']
})



export class ReturnRefundCancellationConfirmComponent implements OnInit {

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

  rtnDate: Date = null;
  User: IUser;

  datepickerOpts = {
    format: 'dd/mm/yyyy'
  }


  RefundList: Array<IRefund> = [];

  SelectedList: any;

  isChecked: boolean = false;

  constructor(private RefundService: RefundService) { }

  ngOnInit() {

    this.SelectedList = [];

    this.User = JSON.parse(localStorage.getItem('currentCOMUser'));

    this.GetNonConfirmedRefunds();

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

  RefundStatusChange() {

    return new Promise((resolve, reject) => {

      let selectedRows = this.RefundList.filter((data: any) => data.selected);

      for (let entry of selectedRows) {
        console.log(entry.RfdReceiptNo); // 1, "string", false


        try {
          let obj: IRefund = {
            RfdId: entry.RfdId,
            RfdReceiptNo: entry.RfdReceiptNo,
            RfdRefundDate: this.SetDateFormat(entry.RfdRefundDate).toString(),
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
            RfdCreatedBy: this.User.UserName,
            RfdStatus: 2, //Approved
            RfdProposalNo: '',
            RfdPolicyNo: '',
            RfdCancellationFee: 0,
            RfdRecoveryFee: 0,
            RfdRecStatus: '',
            RfdRecNarration: '',
            RfdRecUpdatedBy: '',
            RfdRecUpdatedDate: ''

          }


          console.log(obj);

          this.RefundService.RefundStatusChange(obj).subscribe((data: any) => {
            console.log(data);

            //this.getLevels();

            if (data.toString().replace(/"/g, '') == "ERROR") {
              console.log("Error saving Confirmation");
            } else {
              console.log("Confirmation Successfully Saved.");
            }
          },
            (err) => {
              console.log(err);
              console.log("Error saving Confirmation");
            },
            () => console.log('done'));

        } catch (e) {
          reject(e)
        }


      }

    });
  }



  GetTCSAuth(): Promise<any> {
    return new Promise((resolve, reject) => {



    });
  }



  ApproveRecords() {
    if (confirm("Are you sure you want to approve selected records? ")) {
      this.ApproveUpdate().then((RfdBy) => {

        this.GetNonConfirmedRefunds();

      });

    }
  }


  RejectRecords() {
    if (confirm("Are you sure you want to reject selected records? ")) {
      this.RejectUpdate().then((RfdBy) => {
        this.GetNonConfirmedRefunds();
      });
    }
  }


  ApproveUpdate(): Promise<any> {
    return new Promise((resolve, reject) => {
      {
        let selectedRows = this.RefundList.filter((data: any) => data.selected);

        for (let entry of selectedRows) {
          console.log(entry.RfdReceiptNo); // 1, "string", false


          try {
            let obj: IRefund = {
              RfdId: entry.RfdId,
              RfdReceiptNo: entry.RfdReceiptNo,
              RfdRefundDate: this.SetDateFormat(entry.RfdRefundDate).toString(),
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
              RfdCreatedBy: this.User.UserName,
              RfdStatus: 2, //Approved
              RfdProposalNo: '',
              RfdPolicyNo: '',
              RfdCancellationFee: 0,
              RfdRecoveryFee: 0,
              RfdRecStatus: '',
              RfdRecNarration: '',
              RfdRecUpdatedBy: '',
              RfdRecUpdatedDate: ''

            }


            console.log(obj);

            this.RefundService.RefundStatusChange(obj).subscribe((data: any) => {
              console.log(data);

              //this.getLevels();

              if (data.toString().replace(/"/g, '') == "ERROR") {
                console.log("Error saving Designation");
                alert("Error Occured.");
              } else {
                console.log("Designation Successfully Saved.");
                alert("Successfully Saved.");


              }

              resolve(obj.RfdBy);

            },
              (err) => {
                console.log(err);
                console.log("Error saving Designation");
                alert("Error Occured.");

                reject(err);
              },
              () => console.log('done'));



          } catch (error) {

          }
        }
      }

    });
  }


  RejectUpdate(): Promise<any> {
    return new Promise((resolve, reject) => {
      {
        let selectedRows = this.RefundList.filter((data: any) => data.selected);

        for (let entry of selectedRows) {
          console.log(entry.RfdReceiptNo); // 1, "string", false


          try {
            let obj: IRefund = {
              RfdId: entry.RfdId,
              RfdReceiptNo: entry.RfdReceiptNo,
              RfdRefundDate: this.SetDateFormat(entry.RfdRefundDate).toString(),
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
              RfdCreatedBy: this.User.UserName,
              RfdStatus: 3, //Approved
              RfdProposalNo: '',
              RfdPolicyNo: '',
              RfdCancellationFee: 0,
              RfdRecoveryFee: 0,
              RfdRecStatus: '',
              RfdRecNarration: '',
              RfdRecUpdatedBy: '',
              RfdRecUpdatedDate: ''
              

            }


            console.log(obj);

            this.RefundService.RefundStatusChange(obj).subscribe((data: any) => {
              console.log(data);

              //this.getLevels();

              this.GetNonConfirmedRefunds();

              if (data.toString().replace(/"/g, '') == "ERROR") {
                console.log("Error saving Designation");
              } else {
                console.log("Designation Successfully Saved.");


              }

              resolve(obj.RfdBy);

            },
              (err) => {
                console.log(err);
                console.log("Error saving Designation");

                reject(err);

              },
              () => console.log('done'));

          } catch (error) {

          }
        }
      }

    });
  }



  SelectAllRecords() {
    this.RefundList = this.RefundList.map((data: any) => { data.selected = true; return data });

  }

  DeSelectAllRecords() {
    this.RefundList = this.RefundList.map((data: any) => { data.selected = false; return data });

  }



  private setPIDReceiptNo = function (index, ID) {

  }



  GetNonConfirmedRefunds() {

    this.RefundService.GetNonConfirmedRefunds()
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






}
