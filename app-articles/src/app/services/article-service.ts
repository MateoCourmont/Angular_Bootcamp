import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = 'http://localhost:3000/articles';

  constructor(private http: HttpClient) {}

private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
}

  // Ajouter un article
addArticle(article: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/save`, article, { headers: this.getAuthHeaders() });
}

getArticleById(id: string): Observable<Article> {
  return this.http.get<{ code: string, data: Article, message: string }>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() })
    .pipe(
      map(response => response.data)
    );
}

getArticles(): Observable<Article[]> {
  return this.http.get<{ data: Article[] }>(this.baseUrl, { headers: this.getAuthHeaders() })
    .pipe(map(response => response.data));
}

deleteArticle(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

}