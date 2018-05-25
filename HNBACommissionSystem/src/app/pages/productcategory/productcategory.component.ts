import { Component, OnInit } from '@angular/core';

import { IUser } from '../../shared/models/user/user.model';
import { ProductcategoryService } from '../../shared/services/ProductCategory/productcategory.service';
import { Iproductcategory } from '../../shared/models/ProductCategory.models';


@Component({
  selector: 'app-category',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css']
})
export class ProductCategoryComponent implements OnInit {

  User: IUser;
  
    ID: number = 0;
    CODE: string = '';
    DESCRIPTION: string = '';
    BUSSINESS_TYPE: string = '';
    ACTIVE_STATUS: number = 0;
    CREATED_BY: string = '';
  
    ProductCategoryList: Array<Iproductcategory> = [];
    isNEWDisabled: boolean = false;
    isEDITDisabled: boolean = false;
    isSAVEDisabled: boolean = false;
    isCANCELDisabled: boolean = false;
  
    constructor(private ProductcategoryService: ProductcategoryService) { }
  
    ngOnInit() {
  
      this.getProductCategories();
      this.FormButtonStatusChange('LOAD');
      this.User = JSON.parse(localStorage.getItem('currentCOMUser'));
  
    }
  
  
    getProductCategories() {
      this.ProductcategoryService.getproductcategories()
        .subscribe((data) => {
  
          this.ProductCategoryList = data;
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
  
        let obj: Iproductcategory = {
          Id: this.ID,
          Code: this.CODE,
          Description: this.DESCRIPTION,
          BussinessType: this.BUSSINESS_TYPE,
          ActiveStatus: this.ACTIVE_STATUS,
          CreatedBy: this.User.UserName,
          CreatedDate: null,
          EffectiveEndDate: null
  
        }
        console.log(obj);
  
        this.ProductcategoryService.saveProductCategory(obj).subscribe((data: any) => {
          console.log(data);
  
          this.getProductCategories();
  
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
        this.BUSSINESS_TYPE = "";
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
        this.BUSSINESS_TYPE = "";
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
        this.BUSSINESS_TYPE = "";
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
        this.BUSSINESS_TYPE = "";
        this.ACTIVE_STATUS = 0;
      }
    }
  
  
    private setProductCategoryID = function (index, ID) {
  
  
      this.GetProductCategoryDetails(ID);
  
      this.FormButtonStatusChange('SELECT');
  
    }
  
  
    private GetProductCategoryDetails(ID) {
  
      this.ProductcategoryService.getproductcategorybyID(ID)
        .subscribe((data) => {
          console.log(data);
  
          let objDesig: Iproductcategory = JSON.parse(JSON.stringify(data));
  
          this.ID = objDesig.Id;
          this.CODE = objDesig.Code;
          this.DESCRIPTION = objDesig.Description;
          this.BUSSINESS_TYPE = objDesig.BussinessType;
          this.ACTIVE_STATUS = objDesig.ActiveStatus;
  
        });
  
    }
  
  }
  
  
  
  