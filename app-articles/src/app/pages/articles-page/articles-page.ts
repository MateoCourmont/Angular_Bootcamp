import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header-component/header-component';
import { Article } from '../../models/article-model';
import { ArticleService } from '../../services/article-service';

@Component({
  selector: 'app-articles-page',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './articles-page.html',
})
export class ArticlesPage implements OnInit {
  articles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des articles :', err);
      }
    });
  }

  goToArticleDetail(articleId: number | undefined) {
    if (!articleId) return;
    this.router.navigate(['/articles', articleId]);
  }
}