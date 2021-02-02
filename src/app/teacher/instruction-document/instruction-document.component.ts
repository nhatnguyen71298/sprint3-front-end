import {Component, ElementRef, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {finalize, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InstructionDocumentService} from '../../service/instruction-document.service';
import {InstructionDeleteComponent} from './instruction-delete/instruction-delete.component';
import {MatDialog} from '@angular/material/dialog';


declare var $: any;


@Component({
  selector: 'app-instruction-document',
  templateUrl: './instruction-document.component.html',
  styleUrls: ['./instruction-document.component.css']
})
export class InstructionDocumentComponent implements OnInit {

  localPath;
  instructionList;
  periodList;
  files: File[] = [];
  formUpload: FormGroup;
  task: AngularFireUploadTask;
  percentage;
  displayPercent: string;
  snapshot: Observable<any>
  downloadURL;
  startDate;
  endDate;
  getToday;
  defaultValue;
  listInstructionLength;
  currentSemester;
  file: File;

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore,
              private formBuilder: FormBuilder,
              private el: ElementRef,
              private introductionDocumentService: InstructionDocumentService,
              public dialog: MatDialog) {
    $(document).ready(() => {
      $('#progress-box').hide();
      $('#upload-done').hide();
      $('#get-file').hide();
      $('.instruction__choose-file').click(() => {
        $('#progress-box').hide();
        $('#get-file').click();
      });
      $('#get-file').change(() => {
        let srcFile = [];
        let nameOfFile = $('#get-file').val();
        srcFile = nameOfFile.split('fakepath\\');
        nameOfFile = srcFile[1];
        $('.instruction__upload-input').val(nameOfFile);
      });
    });
  }

  ngOnInit(): void {
    this.setFormUpload();
    this.getPeriodOfTime();
  }

  // Setting for upload file form
  setFormUpload() {
    this.formUpload = this.formBuilder.group({
      fileName: ['', Validators.required],
      description: ['',[ Validators.required, Validators.maxLength(250)]],
      fileUrl: '',
      pathFile: ''
    })
  }

  // Get file want to upload
  onDrop(files: FileList) {
    this.files = [];
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  // Upload file to firebase
  startUpLoad() {
    if (this.formUpload.invalid) {
      const tempControl = this.el.nativeElement.querySelector('form');
      tempControl.querySelector('.ng-invalid').focus();
      if ($('#get-file').val() === '') {
        // $('.instruction__choose-file').click();
      }
    }
    this.formUpload.markAllAsTouched();
    if (this.formUpload.valid) {
      $('#progress-box').show();
      $('#progress-upload').show();
      $('#upload-done').hide();

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.files.length; i++) {
        this.file = this.files[i];
        // the storage path
        const path = `instruction/${Date.now()}_${this.file.name}`;
        // Reference to storage bucket
        const ref = this.storage.ref(path);
        // the main task
        this.task = this.storage.upload(path, this.file);
        // progress monitoring
        this.task.percentageChanges().subscribe((data) => {
          this.percentage = Math.floor(data);
          this.displayPercent = this.percentage + ' %';
          if (this.percentage === 100) {
            setTimeout(() => {
              $('#progress-upload').hide('300');
              $('#upload-done').show('400');
              $('#get-file').files = [];
              this.sendData(path);
            }, 500)
          } else {
            $('#progress-upload').show();
            $('#upload-done').hide();
          }
        });
        this.snapshot = this.task.snapshotChanges().pipe(
          tap(console.log),
          // the file's download URL
          finalize(async () => {
            await this.storage.ref(path).getDownloadURL().subscribe((url) => {
              this.downloadURL = url;
            });
            this.db.collection('file').add({downloadURL: this.downloadURL, path});
          })
        );
      }
    }
  }

  // Send data to MySQL
  sendData(path: string) {
    this.localPath = path;
    this.storage.ref(path).getDownloadURL().subscribe(url => {
      this.downloadURL = url;
      this.formUpload.value.fileUrl = this.downloadURL;
      this.formUpload.value.pathFile = path;
      const name = this.formUpload.value.fileName;
      const nameArr = name.split('fakepath\\');
      this.formUpload.value.fileName = nameArr[1];
      this.introductionDocumentService.sendInstruction(this.formUpload.value).subscribe(() => {
        $('.instruction__upload-input').val('');
        $('#get-file').val('');
        $('#progress-box').hide(1000);
      })
      this.ngOnInit();
    })
  }

  // Display list of instruction on table
  displayListInstruction(startDate, endDate) {
    this.instructionList = [];
    this.introductionDocumentService.getListInstruction(startDate, endDate).subscribe((data) => {
      this.instructionList = data;
      this.listInstructionLength = this.instructionList.length;
    });
  }

  // Get list period of time
  getPeriodOfTime() {
    const today = new Date();
    this.getToday = today.getFullYear() + '-' + today.getMonth() + 1 + '-' + today.getDate();
    this.introductionDocumentService.getListPeriod().subscribe((data) => {
      this.periodList = data;
    });

    // Get current semester
    this.introductionDocumentService.findDatebyDate(this.getToday).subscribe((data) => {
      this.getToday = data;
      this.defaultValue = this.getToday.id;
      this.getSemester(this.defaultValue);
    });
  }

  // Open delete dialog to confirm
  openDialogDelete(instruction) {
    console.log(instruction.pathFile);
    this.localPath = instruction.path;
    const dialogRef = this.dialog.open(InstructionDeleteComponent, {
      width: '750px',
      data: {dataMessage: instruction},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  // choose semester you need
  getSemester(event) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.periodList.length; i++) {
      // tslint:disable-next-line:radix
      const isChoiseTime = parseInt(event) === this.periodList[i].id;
      // tslint:disable-next-line:radix
      this.currentSemester = parseInt(event);
      if (isChoiseTime) {
        this.startDate = this.periodList[i].startDate;
        this.endDate = this.periodList[i].endDate;
        this.displayListInstruction(this.startDate, this.endDate);
      }
    }
  }
}
