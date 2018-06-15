import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from '../../shared/services/user/authentication.service';

import { IUser } from '../../shared/models/user/user.model';

import { CommonService } from '../../shared/services/Common/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  PageList: Array<Object> = [];

  User: IUser;

  UserDisplayName: string;
  UserRoleID: string;

  //Settings
  isAccSettingsHidden: Boolean;
  isUserStatHidden: Boolean;
  isMassagesHidden: Boolean;
  isFavourHidden: Boolean;
  isSignOutHidden: Boolean;
  isBatchProcessHidden: Boolean;

  //Commission
  isComRateHidden: Boolean;
  isComORRateHidden: Boolean;
  isReturnHidden: Boolean;
  isReturnConfirmHidden: Boolean;
  isManualDPTSHidden: Boolean;
  isManualReceiptHidden: Boolean;
  isRecConfirmationComponentHidden: Boolean;
  isReturnRefundCancellationSyste: Boolean;

  //Incentive
  isFstAllowanceComponentHidden: Boolean;
  isTargetAllowanceComponentHidden: Boolean;
  isRetainerAllowanceComponentHidden: Boolean;
  isRetainerBonusComponentHidden: Boolean;
  isGroupAchievementComponentHidden: Boolean;
  isAdvisorDevelopmentAllowanceComponentHidden: Boolean;
  isAdvisorRankingComponentHidden: Boolean;
  isTargetMaintainComponentHidden: Boolean;

  isIncevtiveRateBancComponentHidden: Boolean;
  isIncevtiveConfigBancComponentHidden: Boolean;
  

  //Agent
  isAGTMasterHidden: Boolean;
  isDesignationHidden: Boolean;
  isChangeReasonHidden: Boolean;
  isAGTLevelHidden: Boolean;
  isAGTSummeryHidden: Boolean;
  isProductCATHidden: Boolean;
  isProductsHidden: Boolean;
  isBancaOfficerHidden: Boolean;


  constructor(private router: Router, private authenticationService: AuthenticationService, private CommonService: CommonService) {

  }

  ngOnInit() {

    this.User = JSON.parse(localStorage.getItem('currentCOMUser'));
    this.UserDisplayName = this.User.UserDisplayName;
    this.UserRoleID = this.User.UserRoleCode;

    this.SetPermissions();

  }

  public SetPermissions() {


    this.CommonService.getPermissionPagesByUser(this.User.UserName)
      .subscribe((data) => {

        this.PageList = data;

        console.log(this.PageList);

        for (let entry of this.PageList) {

          this.ApplyPermission(entry["Column2"]);

        }

      },
      (err) => console.log(err));

    setTimeout(5000);
  }

  public ApplyPermission(Value)
  {
    eval(Value);
  }




  public SetPermissionOLD() {
    //16 - Super User       janaka.indrajith
    //15 - Branch User      test1
    //14 - Finance User     test2
    if (this.UserRoleID == "16") {

      // this.isAccSettingsHidden = false;
      // this.isUserStatHidden = false;
      // this.isMassagesHidden = false;
      // this.isFavourHidden = false;
      // this.isSignOutHidden = false;

      this.isComRateHidden = false;
      this.isComORRateHidden = false;
      this.isReturnHidden = false;
      this.isReturnConfirmHidden = false;
      this.isManualDPTSHidden = false;
      this.isManualReceiptHidden = false;

      this.isFstAllowanceComponentHidden = false;
      this.isTargetAllowanceComponentHidden = false;
      this.isRetainerAllowanceComponentHidden = false;
      this.isRetainerBonusComponentHidden = false;
      this.isGroupAchievementComponentHidden = false;
      this.isAdvisorDevelopmentAllowanceComponentHidden = false;
      this.isAdvisorRankingComponentHidden = false;
      this.isTargetMaintainComponentHidden = false;

      this.isAGTMasterHidden = false;
      this.isDesignationHidden = false;
      this.isChangeReasonHidden = false;
      this.isAGTLevelHidden = false;
      this.isAGTSummeryHidden = false;
      this.isProductCATHidden = false;
      this.isProductsHidden = false;
    }
    else if (this.UserRoleID == "15") {

      // this.isAccSettingsHidden = true;
      // this.isUserStatHidden = true;
      // this.isMassagesHidden = true;
      // this.isFavourHidden = true;
      // this.isSignOutHidden = false;

      this.isComRateHidden = true;
      this.isComORRateHidden = true;
      this.isReturnHidden = true;
      this.isReturnConfirmHidden = true;
      this.isManualDPTSHidden = true;
      this.isManualReceiptHidden = true;

      this.isFstAllowanceComponentHidden = false;
      this.isTargetAllowanceComponentHidden = false;
      this.isRetainerAllowanceComponentHidden = false;
      this.isRetainerBonusComponentHidden = false;
      this.isGroupAchievementComponentHidden = false;
      this.isAdvisorDevelopmentAllowanceComponentHidden = false;
      this.isAdvisorRankingComponentHidden = false;
      this.isTargetMaintainComponentHidden = false;

      this.isAGTMasterHidden = false;
      this.isDesignationHidden = false;
      this.isChangeReasonHidden = false;
      this.isAGTLevelHidden = false;
      this.isAGTSummeryHidden = false;
      this.isProductCATHidden = false;
      this.isProductsHidden = false;

    }

    else if (this.UserRoleID == "14") {

      // this.isAccSettingsHidden = true;
      // this.isUserStatHidden = true;
      // this.isMassagesHidden = true;
      // this.isFavourHidden = true;
      // this.isSignOutHidden = false;

      this.isComRateHidden = true;
      this.isComORRateHidden = true;
      this.isReturnHidden = false;
      this.isReturnConfirmHidden = false;
      this.isManualDPTSHidden = false;
      this.isManualReceiptHidden = false;

      this.isFstAllowanceComponentHidden = true;
      this.isTargetAllowanceComponentHidden = true;
      this.isRetainerAllowanceComponentHidden = true;
      this.isRetainerBonusComponentHidden = true;
      this.isGroupAchievementComponentHidden = true;
      this.isAdvisorDevelopmentAllowanceComponentHidden = true;
      this.isAdvisorRankingComponentHidden = true;
      this.isTargetMaintainComponentHidden = true;

      this.isAGTMasterHidden = true;
      this.isDesignationHidden = true;
      this.isChangeReasonHidden = true;
      this.isAGTLevelHidden = true;
      this.isAGTSummeryHidden = true;
      this.isProductCATHidden = true;
      this.isProductsHidden = true;

    }
  }


  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/', 'login']);
  }

}
