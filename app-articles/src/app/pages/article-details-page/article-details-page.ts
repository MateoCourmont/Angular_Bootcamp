import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article-model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-article-details-page',
  imports: [ HttpClientModule],
  providers: [HttpClient],
  templateUrl: './article-details-page.html',
})
export class ArticleDetailsPage implements OnInit {
  article?: Article;
  url = 'http://localhost:3000/articles';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // récupérer l'ID depuis la route
    if (!id) return;

    this.http.get(`${this.url}/${id}`).subscribe((res: any) => {
      this.article = res.data; 
    });
  }
}