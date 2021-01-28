import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Thesis} from '../../../shared/thesis';
import {ThesisService} from '../../../service/thesis.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NotificationThesisComponent} from '../notification-thesis/notification-thesis.component';

@Component({
  selector: 'app-create-thesis',
  templateUrl: './create-thesis.component.html',
  styleUrls: ['./create-thesis.component.css']
})
export class CreateThesisComponent implements OnInit {
  public formCreate: FormGroup;
  public thesis: Thesis;
  public listRole: [];
  public idMessage = 1;

  constructor(
    private thesisService: ThesisService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private toast: ToastrService,
    private dialogRef: MatDialogRef<CreateThesisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private el: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.formCreate = this.formBuilder.group({
      statement: ['', [Validators.required, Validators.maxLength( 55),
        this.thesisService.validateSpecialCharacter, this.thesisService.validateWhiteSpace]],
      amount: ['', [Validators.required, Validators.min(1), Validators.max(15)]],
      description: ['', [Validators.required, Validators.maxLength( 250),
        this.thesisService.validateSpecialCharacter, this.thesisService.validateWhiteSpace]],
    });
  }

  createThesis(): void {
    if (this.formCreate.invalid) {
      const tempControl = this.el.nativeElement.querySelector('form');
      tempControl.querySelector('.ng-invalid').focus();
    }
    this.formCreate.markAllAsTouched();
    if (this.formCreate.valid) {
      this.thesisService.createThesis(this.formCreate.value).subscribe(data1 => {
        if (data1 == null) {
          this.dialogRef.close();
          this.openDialogMessage();
        }
      }, error => {
        console.log(error);
      });
    }
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
