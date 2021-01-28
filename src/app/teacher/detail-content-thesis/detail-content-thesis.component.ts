import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-detail-content-thesis',
  templateUrl: './detail-content-thesis.component.html',
  styleUrls: ['./detail-content-thesis.component.css']
})
export class DetailContentThesisComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  detailContent;

  ngOnInit(): void {
    this.detailContent = this.data.dataThesis;
  }

}
