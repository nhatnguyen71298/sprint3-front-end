import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DinServiceService} from '../../../service/din-service.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteInteractionStudentComponent} from '../delete-interaction-student/delete-interaction-student.component';

@Component({
  selector: 'app-history-interaction-student',
  templateUrl: './history-interaction-student.component.html',
  styleUrls: ['./history-interaction-student.component.css']
})
export class HistoryInteractionStudentComponent implements OnInit,OnChanges {
  searchTitle = '';
  @Input()
  listHistoryInteraction;
  interaction;
  constructor(
    private dinServiceService: DinServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dinServiceService.getAllInteraction(1,0).subscribe(data => {
      this.listHistoryInteraction = data;
    });
  }

  searchInteraction(page: number, search: string) {
    if (page === undefined) {
      page = 0;
    }
    this.searchTitle = search.trim();
    if (this.searchTitle === '') {
      this.dinServiceService.getAllInteraction(1,page).subscribe(data => {
        this.listHistoryInteraction = data;
      });
    } else {
      this.dinServiceService.searchInteractionTitle(1,page, this.searchTitle).subscribe(data => {
        this.listHistoryInteraction = data;
      });
    }
  }

  array(length) {
    const arrayTemp = [];
    for (let i = 0; i < length; i++) {
      arrayTemp.push(i);
    }
    return arrayTemp;
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  deleteId(id: any) {
    const dialogRef = this.dialog.open(DeleteInteractionStudentComponent, {
      width: 'auto',
      disableClose: true,
      data: {idInteraction: id}
    });
    dialogRef.afterClosed().subscribe(() => {
      if (this.searchTitle === '') {
        this.dinServiceService.getAllInteraction(1,this.listHistoryInteraction.pageable.pageNumber).subscribe(data => {
          this.listHistoryInteraction = data;
        });
      } else {
        this.dinServiceService.searchInteractionTitle(1,this.listHistoryInteraction.pageable.pageNumber,
          this.searchTitle).subscribe(data => {
          this.listHistoryInteraction = data;
        });
      }
    })
    // this.dinServiceService.deleteInteractionById(id).subscribe(data => {
    // });
  }

  details(id) {
    this.dinServiceService.searchById(id).subscribe(data => this.interaction = data);
  }
}
