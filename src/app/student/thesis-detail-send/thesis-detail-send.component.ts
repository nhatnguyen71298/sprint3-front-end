import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

declare var $: any;

@Component({
  selector: 'app-thesis-detail-send',
  templateUrl: './thesis-detail-send.component.html',
  styleUrls: ['./thesis-detail-send.component.css']
})
export class ThesisDetailSendComponent implements OnInit {

  studentId = 1;
  tempCheckReport;
  files: File[] = [];
  formUpload: FormGroup;
  task: AngularFireUploadTask;
  percentage = 0;
  displayPercent;
  count;
  downloadURL;
  filePath: string;

  constructor(private formBuilder: FormBuilder,
              private el: ElementRef,
              private storage: AngularFireStorage) {

    $(document).ready(() => {
      $('#get-file').hide();
      $('#progress-box').hide();
      $('.progress__choose-file-btn').click(() => {
        $('#get-file').click();
      });
      $('#get-file').change((event) => {
        let srcFile = [];
        let fileName = $('#get-file').val();
        srcFile = fileName.split('fakepath\\');
        fileName = srcFile[1];
        $('.progress__file-name').val(fileName);
      });
      $('#check-report-1').click(() => {
        $('#check-report').val(1);
        this.tempCheckReport = $('#check-report').val();
      });
      $('#check-report-2').click(() => {
        $('#check-report').val(2);
        this.tempCheckReport = $('#check-report').val();
      })
    });
  }

  ngOnInit(): void {
    this.setFormUpload();
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
      progressFile: '',
      fileUrl: '',
      description: '',
      percent: '',
      checkReport: ''
    })
  }

  uploadFile() {
    this.formUpload.value.checkReport = this.tempCheckReport;
    if (this.formUpload.invalid) {
      console.log(this.formUpload.value.progressFile.valid);
      const tempControl = this.el.nativeElement.querySelector('form');
      tempControl.querySelector('.ng-invalid').focus();
    }
    this.formUpload.markAllAsTouched();
    const isValid = $('#get-file').val() !== '' && $('.progress__content').val() !== '' && $('#check-report').val() !== '';
    if (this.formUpload.valid && isValid) {
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
      const fileNameTemp = this.formUpload.value.progressFile.split('fakepath\\');
      this.formUpload.value.progressFile = fileNameTemp[1];
      this.downloadURL = '';
      $('#get-file').files = [];
      $('#get-file').val('');
      $('.progress__file-name').val('');
      $('.progress__content').val('');
      console.log(this.formUpload.value);
    })
  }
}
