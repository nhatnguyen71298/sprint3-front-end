import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DinServiceService} from '../../../service/din-service.service';
import {DinInteractionService} from '../../../service/din-interaction.service';

@Component({
  selector: 'app-delete-interaction-student',
  templateUrl: './delete-interaction-student.component.html',
  styleUrls: ['./delete-interaction-student.component.css']
})
export class DeleteInteractionStudentComponent implements OnInit {
  interaction;
  record = {
    name: '',
    content: ''
  };
  constructor(
    private dialogRef: MatDialogRef<DeleteInteractionStudentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dinServiceService: DinServiceService,
    private dinInteractionService: DinInteractionService
  ) { }

  ngOnInit(): void {
    this.dinServiceService.searchById(this.data.idInteraction).subscribe(data => this.interaction = data);
  }
  cancel(){
    this.dialogRef.close();
  }
  delete() {
    this.dinServiceService.deleteInteractionById(this.data.idInteraction).subscribe(() => {
      this.dinInteractionService.getAllInteraction(this.data.idInteraction.toString()).subscribe(data => {
        data.map(e => {
          this.dinInteractionService.deleteInteraction(this.data.idInteraction.toString(), e.payload.doc.id);
        });
        this.dialogRef.close();
      });
    });
  }
}
