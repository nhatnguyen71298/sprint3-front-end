import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-instruction-message',
  templateUrl: './instruction-message.component.html',
  styleUrls: ['./instruction-message.component.css']
})
export class InstructionMessageComponent implements OnInit {

  public messageUser;

  constructor(private dialog: MatDialog,
              private dialogRef: MatDialogRef<InstructionMessageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.messageUser = this.data.dataMessage;
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = {left: `40%`, top: `60px`};
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

}
