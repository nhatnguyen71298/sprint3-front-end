import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-view-thesis',
  templateUrl: './view-thesis.component.html',
  styleUrls: ['./view-thesis.component.css']
})
export class ViewThesisComponent implements OnInit {
  protected formView;

  constructor(
    protected dialogRef: MatDialogRef<ViewThesisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.formView = this.data.dataNeed;
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.dialogRef.close();
    }
  }
}
