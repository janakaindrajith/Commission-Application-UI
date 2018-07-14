import { Component, OnInit, NgZone, Inject, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { Router } from '@angular/router';
import { BranchService } from '../../shared/services/branch/branch.service';
import { IBranch } from '../../shared/models/Branch.models';

import { BankService } from '../../shared/services/bank/bank.service';
import { IBank } from '../../shared/models/bank.models';

import { BankBranchService } from '../../shared/services/bankBranch/bankBranch.service';
import { IBankBranch } from '../../shared/models/BankBranch.models';

import { AgentTypeService } from '../../shared/services/AgentType/AgentType.service';
import { IAgentType } from '../../shared/models/AgentType.models';

import { AgentCodeService } from '../../shared/services/AgentCode/AgentCode.service';
import { IAgentCode } from '../../shared/models/AgentCode.models';

import { AgentService } from '../../shared/services/Agent/Agent.service';
import { IAgent } from '../../shared/models/Agent.models';

import { IAgentSearch } from '../../shared/models/AgentSearch';

import { UploadDocTypeService } from '../../shared/services/UploadDocType/upload-doc-type.service';
import { IUploadDocType } from '../../shared/models/UploadDocType.models';

import { UploadDocService } from '../../shared/services/UploadDoc/upload-doc.service';
import { IUploadDoc } from '../../shared/models/UploadDoc.models';

import { LevelService } from '../../shared/services/Level/level.service';
import { ILevel } from '../../shared/models/Level.models';

import { LanguageService } from '../../shared/services/Language/language.service';
import { ILanguage } from '../../shared/models/Language.model';

import { DesignationService } from '../../shared/services/designation/designation.service';
import { Idesignation } from '../../shared/models/designation.models';

import { ChangereasonService } from '../../shared/services/ChangeReason/changereason.service';
import { IChangeReason } from '../../shared/models/ChangeReason.models';

import { AgentHistoryService } from '../../shared/services/AgentHistory/agent-history.service';
import { IagentHistory } from '../../shared/models/AgentHistory.models';

import { LeaderCodeSearchService } from '../../shared/services/LeaderCodeSearch/leader-code-search.service';
import { IAgentLeaderCode } from '../../shared/models/AgentLeaderCode.models';

import { AgentAttachedService } from '../../shared/services/AgentAttached/agent-attached.service';
import { IAgentAttached } from '../../shared/models/AgentAttached.models';

import { ITCSAuth } from '../../shared/models/TCSAuth.models';
import { IAgentTCS } from '../../shared/models/AgentTCS.models';


import { DatePipe } from '@angular/common';
import { MomentModule } from 'angular2-moment';

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { IUser } from '../../shared/models/user/user.model';

import { UUID } from 'angular2-uuid';
import { NgUploaderOptions, UploadedFile, UploadRejected } from 'ngx-uploader';

import { URL_CONST } from '../../shared/config/url.constants';

import { COMMON_VALUES } from '../../shared/config/commonValues';

import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from "toastr-ng2/toastr";


declare var jQuery: any;

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
})
export class AgentComponent implements OnInit {

  User: IUser;

  Id: number = 0;
  Code: string = '';
  Description: string = '';
  isDisabled: boolean = false;
  xxx: boolean = true;
  isNewRecord: boolean = false;
  test: string = '';

  branchList: Array<Object> = [];
  bankList: Array<Object> = [];
  bankBranchList: Array<IBankBranch> = [];
  AgentTypeList: Array<IAgentType> = [];
  AgentCodeList: Array<IAgentCode> = [];
  AgentSearchList: Array<IAgentSearch> = [];
  AgentLevelList: Array<ILevel> = [];
  UploadDocTypeList: Array<IUploadDocType> = [];
  UploadDocList: Array<IUploadDocType> = [];
  AttachedAgentsUploadDocList: Array<IUploadDocType> = [];
  LanguageList: Array<ILanguage> = [];
  DesignationList: Array<ILanguage> = [];
  ChangeReasonList: Array<ILanguage> = [];
  BranchTransferList: Array<ILanguage> = [];
  StopCommissionList: Array<ILanguage> = [];
  ReleaseCommissionList: Array<ILanguage> = [];
  AgentAttachedList: Array<IAgentAttached> = [];



  SelectedBranchID: string = '';
  SelectedBankID: string = '';
  SelectedAgentTypeID: string = '';

  //------------Agent------------
  AGT_ID: string = '';
  AGT_CODE: string = '';
  AGT_TYPE_ID: number = 0;
  AGT_CODE_ID: number = 0;
  AGT_MDRT_STATUS: number = 0;
  AGT_MDRT_YEAR: number = 0;
  AGT_SYSTEM_ID: string = '';
  AGT_SUB_CODE: string = '';
  AGT_LINE_OF_BUSINESS: number = 0;
  AGT_CHANNEL: string = '';
  AGT_LEVEL: number = 0;
  AGT_LANGUAGE: number = 0;
  AGT_SUPER_CODE: string = '';
  AGT_TITLE: string = '';
  AGT_FIRST_NAME: string = '';
  AGT_LAST_NAME: string = '';
  AGT_ADD1: string = '';
  AGT_ADD2: string = '';
  AGT_ADD3: string = '';
  AGT_NIC_NO: string = '';
  AGT_DOB: Date;
  AGT_MOBILE: string = '';
  AGT_TEL_NO: string = '';
  AGT_FAX_NO: string = '';
  AGT_EMAIL: string = '';
  AGT_BRANCH_CODE: string = '';
  AGT_BANK_ID: number = 0;
  AGT_BANK_BRANCH_ID: number = 0;
  AGT_BANK_ACC_NO: string = '';
  AGT_ID_ISSUED: number = 0;
  AGT_ID_ISSUED_DATE: Date;
  AGT_APPOINT_DATE: Date;
  AGT_SLII_EXAM: number = 0;
  AGT_SLII_EXAM_DATE: Date;
  AGT_AGMT_DATE_RECEIVED: Date;
  AGT_AGMT_DATE_ISSUED: Date;
  AGT_APP_DATE_RECEIVED: number;
  AGT_APP_DATE_ISSUED: Date;
  AGT_TRNS_BRANCH_CODE: string;
  AGT_TRNS_BRANCH_DATE: Date;
  AGT_STOP_COMM_DATE: Date;
  AGT_STOP_COMM_REASON: string;
  AGT_RELEASE_COMM_DATE: Date;
  AGT_RELEASE_COMM_REASON: string;
  AGT_CUSTOMER_COMPLAIN: string;
  AGT_TERMINATE_NOTICE_DATE: Date;
  AGT_TERMINATE_DATE: Date;
  AGT_TERMINATE_REASON: string;
  AGT_BLACK_LISTED_DATE: Date;
  AGT_DUES_TO_COMPANY: string;
  AGT_REJOINED_DATE: Date;
  AGT_REMARKS: string;
  AGT_BUSINESS_TYPE: number;
  AGT_LEVEL_CODE: string;
  AGT_LEADER_CODE: string;
  AGT_STATUS: number;
  AGT_TERMINATE_STATUS: number;
  AGT_STOP_COMM_STATUS: number;
  AGT_ISS_STATUS: number;
  AGT_ISS_AMOUNT: number;
  AGT_ISS_GIVEN_DATE: Date;
  AGT_ISS_CLOSE_DATE: Date;
  AGT_RETAINER_STATUS: number;
  AGT_RETAINER_AMOUNT: number;
  AGT_RETAINER_GIVEN_DATE: Date;
  AGT_RETAINER_CLOSE_DATE: Date;
  AGT_LEADER_AGENT_CODE_V: string;
  AGT_LEADER_LEADER_CODE_V: string;
  AGT_LEADER_AGENT_CODE_H: string;
  AGT_LEADER_LEADER_CODE_H: string;
  AGT_CREATED_BY: string;
  AGT_DESIGNATION_ID: number;
  AGT_HIERARCHY_TYPE_ID: number;
  AGT_CHANGE_REASON_ID: number;
  AGT_EFFECTIVE_DATE: Date;
  AGT_CHANGE_REASON: string;
  AGT_IMAGE: string;
  AGT_LEADER_GIVEN_DATE: Date;


  //---TCS Agent Record Status----
  AGT_CODE_TCS: string = '';
  AGT_NAME_TCS: string = '';
  AGT_STATUS_TCS: string = '';
  //------------------------------


  //--------------------Control Enabled Disabled variables----------------------
  isAGT_IDDisabled: boolean = false;
  isAGT_CODEDisabled: boolean = false;
  isAGT_TYPE_IDDisabled: boolean = false;
  isAGT_CODE_IDDisabled: boolean = false;
  isAGT_MDRT_STATUSDisabled: boolean = false;
  isAGT_MDRT_YEARDisabled: boolean = false;
  isAGT_LEVEL_BANCDisabled: boolean = false;
  isAGT_SYSTEM_IDDisabled: boolean = false;
  isAGT_SUB_CODEDisabled: boolean = false;
  isAGT_LINE_OF_BUSINESSDisabled: boolean = false;
  isAGT_CHANNELDisabled: boolean = false;
  isAGT_LEVELDisabled: boolean = false;
  isAGT_LANGUAGEDisabled: boolean = false;
  isAGT_SUPER_CODEDisabled: boolean = false;
  isAGT_TITLEDisabled: boolean = false;
  isAGT_FIRST_NAMEDisabled: boolean = false;
  isAGT_LAST_NAMEDisabled: boolean = false;
  isAGT_ADD1Disabled: boolean = false;
  isAGT_ADD2Disabled: boolean = false;
  isAGT_ADD3Disabled: boolean = false;
  isAGT_NIC_NODisabled: boolean = false;
  isAGT_DOBDisabled: boolean = false;
  isAGT_MOBILEDisabled: boolean = false;
  isAGT_TEL_NODisabled: boolean = false;
  isAGT_FAX_NODisabled: boolean = false;
  isAGT_EMAILDisabled: boolean = false;
  isAGT_BRANCH_CODEDisabled: boolean = false;
  isAGT_BANK_IDDisabled: boolean = false;
  isAGT_BANK_BRANCH_IDDisabled: boolean = false;
  isAGT_BANK_ACC_NODisabled: boolean = false;
  isAGT_ID_ISSUEDDisabled: boolean = false;
  isAGT_ID_ISSUED_DATEDisabled: boolean = false;
  isAGT_APPOINT_DATEDisabled: boolean = false;
  isAGT_SLII_EXAMDisabled: boolean = false;
  isAGT_SLII_EXAM_DATEDisabled: boolean = false;
  isAGT_AGMT_DATE_RECEIVEDDisabled: boolean = false;
  isAGT_AGMT_DATE_ISSUEDDisabled: boolean = false;
  isAGT_APP_DATE_RECEIVEDDisabled: boolean = false;
  isAGT_APP_DATE_ISSUEDDisabled: boolean = false;
  isAGT_TRNS_BRANCH_CODEDisabled: boolean = false;
  isAGT_TRNS_BRANCH_DATEDisabled: boolean = false;
  isAGT_STOP_COMM_DATEDisabled: boolean = false;
  isAGT_STOP_COMM_REASONDisabled: boolean = false;
  isAGT_RELEASE_COMM_DATEDisabled: boolean = false;
  isAGT_RELEASE_COMM_REASONDisabled: boolean = false;
  isAGT_CUSTOMER_COMPLAINDisabled: boolean = false;
  isAGT_TERMINATE_NOTICE_DATEDisabled: boolean = false;
  isAGT_TERMINATE_DATEDisabled: boolean = false;
  isAGT_TERMINATE_REASONDisabled: boolean = false;
  isAGT_BLACK_LISTED_DATEDisabled: boolean = false;
  isAGT_DUES_TO_COMPANYDisabled: boolean = false;
  isAGT_REJOINED_DATEDisabled: boolean = false;
  isAGT_REMARKSDisabled: boolean = false;
  isAGT_BUSINESS_TYPEDisabled: boolean = false;
  isAGT_LEVEL_CODEDisabled: boolean = false;
  isAGT_LEADER_CODEDisabled: boolean = false;
  isAGT_STATUSDisabled: boolean = false;
  isAGT_TERMINATE_STATUSDisabled: boolean = false;
  isAGT_STOP_COMM_STATUSDisabled: boolean = false;
  isAGT_ISS_STATUSDisabled: boolean = false;
  isAGT_ISS_AMOUNTDisabled: boolean = false;
  isAGT_ISS_GIVEN_DATEDisabled: boolean = false;
  isAGT_ISS_CLOSE_DATEDisabled: boolean = false;
  isAGT_RETAINER_STATUSDisabled: boolean = false;
  isAGT_RETAINER_AMOUNTDisabled: boolean = false;
  isAGT_RETAINER_GIVEN_DATEDisabled: boolean = false;
  isAGT_RETAINER_CLOSE_DATEDisabled: boolean = false;
  isAGT_LEADER_AGENT_CODE_VDisabled: boolean = false;
  isAGT_LEADER_LEADER_CODE_VDisabled: boolean = false;
  isAGT_LEADER_AGENT_CODE_HDisabled: boolean = false;
  isAGT_LEADER_LEADER_CODE_HDisabled: boolean = false;
  isAGT_CREATED_BYDisabled: boolean = false;
  isAGT_DESIGNATION_IDDisabled: boolean = false;
  isAGT_HIERARCHY_TYPE_IDDisabled: boolean = false;
  isAGT_CHANGE_REASON_IDDisabled: boolean = false;
  isAGT_EFFECTIVE_DATEDisabled: boolean = false;
  isAGT_CHANGE_REASONDisabled: boolean = false;
  isAGT_LEADER_GIVEN_DATEDisabled: boolean = false;

  isNEWDisabled: boolean = false;
  isEDITDisabled: boolean = false;
  isSAVEDisabled: boolean = false;
  isCANCELDisabled: boolean = false;

  //----------------------------------------------------------------------------


  rtnDate: Date;
  vText: string;
  //-----------------------------

  isAgentDetailsValid: boolean = true;
  isAgentAttachedChanged: string = '';
  vHOSTED_URL_PREFIX: string = '';


  //------------------For field Validation-------------
  AGT_TYPE_ID_CLS: string = '';
  AGT_CODE_ID_CLS: string = '';
  AGT_MDRT_STATUS_CLS: string = '';
  AGT_MDRT_YEAR_CLS: string = '';
  AGT_SYSTEM_ID_CLS: string = '';
  AGT_SUB_CODE_CLS: string = '';
  AGT_LINE_OF_BUSINESS_CLS: string = '';
  AGT_CHANNEL_CLS: string = '';
  AGT_LEVEL_CLS: string = '';
  AGT_SUPER_CODE_CLS: string = '';
  AGT_TITLE_CLS: string = '';
  AGT_FIRST_NAME_CLS: string = '';
  AGT_LAST_NAME_CLS: string = '';
  AGT_ADD1_CLS: string = '';
  AGT_ADD2_CLS: string = '';
  AGT_ADD3_CLS: string = '';
  AGT_NIC_NO_CLS: string = '';
  AGT_DOB_CLS: string = '';
  AGT_MOBILE_CLS: string = '';
  AGT_TEL_NO_CLS: string = '';
  AGT_FAX_NO_CLS: string = '';
  AGT_EMAIL_CLS: string = '';
  AGT_BRANCH_CODE_CLS: string = '';
  AGT_BANK_ID_CLS: string = '';
  AGT_BANK_BRANCH_ID_CLS: string = '';
  AGT_BANK_ACC_NO_CLS: string = '';
  AGT_ID_ISSUED_CLS: string = '';
  AGT_ID_ISSUED_DATE_CLS: string = '';
  AGT_APPOINT_DATE_CLS: string = '';
  AGT_SLII_EXAM_CLS: string = '';
  AGT_SLII_EXAM_DATE_CLS: string = '';
  AGT_AGMT_RECEIVED_CLS: string = '';
  AGT_AGMT_DATE_CLS: string = '';
  AGT_APP_RECEIVED_CLS: string = '';
  AGT_APP_RECEIVED_DATE_CLS: string = '';
  AGT_TRNS_BRANCH_CODE_CLS: string;
  AGT_TRNS_BRANCH_DATE_CLS: string = '';
  AGT_STOP_COMM_DATE_CLS: string = '';
  AGT_STOP_COMM_REASON_CLS: string = '';
  AGT_RELEASE_COMM_DATE_CLS: string = '';
  AGT_RELEASE_COMM_REASON_CLS: string;
  AGT_CUSTOMER_COMPLAIN_CLS: string;
  AGT_TERMINATE_NOTICE_DATE_CLS: string = '';
  AGT_TERMINATE_DATE_CLS: string = '';
  AGT_TERMINATE_REASON_CLS: string;
  AGT_BLACK_LISTED_DATE_CLS: string = '';
  AGT_DUES_TO_COMPANY_CLS: string;
  AGT_REJOINED_DATE_CLS: string = '';
  AGT_REMARKS_CLS: string;
  AGT_BUSINESS_TYPE_CLS: string;
  AGT_LEVEL_CODE_CLS: string;
  AGT_LEADER_CODE_CLS: string;

  AGT_STATUS_CLS: string = '';
  AGT_TERMINATE_STATUS_CLS: string = '';
  AGT_STOP_COMM_STATUS_CLS: string = '';
  AGT_ISS_STATUS_CLS: string = '';
  AGT_ISS_AMOUNT_CLS: string = '';
  AGT_ISS_GIVEN_DATE_CLS: string = '';
  AGT_ISS_CLOSE_DATE_CLS: string = '';
  AGT_RETAINER_STATUS_CLS: string = '';
  AGT_RETAINER_AMOUNT_CLS: string = '';
  AGT_RETAINER_GIVEN_DATE_CLS: string = '';
  AGT_RETAINER_CLOSE_DATE_CLS: string = '';
  AGT_LEADER_AGENT_CODE_V_CLS: string = '';
  AGT_LEADER_LEADER_CODE_V_CLS: string = '';
  AGT_LEADER_AGENT_CODE_H_CLS: string = '';
  AGT_LEADER_LEADER_CODE_H_CLS: string = '';
  AGT_LEADER_GIVEN_DATE_CLS: string = '';
  //----------------End field Validation-------------


  //Agent Search Cols--------------------------------
  AGT_SEARCH_ID: string;
  AGT_SEARCH_CODE: string;
  AGT_SEARCH_NAME: string;
  AGT_SEARCH_ADDRESS: string;
  AGT_SEARCH_NIC_NO: string;
  AGT_SEARCH_MOBILE: string;
  //-------------------------------------------------

  //Agent History Search-----------------------------
  AGT_HISTORY_Column1: string;
  AGT_HISTORY_Column2: string;
  AGT_HISTORY_Column3: string;
  AGT_HISTORY_Column4: string;
  AGT_HISTORY_Column5: string;
  //-------------------------------------------------


  //TCS Auth-----------------------------------------
  TCS_USER_CODE: string;
  TCS_ERROR_CODE: string;
  TCS_SESSION_ID: string;
  TCS_ACTION_EVENT: string;
  TCS_ROLE_CODE: string;
  TCS_PASSWORD: string;
  TCS_BRANCH_CODE: string;
  //-------------------------------------------------


  //Agent Upload Docs--------------------------------
  AGT_PROFILE_ID: number = 0;
  AGT_PROFILE_AGT_CODE: string = "";
  AGT_PROFILE_DOC_TYPE_ID: number = 0;
  AGT_PROFILE_DOC_TYPE_DESC: string = "";
  AGT_PROFILE_DOC_URL: string = "";
  AGT_PROFILE_CREATEDBY: string = "";
  AGT_PROFILE_CREATDEDATE: string = "";
  AGT_PROFILE_EFFECTIVEENDDATE: string = "";

  AGT_UPLOAD_DOC_DESC: string = "";
  //-------------------------------------------------


  //Agent Upload Docs--------------------------------
  AGT_PROFILE_DOC_URL_LEADER_V: string = "";
  //-------------------------------------------------

  //Agent Upload Docs--------------------------------
  AGT_PROFILE_DOC_URL_LEADER_H: string = "";
  //-------------------------------------------------



  TempStr1: string = "";
  TempStr2: string = "";
  TempInt1: number = 0;
  TempInt2: number = 0;

  UploadDocTypeId: number;
  uploadDocTypeList: Array<IUploadDocType> = [];
  DocUploadUrl: any;

  uploaderOptions: NgUploaderOptions;
  response: any;
  sizeLimit: number = 10000000; // 10MB
  previewData: any;
  errorMessage: string;
  inputUploadEvents: EventEmitter<string>;


  TestString: string = "";
  TempHeirarchyID: string = ""; //I / O
  BussinessLine: string = "";   //LIFE / GENERAL
  AgentStatus: string = "";   //LIFE / GENERAL
  StopCommissionStatus: string = "";
  ISStatus: string = "";
  RetainerStatus: string = "";

  CurrentDate: string;

  Sex: string;

  isLoading: boolean;
  isRecordFoundTCS: boolean;
  isNICExists: boolean;

  selectedRow: Number;

  datepickerOpts = {
    format: 'dd/mm/yyyy'
  }
  constructor(private BranchService: BranchService, private BankService: BankService,
    private BankBranchService: BankBranchService, private AgentTypeService: AgentTypeService,
    private AgentCodeService: AgentCodeService, private AgentService: AgentService,
    private LevelService: LevelService, private UploadDocTypeService: UploadDocTypeService,
    private UploadDocService: UploadDocService, private LanguageService: LanguageService,
    moment: MomentModule, private router: Router, private DesignationService: DesignationService,
    private ChangereasonService: ChangereasonService, private AgentHistoryService: AgentHistoryService,
    private LeaderCodeSearchService: LeaderCodeSearchService, private AgentAttachedService: AgentAttachedService,
    @Inject(NgZone) private zone: NgZone, private toastrService: ToastrService,
    private ref: ChangeDetectorRef) {



    this.inputUploadEvents = new EventEmitter<string>();
  }

  

  ngOnInit() {
    try {


      this.vHOSTED_URL_PREFIX = URL_CONST.HOSTED_URL_PREFIX;

      this.getBranches();
      this.getBanks();
      this.getAgentTypes();
      this.getLevels();
      this.getLanguage();
      this.getDesignation();
      this.getChangeReason();

      this.FormControlStatusChange('LOAD');

      this.FormButtonStatusChange('LOAD');

      this.getUploadDocTypes();

      this.User = JSON.parse(localStorage.getItem('currentCOMUser'));

      this.isDisabled = true;

      this.test = "active"

      //this.GetRecordTCS();

    } catch (error) {
      alert('Error Ocurred...!');
    }

  }

  GetLeaderCode() {
    console.log('xx');
    console.log(this.AGT_LEADER_AGENT_CODE_V);
    this.LeaderCodeSearchService.GetLeaderCodeByAgentCode(this.AGT_LEADER_AGENT_CODE_V)
      .subscribe((data) => {
        console.log(data);
        let obj: IAgentLeaderCode = JSON.parse(data);
        console.log(obj);

        console.log(obj.LEADER_LEADER_CODE);

        this.AGT_LEADER_LEADER_CODE_V = obj.LEADER_LEADER_CODE;

      });

  }

  GetBranchTransferHistory(typeID) {
    //1 = Transfer Branch History
    //2 = Stop Commission History
    //3 = Release Commission History
    this.AgentHistoryService.getagentHistoryByAgentCode(this.AGT_CODE, typeID)
      .subscribe((data) => {
        console.log(data);

        this.BranchTransferList = data;

        console.log('GetTransBranchHistory');
        console.log(data);

      },
      (err) => console.log(err));
  }

  GetStopCommissionHistory(typeID) {
    //1 = Transfer Branch History
    //2 = Stop Commission History
    //3 = Release Commission History
    this.AgentHistoryService.getagentHistoryByAgentCode(this.AGT_CODE, typeID)
      .subscribe((data) => {
        console.log(data);

        this.StopCommissionList = data;

        console.log('GetTransBranchHistory');
        console.log(data);

      },
      (err) => console.log(err));
  }

  GetReleaseCommissionHistory(typeID) {
    //1 = Transfer Branch History
    //2 = Stop Commission History
    //3 = Release Commission History
    this.AgentHistoryService.getagentHistoryByAgentCode(this.AGT_CODE, typeID)
      .subscribe((data) => {
        console.log(data);

        this.ReleaseCommissionList = data;

        console.log('GetTransBranchHistory');
        console.log(data);

      },
      (err) => console.log(err));
  }

  getDesignation() {
    this.DesignationService.getdesignations()
      .subscribe((data) => {

        this.DesignationList = data;
        console.log(JSON.stringify(data));
      },
      (err) => console.log(err));
  }

  getChangeReason() {
    this.ChangereasonService.getchangereasons()
      .subscribe((data) => {

        this.ChangeReasonList = data;
        console.log(JSON.stringify(data));
      },
      (err) => console.log(err));
  }

  getLanguage() {
    this.LanguageService.getLanguage()
      .subscribe((data) => {

        this.LanguageList = data;
        console.log(JSON.stringify(data));
      },
      (err) => console.log(err));
  }

  startUpload() {

    try {


      //this.onSelectOfUploadDocTypeId(this.AGT_CODE);


      if (this.AGT_CODE == '' || this.AGT_CODE == null) {
        alert('Please Select a party for upload.....');
        return;
      }

      if (this.AGT_UPLOAD_DOC_DESC == '') {
        alert('Please Fill the Description.....');
        return;
      }

      if (this.AGT_LEVEL_CODE == '-') {
        alert('Please Select the Type.....');
        return;
      }

      //this.onSelectOfUploadDocTypeId(this.AGT_CODE);

      this.inputUploadEvents.emit('startUpload');

      this.getProfilePicByAgentID(this.AGT_CODE);

      this.getUploadDocByAgentID(this.AGT_CODE);

      //alert('Successfully Uploaded....!');
      this.showSuccess('Successfully Uploaded....!')

    }
    catch (error) {
      alert(error);
    }

  }

  getProfilePicByAgentID(AgentCode) {

    this.UploadDocService.getProfilePicByAgentID(AgentCode)
      .subscribe((data) => {

        console.log(data);

        let obj: IUploadDoc = JSON.parse(JSON.stringify(data));

        this.AGT_PROFILE_ID = obj.Id;
        this.AGT_PROFILE_AGT_CODE = obj.AgtCode;
        this.AGT_PROFILE_DOC_TYPE_ID = obj.DocTypeId;
        this.AGT_PROFILE_DOC_TYPE_DESC = obj.DocTypeDesc.toString();
        this.AGT_PROFILE_DOC_URL = obj.DocUrl.toString();
        this.AGT_PROFILE_CREATEDBY = obj.CreatedBy;
        this.AGT_PROFILE_CREATDEDATE = obj.CreatedDate;
        this.AGT_PROFILE_EFFECTIVEENDDATE = obj.EffectiveEndDate;

        this.AGT_IMAGE = URL_CONST.HOSTED_URL_PREFIX + this.AGT_PROFILE_DOC_URL;

      });
  }

  getLeader_VProfilePicByAgentID(AgentCode) {

    this.UploadDocService.getLeader_VProfilePicByAgentID(AgentCode)
      .subscribe((data) => {

        console.log(data);

        let obj: IUploadDoc = JSON.parse(JSON.stringify(data));

        if (obj == null) {
          this.AGT_PROFILE_DOC_URL_LEADER_V = null;
        }

        this.AGT_PROFILE_DOC_URL_LEADER_V = obj.DocUrl.toString();

        this.AGT_PROFILE_DOC_URL_LEADER_V = URL_CONST.HOSTED_URL_PREFIX + this.AGT_PROFILE_DOC_URL_LEADER_V;

        console.log('getLeader_VProfilePicByAgentID' + this.AGT_PROFILE_DOC_URL_LEADER_V);

      });
  }

  getLeader_HProfilePicByAgentID(AgentCode) {

    this.UploadDocService.getLeader_HProfilePicByAgentID(AgentCode)
      .subscribe((data) => {

        console.log(data);

        let obj: IUploadDoc = JSON.parse(JSON.stringify(data));

        if (obj == null) {
          this.AGT_PROFILE_DOC_URL_LEADER_H = null;
        }

        this.AGT_PROFILE_DOC_URL_LEADER_H = obj.DocUrl.toString();

        this.AGT_PROFILE_DOC_URL_LEADER_H = URL_CONST.HOSTED_URL_PREFIX + this.AGT_PROFILE_DOC_URL_LEADER_H;

      });
  }

  setDocumentPath = function (index, DocPath) {


    //original - 02/05/2018
    //window.open('http://192.168.10.172:8082/comm_docs' + DocPath);

    window.open(URL_CONST.HOSTED_URL_PREFIX + DocPath);

  }

  beforeUpload(uploadingFile: UploadedFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      this.errorMessage = 'File is too large!';
    }
  }

  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        // this.response = data;
        if (data && data.response) {
          // this.response = JSON.parse(data.response);
          console.log(JSON.parse(data.response));
          // this.showSuccess("Document Successfully Uploaded.");

        }
      });
    });
  }

  handlePreviewData(data: any) {
    this.previewData = data;
  }

  onSelectOfUploadDocTypeId(docTypeId) {



    if (this.AGT_UPLOAD_DOC_DESC == '') {
      // alert('Please enter document description..!');
      this.AGT_UPLOAD_DOC_DESC = '-';
    }


    this.UploadDocTypeId = docTypeId;
    console.log('doc type-' + this.UploadDocTypeId);

    // this.DocUploadUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL_CONST.URL_PREFIX + 'api/Main/UploadDocument');
    //this.DocUploadUrl = 'http://localhost:46817/api/Main/UploadDocument?sTempSeqId=' +'aaaaasas';
    // this.DocUploadUrl = URL_CONST.URL_PREFIX + 'api/Main/UploadDocument?sTempSeqId=' + this.TempSeqId;
    //api/UploadDoc/UploadDocument?sTempSeqId={sTempSeqId} 	

    // alert(URL_CONST.URL_PREFIX + 'api/UploadDoc/UploadDocument?vAGT_CODE=' + this.AGT_CODE);

    this.DocUploadUrl = URL_CONST.URL_PREFIX + 'api/UploadDoc/UploadDocument?vAGT_CODE=' + this.AGT_CODE;

    console.log('url - ' + this.DocUploadUrl);



    this.uploaderOptions = new NgUploaderOptions({
      url: this.DocUploadUrl,
      filterExtensions: true,
      allowedExtensions: ['jpg', 'pdf', 'txt'],
      // data: { tempSeqId: '123', docTypeId: this.UploadDocTypeId },
      //data: { AgentID: this.AGT_ID, DocTypeID: this.UploadDocTypeId, UserID:this.User.UserName},
      data: { AgentCode: this.AGT_CODE, DocTypeID: this.UploadDocTypeId, UserID: this.User.UserName, DocDescription: this.AGT_UPLOAD_DOC_DESC },
      autoUpload: false,
      fieldName: 'file',
      fieldReset: true,
      maxUploads: 2,
      method: 'POST',
      previewUrl: true,
      withCredentials: false
    });


    console.log('options - ' + JSON.stringify(this.uploaderOptions));
  }

  getUploadDocByAgentID(AGENT_ID) {
    this.UploadDocService.getUploadDocByAgentID(AGENT_ID)
      .subscribe((data) => {
        console.log(data);

        this.UploadDocList = data;
      },
      (err) => console.log(err));
  }

  getAttachedAgentsUploadDocByAgentID(AGENT_ID) {
    this.UploadDocService.getAttachedAgentsUploadDocByAgentID(AGENT_ID)
      .subscribe((data) => {
        console.log(data);

        this.AttachedAgentsUploadDocList = data;
      },
      (err) => console.log(err));
  }

  getUploadDocTypes() {
    this.UploadDocTypeService.getUploadDocTypes()
      .subscribe((data) => {

        this.UploadDocTypeList = data;
        console.log(JSON.stringify(data));
      },
      (err) => console.log(err));
  }

  getLevels() {
    this.LevelService.getLevel()
      .subscribe((data) => {

        this.AgentLevelList = data;
        console.log(JSON.stringify(data));
      },
      (err) => console.log(err));
  }

  myFunc(FName, Lname) {
    alert(FName + Lname);
  }

  getBranches() {
    this.BranchService.getBranch()
      .subscribe((data) => {

        this.branchList = data;
        //console.log(JSON.stringify(data));
      },
      (err) => console.log(err));
  }

  getBanks() {
    this.BankService.getBanks()
      .subscribe((data) => {

        this.bankList = data;
      },
      (err) => console.log(err));
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




  //when terminate check weather any attached subordinates and ask for a confirmation to attached all those to top level
  GetAgentAttachedList(vAgentCode) {
    this.AgentAttachedService.getAgentAttachedListByAgentCode(this.AGT_CODE)
      .subscribe((data) => {
        this.AgentAttachedList = data;
      },
      (err) => console.log(err));

  }
  //--------------------------------------------------------------------------------------------------------------------



  GetTCSAuth(UserCode, Password, BranchCode, RoleCode): Promise<any> {

    return new Promise((resolve, reject) => {


      //alert('CheckTCSAuth Called');

      let objTCS: ITCSAuth = {
        userCode: COMMON_VALUES.TCS_LOGIN_USER,
        passWord: COMMON_VALUES.TCS_LOGIN_PWD,
        branchCode: COMMON_VALUES.TCS_LOGIN_BRANCH_CODE,
        roleCode: COMMON_VALUES.TCS_LOGIN_ROLE_CODE,
        errorCode: '',
        errorMessage: '',
        sessionId: '',
        actionEvent: 'LOGIN',
        newPassWord: null,
        confirmNewPassWord: null
      }

      this.AgentService.checkTCSAuth(objTCS)
        .subscribe((data) => {
          let obj: ITCSAuth = JSON.parse(JSON.stringify(data));
          //alert(obj.sessionId);

          console.log(data);
          // this.AGT_PROFILE_ID = obj.Id;
          // this.AGT_PROFILE_AGT_CODE = obj.AgtCode;
          this.TCS_SESSION_ID = obj.sessionId;

          resolve(obj.sessionId);

        }, (err) => {
          console.log('err', err);
          reject(err);
          this.showError("TCS API Authentication Failed");
        });


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

  private SetTCSValues() {

    this.CurrentDate = new Date().toLocaleDateString();
    this.CurrentDate = this.CurrentDate + ' ' + new Date().toLocaleTimeString();


    //---------------------------------------------------------------------
    if (this.AGT_HIERARCHY_TYPE_ID == 1) {
      this.TempHeirarchyID = "I";
    }
    else if (this.AGT_HIERARCHY_TYPE_ID == 2) {
      this.TempHeirarchyID = "O";
    }
    else {
      this.TempHeirarchyID = "I";
    }
    //=====================================================================

    //---------------------------------------------------------------------
    if (this.AGT_BUSINESS_TYPE == 1) {
      this.BussinessLine = "LIFE";
    }
    else if (this.AGT_BUSINESS_TYPE == 2) {
      this.BussinessLine = "GENERAL";
    }
    else {
      this.BussinessLine = "LIFE/GENERAL";
    }
    //=====================================================================

    //---------------------------------------------------------------------
    if (this.AGT_STATUS == 1 && this.AGT_TERMINATE_STATUS == 0 && this.AGT_STOP_COMM_STATUS == 0) {
      this.AgentStatus = "Active";
    }
    else if (this.AGT_STATUS == 1 && this.AGT_TERMINATE_STATUS == 0 && this.AGT_STOP_COMM_STATUS == 1) {
      this.AgentStatus = "Commission stopped";
    }
    else if (this.AGT_STATUS == 0 && this.AGT_TERMINATE_STATUS == 1 && this.AGT_STOP_COMM_STATUS == 1) {
      this.AgentStatus = "Cancelled";
    }
    else if (this.AGT_STATUS == 0 && this.AGT_TERMINATE_STATUS == 1 && this.AGT_STOP_COMM_STATUS == 0) {
      this.AgentStatus = "Cancelled";
    }
    else {
      this.AgentStatus = "Cancelled";
    }
    //=====================================================================

    //---------------------------------------------------------------------
    if (this.AGT_STOP_COMM_STATUS == 1) {
      this.StopCommissionStatus = "Yes";
    }
    else if (this.AGT_STOP_COMM_STATUS == 0) {
      this.StopCommissionStatus = "No";
    }
    else {
      this.StopCommissionStatus = "Yes";
    }
    //=====================================================================

    //---------------------------------------------------------------------
    if (this.AGT_ISS_STATUS == 1) {
      this.ISStatus = "Yes";
    }
    else if (this.AGT_ISS_STATUS == 0) {
      this.ISStatus = "No";
    }
    else {
      this.ISStatus = "Yes";
    }
    //=====================================================================

    //---------------------------------------------------------------------
    if (this.AGT_RETAINER_STATUS == 1) {
      this.RetainerStatus = "Yes";
    }
    else if (this.AGT_RETAINER_STATUS == 0) {
      this.RetainerStatus = "No";
    }
    else {
      this.RetainerStatus = "No";
    }
    //=====================================================================

    // <option value="2">SELECT</option>
    // <option value="1">YES</option>
    // <option value="0">NO</option>


    //---------------------------------------------------------------------
    if (this.AGT_TITLE == "MR." || this.AGT_TITLE == "DR." || this.AGT_TITLE == "DR.") {
      this.Sex = "M";
    }
    else {
      this.Sex = "F";
    }
    //=====================================================================
  }


  SaveRecordTCS(AgentOBJ, vAgentCode) {
    try {

      var moment = require('moment');


      this.GetTCSAuth('', '', '', '').then((sessionId) => {


        this.SetTCSValues();


        let obj: IAgentTCS = {
          userCode: "JANAKATEST",
          errorCode: "",
          roleCode: "SUPERUSER",
          errorMessage: "",
          sessionId: sessionId,//this.TCS_SESSION_ID,
          actionEvent: "ADDPARTY",
          partycode: this.AGT_CODE,
          partytype: this.TempHeirarchyID,//"I", //ASK TCS 
          firstname: this.AGT_FIRST_NAME,
          middlename: "",
          lastname: this.AGT_LAST_NAME,
          othername: "",
          businessname: "",
          registrationno: "",
          registrationdate: "",
          typeoforganization: "",
          title: this.AGT_TITLE,// "MR", //ASK TCS
          nicno: this.AGT_NIC_NO,
          sicno: "",
          sex: this.Sex,//"M", //ASK TCS
          nationality: "SRILANKAN",
          occupation: "Business",//OTHER", //ASK TCS
          parentpartycode: "",
          startdate: this.CurrentDate,//"23/11/2017 05:10:00",
          stakeCodeSet:
          [
            {
              stakeCode: "AGENT",
              stakeProperties:
              [{
                propertyName: "Bank Account Number",
                propertyValue: this.AGT_BANK_ACC_NO
              },
              {
                propertyName: "Bank Branch Name",
                propertyValue: "ICICI" //ASK TCS
              },
              {
                propertyName: "Bank Name",
                propertyValue: "DFSD"//ASK TCS
              },
              {
                propertyName: "Agency Branch Code",
                propertyValue: "AMBALANGODA" //ASK TCS
              },
              {
                propertyName: "Line Of Business",
                propertyValue: this.BussinessLine,//"LIFE" //ASK TCS
              },
              {
                propertyName: "Channel Code for Agent",
                propertyValue: "Group Agency" //ASK TCS
              },
              {
                propertyName: "Designation Code",
                propertyValue: "Senior Group Field Manager" //ASK TCS
              },
              {
                propertyName: "Leader Code",
                propertyValue: this.AGT_LEADER_CODE //ASK TCS
              },
              {
                propertyName: "Leader Given Date",
                propertyValue: this.SetDateFormat(this.AGT_LEADER_GIVEN_DATE).toString() // PLEASE CHECK
              },
              {
                propertyName: "Privilege for Issue Certificate with Pending Requirements",
                propertyValue: "No"
              },
              {
                propertyName: "Date of Birth",
                propertyValue: this.SetDateFormat(this.AGT_DOB).toString()
              },
              {
                propertyName: "Stop commission",
                propertyValue: this.StopCommissionStatus,//"No",//N"//ASK TCS
              },
              {
                propertyName: "Stopped Commission  Reason",
                propertyValue: this.AGT_STOP_COMM_REASON
              },
              {
                propertyName: "Customer Complain Details",
                propertyValue: this.AGT_CUSTOMER_COMPLAIN
              },
              {
                propertyName: "Retainer Amount",
                propertyValue: this.AGT_RETAINER_AMOUNT.toString()
              },
              {
                propertyName: "Retainer",
                propertyValue: this.RetainerStatus,//"No"//this.AGT_RETAINER_STATUS
              },
              {
                propertyName: "Retainer Valid Until",
                propertyValue: this.SetDateFormat(this.AGT_RETAINER_CLOSE_DATE).toString()
              },
              {
                propertyName: "Identity Card Issued Date",
                propertyValue: this.SetDateFormat(this.AGT_ID_ISSUED_DATE).toString()
              },
              {
                propertyName: "Exam passed date",
                propertyValue: this.SetDateFormat(this.AGT_SLII_EXAM_DATE).toString()
              },
              {
                propertyName: "Field Management Income Support Status",
                propertyValue: this.ISStatus,//"No"//ASK TCS
              },
              {
                propertyName: "Stop commission date",
                propertyValue: this.SetDateFormat(this.AGT_STOP_COMM_DATE).toString()
              },
              {
                propertyName: "Commission release date",
                propertyValue: this.SetDateFormat(this.AGT_RELEASE_COMM_DATE)
              },
              {
                propertyName: "Reason for termination",
                propertyValue: this.AGT_TERMINATE_REASON
              },
              {
                propertyName: "Income Support Amount",
                propertyValue: this.AGT_ISS_AMOUNT.toString()
              },
              {
                propertyName: "Appointed date",
                propertyValue: moment(this.SetDateFormat(this.AGT_APPOINT_DATE)).format('DD/MM/YYYY')
              },
              {
                propertyName: "Income Support Given Date",
                propertyValue: this.SetDateFormat(this.AGT_ISS_GIVEN_DATE)
              },
              {
                propertyName: "Income Support closed date",
                propertyValue: this.SetDateFormat(this.AGT_ISS_CLOSE_DATE)
              },
              {
                propertyName: "Notice of Termination date",
                propertyValue: this.SetDateFormat(this.AGT_TERMINATE_NOTICE_DATE)
              },
              {
                propertyName: "Terminated date",
                propertyValue: this.SetDateFormat(this.AGT_TERMINATE_DATE)
              },
              {
                propertyName: "Reinstated Date",
                propertyValue: this.SetDateFormat(this.AGT_REJOINED_DATE)
              },
              {
                propertyName: "Transfer date",
                propertyValue: this.TCS_BRANCH_CODE
              },
              {
                propertyName: "Advisor Status",
                propertyValue: this.AgentStatus,//"Active" //ASK TCS
              },
              {
                propertyName: "Related Party",
                propertyValue: "No"
              }

              ]
            }],
          relatedPartySet:
          [{
            relationCode: "BRANCH",
            partyCode: "HDO"
          }],
          mailingaddressline1: this.AGT_ADD1,
          mailingaddressline2: this.AGT_ADD2,
          mailingaddressline3: this.AGT_ADD3,
          mailingcitylocation: "ADD_CHENAI",
          mailingprovince: "AP",
          countrycode: "EASTERN",// "EASTERN",
          mailingzipcode: "700154",
          mailingfax: this.AGT_FAX_NO,
          mailingphonework: "0887895563",
          mailingphonecell: "",
          mailingphonehome: this.AGT_TEL_NO,
          mailingemail1: this.AGT_EMAIL,
          mailingemail2: "",
          mailingemail3: "",
          permanentaddresssame: "Y",
          permanentaddress1: "",
          permanentaddress2: "",
          permanentaddress3: "",
          permanentcitylocation: "",
          permanentprovince: "",
          permanentcountrycode: "",
          permanentzipcode: "",
          permanentfaxno: "",
          permanentphonework: "",
          permanentphonecell: "",
          permanentphonehome: "",
          permanentemail1: "",
          permanentemail2: "",
          permanentemail3: "",
          partyStatus: "",
          searchResMaxRange: "40",
          searchResMinRange: "1",
          permanentadddeleteind: "",
          mailingadddeleteind: ""
        }

        this.AgentService.SaveAgentTCS(obj)
          .subscribe((data) => {

            let obj1: Array<IAgentTCS> = JSON.parse(JSON.stringify(data));

            console.log(obj1[0].errorMessage);

            //alert(obj1[0].errorMessage);

            this.showSuccess('Successfully Saved To TCS - ' + obj1[0].errorMessage);

          }, (err) => {
            console.error('err', err);

            this.showError('Error In TCS Saving - ' + err);

          });

      });

    } catch (error) {
      alert(error);
    }
  }


  UpdateRecordTCS(AgentOBJ, vAgentCode) {
    try {

      var moment = require('moment');

      this.GetTCSAuth('', '', '', '').then((sessionId) => {

        console.log('XXX ' + this.TCS_SESSION_ID);

        //
        //this.CurrentDate = moment(Date.now());

        // this.CurrentDate = moment().format('do/mm/yyyy hh:mm:ss');
        // this.CurrentDate = moment.toString();
        // this.CurrentDate = moment.now('dd/mm/yyyy');


        // this.CurrentDate = new Date().toLocaleDateString();
        // this.CurrentDate = this.CurrentDate + ' ' + new Date().toLocaleTimeString();

        //this.CurrentDate = this.CurrentDate + ' ' +  new Date().toTimeString() + new Date().toUTCString() + new Date().getTime();

        // var datePipe = new DatePipe("");//var datePipe = new DatePipe("en-US");
        // this.CurrentDate = datePipe.transform(this.CurrentDate, 'dd/MM/yyyy hh:mm:ss');

        this.SetTCSValues();


        let obj: IAgentTCS = {
          userCode: "JANAKATEST",
          errorCode: "",
          roleCode: "SUPERUSER",
          errorMessage: "",
          sessionId: sessionId,
          actionEvent: "MODIFYPARTY",
          partycode: this.AGT_CODE,
          partytype: this.TempHeirarchyID,//"I", //ASK TCS
          firstname: this.AGT_FIRST_NAME,
          middlename: "",
          lastname: this.AGT_LAST_NAME,
          othername: "",
          businessname: "",
          registrationno: "",
          registrationdate: "",
          typeoforganization: "",//o
          title: this.AGT_TITLE,//"MR", //ASK TCS
          nicno: this.AGT_NIC_NO,
          sicno: "",
          sex: this.Sex,//"M", //ASK TCS////
          nationality: "SRILANKAN",
          occupation: "Business",//RETIRED", //ASK TCS
          parentpartycode: "",
          startdate: this.CurrentDate,//"23/11/2017 05:11:00", 
          stakeCodeSet:
          [
            {
              stakeCode: "AGENT",
              stakeProperties:
              [{
                propertyName: "Bank Account Number",
                propertyValue: this.AGT_BANK_ACC_NO
              },
              {
                propertyName: "Bank Branch Name",
                propertyValue: "ICICI" //ASK TCS
              },
              {
                propertyName: "Bank Name",
                propertyValue: "ICICI"//ASK TCS
              },
              {
                propertyName: "Agency Branch Code",
                propertyValue: "AMBALANGODA" //ASK TCS
              },
              {
                propertyName: "Line Of Business",
                propertyValue: this.BussinessLine,//"LIFE" //ASK TCS
              },
              {
                propertyName: "Channel Code for Agent",
                propertyValue: "Group Agency" //ASK TCS
              },
              {
                propertyName: "Designation Code",
                propertyValue: "Senior Group Field Manager" //ASK TCS
              },
              {
                propertyName: "Leader Code",
                propertyValue: this.AGT_LEADER_CODE //ASK TCS
              },
              {
                propertyName: "Leader Given Date",
                propertyValue: this.SetDateFormat(this.AGT_LEADER_GIVEN_DATE).toString() // PLEASE CHECK
              },
              {
                propertyName: "Privilege for Issue Certificate with Pending Requirements",
                propertyValue: "No"
              },
              {
                propertyName: "Date of Birth",
                propertyValue: this.SetDateFormat(this.AGT_DOB).toString()
              },
              {
                propertyName: "Stop commission",
                propertyValue: this.StopCommissionStatus,//"No"//ASK TCS
              },
              {
                propertyName: "Stopped Commission  Reason",
                propertyValue: this.AGT_STOP_COMM_REASON
              },
              {
                propertyName: "Customer Complain Details",
                propertyValue: this.AGT_CUSTOMER_COMPLAIN
              },
              {
                propertyName: "Retainer Amount",
                propertyValue: this.AGT_RETAINER_AMOUNT.toString()
              },
              {
                propertyName: "Retainer",
                propertyValue: this.RetainerStatus,//"No",//1"//this.AGT_RETAINER_STATUS
              },
              {
                propertyName: "Retainer Valid Until",
                propertyValue: this.SetDateFormat(this.AGT_RETAINER_CLOSE_DATE).toString()
              },
              {
                propertyName: "Identity Card Issued Date",
                propertyValue: this.SetDateFormat(this.AGT_ID_ISSUED_DATE).toString()
              },
              {
                propertyName: "Exam passed date",
                propertyValue: this.SetDateFormat(this.AGT_SLII_EXAM_DATE).toString()
              },
              {
                propertyName: "Field Management Income Support Status",
                propertyValue: this.ISStatus,//"No",//1"//ASK TCS
              },
              {
                propertyName: "Stop commission date",
                propertyValue: this.SetDateFormat(this.AGT_STOP_COMM_DATE).toString()
              },
              {
                propertyName: "Commission release date",
                propertyValue: this.SetDateFormat(this.AGT_RELEASE_COMM_DATE)
              },
              {
                propertyName: "Reason for termination",
                propertyValue: this.AGT_TERMINATE_REASON
              },
              {
                propertyName: "Income Support Amount",
                propertyValue: this.AGT_ISS_AMOUNT.toString()
              },
              {
                propertyName: "Appointed date",
                propertyValue: moment(this.SetDateFormat(this.AGT_APPOINT_DATE)).format('DD/MM/YYYY')
              },
              {
                propertyName: "Income Support Given Date",
                propertyValue: this.SetDateFormat(this.AGT_ISS_GIVEN_DATE)
              },
              {
                propertyName: "Income Support closed date",
                propertyValue: this.SetDateFormat(this.AGT_ISS_CLOSE_DATE)
              },
              {
                propertyName: "Notice of Termination date",
                propertyValue: this.SetDateFormat(this.AGT_TERMINATE_NOTICE_DATE)
              },
              {
                propertyName: "Terminated date",
                propertyValue: this.SetDateFormat(this.AGT_TERMINATE_DATE)
              },
              {
                propertyName: "Reinstated Date",
                propertyValue: this.SetDateFormat(this.AGT_REJOINED_DATE)
              },
              {
                propertyName: "Transfer date",
                propertyValue: this.TCS_BRANCH_CODE
              },
              {
                propertyName: "Advisor Status",
                propertyValue: this.AgentStatus,//"Active" //ASK TCS
              },
              {
                propertyName: "Related Party",
                propertyValue: "No"
              }
              ]
            }],
          relatedPartySet:
          [{
            relationCode: "BRANCH",
            partyCode: "HDO"
          }],
          mailingaddressline1: this.AGT_ADD1,
          mailingaddressline2: this.AGT_ADD2,
          mailingaddressline3: this.AGT_ADD3,
          mailingcitylocation: "ADD_CHENAI",
          mailingprovince: "AP",
          countrycode: "EASTERN",//EASTERN",
          mailingzipcode: "700154",
          mailingfax: this.AGT_FAX_NO,
          mailingphonework: "0887895563",
          mailingphonecell: "",
          mailingphonehome: this.AGT_TEL_NO,
          mailingemail1: this.AGT_EMAIL,
          mailingemail2: "",
          mailingemail3: "",
          permanentaddresssame: "Y",
          permanentaddress1: this.AGT_ADD1,
          permanentaddress2: this.AGT_ADD2,
          permanentaddress3: this.AGT_ADD3,
          permanentcitylocation: "ADD_CHENAI",
          permanentprovince: "AP",
          permanentcountrycode: "EASTERN",
          permanentzipcode: "700154",
          permanentfaxno: "",
          permanentphonework: "",
          permanentphonecell: "",
          permanentphonehome: "",
          permanentemail1: this.AGT_EMAIL,
          permanentemail2: this.AGT_EMAIL,
          permanentemail3: this.AGT_EMAIL,
          partyStatus: "",
          searchResMaxRange: "40",
          searchResMinRange: "1",
          permanentadddeleteind: "",
          mailingadddeleteind: ""
        }


        console.log('Before');
        console.log(obj);


        this.AgentService.SaveAgentTCS(obj)
          .subscribe((data) => {

            let obj1: Array<IAgentTCS> = JSON.parse(JSON.stringify(data));

            console.log(obj1[0].errorMessage);

            //alert(obj1[0].errorMessage);
            this.showSuccess('Successfully Saved To TCS - ' + obj1[0].errorMessage);

            console.log(obj1);

          }, (err) => {
            console.error('err', err);
            this.showError('Error In TCS Saving - ' + err);
          });

      });


    } catch (error) {
      alert(error);
    }
  }


  GetRecordTCS(AGENT_CODE_SELECTED) {
    try {

      console.log('GetRecordTCS');

      this.AGT_CODE_TCS = null;
      this.AGT_NAME_TCS = null;
      this.AGT_STATUS_TCS = null;


      this.GetTCSAuth('', '', '', '').then((sessionId) => {


        let obj2: IAgentTCS = {
          userCode: "JANAKATEST",
          errorCode: "",
          roleCode: "SUPERUSER",
          errorMessage: "",
          sessionId: this.TCS_SESSION_ID,//this.CheckTCSAuth('','','','').toString(),//
          actionEvent: "SEARCHPARTY",
          partycode: AGENT_CODE_SELECTED,
          partytype: "I",
          firstname: "",
          middlename: "",
          lastname: "",
          othername: "",
          businessname: "",
          registrationno: "",
          registrationdate: "",
          typeoforganization: "",
          title: "",
          nicno: "",
          sicno: "",
          sex: "",
          nationality: "",
          occupation: "",
          parentpartycode: "",
          startdate: "",
          stakeCodeSet:
          [
            {
              stakeCode: "AGENT",
              stakeProperties:
              [{
                propertyName: "",
                propertyValue: ""
              }]
            }],
          relatedPartySet:
          [{
            relationCode: "",
            partyCode: ""
          }],
          mailingaddressline1: "",
          mailingaddressline2: "",
          mailingaddressline3: "",
          mailingcitylocation: "",
          mailingprovince: "",
          countrycode: "",
          mailingzipcode: "",
          mailingfax: "",
          mailingphonework: "",
          mailingphonecell: "",
          mailingphonehome: "",
          mailingemail1: "",
          mailingemail2: "",
          mailingemail3: "",
          permanentaddresssame: "",
          permanentaddress1: "",
          permanentaddress2: "",
          permanentaddress3: "",
          permanentcitylocation: "",
          permanentprovince: "",
          permanentcountrycode: "",
          permanentzipcode: "",
          permanentfaxno: "",
          permanentphonework: "",
          permanentphonecell: "",
          permanentphonehome: "",
          permanentemail1: "",
          permanentemail2: "",
          permanentemail3: "",
          partyStatus: "",
          searchResMaxRange: "2",
          searchResMinRange: "1",
          permanentadddeleteind: "",
          mailingadddeleteind: ""
        }


        this.AgentService.GetAgentTCS(obj2)
          .subscribe((data) => {

            console.log(data);

            let obj3: Array<IAgentTCS> = JSON.parse(JSON.stringify(data));

            console.log('SEARCH OBJECT');
            console.log(obj3);
            console.log(obj3[0].partycode);

            this.AGT_CODE_TCS = obj3[0].partycode;
            this.AGT_NAME_TCS = obj3[0].firstname + ' ' + obj3[0].lastname;
            this.AGT_STATUS_TCS = obj3[0].partyStatus;

            this.showInfo('TCS Status -           ' + this.AGT_STATUS_TCS);


            if (obj3[0].errorMessage == "No results found with given search parameters.") {
              this.isRecordFoundTCS = false;
            }
            else {
              this.isRecordFoundTCS = true;
            }


          }, (err) => {
            console.error('err', err);

            this.showError(err);

          });

      });

    } catch (error) {
      alert(error);
    }
  }

  SaveRecord() {
    try {


      // this.isLoading = true;


      // setTimeout(() => 
      // {
      //     this.router.navigate(['/']);
      // },
      // 50000);


      this.validateFields();
      if (!this.isAgentDetailsValid) {
        this.showError('Please check mandotory fields.....');
        return;
      }



      //this.CheckTCSAuth();

      //---------------------------------------------------------------------------------------------------------------------
      // 0 - SELECT  ,  1 - YES ,  2 - NO
      //when terminate check weather any attached subordinates and ask for a confirmation to attached all those to top level
      this.isAgentAttachedChanged = 'NO';

      if (this.AGT_TERMINATE_STATUS == 1) {

        this.GetAgentAttachedList(this.AGT_CODE);

        if ((this.AgentAttachedList.length > 0)) {

          let result = confirm("There are subordinate attached you want to move them to next higher level...");
          if (result == true) {
            this.isAgentAttachedChanged = 'YES';
          }
          else {
            this.isAgentAttachedChanged = 'NO';
          }

        }
      }
      else {
        this.isAgentAttachedChanged = 'NO';
      }
      //=====================================================================================================================




      var moment = require('moment');


      var FormattedAGT_DOB = this.SetDateFormat(this.AGT_DOB);//moment(this.AGT_DOB).format('DD/MM/YYYY');
      var FormattedAGT_ID_ISSUED_DATE = this.SetDateFormat(this.AGT_ID_ISSUED_DATE);
      var FormattedAGT_APPOINT_DATE = this.SetDateFormat(this.AGT_APPOINT_DATE);
      var FormattedAGT_SLII_EXAM_DATE = this.SetDateFormat(this.AGT_SLII_EXAM_DATE);

      var FormattedAGT_AGMT_DATE_RECEIVED = this.SetDateFormat(this.AGT_AGMT_DATE_RECEIVED);
      var FormattedAGT_AGMT_DATE_ISSUED = this.SetDateFormat(this.AGT_AGMT_DATE_ISSUED);
      var FormattedAGT_APP_DATE_RECEIVED = this.SetDateFormat(this.AGT_APP_DATE_RECEIVED);
      var FormattedAGT_APP_DATE_ISSUED = this.SetDateFormat(this.AGT_APP_DATE_ISSUED);

      var FormattedAGT_STOP_COMM_DATE = this.SetDateFormat(this.AGT_STOP_COMM_DATE);
      var FormattedAGT_RELEASE_COMM_DATE = this.SetDateFormat(this.AGT_RELEASE_COMM_DATE);
      var FormattedAGT_TERMINATE_NOTICE_DATE = this.SetDateFormat(this.AGT_TERMINATE_NOTICE_DATE);
      var FormattedAGT_TERMINATE_DATE = this.SetDateFormat(this.AGT_TERMINATE_DATE);
      var FormattedAGT_BLACK_LISTED_DATE = this.SetDateFormat(this.AGT_BLACK_LISTED_DATE);
      var FormattedAGT_REJOINED_DATE = this.SetDateFormat(this.AGT_REJOINED_DATE);
      var FormattedAGT_ISS_GIVEN_DATE = this.SetDateFormat(this.AGT_ISS_GIVEN_DATE);
      var FormattedAGT_LEADER_GIVEN_DATE = this.SetDateFormat(this.AGT_LEADER_GIVEN_DATE);
      var FormattedAGT_ISS_CLOSE_DATE = this.SetDateFormat(this.AGT_ISS_CLOSE_DATE);
      var FormattedAGT_RETAINER_GIVEN_DATE = this.SetDateFormat(this.AGT_RETAINER_GIVEN_DATE);
      var FormattedAGT_RETAINER_CLOSE_DATE = this.SetDateFormat(this.AGT_RETAINER_CLOSE_DATE);
      var FormattedAGT_TRNS_BRANCH_DATE = this.SetDateFormat(this.AGT_TRNS_BRANCH_DATE);
      var FormattedAGT_EFFECTIVE_DATE = this.SetDateFormat(this.AGT_EFFECTIVE_DATE);

      // alert(this.AGT_LEVEL);

      let objAgent: IAgent = {
        AGT_ID: this.AGT_ID,
        AGT_CODE: this.AGT_CODE,
        AGT_CODE_ID: this.AGT_CODE_ID,
        AGT_TYPE_ID: this.AGT_TYPE_ID,
        AGT_MDRT_STATUS: this.AGT_MDRT_STATUS,
        AGT_MDRT_YEAR: this.AGT_MDRT_YEAR,
        AGT_SYSTEM_ID: this.AGT_SYSTEM_ID,
        AGT_SUB_CODE: this.AGT_SUPER_CODE,//this.AGT_SUB_CODE,
        AGT_LINE_OF_BUSINESS: this.AGT_LINE_OF_BUSINESS,
        AGT_CHANNEL: this.AGT_CHANNEL,
        //AGT_LEVEL: this.AGT_LEVEL,
        AGT_SUPER_CODE: this.AGT_SUB_CODE,//this.AGT_SUPER_CODE,
        AGT_TITLE: this.AGT_TITLE,
        AGT_FIRST_NAME: this.AGT_FIRST_NAME,
        AGT_LAST_NAME: this.AGT_LAST_NAME,
        AGT_ADD1: this.AGT_ADD1,
        AGT_ADD2: this.AGT_ADD2,
        AGT_ADD3: this.AGT_ADD3,
        AGT_NIC_NO: this.AGT_NIC_NO,
        AGT_DOB: FormattedAGT_DOB,
        AGT_MOBILE: this.AGT_MOBILE,
        AGT_TEL_NO: this.AGT_TEL_NO,
        AGT_FAX_NO: this.AGT_FAX_NO,
        AGT_EMAIL: this.AGT_EMAIL,
        AGT_BRANCH_CODE: this.AGT_BRANCH_CODE,
        AGT_BANK_ID: this.AGT_BANK_ID,
        AGT_BANK_BRANCH_ID: this.AGT_BANK_BRANCH_ID,
        AGT_BANK_ACC_NO: this.AGT_BANK_ACC_NO,
        AGT_ID_ISSUED: this.AGT_ID_ISSUED,
        AGT_ID_ISSUED_DATE: FormattedAGT_ID_ISSUED_DATE,
        AGT_APPOINT_DATE: FormattedAGT_APPOINT_DATE,
        AGT_SLII_EXAM: this.AGT_SLII_EXAM,
        AGT_SLII_EXAM_DATE: FormattedAGT_SLII_EXAM_DATE,

        AGT_AGMT_DATE_RECEIVED: FormattedAGT_AGMT_DATE_RECEIVED,
        AGT_AGMT_DATE_ISSUED: FormattedAGT_AGMT_DATE_ISSUED,
        AGT_APP_DATE_RECEIVED: FormattedAGT_APP_DATE_RECEIVED,
        AGT_APP_DATE_ISSUED: FormattedAGT_APP_DATE_ISSUED,

        AGT_TRNS_BRANCH_CODE: this.AGT_TRNS_BRANCH_CODE,
        AGT_TRNS_BRANCH_DATE: FormattedAGT_TRNS_BRANCH_DATE,
        AGT_STOP_COMM_DATE: FormattedAGT_STOP_COMM_DATE,
        AGT_STOP_COMM_REASON: this.AGT_STOP_COMM_REASON,
        AGT_RELEASE_COMM_DATE: FormattedAGT_RELEASE_COMM_DATE,
        AGT_RELEASE_COMM_REASON: this.AGT_RELEASE_COMM_REASON,
        AGT_CUSTOMER_COMPLAIN: this.AGT_CUSTOMER_COMPLAIN,
        AGT_TERMINATE_NOTICE_DATE: FormattedAGT_TERMINATE_NOTICE_DATE,
        AGT_TERMINATE_DATE: FormattedAGT_TERMINATE_DATE,
        AGT_TERMINATE_REASON: this.AGT_TERMINATE_REASON,
        AGT_BLACK_LISTED_DATE: FormattedAGT_BLACK_LISTED_DATE,
        AGT_DUES_TO_COMPANY: this.AGT_DUES_TO_COMPANY,
        AGT_REJOINED_DATE: FormattedAGT_REJOINED_DATE,
        AGT_REMARKS: this.AGT_REMARKS,
        AGT_BUSINESS_TYPE: this.AGT_BUSINESS_TYPE,
        AGT_LEVEL_CODE: this.AGT_LEVEL_CODE,
        AGT_LEVEL: this.AGT_LEVEL,
        AGT_LANGUAGE: this.AGT_LANGUAGE,
        AGT_LEADER_CODE: this.AGT_LEADER_CODE,
        AGT_STATUS: this.AGT_STATUS,
        AGT_TERMINATE_STATUS: this.AGT_TERMINATE_STATUS,
        AGT_STOP_COMM_STATUS: this.AGT_STOP_COMM_STATUS,
        AGT_ISS_STATUS: this.AGT_ISS_STATUS,
        AGT_ISS_AMOUNT: this.AGT_ISS_AMOUNT,
        AGT_ISS_GIVEN_DATE: FormattedAGT_ISS_GIVEN_DATE,
        AGT_LEADER_GIVEN_DATE: FormattedAGT_LEADER_GIVEN_DATE,
        AGT_ISS_CLOSE_DATE: FormattedAGT_ISS_CLOSE_DATE,
        AGT_RETAINER_STATUS: this.AGT_RETAINER_STATUS,
        AGT_RETAINER_AMOUNT: this.AGT_RETAINER_AMOUNT,
        AGT_RETAINER_GIVEN_DATE: FormattedAGT_RETAINER_GIVEN_DATE,
        AGT_RETAINER_CLOSE_DATE: FormattedAGT_RETAINER_CLOSE_DATE,
        AGT_LEADER_AGENT_CODE_V: this.AGT_LEADER_AGENT_CODE_V,
        AGT_LEADER_LEADER_CODE_V: this.AGT_LEADER_LEADER_CODE_V,
        AGT_LEADER_AGENT_CODE_H: this.AGT_LEADER_AGENT_CODE_H,
        AGT_LEADER_LEADER_CODE_H: this.AGT_LEADER_LEADER_CODE_H,
        AGT_CREATED_BY: this.User.UserName,
        AGT_DESIGNATION_ID: this.AGT_DESIGNATION_ID,
        AGT_HIERARCHY_TYPE_ID: this.AGT_HIERARCHY_TYPE_ID,
        AGT_CHANGE_REASON_ID: this.AGT_CHANGE_REASON_ID,
        AGT_EFFECTIVE_DATE: FormattedAGT_EFFECTIVE_DATE,//null,//this.AGT_EFFECTIVE_DATE,
        AGT_CHANGE_REASON: this.AGT_CHANGE_REASON,
        AGT_IS_AGENT_ATTACHED_CHANGED: this.isAgentAttachedChanged
      }





      //------NIC Validate For Specific Types--------

      this.ValidateNIC(this.AGT_NIC_NO).then((sessionId) => {

        if (this.isNICExists && this.isNewRecord) {
          this.showError('NIC Number is already there.....');
          return;
        }
        else {
          //return;

          //alert('DDD');

          console.log(objAgent);
          console.log(JSON.stringify(objAgent));

          this.AgentService.SaveAgent(objAgent).subscribe((data: any) => {
            console.log('Before -' + data);

            //this.getBanks();


            //this.router.navigate(['/', 'agent']);   substring(1, 4);


            //data = data.replace('|', '').replace('||', '').replace(this.TempStr1, '').replace(this.TempStr2, '');


            if (data.toString().replace(/"/g, '') != "Successfully Saved") {
              //alert('Successfully Saved');
              this.showSuccess('Successfully Saved to Commission Application');
              //this.FormControlStatusChange('LOAD'); //disabled controls after save

              //12/12/2017
              // this.TempStr1 = data.substring(0 + 1, data.indexOf("|"));
              // this.TempStr2 = data.substring(data.indexOf("|") + 1, data.indexOf("||"));

              // this.AGT_CODE = this.TempStr1;
              // this.AGT_LEVEL_CODE = this.TempStr2;

              this.FormButtonStatusChange('SAVE');


              this.showInfo('Please wait until record get updated to TCS side....');




              //-------------Start TCS Update------------------------------------------------------------------------------------
              if (this.isNewRecord) {

                this.TempStr1 = data.substring(0 + 1, data.indexOf("|"));
                this.TempStr2 = data.substring(data.indexOf("|") + 1, data.indexOf("||"));

                this.AGT_CODE = this.TempStr1;
                this.AGT_LEVEL_CODE = this.TempStr2;

                this.SaveRecordTCS(objAgent, this.AGT_CODE);   //New Record
              }
              else {
                //23-04-2018
                //this.UpdateRecordTCS(objAgent, this.AGT_CODE); //Update Record

                //check record exist in TCS side even in updates 
                //if records does not exist this will insert the record
                this.isRecordFoundTCS = false;

                this.GetRecordTCS(this.AGT_CODE)

                if (this.isRecordFoundTCS = true) {
                  this.UpdateRecordTCS(objAgent, this.AGT_CODE); //Update Record
                }
                else {
                  this.SaveRecordTCS(objAgent, this.AGT_CODE);   //New Record
                }
              }
              //-------------Updte TCS Update------------------------------------------------------------------------------------



              console.log(objAgent);

              // this.isLoading = false;

              return;

            } else {
              alert(data);
              //this.FormControlStatusChange('LOAD'); //disabled controls after save

              //this.FormButtonStatusChange('SAVE');
              return;
            }


          },
            (err) => {
              console.log(err);
              console.log("Error saving agent");
            },
            () => console.log('done'));
        }
      }, (err) => {

      });

    } catch (error) {

    }

  }





  getBankBranch(bankId) {
    this.BankBranchService.getBankBranch(bankId)
      .subscribe((data) => {
        console.log(data);

        this.bankBranchList = data;
      },
      (err) => console.log(err));
  }

  onSelectOfBankId(bankId) {

    this.getBankBranch(bankId);
  }

  getAgentTypes() {
    try {
      this.AgentTypeService.getAgents()
        .subscribe((data) => {

          this.AgentTypeList = data;
        },
        (err) => console.log(err));

    } catch (error) {

    }

  }


  onSelectOfTypeID(TypeID) {

    this.isAGT_LEVEL_BANCDisabled = false;

    //enable only for Bank Assurance & Bank Code H Codes / L Codes
    if (TypeID == 3 || TypeID == 9) {
      this.isAGT_LEVEL_BANCDisabled = false;
    }
    else {
      this.isAGT_LEVEL_BANCDisabled = true;
    }

    this.getAgentCodeByTypeID(TypeID);

  }


  getAgentCodeByTypeID(TypeID) {

    this.AgentCodeService.getAgentCodeByTypeID(TypeID)
      .subscribe((data) => {
        console.log(data);

        this.AgentCodeList = data;
      },
      (err) => console.log(err));
  }
  //----------Start Validate fields-------------
  //----------Start Validate fields-------------

  public validateFields() {

    this.isAgentDetailsValid = true;

    console.log(this.isNEWDisabled);

    if (this.isNewRecord == true) {
      if (this.AGT_TYPE_ID == 0) {//column name 
        this.AGT_TYPE_ID_CLS = "has-error";
        this.isAgentDetailsValid = false;
      } else {
        this.AGT_TYPE_ID_CLS = "form-group"; //AgentTypeClass
      }

      if (this.AGT_CODE_ID == 0) {
        this.AGT_CODE_ID_CLS = "has-error";
        this.isAgentDetailsValid = false;
      } else {
        this.AGT_CODE_ID_CLS = "form-group"; //AgentTypeClass
      }
    }


    if (this.AGT_BRANCH_CODE == '0') {
      this.AGT_BRANCH_CODE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_BRANCH_CODE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_TITLE == '0') {
      this.AGT_TITLE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_TITLE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_FIRST_NAME == '') {
      this.AGT_FIRST_NAME_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_FIRST_NAME_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_LAST_NAME == '') {
      this.AGT_LAST_NAME_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_LAST_NAME_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_ADD1 == '') {
      this.AGT_ADD1_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_ADD1_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_ADD2 == '') {
      this.AGT_ADD2_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_ADD2_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_ADD3 == '') {
      this.AGT_ADD3_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_ADD1_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_APPOINT_DATE == undefined) {
      this.AGT_APPOINT_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_APPOINT_DATE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_BUSINESS_TYPE == 0) {
      this.AGT_BUSINESS_TYPE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_BUSINESS_TYPE_CLS = "form-group"; //AgentTypeClass
    }

  }


  public validateFieldsOLD() {

    this.isAgentDetailsValid = true;

    if (this.AGT_TYPE_ID == 0) {//column name
      this.AGT_TYPE_ID_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_TYPE_ID_CLS = "form-group"; //AgentTypeClass
    }


    if (this.AGT_CODE_ID == 0) {
      this.AGT_CODE_ID_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_CODE_ID_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_MDRT_STATUS == 0) {
      this.AGT_MDRT_STATUS_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_MDRT_STATUS_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_MDRT_YEAR == 0) {
      this.AGT_MDRT_YEAR_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_MDRT_YEAR_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_SYSTEM_ID == '') {
      this.AGT_SYSTEM_ID_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_SYSTEM_ID_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_SUB_CODE == '') {
      this.AGT_SUB_CODE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_SUB_CODE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_LINE_OF_BUSINESS == 0) {
      this.AGT_LINE_OF_BUSINESS_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_LINE_OF_BUSINESS_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_CHANNEL == '') {
      this.AGT_CHANNEL_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_CHANNEL_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_LEVEL == 0) {
      this.AGT_LEVEL_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_LEVEL_CLS = "form-group"; //AgentTypeClass
    }


    if (this.AGT_LEADER_CODE == '') {
      this.AGT_LEADER_CODE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_LEADER_CODE_CLS = "form-group"; //AgentTypeClass
    }


    if (this.AGT_SUPER_CODE == '') {
      this.AGT_SUPER_CODE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_SUPER_CODE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_TITLE == '') {
      this.AGT_TITLE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_TITLE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_FIRST_NAME == '') {
      this.AGT_FIRST_NAME_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_FIRST_NAME_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_LAST_NAME == '') {
      this.AGT_LAST_NAME_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_LAST_NAME_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_ADD1 == '') {
      this.AGT_ADD1_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_ADD1_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_ADD2 == '') {
      this.AGT_ADD2_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_ADD2_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_ADD3 == '') {
      this.AGT_ADD3_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_ADD3_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_NIC_NO == '') {
      this.AGT_NIC_NO_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_NIC_NO_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_DOB == null) {
      this.AGT_DOB_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_DOB_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_MOBILE == '') {
      this.AGT_MOBILE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_MOBILE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_TEL_NO == '') {
      this.AGT_TEL_NO_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_TEL_NO_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_FAX_NO == '') {
      this.AGT_EMAIL_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_EMAIL_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_EMAIL == '') {
      this.AGT_FAX_NO_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_FAX_NO_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_BRANCH_CODE == '') {
      this.AGT_BRANCH_CODE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_BRANCH_CODE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_BANK_ID == 0) {
      this.AGT_BANK_ID_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_BANK_ID_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_BANK_BRANCH_ID == 0) {
      this.AGT_BANK_BRANCH_ID_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_BANK_BRANCH_ID_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_BANK_ACC_NO == '') {
      this.AGT_BANK_ACC_NO_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_BANK_ACC_NO_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_ID_ISSUED == 0) {
      this.AGT_ID_ISSUED_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_ID_ISSUED_CLS = "form-group"; //AgentTypeClass
    }


    if (this.AGT_LEADER_CODE == undefined || this.AGT_LEADER_CODE == null) {
      this.AGT_LEADER_CODE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_LEADER_CODE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_ID_ISSUED_DATE == null) {
      this.AGT_ID_ISSUED_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_ID_ISSUED_DATE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_APPOINT_DATE == null) {
      this.AGT_APPOINT_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_APPOINT_DATE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_SLII_EXAM == 0) {
      this.AGT_SLII_EXAM_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_SLII_EXAM_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_SLII_EXAM_DATE == null) {
      this.AGT_SLII_EXAM_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_SLII_EXAM_DATE_CLS = "form-group"; //AgentTypeClass
    }

    // if (this.AGT_AGMT_RECEIVED == undefined || this.AGT_AGMT_DATE == null) {
    //   this.AGT_AGMT_RECEIVED_CLS = "has-error";
    //   this.isAgentDetailsValid = false;
    // } else {
    //   this.AGT_AGMT_RECEIVED_CLS = "form-group"; //AgentTypeClass
    // }

    // if (this.AGT_APP_RECEIVED == undefined || this.AGT_APP_RECEIVED_DATE == null) {
    //   this.AGT_APP_RECEIVED_CLS = "has-error";
    //   this.isAgentDetailsValid = false;
    // } else {
    //   this.AGT_APP_RECEIVED_CLS = "form-group"; //AgentTypeClass
    // }

    // if (this.AGT_APP_RECEIVED == 0 ) {
    //   this.AGT_APP_RECEIVED_CLS = "has-error";
    //   this.isAgentDetailsValid = false;
    //   } else {
    //   this.AGT_APP_RECEIVED_CLS = "form-group"; //AgentTypeClass
    // }

    // if (this.AGT_APP_RECEIVED_DATE == null ) {
    //   this.AGT_APP_RECEIVED_DATE_CLS = "has-error";
    //   this.isAgentDetailsValid = false;
    //   } else {
    //   this.AGT_APP_RECEIVED_DATE_CLS = "form-group"; //AgentTypeClass
    // }

    if (this.AGT_TRNS_BRANCH_CODE == undefined || this.AGT_TRNS_BRANCH_DATE == null) {
      this.AGT_TRNS_BRANCH_CODE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_TRNS_BRANCH_CODE_CLS = "form-group"; //AgentTypeClass
    }

    // if (this.AGT_TRNS_BRANCH_CODE == '' ) {
    //   this.AGT_TRNS_BRANCH_CODE_CLS = "has-error";
    //   this.isAgentDetailsValid = false;
    //   } else {
    //   this.AGT_TRNS_BRANCH_CODE_CLS = "form-group"; //AgentTypeClass
    // }

    // if (this.AGT_TRNS_BRANCH_DATE == null ) {
    //   this.AGT_TRNS_BRANCH_DATE_CLS = "has-error";
    //   this.isAgentDetailsValid = false;
    //   } else {
    //   this.AGT_TRNS_BRANCH_DATE_CLS = "form-group"; //AgentTypeClass
    // }

    if (this.AGT_STOP_COMM_DATE == null) {
      this.AGT_STOP_COMM_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_STOP_COMM_DATE_CLS = "form-group"; //AgentTypeClass
    }


    if (this.AGT_STOP_COMM_REASON == undefined || this.AGT_STOP_COMM_REASON == '') {
      this.AGT_STOP_COMM_REASON_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_STOP_COMM_REASON_CLS = "form-group"; //AgentTypeClass
    }



    if (this.AGT_RELEASE_COMM_DATE == null) {
      this.AGT_RELEASE_COMM_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_RELEASE_COMM_DATE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_RELEASE_COMM_REASON == undefined || this.AGT_RELEASE_COMM_REASON == '') {
      this.AGT_RELEASE_COMM_REASON_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_RELEASE_COMM_REASON_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_CUSTOMER_COMPLAIN == undefined || this.AGT_CUSTOMER_COMPLAIN == '') {
      this.AGT_CUSTOMER_COMPLAIN_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_CUSTOMER_COMPLAIN_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_TERMINATE_NOTICE_DATE == null) {
      this.AGT_TERMINATE_NOTICE_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_TERMINATE_NOTICE_DATE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_TERMINATE_DATE == null) {
      this.AGT_TERMINATE_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_TERMINATE_DATE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_TERMINATE_REASON == undefined || this.AGT_TERMINATE_REASON == '') {
      this.AGT_TERMINATE_REASON_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_TERMINATE_REASON_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_BLACK_LISTED_DATE == null) {
      this.AGT_BLACK_LISTED_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_BLACK_LISTED_DATE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_DUES_TO_COMPANY == undefined || this.AGT_DUES_TO_COMPANY == '') {
      this.AGT_DUES_TO_COMPANY_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_DUES_TO_COMPANY_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_REJOINED_DATE == null) {
      this.AGT_REJOINED_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_REJOINED_DATE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_REMARKS == undefined || this.AGT_REMARKS == '') {
      this.AGT_REMARKS_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_REMARKS_CLS = "form-group"; //AgentTypeClass
    }


    if (this.AGT_BUSINESS_TYPE == undefined || this.AGT_BUSINESS_TYPE == 0) {
      this.AGT_BUSINESS_TYPE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_BUSINESS_TYPE_CLS = "form-group"; //AgentTypeClass
    }

    // if (this.AGT_LEVEL_CODE == undefined || this.AGT_LEVEL_CODE == '') {
    //   this.AGT_LEVEL_CODE_CLS = "has-error";
    //   this.isAgentDetailsValid = false;
    // } else {
    //   this.AGT_LEVEL_CODE_CLS = "form-group"; //AgentTypeClass AGT_SUPER_CODE
    // }

    if (this.AGT_SUPER_CODE == undefined || this.AGT_SUPER_CODE == '') {
      this.AGT_SUPER_CODE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_SUPER_CODE_CLS = "form-group"; //AgentTypeClass AGT_SUPER_CODE
    }

    if (this.AGT_STATUS == undefined || this.AGT_STATUS == 0) {
      this.AGT_STATUS_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_STATUS_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_TERMINATE_STATUS == undefined || this.AGT_TERMINATE_STATUS == 0) {
      this.AGT_TERMINATE_STATUS_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_TERMINATE_STATUS_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_STOP_COMM_STATUS == undefined || this.AGT_TERMINATE_STATUS == 0) {
      this.AGT_STOP_COMM_STATUS_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_STOP_COMM_STATUS_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_ISS_STATUS == undefined || this.AGT_ISS_STATUS == 0) {
      this.AGT_ISS_STATUS_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_ISS_STATUS_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_ISS_AMOUNT == undefined || this.AGT_ISS_AMOUNT == 0) {
      this.AGT_ISS_AMOUNT_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_ISS_AMOUNT_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_ISS_GIVEN_DATE == undefined || this.AGT_ISS_GIVEN_DATE == null) {
      this.AGT_ISS_GIVEN_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_ISS_GIVEN_DATE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_LEADER_GIVEN_DATE == undefined || this.AGT_LEADER_GIVEN_DATE == null) {
      this.AGT_LEADER_GIVEN_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_LEADER_GIVEN_DATE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_ISS_CLOSE_DATE == undefined || this.AGT_ISS_CLOSE_DATE == null) {
      this.AGT_ISS_CLOSE_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_ISS_CLOSE_DATE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_RETAINER_STATUS == undefined || this.AGT_RETAINER_STATUS == 0) {
      this.AGT_RETAINER_STATUS_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_RETAINER_STATUS_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_RETAINER_AMOUNT == undefined || this.AGT_RETAINER_AMOUNT == 0) {
      this.AGT_RETAINER_AMOUNT_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_RETAINER_AMOUNT_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_RETAINER_GIVEN_DATE == undefined || this.AGT_RETAINER_GIVEN_DATE == null) {
      this.AGT_RETAINER_GIVEN_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_RETAINER_GIVEN_DATE_CLS = "form-group"; //AgentTypeClass
    }

    if (this.AGT_RETAINER_CLOSE_DATE == undefined || this.AGT_RETAINER_CLOSE_DATE == null) {
      this.AGT_RETAINER_CLOSE_DATE_CLS = "has-error";
      this.isAgentDetailsValid = false;
    } else {
      this.AGT_RETAINER_CLOSE_DATE_CLS = "form-group"; //AgentTypeClass
    }


  }
  //-----------End Validate fields--------------
  clearValues() {

    var moment = require('moment');

    this.AGT_ID = '';
    this.AGT_CODE = '';
    this.AGT_CODE_ID = 0;
    this.AGT_TYPE_ID = 0;
    this.AGT_MDRT_STATUS = 0;
    this.AGT_MDRT_YEAR = 0;
    this.AGT_SYSTEM_ID = '-';
    this.AGT_SUB_CODE = '-';
    this.AGT_LINE_OF_BUSINESS = 0;
    this.AGT_CHANNEL = '-';
    this.AGT_LEVEL = 0,
      this.AGT_LANGUAGE = 0,
      this.AGT_SUPER_CODE = '-';
    this.AGT_TITLE = "0";
    this.AGT_FIRST_NAME = '';
    this.AGT_LAST_NAME = '';
    this.AGT_ADD1 = '';
    this.AGT_ADD2 = '-';
    this.AGT_ADD3 = '-';
    this.AGT_NIC_NO = '';
    this.AGT_DOB = null;//moment('01/01/1900'.toString().substr(0, 10), 'DD/MM/YYYY').toDate();//
    this.AGT_MOBILE = '-';
    this.AGT_TEL_NO = '-';
    this.AGT_FAX_NO = '-';
    this.AGT_EMAIL = '-';
    this.AGT_BRANCH_CODE = '0';
    this.AGT_BANK_ID = 0;
    this.AGT_BANK_BRANCH_ID = 0;
    this.AGT_BANK_ACC_NO = '-';
    this.AGT_ID_ISSUED = 0;
    this.AGT_ID_ISSUED_DATE = null;//
    this.AGT_APPOINT_DATE = null;
    this.AGT_SLII_EXAM = 0;
    this.AGT_SLII_EXAM_DATE = null;
    this.AGT_AGMT_DATE_RECEIVED = null;

    this.AGT_AGMT_DATE_ISSUED = null;
    this.AGT_APP_DATE_RECEIVED = null;
    this.AGT_APP_DATE_ISSUED = null;
    this.AGT_TRNS_BRANCH_CODE = "0";
    this.AGT_TRNS_BRANCH_DATE = null;
    this.AGT_STOP_COMM_DATE = null;
    this.AGT_STOP_COMM_REASON = '-';
    this.AGT_RELEASE_COMM_DATE = null;
    this.AGT_RELEASE_COMM_REASON = '-';
    this.AGT_CUSTOMER_COMPLAIN = '-';
    this.AGT_TERMINATE_NOTICE_DATE = null;
    this.AGT_TERMINATE_DATE = null;
    this.AGT_TERMINATE_REASON = '-';
    this.AGT_BLACK_LISTED_DATE = null;
    this.AGT_DUES_TO_COMPANY = '-';
    this.AGT_REJOINED_DATE = null;
    this.AGT_REMARKS = '-';
    this.AGT_BUSINESS_TYPE = 1;
    this.AGT_LEVEL_CODE = '-';
    this.AGT_LEADER_CODE = '-';
    this.AGT_STATUS = 0;
    this.AGT_TERMINATE_STATUS = 0;
    this.AGT_STOP_COMM_STATUS = 0;
    this.AGT_ISS_STATUS = 0;
    this.AGT_ISS_AMOUNT = 0;
    this.AGT_ISS_GIVEN_DATE = null;
    this.AGT_LEADER_GIVEN_DATE = null;
    this.AGT_ISS_CLOSE_DATE = null;
    this.AGT_RETAINER_STATUS = 0;
    this.AGT_RETAINER_AMOUNT = 0;
    this.AGT_RETAINER_GIVEN_DATE = null;
    this.AGT_RETAINER_CLOSE_DATE = null;
    this.AGT_LEADER_AGENT_CODE_H = '-';
    this.AGT_LEADER_AGENT_CODE_V = '-';
    this.AGT_LEADER_LEADER_CODE_H = '-';
    this.AGT_LEADER_LEADER_CODE_V = '-';

    this.AGT_DESIGNATION_ID = 0;
    this.AGT_HIERARCHY_TYPE_ID = 0;
    this.AGT_CHANGE_REASON_ID = 0;
    this.AGT_EFFECTIVE_DATE = null;
    this.AGT_CHANGE_REASON = '-';

    console.log('Cancel Rec End');

    // alert('End');

  }

  DateTimeCheck() {
  }

  ClearSearch() {

    this.AGT_SEARCH_ID = '';
    this.AGT_SEARCH_CODE = '';
    this.AGT_SEARCH_NAME = '';
    this.AGT_SEARCH_ADDRESS = '';
    this.AGT_SEARCH_NIC_NO = '';
    this.AGT_SEARCH_MOBILE = '';

    this.AgentSearchList = null;

  }

  // 1	AGENT
  // 2	BROKER
  // 3	BANC ASSURANCE
  // 4	DIRECT SPECIAL
  // 5	STAFF
  // 6	D
  // 7	ATC
  // 8	INSTITUTION
  // 9	BANK HNB

  ValidateNIC(NIC): Promise<any> {

    return new Promise((resolve, reject) => {

      //some agent types does not have NIC such as HNB Bank , Institution etc..
      if ((this.AGT_TYPE_ID == 2) || (this.AGT_TYPE_ID == 3) || (this.AGT_TYPE_ID == 7) || (this.AGT_TYPE_ID == 8) || (this.AGT_TYPE_ID == 9)) {

        this.isNICExists = false;
        resolve(this.isNICExists);

      }
      else {
        this.isNICExists = false;
        let objAgentSearch: IAgentSearch = {

          AGT_ID: '',
          AGT_CODE: '',
          AGT_NAME: '',
          AGT_ADDRESS: '',
          AGT_NIC_NO: NIC,
          AGT_MOBILE: ''

        }

        console.log(objAgentSearch);

        this.AgentService.GetAgentSearchDetails(objAgentSearch)
          .subscribe((data) => {

            this.AgentSearchList = data;

            if (this.AgentSearchList.length > 0) {
              this.isNICExists = true;
            }
            else {
              this.isNICExists = false;
            }

            resolve(this.isNICExists);

          }, (err) => {
            console.log('err', err);
            reject(err);
            this.showError("Error");
          });
      }

    });
  }




  SearchRecord() {

    let objAgentSearch: IAgentSearch = {

      AGT_ID: this.AGT_SEARCH_ID,
      AGT_CODE: this.AGT_SEARCH_CODE,
      AGT_NAME: this.AGT_SEARCH_NAME,
      AGT_ADDRESS: this.AGT_SEARCH_ADDRESS,
      AGT_NIC_NO: this.AGT_SEARCH_NIC_NO,
      AGT_MOBILE: this.AGT_SEARCH_MOBILE

    }

    console.log(objAgentSearch);

    this.AgentService.GetAgentSearchDetails(objAgentSearch)
      .subscribe((data) => {

        this.AgentSearchList = data;

        console.log(this.AgentSearchList);

        console.log(JSON.stringify(data));

        if (this.AgentSearchList.length == 0) {
          //alert('No Record Found....');
          this.showWarning('No Record Found....');
          this.AgentSearchList = null;
          return;
        }

      },
      (err) => console.log(err));



    this.BankService.getBanks()
      .subscribe((data) => {

        this.bankList = data;

        console.log(JSON.stringify(data));
      },
      (err) => console.log(err));


  }

  CheckStringValues(vtext): string {

    if ((vtext == '') || (vtext == null)) {
      this.vText = '-';
    } else {
      this.vText = vtext;
    }
    return this.vText;
  }



  setClickedRow = function (index, AGENT_ID, AGT_CODE_SELECTED) {

    this.selectedRow = index;

    console.log('setClickedRow - ' + AGENT_ID);

    this.AgentService.getAgentBySeqId(AGENT_ID)
      .subscribe((data) => {
        //alert('success')
        this.isLoading = false;

        console.log('getAgentBySeqId Executed');


        let obj: IAgent = data;

        //let obj: IAgent = JSON.parse(JSON.stringify(data));

        //this.AGT_SUB_CODE = obj.AGT_CODE;

        var moment = require('moment');

        this.AGT_ID = obj.AGT_ID,

          this.AGT_CODE = obj.AGT_CODE,

          this.AGT_TYPE_ID = obj.AGT_TYPE_ID,

          this.getAgentCodeByTypeID(obj.AGT_TYPE_ID);

        this.AGT_CODE_ID = obj.AGT_CODE_ID,

          this.AGT_MDRT_STATUS = obj.AGT_MDRT_STATUS,
          this.AGT_MDRT_YEAR = obj.AGT_MDRT_YEAR,
          this.AGT_SYSTEM_ID = obj.AGT_SYSTEM_ID,
          this.AGT_SUB_CODE = obj.AGT_SUB_CODE,
          this.AGT_LINE_OF_BUSINESS = obj.AGT_LINE_OF_BUSINESS,
          this.AGT_CHANNEL = obj.AGT_CHANNEL,
          this.AGT_LEVEL = obj.AGT_LEVEL,
          this.AGT_LANGUAGE = obj.AGT_LANGUAGE
        this.AGT_SUPER_CODE = obj.AGT_SUPER_CODE,
          this.AGT_TITLE = obj.AGT_TITLE,
          this.AGT_FIRST_NAME = this.CheckStringValues(obj.AGT_FIRST_NAME),
          this.AGT_LAST_NAME = this.CheckStringValues(obj.AGT_LAST_NAME),
          this.AGT_ADD1 = this.CheckStringValues(obj.AGT_ADD1),
          this.AGT_ADD2 = this.CheckStringValues(obj.AGT_ADD2),
          this.AGT_ADD3 = this.CheckStringValues(obj.AGT_ADD3),
          this.AGT_NIC_NO = this.CheckStringValues(obj.AGT_NIC_NO),
          this.AGT_DOB = this.SetDateFormatNew(obj.AGT_DOB.toString());//moment(obj.AGT_DOB.toString().substr(0, 10), 'DD/MM/YYYY').toDate();
        this.AGT_MOBILE = this.CheckStringValues(obj.AGT_MOBILE),
          this.AGT_TEL_NO = this.CheckStringValues(obj.AGT_TEL_NO),
          this.AGT_FAX_NO = this.CheckStringValues(obj.AGT_FAX_NO),
          this.AGT_EMAIL = this.CheckStringValues(obj.AGT_EMAIL),
          this.AGT_BRANCH_CODE = obj.AGT_BRANCH_CODE,
          this.AGT_BANK_ID = obj.AGT_BANK_ID,

          this.getBankBranch(obj.AGT_BANK_ID);

        this.AGT_BANK_BRANCH_ID = obj.AGT_BANK_BRANCH_ID,

          this.AGT_BANK_ACC_NO = this.CheckStringValues(obj.AGT_BANK_ACC_NO),
          this.AGT_ID_ISSUED = obj.AGT_ID_ISSUED,
          this.AGT_ID_ISSUED_DATE = this.SetDateFormatNew(obj.AGT_ID_ISSUED_DATE.toString());
        this.AGT_APPOINT_DATE = this.SetDateFormatNew(obj.AGT_APPOINT_DATE.toString());
        this.AGT_SLII_EXAM = obj.AGT_SLII_EXAM,
          this.AGT_SLII_EXAM_DATE = this.SetDateFormatNew(obj.AGT_SLII_EXAM_DATE.toString());


        this.AGT_AGMT_DATE_RECEIVED = this.SetDateFormatNew(obj.AGT_AGMT_DATE_RECEIVED.toString());
        this.AGT_AGMT_DATE_ISSUED = this.SetDateFormatNew(obj.AGT_AGMT_DATE_ISSUED.toString());
        this.AGT_APP_DATE_RECEIVED = this.SetDateFormatNew(obj.AGT_APP_DATE_RECEIVED.toString());
        this.AGT_APP_DATE_ISSUED = this.SetDateFormatNew(obj.AGT_APP_DATE_ISSUED.toString());


        this.AGT_TRNS_BRANCH_CODE = obj.AGT_TRNS_BRANCH_CODE,
          this.AGT_TRNS_BRANCH_DATE = this.SetDateFormatNew(obj.AGT_TRNS_BRANCH_DATE.toString());
        this.AGT_STOP_COMM_DATE = this.SetDateFormatNew(obj.AGT_STOP_COMM_DATE.toString());
        this.AGT_STOP_COMM_REASON = this.CheckStringValues(obj.AGT_STOP_COMM_REASON),
          this.AGT_RELEASE_COMM_DATE = this.SetDateFormatNew(obj.AGT_RELEASE_COMM_DATE.toString());
        this.AGT_RELEASE_COMM_REASON = this.CheckStringValues(obj.AGT_RELEASE_COMM_REASON),
          this.AGT_CUSTOMER_COMPLAIN = this.CheckStringValues(obj.AGT_CUSTOMER_COMPLAIN),
          this.AGT_TERMINATE_NOTICE_DATE = this.SetDateFormatNew(obj.AGT_TERMINATE_NOTICE_DATE.toString());
        this.AGT_TERMINATE_DATE = this.SetDateFormatNew(obj.AGT_TERMINATE_DATE.toString());
        this.AGT_TERMINATE_REASON = obj.AGT_TERMINATE_REASON,
          this.AGT_BLACK_LISTED_DATE = this.SetDateFormatNew(obj.AGT_BLACK_LISTED_DATE.toString());
        this.AGT_DUES_TO_COMPANY = this.CheckStringValues(obj.AGT_DUES_TO_COMPANY),
          this.AGT_REJOINED_DATE = this.SetDateFormatNew(obj.AGT_REJOINED_DATE.toString());
        this.AGT_REMARKS = this.CheckStringValues(obj.AGT_REMARKS),
          this.AGT_BUSINESS_TYPE = obj.AGT_BUSINESS_TYPE,
          this.AGT_LEVEL_CODE = this.CheckStringValues(obj.AGT_LEVEL_CODE),
          this.AGT_LEADER_CODE = this.CheckStringValues(obj.AGT_LEADER_CODE),
          this.AGT_STATUS = obj.AGT_STATUS,
          this.AGT_TERMINATE_STATUS = obj.AGT_TERMINATE_STATUS,
          this.AGT_STOP_COMM_STATUS = obj.AGT_STOP_COMM_STATUS,
          this.AGT_ISS_STATUS = obj.AGT_ISS_STATUS,
          this.AGT_ISS_AMOUNT = obj.AGT_ISS_AMOUNT,
          this.AGT_ISS_GIVEN_DATE = this.SetDateFormatNew(obj.AGT_ISS_GIVEN_DATE.toString());
        this.AGT_LEADER_GIVEN_DATE = this.SetDateFormatNew(obj.AGT_LEADER_GIVEN_DATE.toString());
        this.AGT_ISS_CLOSE_DATE = this.SetDateFormatNew(obj.AGT_ISS_CLOSE_DATE.toString());
        this.AGT_RETAINER_STATUS = obj.AGT_RETAINER_STATUS,
          this.AGT_RETAINER_AMOUNT = obj.AGT_RETAINER_AMOUNT,
          this.AGT_RETAINER_GIVEN_DATE = this.SetDateFormatNew(obj.AGT_RETAINER_GIVEN_DATE.toString());
        this.AGT_RETAINER_CLOSE_DATE = this.SetDateFormatNew(obj.AGT_RETAINER_CLOSE_DATE.toString());
        this.AGT_LEADER_AGENT_CODE_V = this.CheckStringValues(obj.AGT_LEADER_AGENT_CODE_V),
          this.AGT_LEADER_LEADER_CODE_V = this.CheckStringValues(obj.AGT_LEADER_LEADER_CODE_V),
          this.AGT_LEADER_AGENT_CODE_H = obj.AGT_LEADER_AGENT_CODE_H,
          this.AGT_LEADER_LEADER_CODE_H = obj.AGT_LEADER_LEADER_CODE_H,
          this.AGT_DESIGNATION_ID = obj.AGT_DESIGNATION_ID,
          this.AGT_HIERARCHY_TYPE_ID = obj.AGT_HIERARCHY_TYPE_ID,
          this.AGT_CHANGE_REASON_ID = obj.AGT_CHANGE_REASON_ID,
          this.AGT_EFFECTIVE_DATE = this.SetDateFormatNew(obj.AGT_EFFECTIVE_DATE.toString());
        this.AGT_CHANGE_REASON = this.CheckStringValues(obj.AGT_CHANGE_REASON)


        this.AGT_IMAGE = null;

        this.getProfilePicByAgentID(this.AGT_CODE);

        this.getUploadDocByAgentID(this.AGT_CODE);

        this.FormControlStatusChange('LOAD');

        this.FormButtonStatusChange('GET');

        this.getLeader_VProfilePicByAgentID(this.AGT_LEADER_AGENT_CODE_V);

        this.GetBranchTransferHistory(1);//Transfer Branch History

        this.GetStopCommissionHistory(2);//Stop Commission History

        this.GetReleaseCommissionHistory(3);//Release Commission History

        this.getLeader_HProfilePicByAgentID(this.AGT_LEADER_AGENT_CODE_H);

        this.getAttachedAgentsUploadDocByAgentID(this.AGT_CODE);

        this.GetRecordTCS(AGT_CODE_SELECTED);

        console.log('End');

      },
      (err) => {
        alert('eror thrown')
        console.log(err);
        this.isLoading = false;

      });


    // this.router.navigate(['/', 'mainDashboard']);


  }

  setDocClickedRow = function (index, DOC_ID) {
    console.log(DOC_ID);
  }

  CancelRecord() {
    console.log('Cancel Rec');
    this.FormControlStatusChange('NEW');
    this.clearValues();

    this.FormButtonStatusChange('CANCEL');
  }

  NewRecord() {
    console.log('New Rec');
    this.FormControlStatusChange('NEW');
    this.clearValues();

    this.FormButtonStatusChange('NEW');
  }

  EditRecord() {
    console.log('Edit Rec');
    this.FormControlStatusChange('EDIT');
    this.FormButtonStatusChange('EDIT');
  }

  onSelectOfISSStatus(SelectedISSID) {

    if (SelectedISSID == 1) {
      this.AGT_STOP_COMM_STATUS = 2;
    }
    else {
      this.AGT_STOP_COMM_STATUS = 1;
    }

  }

  FormButtonStatusChange(Status) {
    if (Status == 'NEW') {
      this.isNEWDisabled = true;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = false;
      this.isCANCELDisabled = false;

      this.xxx = false;

      this.isNewRecord = true;

    }
    if (Status == 'EDIT') {
      this.isNEWDisabled = true;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = false;
      this.isCANCELDisabled = false;

      this.xxx = false;

      this.isNewRecord = false;
    }
    if (Status == 'SAVE') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.xxx = true;
    }
    if (Status == 'CANCEL') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.AGT_IMAGE = null;

      this.xxx = false;

      this.isNewRecord = true;


      // this.AGT_TYPE_ID_CLS = "form-group";
      // this.AGT_CODE_ID_CLS = "form-group";
      // this.AGT_BRANCH_CODE_CLS = "form-group";
      // this.AGT_TITLE_CLS = "form-group";
      // this.AGT_FIRST_NAME_CLS = "form-group";
      // this.AGT_LAST_NAME_CLS = "form-group";
      // this.AGT_ADD1_CLS = "form-group";
      // this.AGT_APPOINT_DATE_CLS = "form-group";
    }
    if (Status == 'LOAD') {
      this.isNEWDisabled = false;
      this.isEDITDisabled = true;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = true;

      this.xxx = true;

    }
    if (Status == 'GET') {
      this.isNEWDisabled = true;
      this.isEDITDisabled = false;
      this.isSAVEDisabled = true;
      this.isCANCELDisabled = false;

      this.xxx = true;
    }
  }

  //---------------Form control enabled disabled function----------------
  //Record Status (NEW/EDIT/LOAD)
  FormControlStatusChange(Status) {
    console.log(Status);
    if (Status == 'NEW') {
      this.isAGT_IDDisabled = false;
      this.isAGT_CODEDisabled = false;
      this.isAGT_TYPE_IDDisabled = false;
      this.isAGT_CODE_IDDisabled = false;
      this.isAGT_MDRT_STATUSDisabled = false;
      this.isAGT_MDRT_YEARDisabled = false;
      this.isAGT_SYSTEM_IDDisabled = false;
      this.isAGT_SUB_CODEDisabled = false;
      this.isAGT_LINE_OF_BUSINESSDisabled = false;
      this.isAGT_CHANNELDisabled = false;
      this.isAGT_LEVELDisabled = false;
      this.isAGT_LANGUAGEDisabled = false;
      this.isAGT_SUPER_CODEDisabled = false;
      this.isAGT_TITLEDisabled = false;
      this.isAGT_FIRST_NAMEDisabled = false;
      this.isAGT_LAST_NAMEDisabled = false;
      this.isAGT_ADD1Disabled = false;
      this.isAGT_ADD2Disabled = false;
      this.isAGT_ADD3Disabled = false;
      this.isAGT_NIC_NODisabled = false;
      this.isAGT_DOBDisabled = false;
      this.isAGT_MOBILEDisabled = false;
      this.isAGT_TEL_NODisabled = false;
      this.isAGT_FAX_NODisabled = false;
      this.isAGT_EMAILDisabled = false;
      this.isAGT_BRANCH_CODEDisabled = false;
      this.isAGT_BANK_IDDisabled = false;
      this.isAGT_BANK_BRANCH_IDDisabled = false;
      this.isAGT_BANK_ACC_NODisabled = false;
      this.isAGT_ID_ISSUEDDisabled = false;
      this.isAGT_ID_ISSUED_DATEDisabled = false;
      this.isAGT_APPOINT_DATEDisabled = false;
      this.isAGT_SLII_EXAMDisabled = false;
      this.isAGT_SLII_EXAM_DATEDisabled = false;
      this.isAGT_AGMT_DATE_RECEIVEDDisabled = false;
      this.isAGT_AGMT_DATE_ISSUEDDisabled = false;
      this.isAGT_APP_DATE_RECEIVEDDisabled = false;
      this.isAGT_APP_DATE_ISSUEDDisabled = false;
      this.isAGT_TRNS_BRANCH_CODEDisabled = false;
      this.isAGT_TRNS_BRANCH_DATEDisabled = false;
      this.isAGT_STOP_COMM_DATEDisabled = false;
      this.isAGT_STOP_COMM_REASONDisabled = false;
      this.isAGT_RELEASE_COMM_DATEDisabled = false;
      this.isAGT_RELEASE_COMM_REASONDisabled = false;
      this.isAGT_CUSTOMER_COMPLAINDisabled = false;
      this.isAGT_TERMINATE_NOTICE_DATEDisabled = false;
      this.isAGT_TERMINATE_DATEDisabled = false;
      this.isAGT_TERMINATE_REASONDisabled = false;
      this.isAGT_BLACK_LISTED_DATEDisabled = false;
      this.isAGT_DUES_TO_COMPANYDisabled = false;
      this.isAGT_REJOINED_DATEDisabled = false;
      this.isAGT_REMARKSDisabled = false;
      this.isAGT_BUSINESS_TYPEDisabled = false;
      this.isAGT_LEVEL_CODEDisabled = false;
      this.isAGT_LEADER_CODEDisabled = false;
      this.isAGT_STATUSDisabled = false;
      this.isAGT_TERMINATE_STATUSDisabled = false;
      this.isAGT_STOP_COMM_STATUSDisabled = false;
      this.isAGT_ISS_STATUSDisabled = false;
      this.isAGT_ISS_AMOUNTDisabled = false;
      this.isAGT_ISS_GIVEN_DATEDisabled = false;
      this.isAGT_LEADER_GIVEN_DATEDisabled = false;
      this.isAGT_ISS_CLOSE_DATEDisabled = false;
      this.isAGT_RETAINER_STATUSDisabled = false;
      this.isAGT_RETAINER_AMOUNTDisabled = false;
      this.isAGT_RETAINER_GIVEN_DATEDisabled = false;
      this.isAGT_RETAINER_CLOSE_DATEDisabled = false;
      this.isAGT_LEADER_AGENT_CODE_VDisabled = false;
      this.isAGT_LEADER_LEADER_CODE_VDisabled = false;
      this.isAGT_LEADER_AGENT_CODE_HDisabled = false;
      this.isAGT_LEADER_LEADER_CODE_HDisabled = false;
      this.isAGT_CREATED_BYDisabled = false;
      this.isAGT_DESIGNATION_IDDisabled = false;
      this.isAGT_HIERARCHY_TYPE_IDDisabled = false;
      this.isAGT_CHANGE_REASON_IDDisabled = false;
      this.isAGT_EFFECTIVE_DATEDisabled = false;
      this.isAGT_CHANGE_REASONDisabled = false;

    }
    if (Status == 'EDIT') {
      this.isAGT_MDRT_STATUSDisabled = false;
      this.isAGT_MDRT_YEARDisabled = false;
      this.isAGT_SYSTEM_IDDisabled = false;
      this.isAGT_SUB_CODEDisabled = false;
      this.isAGT_LINE_OF_BUSINESSDisabled = false;
      this.isAGT_CHANNELDisabled = false;
      this.isAGT_LEVELDisabled = false;
      this.isAGT_LANGUAGEDisabled = false;
      this.isAGT_SUPER_CODEDisabled = false;
      this.isAGT_TITLEDisabled = false;
      this.isAGT_FIRST_NAMEDisabled = false;
      this.isAGT_LAST_NAMEDisabled = false;
      this.isAGT_ADD1Disabled = false;
      this.isAGT_ADD2Disabled = false;
      this.isAGT_ADD3Disabled = false;
      this.isAGT_NIC_NODisabled = false;
      this.isAGT_DOBDisabled = false;
      this.isAGT_MOBILEDisabled = false;
      this.isAGT_TEL_NODisabled = false;
      this.isAGT_FAX_NODisabled = false;
      this.isAGT_EMAILDisabled = false;
      this.isAGT_BRANCH_CODEDisabled = false;
      this.isAGT_BANK_IDDisabled = false;
      this.isAGT_BANK_BRANCH_IDDisabled = false;
      this.isAGT_BANK_ACC_NODisabled = false;
      this.isAGT_ID_ISSUEDDisabled = false;
      this.isAGT_ID_ISSUED_DATEDisabled = false;
      this.isAGT_APPOINT_DATEDisabled = false;
      this.isAGT_SLII_EXAMDisabled = false;
      this.isAGT_SLII_EXAM_DATEDisabled = false;
      this.isAGT_AGMT_DATE_RECEIVEDDisabled = false;
      this.isAGT_AGMT_DATE_ISSUEDDisabled = false;
      this.isAGT_APP_DATE_RECEIVEDDisabled = false;
      this.isAGT_APP_DATE_ISSUEDDisabled = false;
      this.isAGT_TRNS_BRANCH_CODEDisabled = false;
      this.isAGT_TRNS_BRANCH_DATEDisabled = false;
      this.isAGT_STOP_COMM_DATEDisabled = false;
      this.isAGT_STOP_COMM_REASONDisabled = false;
      this.isAGT_RELEASE_COMM_DATEDisabled = false;
      this.isAGT_RELEASE_COMM_REASONDisabled = false;
      this.isAGT_CUSTOMER_COMPLAINDisabled = false;
      this.isAGT_TERMINATE_NOTICE_DATEDisabled = false;
      this.isAGT_TERMINATE_DATEDisabled = false;
      this.isAGT_TERMINATE_REASONDisabled = false;
      this.isAGT_BLACK_LISTED_DATEDisabled = false;
      this.isAGT_DUES_TO_COMPANYDisabled = false;
      this.isAGT_REJOINED_DATEDisabled = false;
      this.isAGT_REMARKSDisabled = false;
      this.isAGT_BUSINESS_TYPEDisabled = false;
      this.isAGT_LEVEL_CODEDisabled = false;
      this.isAGT_LEADER_CODEDisabled = false;
      this.isAGT_STATUSDisabled = false;
      this.isAGT_TERMINATE_STATUSDisabled = false;
      this.isAGT_STOP_COMM_STATUSDisabled = false;
      this.isAGT_ISS_STATUSDisabled = false;
      this.isAGT_ISS_AMOUNTDisabled = false;
      this.isAGT_ISS_GIVEN_DATEDisabled = false;
      this.isAGT_LEADER_GIVEN_DATEDisabled = false;
      this.isAGT_ISS_CLOSE_DATEDisabled = false;
      this.isAGT_RETAINER_STATUSDisabled = false;
      this.isAGT_RETAINER_AMOUNTDisabled = false;
      this.isAGT_RETAINER_GIVEN_DATEDisabled = false;
      this.isAGT_RETAINER_CLOSE_DATEDisabled = false;
      this.isAGT_LEADER_AGENT_CODE_VDisabled = false;
      this.isAGT_LEADER_LEADER_CODE_VDisabled = false;
      this.isAGT_LEADER_AGENT_CODE_HDisabled = false;
      this.isAGT_LEADER_LEADER_CODE_HDisabled = false;
      this.isAGT_CREATED_BYDisabled = false;
      this.isAGT_DESIGNATION_IDDisabled = false;
      this.isAGT_HIERARCHY_TYPE_IDDisabled = false;
      this.isAGT_CHANGE_REASON_IDDisabled = false;
      this.isAGT_EFFECTIVE_DATEDisabled = false;
      this.isAGT_CHANGE_REASONDisabled = false;
    }
    if (Status == 'LOAD') {
      this.isAGT_IDDisabled = true;
      this.isAGT_CODEDisabled = true;
      this.isAGT_TYPE_IDDisabled = true;
      this.isAGT_CODE_IDDisabled = true;
      this.isAGT_MDRT_STATUSDisabled = true;
      this.isAGT_MDRT_YEARDisabled = true;
      this.isAGT_SYSTEM_IDDisabled = true;
      this.isAGT_SUB_CODEDisabled = true;
      this.isAGT_LINE_OF_BUSINESSDisabled = true;
      this.isAGT_CHANNELDisabled = true;
      this.isAGT_LEVELDisabled = true;
      this.isAGT_LANGUAGEDisabled = true;
      this.isAGT_SUPER_CODEDisabled = true;
      this.isAGT_TITLEDisabled = true;
      this.isAGT_FIRST_NAMEDisabled = true;
      this.isAGT_LAST_NAMEDisabled = true;
      this.isAGT_ADD1Disabled = true;
      this.isAGT_ADD2Disabled = true;
      this.isAGT_ADD3Disabled = true;
      this.isAGT_NIC_NODisabled = true;
      this.isAGT_DOBDisabled = true;
      this.isAGT_MOBILEDisabled = true;
      this.isAGT_TEL_NODisabled = true;
      this.isAGT_FAX_NODisabled = true;
      this.isAGT_EMAILDisabled = true;
      this.isAGT_BRANCH_CODEDisabled = true;
      this.isAGT_BANK_IDDisabled = true;
      this.isAGT_BANK_BRANCH_IDDisabled = true;
      this.isAGT_BANK_ACC_NODisabled = true;
      this.isAGT_ID_ISSUEDDisabled = true;
      this.isAGT_ID_ISSUED_DATEDisabled = true;
      this.isAGT_APPOINT_DATEDisabled = true;
      this.isAGT_SLII_EXAMDisabled = true;
      this.isAGT_SLII_EXAM_DATEDisabled = true;
      this.isAGT_AGMT_DATE_RECEIVEDDisabled = true;
      this.isAGT_AGMT_DATE_ISSUEDDisabled = true;
      this.isAGT_APP_DATE_RECEIVEDDisabled = true;
      this.isAGT_APP_DATE_ISSUEDDisabled = true;
      this.isAGT_TRNS_BRANCH_CODEDisabled = true;
      this.isAGT_TRNS_BRANCH_DATEDisabled = true;
      this.isAGT_STOP_COMM_DATEDisabled = true;
      this.isAGT_STOP_COMM_REASONDisabled = true;
      this.isAGT_RELEASE_COMM_DATEDisabled = true;
      this.isAGT_RELEASE_COMM_REASONDisabled = true;
      this.isAGT_CUSTOMER_COMPLAINDisabled = true;
      this.isAGT_TERMINATE_NOTICE_DATEDisabled = true;
      this.isAGT_TERMINATE_DATEDisabled = true;
      this.isAGT_TERMINATE_REASONDisabled = true;
      this.isAGT_BLACK_LISTED_DATEDisabled = true;
      this.isAGT_DUES_TO_COMPANYDisabled = true;
      this.isAGT_REJOINED_DATEDisabled = true;
      this.isAGT_REMARKSDisabled = true;
      this.isAGT_BUSINESS_TYPEDisabled = true;
      this.isAGT_LEVEL_CODEDisabled = true;
      this.isAGT_LEADER_CODEDisabled = true;
      this.isAGT_STATUSDisabled = true;
      this.isAGT_TERMINATE_STATUSDisabled = true;
      this.isAGT_STOP_COMM_STATUSDisabled = true;
      this.isAGT_ISS_STATUSDisabled = true;
      this.isAGT_ISS_AMOUNTDisabled = true;
      this.isAGT_ISS_GIVEN_DATEDisabled = true;
      this.isAGT_LEADER_GIVEN_DATEDisabled = true;
      this.isAGT_ISS_CLOSE_DATEDisabled = true;
      this.isAGT_RETAINER_STATUSDisabled = true;
      this.isAGT_RETAINER_AMOUNTDisabled = true;
      this.isAGT_RETAINER_GIVEN_DATEDisabled = true;
      this.isAGT_RETAINER_CLOSE_DATEDisabled = true;
      this.isAGT_LEADER_AGENT_CODE_VDisabled = true;
      this.isAGT_LEADER_LEADER_CODE_VDisabled = true;
      this.isAGT_LEADER_AGENT_CODE_HDisabled = true;
      this.isAGT_LEADER_LEADER_CODE_HDisabled = true;
      this.isAGT_CREATED_BYDisabled = true;
      this.isAGT_DESIGNATION_IDDisabled = true;
      this.isAGT_HIERARCHY_TYPE_IDDisabled = true;
      this.isAGT_CHANGE_REASON_IDDisabled = true;
      this.isAGT_EFFECTIVE_DATEDisabled = true;
      this.isAGT_CHANGE_REASONDisabled = true;

    }

  }
  //-----------------------------End------------------------------------
}
