import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article-model';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/article-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPencil, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-details-page',
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './article-details-page.html',
})
export class ArticleDetailsPage implements OnInit {
  article?: Article;
  faTrash = faTrash;
  faPencil = faPencil;
  faCartShopping = faCartShopping;

  successMessage = '';
  errorMessage = '';

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
        this.showErrorMessage('Erreur lors du chargement de l’article.');
        console.error(err);
      }
    });
  }

  deleteArticle(articleId?: string | number) {
    if (!articleId) return;

    this.articleService.deleteArticle(articleId.toString()).subscribe({
      next: () => {
        this.showSuccessMessage(`Article supprimé avec succès !`);
        setTimeout(() => {
          window.location.href = '/articles';
        }, 2000);
      },
      error: (err) => {
        this.showErrorMessage('Erreur lors de la suppression de l’article.');
        console.error(err);
      }
    });
  }

  private showSuccessMessage(message: string) {
    this.successMessage = message;
    this.errorMessage = '';
    setTimeout(() => (this.successMessage = ''), 3000);
  }

  private showErrorMessage(message: string) {
    this.errorMessage = message;
    this.successMessage = '';
    setTimeout(() => (this.errorMessage = ''), 3000);
  }
}