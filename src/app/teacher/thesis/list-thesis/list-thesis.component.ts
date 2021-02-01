import {Component, OnInit} from '@angular/core';
import {ThesisService} from '../../../service/thesis.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Thesis} from '../../../shared/thesis';
import {Observable} from 'rxjs';
import {SearchThesis} from '../../../shared/searchThesis';
import {map, tap} from 'rxjs/operators';
import {DetailThesisComponent} from '../detail-thesis/detail-thesis.component';
import {EditThesisComponent} from '../edit-thesis/edit-thesis.component';
import {DeleteThesisComponent} from '../delete-thesis/delete-thesis.component';
import {CreateThesisComponent} from '../create-thesis/create-thesis.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-thesis',
  templateUrl: './list-thesis.component.html',
  styleUrls: ['./list-thesis.component.css']
})
export class ListThesisComponent implements OnInit {
  private formSearch: FormGroup;
  thesis: Thesis = null;
  thesisPage: Observable<Thesis[]>;
  thesisList: Thesis[];
  lastPage: number;
  currentPage: number;
  pageSize = 4;
  totalElements: number;
  isEmpty = false;
  stt: number[];
  private message: string;
  public keywordSearch: string;
  public checkList = 'true';
  private searchFields: SearchThesis = {} as SearchThesis;
  protected idTeacher;



  constructor(private thesisService: ThesisService,
              private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // this.activatedRoute.params.subscribe(data => {
    //   this.idTeacher = data.idTeacher;
    // });
    this.formSearch = this.formBuilder.group({
      // tslint:disable-next-line:max-line-length
      statement: [''],
      amount: [''],
    });
    this.getThesisPage(1);
    this.getAllThesis();
  }


  search() {
    this.searchFields = this.formSearch.value as SearchThesis;
    this.getThesisPage(1);
  }

  getThesisPage(pageNumber) {
    this.thesisPage = this.thesisService.getThesisPage(this.searchFields, pageNumber).pipe(
      tap(res => {
        console.log(res);
        this.totalElements = res.totalElements;
        this.pageSize = res.size;
        this.currentPage = pageNumber;

        this.stt = [];
        const firstIndex = this.pageSize * (this.currentPage - 1) + 1;
        const lastIndex = this.pageSize * this.currentPage;
        for (let i = firstIndex; i <= lastIndex; i++) {
          this.stt.push(i);
        }

        this.isEmpty = false;
        if (res.content.length === 0) {
          this.isEmpty = true;
        }
      }, error => {
        console.log(error);
        console.log('vào được err của tap');
      }),
      map(res => res.content)
    );
  }

  getAllThesis(): void {
    this.thesisService.getThesisList().subscribe(data => {
      this.thesisList = data;
    });
  }

  openDetailDialog(id: number): void {
    this.thesisService.getThesisDetail(id).subscribe(data => {
      const dialogRef = this.dialog.open(DetailThesisComponent, {
        width: '550px',
        disableClose: false,
        data: {data1: data}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      })
    })
  }

  openDeleteDialog(id: any): void {
    this.thesisService.getThesisDetail(id).subscribe(deleId => {
      const dialogRef = this.dialog.open(DeleteThesisComponent, {
        width: '550px',
        data: {dataDelete: deleId},
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    })
  }

  openUpdateDialog(id: number): void {
    this.thesisService.getThesisDetail(id).subscribe(thesisInfo => {
      console.log(thesisInfo);
      const dialogRef = this.dialog.open(EditThesisComponent, {
        width: '550px',
        maxHeight: '90vh',
        data: {data1: thesisInfo},
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    })
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateThesisComponent, {
      width: '650px',
      maxHeight: '90vh',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
