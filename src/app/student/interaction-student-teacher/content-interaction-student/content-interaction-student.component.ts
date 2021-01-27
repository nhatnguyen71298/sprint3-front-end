import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DinServiceService} from '../../../service/din-service.service';
import {DinInteractionService} from '../../../service/din-interaction.service';
import firebase from 'firebase';

@Component({
  selector: 'app-content-interaction-student',
  templateUrl: './content-interaction-student.component.html',
  styleUrls: ['./content-interaction-student.component.css']
})
export class ContentInteractionStudentComponent implements OnInit, OnChanges {
  @Input()
  interaction;
  record = {
    name: '',
    content: ''
  };
  records;

  constructor(private dinServiceService: DinServiceService,
              private dinInteractionService: DinInteractionService) {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.dinInteractionService.getAllInteraction(this.interaction.id.toString()).subscribe(data => {
      // console.log(data.slice(0, 3).map(e => console.log(e.payload.doc.data())));
      this.records = data.map(e => {
        return {
          name: e.payload.doc.data()['name'],
          content: e.payload.doc.data()['content'],
        }
      })
    })
  }

  ngOnInit(): void {
    this.dinInteractionService.getAllInteraction(this.interaction.id.toString()).subscribe(data => {
      // console.log(data.slice(0, 3).map(e => console.log(e.payload.doc.data())));
      this.records = data.map(e => {
        return {
          name: e.payload.doc.data()['name'],
          content: e.payload.doc.data()['content'],
        }
      })
    })
  }

  sentFireBase(feedback) {
    this.record.name = this.interaction.student.fullName;
    this.record.content = feedback.value;
    this.dinInteractionService.createInteraction(this.interaction.id.toString(), this.record).then(res => {
      this.record.name = '';
      this.record.content = '';
      feedback.reset();
      this.ngOnInit();
    }).catch(error => console.log('lỗi'));
  }
}
