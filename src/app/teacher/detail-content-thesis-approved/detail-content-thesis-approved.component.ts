import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-detail-content-thesis-approved',
  templateUrl: './detail-content-thesis-approved.component.html',
  styleUrls: ['./detail-content-thesis-approved.component.css']
})
export class DetailContentThesisApprovedComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  detailContentApproved;

  ngOnInit(): void {
    this.detailContentApproved = this.data.dataThesisApproved;
  }

}
