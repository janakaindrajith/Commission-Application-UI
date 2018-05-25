import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BankService } from '../../shared/services/bank/bank.service';
import { IBank } from '../../shared/models/Bank.models';

import { ToastrService } from "toastr-ng2/toastr";


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  Id: number = 0;
  Code: string = '';
  Description: string = '';

  bankList: Array<Object> = [];
  constructor(private BankService: BankService,private toastrService: ToastrService) { }

  ngOnInit() {
    this.getBanks();
  }

  getBanks() {
    this.BankService.getBanks()
      .subscribe((data) => {

        this.bankList = data;
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


  SaveRecord() {
    try {

      let obj: IBank = {
        Id: this.Id,
        Code: this.Code,
        Description: this.Description
      }



      this.BankService.saveBank(obj).subscribe((data: any) => {
        console.log(data);

        this.getBanks();

        if (data.toString().replace(/"/g, '') == "ERROR") {
          //alert("Error saving quotation");
          this.showSuccess('Error saving Bank');
        } else {
          //alert("Successfully Saved.");
           this.showError('Successfully Saved.');
        }
      },
        (err) => {
          console.log(err);
          //alert("Error Occured");
          this.showSuccess('Error Occured');
        },
        () => console.log('done'));

    } catch (error) {

    }


  }

}




