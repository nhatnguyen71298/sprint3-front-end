import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-thesis-detail-send',
  templateUrl: './thesis-detail-send.component.html',
  styleUrls: ['./thesis-detail-send.component.css']
})
export class ThesisDetailSendComponent implements OnInit {

  studentId = 1;
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
    });
  }

  ngOnInit(): void {
    this.setFormUpload();
  }

  dropFile(files: FileList) {
    this.files = [];
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  setFormUpload() {
    this.formUpload = this.formBuilder.group({
      progressFile: ['', Validators.required],
      fileUrl: '',
      description: ['', Validators.required],
      percent: '',
    })
  }

  uploadFile() {
    if ($('#get-file').val() === '') {
      $('.progress__choose-file-btn').focus();
    }
    if ($('.progress__content').val() === '') {
      $('.progress__content').focus();
    }
    if (this.formUpload.invalid) {
      const tempControl = this.el.nativeElement.querySelector('form');
      tempControl.querySelector('.ng-invalid').focus();
    }
    this.formUpload.markAllAsTouched();
    if (this.formUpload.valid && $('#get-file').val() !== '' && $('.progress__content').val() !== '') {
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
    })
  }
}
