import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article-model';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/article-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article-details-page',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './article-details-page.html',
})
export class ArticleDetailsPage implements OnInit {
  article?: Article;
  faTrash = faTrash;
  faPencil = faPencil;
  faCartShopping = faCartShopping;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.articleService.getArticleById(id).subscribe({
      next: (article) => {
        this.article = article;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l’article :', err);
      }
    });
  }

  deleteArticle(articleId?: string | number) {
  if (!articleId) return;

  this.articleService.deleteArticle(articleId.toString()).subscribe({
    next: () => {
      console.log(`Article ${articleId} supprimé !`);
      window.location.href = '/articles';
    },
    error: (err) => console.error('Erreur suppression article:', err)
  });
}
}