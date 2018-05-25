import { Component, OnInit } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { IUser } from '../../shared/models/user/user.model';
import { DatePipe } from '@angular/common';

import { RefundService } from '../../shared/services/Refund/refund.service';
import { IRefund } from '../../shared/models/Refund';

import { PIDSearchService } from '../../shared/services/PIDSearch/pidsearch.service';
import { IPIDSearch } from '../../shared/models/PIDSearch';
import { ToastrService } from "toastr-ng2/toastr";

@Component({
  selector: 'app-refund-realisation',
  templateUrl: './refund-realisation.component.html',
  styleUrls: ['./refund-realisation.component.css']
})
export class RefundRealisationComponent implements OnInit {

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

  RfdAmt: string = '';
  rtnDate: Date = null;
  User: IUser;

  datepickerOpts = {
    format: 'dd/mm/yyyy'
  }


  RefundList: Array<IRefund> = [];
  PIDList: Array<IRefund> = [];
  SelectedList: any;
  isChecked: boolean = false;


  REFUND_AMT: String = '';
  UTILIZED_AMT: String = '';
  BALANCE_AMT: String = '';

  UTILIZED_AMT_TEMP: Number = 0;
  BALANCE_AMT_TEMP: Number = 0;


  constructor(private PIDSearchService: PIDSearchService, private RefundService: RefundService, private toastrService: ToastrService) { }

  ngOnInit() {

    this.SelectedList = [];

    this.User = JSON.parse(localStorage.getItem('currentCOMUser'));

    this.GetNonConfirmedRefunds();

  }

  GetNonConfirmedRefunds() {

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


  ConfirmedRecords(){

      
          return new Promise((resolve, reject) => {
      
            let Rows = this.RefundList.filter((data: any) => data);
      
            for (let entry of Rows) {      
      
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
                  RfdStatus: 4, //1-UPLOADED / 2-APPROVED / 3-REJECTED / 3-REFUNDED / 4-TRANSFERRED
                  RfdProposalNo: entry.RfdProposalNo,
                  RfdPolicyNo: '',
                  RfdCancellationFee: 0,
                  RfdRecoveryFee: 0,
                  RfdRecStatus: '',
                  RfdRecNarration: '',
                  RfdRecUpdatedBy: '',
                  RfdRecUpdatedDate: ''
      
                }
      
      
                console.log(obj);
      
                this.RefundService.RefundStatusChangeBulk(obj).subscribe((data: any) => {
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
  


  CalculatedRecords() {


    this.UTILIZED_AMT_TEMP = 0;

    let selectedRows = this.PIDList.filter((data: any) => data);

    for (let entry of selectedRows) {
      //console.log(entry.PID_RECEIPT_NO); // 1, "string", false

      if(entry.RfdRecStatus == "TO BE APPROVED"){
        this.showError('All the records should be in approved status....');
        return;
      }

      this.UTILIZED_AMT_TEMP = Number(this.UTILIZED_AMT_TEMP) + Number(entry.RfdAmt);

    }

    this.UTILIZED_AMT = this.UTILIZED_AMT_TEMP.toString();

    this.BALANCE_AMT = (Number(this.REFUND_AMT) - Number(this.UTILIZED_AMT_TEMP)).toString();

  }


  private setPIDReceiptNo = function (index, Receipt_No, Receipt_Amt) {

    //alert(Receipt_No + '' + Receipt_Amt + '' + index);




  }


  private setRefundProposalNo = function (index, ProposalNo, RefundAmt) {


    //this.GetDesignationDetails(ID);    
    //this.FormButtonStatusChange('SELECT');

    this.REFUND_AMT = RefundAmt;

    this.UTILIZED_AMT= 0;
    this.BALANCE_AMT= 0;
    this.UTILIZED_AMT_TEMP = 0;

    this.SearchRecord(ProposalNo, RefundAmt);

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

  SearchRecord(PropNo, RefundAmt) {


    this.RefundService.GetRealisationRequiredRefundsByProposalNo(PropNo)
      .subscribe((data) => {

        this.PIDList = data;

        console.log('B');

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
