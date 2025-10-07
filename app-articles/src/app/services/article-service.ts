import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = 'http://localhost:3000/articles';

  constructor(private http: HttpClient) {}

  // Ajouter un article
  addArticle(article: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, article);
  }

  getArticleById(id: string): Observable<Article> {
  return this.http.get<{ code: string, data: Article, message: string }>(`${this.baseUrl}/${id}`)
    .pipe(
      map(response => response.data)
    );
}

getArticles(): Observable<Article[]> {
  return this.http.get<{ data: Article[] }>(this.baseUrl)
    .pipe(map(response => response.data));
}

deleteArticle(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}