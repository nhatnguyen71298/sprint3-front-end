import {Component, Inject, OnInit} from '@angular/core';
import {InstructionMessageComponent} from '../instruction-message/instruction-message.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InstructionDocumentService} from '../../../service/instruction-document.service';

@Component({
  selector: 'app-instruction-delete',
  templateUrl: './instruction-delete.component.html',
  styleUrls: ['./instruction-delete.component.css']
})
export class InstructionDeleteComponent implements OnInit {

  public instruction;

  constructor(
    public dialogRef: MatDialogRef<InstructionDeleteComponent>,
    private dialog: MatDialog,
    private instructionDocumentService: InstructionDocumentService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.instruction = this.data.dataMessage;
  }

  openDialogMessage(data: any) {
    const timeout = 1500;
    const dialogRef = this.dialog.open(InstructionMessageComponent, {
      width: '500px',
      height: '300px',
      data: {dataMessage: data}
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

  deleteIstruction() {
    this.instructionDocumentService.deleteInstruction(this.instruction.id).subscribe((data) => {
      if (data != null) {
        console.log(data);
        this.dialogRef.close();
        // this.openDialogMessage(data.message);
      }
    })
  }
}
