import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  constructor(private articleService: ArticleService) {}

  // Stocker le fichier sélectionné
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.selectedFile = input.files[0];
  }

  // Ajouter un article avec FormData
  addArticle() {
    const formData = new FormData();
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
        this.showSuccessMessage('Article ajouté avec succès !');
        console.log('Article complet reçu :', response.data);
        // Naviguer vers la liste ou la page détail si besoin
        // this.goToArticlesList();
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

  goToArticlesList() {
    setTimeout(() => {
      window.location.href = '/articles';
    }, 2000);
  }
}