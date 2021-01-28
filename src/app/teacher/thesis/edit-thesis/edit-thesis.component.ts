import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ThesisService} from '../../../service/thesis.service';
import {NotificationThesisComponent} from '../notification-thesis/notification-thesis.component';

@Component({
  selector: 'app-edit-thesis',
  templateUrl: './edit-thesis.component.html',
  styleUrls: ['./edit-thesis.component.css']
})
export class EditThesisComponent implements OnInit {
  formEdit: FormGroup;
  public idMessage = 2;


  constructor(private dialogRef: MatDialogRef<EditThesisComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private thesisService: ThesisService,) {
  }

  ngOnInit(): void {
    this.formEdit = this.formBuilder.group({
      statement: ['', [Validators.required, Validators.maxLength( 55),
        this.thesisService.validateSpecialCharacter, this.thesisService.validateWhiteSpace]],
      amount: ['', [Validators.required, Validators.min(1), Validators.max(15)]],
      description: ['', [Validators.required, Validators.maxLength( 250),
        this.thesisService.validateSpecialCharacter, this.thesisService.validateWhiteSpace]],
    });
    console.log(this.data.data1);
    this.formEdit.patchValue(this.data.data1);
  }

  editThesis() {
    this.thesisService.editThesis(this.formEdit.value, this.data.data1.id).subscribe(data => {
      if (data == null){
        this.dialogRef.close();
        this.openDialogMessage();
      }
    });
  }

  private openDialogMessage() {
    const timeout = 1500;
    const dialogRef = this.dialog.open(NotificationThesisComponent, {
      width: '500px',
      height: '300px',
      data: {dataMessage: this.idMessage},
      disableClose: true
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

}
