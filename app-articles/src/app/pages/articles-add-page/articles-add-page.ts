import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../components/header-component/header-component';
import { Article } from '../../models/article-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/article-service';

@Component({
  selector: 'app-articles-add-page',
  imports: [HeaderComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './articles-add-page.html',
})
export class ArticlesAddPage {
  newArticle: Article = { title: '', desc: '', price: 0, author: '', imgPath: '' };
  selectedFile?: File;
  successMessage: string = '';
  errorMessage: string = '';
  isEditMode: boolean = false;
  articleId?: string;

  constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Vérifie s’il y a un ID dans l’URL
    this.articleId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.articleId) {
      this.isEditMode = true;
      // Charger l’article pour préremplir le formulaire
      this.articleService.getArticleById(this.articleId).subscribe({
        next: (article) => (this.newArticle = article),
        error: (err) => console.error('Erreur chargement article :', err),
      });
    }
  }

  // Stocker le fichier sélectionné
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.selectedFile = input.files[0];
  }

  // Ajouter ou modifier un article avec FormData pour gérer l’image
  saveArticle() {
    const formData = new FormData();
    if (this.isEditMode && this.articleId) {
      formData.append('id', this.articleId);
    }
    formData.append('title', this.newArticle.title);
    formData.append('desc', this.newArticle.desc);
    formData.append('price', this.newArticle.price.toString());
    formData.append('author', this.newArticle.author);

    // Ajouter le fichier si présent
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    this.articleService.addArticle(formData).subscribe({
      next: (response: any) => {
        this.showSuccessMessage(this.isEditMode ? 'Article modifié avec succès !' : 'Article ajouté avec succès !');
        console.log('Article complet reçu :', response.data);
        setTimeout(() => this.router.navigate(['/articles']), 2000);
      },
      error: (err) => {
        this.showErrorMessage("Erreur lors de l'ajout de l'article.");
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