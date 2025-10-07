import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../components/header-component/header-component';
import { Router } from '@angular/router';
import { Article } from '../../models/article-model';

@Component({
  selector: 'app-articles-page',
  imports: [CommonModule, HeaderComponent, HttpClientModule],
  templateUrl: './articles-page.html',
})

export class ArticlesPage implements OnInit {
  articles: Article[] = [];
  url = 'http://localhost:3000/articles';

  constructor(private httpClient: HttpClient, private router: Router) {}


  ngOnInit() {
    this.httpClient.get(this.url).subscribe({
      next: (data: any) => {
      console.log(data);
      this.articles = data.data; 
      }
    });
  }

 goToArticleDetail(articleId: number | undefined) {
    if (!articleId) return;
    console.log('ID de l’article cliqué:', articleId);
    // Rediriger vers la page de détail de l’article
    this.router.navigate(['/articles', articleId]);
  }
}
