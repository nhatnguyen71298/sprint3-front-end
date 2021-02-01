import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InstructionDocumentService} from '../../../service/instruction-document.service';
import {AngularFireStorage} from '@angular/fire/storage';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.instruction = this.data.dataMessage;
  }


  deleteIstruction() {
    this.instructionDocumentService.deleteInstruction(this.instruction.id).subscribe(() => {
      this.storage.ref(this.instruction.pathFile).delete().subscribe(() => {
        console.log('deleted on firebase');
      })
    })
    this.dialogRef.close();
  }
}
