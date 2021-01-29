import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ThesisService} from '../../service/thesis.service';


@Component({
  selector: 'app-detail-thesis',
  templateUrl: './detail-thesis.component.html',
  styleUrls: ['./detail-thesis.component.css']
})
export class DetailThesisComponent implements OnInit {
  public detail;

  constructor(public dialogRef: MatDialogRef<DetailThesisComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public thesisService: ThesisService) {
  }

  ngOnInit(): void {
    console.log(this.data.data1);
    this.detail = this.data.data1;
  }

}
