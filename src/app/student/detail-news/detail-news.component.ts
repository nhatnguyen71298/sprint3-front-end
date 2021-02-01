import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuocService} from '../../service/quocservice/quoc.service';

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.css']
})
export class DetailNewsComponent implements OnInit {
  private newsId: number;
  private news: any;

  constructor(private router: Router,
              private quocService: QuocService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      console.log(value);
      this.newsId = value.id;
      console.log(this.newsId);
      this.quocService.getNewsById(this.newsId).subscribe(data => {
        this.news = data;
        console.log(this.news);
      })
    })
  }


}
