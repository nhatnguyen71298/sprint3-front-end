import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-thesis',
  templateUrl: './view-thesis.component.html',
  styleUrls: ['./view-thesis.component.css']
})
export class ViewThesisComponent implements OnInit {
  protected formView;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.formView = this.data.dataNeed;
  }
}
