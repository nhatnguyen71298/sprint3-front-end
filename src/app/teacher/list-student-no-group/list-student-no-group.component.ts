import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {QuocService} from '../../service/quocservice/quoc.service';
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-list-student-no-group',
  templateUrl: './list-student-no-group.component.html',
  styleUrls: ['./list-student-no-group.component.css']
})
export class ListStudentNoGroupComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onGetStudent = new EventEmitter();
  @Input() st;
  private p: number;
  public test = 'first';
  private studentList = [];
  private by = 'all';
  private search = '';
  public student: any;
  private studentRemove = [];
  constructor(private quocService: QuocService) {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(): void {
    if (this.st !== undefined) {
      this.studentList.push(this.st);
    }
  }

  ngOnInit(): void {
    this.getStudents();

  }

  changePage(p: number) {
    if (p !== 1) {
      this.test = 'second';
    } else {
      this.test = 'first';
    }
  }

// @ts-ignore

  public getStudents() {
    this.quocService.search(this.by, this.search).subscribe(
      data => {
        this.studentList = data;
        console.log(this.studentList);
      },
      () => {
      },
      () => {
        for (let i = this.studentList.length - 1; i >= 0; i--) {
          // tslint:disable-next-line:prefer-for-of
          for (let j = 0; j < this.studentRemove.length; j++) {
            if (this.studentList[i] && (this.studentList[i].id === this.studentRemove[j].id)) {
              this.studentList = this.studentList.splice(i, 0);
            }
          }
        }
        console.log('hi')
        console.log(this.studentList);
      });
  }

  getInfo(id: number, i: number) {
    this.studentRemove.push(this.studentList[i]);
    console.log(this.studentRemove);
    this.studentList.splice(i, 1);
    console.log(this.studentList);
    this.onGetStudent.emit(id);
  }

  findStudent() {
    this.ngOnInit();
  }

  cancelFormCreate() {
    this.quocService.search(this.by, this.search).subscribe(value => {
      console.log(value);
      this.studentList = value;
    })
  }

}
