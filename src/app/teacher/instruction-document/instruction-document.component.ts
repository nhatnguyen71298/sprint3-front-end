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

  isHovering: boolean;
  instructionList;
  files: File[] = [];
  formUpload: FormGroup;
  task: AngularFireUploadTask;
  percentage;
  displayPercent: string;
  snapshot: Observable<any>
  downloadURL;
  private file: File;

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore,
              private formBuilder: FormBuilder,
              private el: ElementRef,
              private introductionDocumentService: InstructionDocumentService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

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
    this.displayListInstruction();
    this.setFormUpload();
  }

  setFormUpload() {
    this.formUpload = this.formBuilder.group({
      fileName: ['', Validators.required],
      description: ['', Validators.required],
      fileUrl: '',
    })
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

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

  sendData(path: string) {
    this.storage.ref(path).getDownloadURL().subscribe(url => {
      this.downloadURL = url;
      this.formUpload.value.fileUrl = this.downloadURL;
      const name = this.formUpload.value.fileName;
      const nameArr = name.split('fakepath\\');
      this.formUpload.value.fileName = nameArr[1];
      this.introductionDocumentService.sendInstruction(this.formUpload.value).subscribe(() => {
        this.ngOnInit();
      })
    })
  }

  displayListInstruction() {
    this.introductionDocumentService.getListInstruction().subscribe((data) => {
      this.instructionList = data;
    });
  }


  openDialogDelete(instruction) {
    const dialogRef = this.dialog.open(InstructionDeleteComponent, {
      width: '750px',
      data: {dataMessage: instruction},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
