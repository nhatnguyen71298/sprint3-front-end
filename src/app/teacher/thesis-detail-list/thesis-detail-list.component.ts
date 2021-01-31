import {Component, OnInit} from '@angular/core';
import {ThesisDetailService} from '../../service/thesis-detail.service';

@Component({
  selector: 'app-thesis-detail-list',
  templateUrl: './thesis-detail-list.component.html',
  styleUrls: ['./thesis-detail-list.component.css']
})
export class ThesisDetailListComponent implements OnInit {

  thesisDetailList;

  constructor(private thesisDetailService: ThesisDetailService) {
  }

  ngOnInit(): void {
    this.getListThesisDetail();
  }

  getListThesisDetail() {
    this.thesisDetailService.getThesisDetailList().subscribe((data)=>{
      this.thesisDetailList = data;
      console.log(this.thesisDetailList[0])
    })
  }
}
