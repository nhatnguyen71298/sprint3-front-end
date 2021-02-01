import { Component, OnInit } from '@angular/core';
import {QuocService} from '../../service/quocservice/quoc.service';

@Component({
  selector: 'app-list-new',
  templateUrl: './list-new.component.html',
  styleUrls: ['./list-new.component.css']
})
export class ListNewComponent implements OnInit {
  private news= [];
  private p:number;
  public test = 'first';
  constructor(private quocService: QuocService) { }

  ngOnInit(): void {
    this.getNews()
  }
  changePage(p: number) {
    if (p !== 1) {
      this.test = 'second';
    } else {
      this.test = 'first';
    }
  }
  public getNews() {
    this.quocService.listAllNews().subscribe(value => {
      this.news = value;
      console.log(this.news);
    })
  }
}
