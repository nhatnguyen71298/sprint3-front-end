import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {QuocService} from '../../service/quocservice/quoc.service';

@Component({
  selector: 'app-list-student-no-group',
  templateUrl: './list-student-no-group.component.html',
  styleUrls: ['./list-student-no-group.component.css']
})
export class ListStudentNoGroupComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onGetStudent = new EventEmitter();
  @Input() st;
  @Input() st2;
  private p: number;
  public test = 'first';
  private studentList = [];
  private by = 'all';
  private search = '';
  public student: any;
  constructor(private quocService: QuocService) {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(): void {
    let isCheck = false;
    // tslint:disable-next-line:prefer-for-of
    if(this.studentList.length !== 0){
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i <this.studentList.length; i++) {
        if(this.st.id === this.studentList[i].id){
          isCheck = true;
          break;
        }
      }
      if(isCheck !== true){
        this.studentList.push(this.st);
      }
    }else {
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
    this.quocService.findAllStudentNoGroup().subscribe(
      data => {
        console.log(data);
        this.studentList = data;
        console.log(this.studentList);
      },
      () => {
      },
      () => {
      });
  }

  getInfo(id: number) {
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < this.studentList.length ; j++) {
      if(this.studentList[j].id === id){
        this.studentList.splice(j,1);
      }
    }
    console.log(this.studentList);
    this.onGetStudent.emit(id);
  }

  findStudent() {
    console.log('search khi enter');
    this.quocService.search(this.by, this.search).subscribe(value => {
      this.studentList = value;
      // tslint:disable-next-line:prefer-for-of
      for( let i=this.studentList.length - 1; i>=0; i--){
        // tslint:disable-next-line:prefer-for-of
        for( let j=0; j<this.st2.value.length; j++){
          if(this.studentList[i] && (this.studentList[i].id === this.st2.value[j].id)){
            this.studentList.splice(i, 1);
          }
        }
      }
    });
  }

  cancelFormCreate() {
    this.quocService.search(this.by, this.search).subscribe(value => {
      console.log(value);
      this.studentList = value;
    })
  }

  handleClear() {
    this.search = '';
  }
}
