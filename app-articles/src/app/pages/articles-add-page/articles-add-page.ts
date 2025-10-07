import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header-component/header-component';
import { Article } from '../../models/article-model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles-add-page',
  providers: [HttpClient],
  imports: [HeaderComponent, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './articles-add-page.html',
})
export class ArticlesAddPage {
  newArticle: Article = { title: '', desc: '', price: 0, author: '', imgPath: '' };
  url = 'http://localhost:3000/articles/save';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    this.newArticle.imgPath = file.name; 
  }

  addArticle() {
    this.http.post(this.url, this.newArticle).subscribe({
      next: (response) => {
        this.showSuccessMessage('Article ajouté avec succès !');
        console.log(response);
      },
      error: (err) => {
        this.showErrorMessage("Erreur lors de l'ajout de l'article.");
        console.error(err);
      }
    });
  }

  // Méthodes pour afficher le message avec cooldown
  private showSuccessMessage(message: string) {
    this.successMessage = message;
    this.errorMessage = '';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  private showErrorMessage(message: string) {
    this.errorMessage = message;
    this.successMessage = '';
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000); 
  }

  goToArticlesList() {
    setTimeout(() => {
    window.location.href = '/articles';
    }, 2000)
  }
}