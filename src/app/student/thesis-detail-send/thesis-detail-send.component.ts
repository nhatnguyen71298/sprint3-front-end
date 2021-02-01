import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {ThesisDetailService} from '../../service/thesis-detail.service';
import {LoginService} from '../../services/login.service';

declare var $: any;

@Component({
  selector: 'app-thesis-detail-send',
  templateUrl: './thesis-detail-send.component.html',
  styleUrls: ['./thesis-detail-send.component.css']
})
export class ThesisDetailSendComponent implements OnInit {

  studentId = 1;
  userId;
  thesisDetailId;
  currentFile;
  tempCheckReport;
  files: File[] = [];
  formUpload: FormGroup;
  task: AngularFireUploadTask;
  percentage = 0;
  displayPercent;
  count;
  downloadURL;
  filePath: string;
  tempCheckThesisId;

  constructor(private formBuilder: FormBuilder,
              private el: ElementRef,
              private storage: AngularFireStorage,
              private thesisDetailService: ThesisDetailService,
              private loginService: LoginService) {

    $(document).ready(() => {
      $('#get-file').hide();
      $('.upload-file__done').hide();
      $('#progress-box').hide();
      $('.progress__choose-file-btn').click(() => {
        this.checkReportStatus();
        $('#get-file').click();
      });
      $('#get-file').change((event) => {
        let srcFile = [];
        let fileName = $('#get-file').val();
        srcFile = fileName.split('fakepath\\');
        fileName = srcFile[1];
        $('.progress__file-name').val(fileName);
      });
    });
  }

  ngOnInit(): void {
    this.getStudentId();
    this.setFormUpload();
    this.checkReportStatus();
  }

  getStudentId() {
    this.userId = this.loginService.currentUserValue.id;
    this.thesisDetailService.getStudentIdByAccountId(this.userId).subscribe((data) => {
      this.studentId = data;
    })
  }

  dropFile(files: FileList) {
    if ($('#get-file').val() !== '') {
      $('#error-choose-file').hide();
    }
    this.files = [];
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  setFormUpload() {
    this.formUpload = this.formBuilder.group({
      id: '',
      progressFile: ['', this.checkFile],
      fileUrl: '',
      description: ['', Validators.required],
      percent: '',
      checkReport: '',
      checkThesisId: '',
    })
  }

  uploadFile() {
    if (this.formUpload.invalid) {
      if ($('#get-file').val() === '') {
        $('.progress__choose-file-btn').focus();
      }
      console.log(this.formUpload.value.progressFile.valid);
      const tempControl = this.el.nativeElement.querySelector('form');
      tempControl.querySelector('.ng-invalid').focus();
    }
    this.formUpload.markAllAsTouched();
    const isValid = $('#get-file').val() !== '' && $('.progress__content').val() !== '' && $('#check-report').val() !== '';
    if (this.formUpload.valid && isValid) {
      this.formUpload.value.checkReport = this.tempCheckReport;
      this.formUpload.value.id = this.thesisDetailId;
      console.log(this.formUpload.value.id);
      this.count = 0;
      this.percentage = 0;
      for (const file of this.files) {
        // the storage path
        const path = `thesis-detail/${Date.now()}_${file.name}`;
        this.filePath = path;
        // Reference to storage bucket
        const ref = this.storage.ref(path);
        // the main task
        this.task = this.storage.upload(path, file);
        // get percent progress
        this.task.percentageChanges().subscribe((data) => {
          $('#progress-box').show();
          this.percentage = Math.floor(data);
          this.displayPercent = this.percentage + ' %';
          if (this.percentage === 100) {
            setTimeout(() => {
              $('#progress-upload').hide();
              $('#upload-done').show();
              if (this.count === 0) {
                this.uploadtFileToMySQL()
              }
            }, 1000);
            setTimeout(() => {
              $('#progress-box').hide();
            }, 2000);
          } else {
            $('#progress-upload').show();
            $('#upload-done').hide();
          }
        });
      }
    }
  }

  // upload to MySQL
  uploadtFileToMySQL() {
    this.count = 1;
    this.storage.ref(this.filePath).getDownloadURL().subscribe((data) => {
      this.downloadURL = data;
      this.formUpload.value.fileUrl = this.downloadURL;
      this.formUpload.value.checkThesisId = this.tempCheckThesisId;
      const fileNameTemp = this.formUpload.value.progressFile.split('fakepath\\');
      this.formUpload.value.progressFile = fileNameTemp[1];
      console.log(this.formUpload.value);
      this.downloadURL = '';
      $('#get-file').files = [];
      $('#get-file').val('');
      $('.progress__file-name').val('');
      $('.progress__content').val('');
      this.thesisDetailService.uploadThesisDetail(this.formUpload.value).subscribe((data) => {
        $(document).ready(() => {
          if (data.message === 'upload success') {
            $('.upload-file__done').show();
            setTimeout(() => {
              $('.upload-file__done').hide();
            }, 2000);
          }
        })

      })
    })
  }

  checkFile(formControl: FormControl) {
    return (formControl.value !== '') ? null : {checkFileExist: true};
  }

  private checkReportStatus() {
    this.thesisDetailService.getCheckThesis(this.studentId).subscribe((data) => {
        const tempDate = data;
        this.tempCheckReport = tempDate.message;
        this.thesisDetailId = tempDate.id;
        this.tempCheckThesisId = tempDate.checkThesisId;
      }
    );
  }
}
