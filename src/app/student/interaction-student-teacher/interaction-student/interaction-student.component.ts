import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DinServiceService} from '../../../service/din-service.service';

@Component({
  selector: 'app-interaction-student',
  templateUrl: './interaction-student.component.html',
  styleUrls: ['./interaction-student.component.css']
})
export class InteractionStudentComponent implements OnInit {
  formInteraction;
  constructor(private fb: FormBuilder,
              private dinServiceService: DinServiceService ) { }

  ngOnInit(): void {
    this.formInteraction = this.fb.group({
      content: [''],
      title: ['']
    });
  }

  createInteraction(historyComponent) {
    this.dinServiceService.createInteraction(this.formInteraction.get('content').value,
      this.formInteraction.get('title').value,1).subscribe();
    this.dinServiceService.getAllInteraction(1 , historyComponent.listHistoryInteraction.pageable.pageNumber).subscribe(data => {
      historyComponent.listHistoryInteraction  = data;
    })
  }


}
