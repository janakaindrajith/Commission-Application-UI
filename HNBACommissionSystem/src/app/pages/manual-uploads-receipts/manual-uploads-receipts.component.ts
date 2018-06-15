
import { Component, OnInit, NgZone, Inject, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UploadDocTypeService } from '../../shared/services/UploadDocType/upload-doc-type.service';
import { IUploadDocType } from '../../shared/models/UploadDocType.models';

import { UploadDocService } from '../../shared/services/UploadDoc/upload-doc.service';
import { IUploadDoc } from '../../shared/models/UploadDoc.models';



import { IUser } from '../../shared/models/user/user.model';

import { UUID } from 'angular2-uuid';
import { NgUploaderOptions, UploadedFile, UploadRejected } from 'ngx-uploader';

import { URL_CONST } from '../../shared/config/url.constants';

import { ToastrService } from "toastr-ng2/toastr";

@Component({
  selector: 'app-manual-uploads-receipts',
  templateUrl: './manual-uploads-receipts.component.html',
  styleUrls: ['./manual-uploads-receipts.component.css']
})
export class ManualUploadsReceiptsComponent implements OnInit {

  UploadDocTypeId: number;
  UploadDocList: Array<IUploadDoc> = [];
  DocUploadUrl: any;

  uploaderOptions: NgUploaderOptions;
  response: any;
  sizeLimit: number = 10000000; // 10MB
  previewData: any;
  errorMessage: string;
  inputUploadEvents: EventEmitter<string>;

  vHOSTED_URL_PREFIX: string = '';
  User: IUser;

  Result: string;

  isLoading: string;

  constructor( @Inject(NgZone) private zone: NgZone, private toastrService: ToastrService, private ref: ChangeDetectorRef, private UploadDocService: UploadDocService) {

    this.inputUploadEvents = new EventEmitter<string>();

  }



  getUploadDocByType(UploadType) {
    this.UploadDocService.getUploadDocByType(UploadType)
      .subscribe((data) => {
        console.log(data);

        this.UploadDocList = data;
      },
      (err) => console.log(err));
  }



  ngOnInit() {

    this.isLoading = "Unloading";

    this.vHOSTED_URL_PREFIX = URL_CONST.HOSTED_URL_PREFIX;

    this.User = JSON.parse(localStorage.getItem('currentCOMUser'));

    this.onSelectOfUploadDocTypeId(1);

    this.getUploadDocByType('ReceiptManualUpload');

  }




  startUpload() {

    try {

      //this.onSelectOfUploadDocTypeId(this.UPLOAD_TYPE);

      this.inputUploadEvents.emit('startUpload');

    }
    catch (error) {
      alert(error);
    }

  }



  onSelectOfUploadDocTypeId(docTypeId) {


    this.UploadDocTypeId = docTypeId;
    console.log('doc type-' + this.UploadDocTypeId);

    // this.DocUploadUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL_CONST.URL_PREFIX + 'api/Main/UploadDocument');
    //this.DocUploadUrl = 'http://localhost:46817/api/Main/UploadDocument?sTempSeqId=' +'aaaaasas';
    // this.DocUploadUrl = URL_CONST.URL_PREFIX + 'api/Main/UploadDocument?sTempSeqId=' + this.TempSeqId;
    //api/UploadDoc/UploadDocument?sTempSeqId={sTempSeqId} 	

    // alert(URL_CONST.URL_PREFIX + 'api/UploadDoc/UploadDocument?vAGT_CODE=' + this.AGT_CODE);

    this.DocUploadUrl = URL_CONST.URL_PREFIX + 'api/UploadDoc/UploadExcel?vAGT_CODE=' + 'ReceiptManualUpload'; //'DPTSManualUpload'

    console.log('url - ' + this.DocUploadUrl);

    this.uploaderOptions = new NgUploaderOptions({
      url: this.DocUploadUrl,
      filterExtensions: true,
      //allowedExtensions: ['jpg', 'pdf', 'txt','xls','xlsx'],
      allowedExtensions: ['xls', 'xlsx'],
      // data: { tempSeqId: '123', docTypeId: this.UploadDocTypeId },
      //data: { AgentID: this.AGT_ID, DocTypeID: this.UploadDocTypeId, UserID:this.User.UserName},
      data: { AgentCode: '', DocTypeID: this.UploadDocTypeId, UserID: this.User.UserName, DocDescription: '' },
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


  setDocumentPath = function (index, DocPath) {

    window.open('http://192.168.10.172:8082/comm_docs' + DocPath);

  }

  beforeUpload(uploadingFile: UploadedFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      this.errorMessage = 'File is too large!';
    }
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



  handleUpload(data: any) {   this.isLoading = "loading";
    setTimeout(() => {
      this.zone.run(() => {
        // this.response = data;

        if (data && data.response) {
          // this.response = JSON.parse(data.response);

          //alert(data.response);

          if (data.response.indexOf("An error has occurred.") == -1) {
            this.showSuccess("File Successfully Uploaded.");

            this.isLoading = "Unloading";

          } else {
            this.showError(data.response);
            this.isLoading = "Unloading";
            return;
          }

          this.getUploadDocByType('ReceiptManualUpload');

          console.log(JSON.parse(data.response));
          // this.showSuccess("Document Successfully Uploaded.");

        }
      });
    });
  }


}

