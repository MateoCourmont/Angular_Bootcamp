import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { ForgotPasswordPage } from './pages/forgot-password-page/forgot-password-page';
import { ArticlesPage } from './pages/articles-page/articles-page';
import { ArticlesAddPage } from './pages/articles-add-page/articles-add-page';
import { ArticleDetailsPage } from './pages/article-details-page/article-details-page';

export const routes: Routes = [
    {
        path: 'login', 
        component: LoginPage,
    },
    {
        path: 'register', 
        component: RegisterPage
    },
    {
        path: 'password/forgot',
        component: ForgotPasswordPage
    },
    {
        path: 'articles',
        component: ArticlesPage
    },
    {
        path: 'article-add',
        component: ArticlesAddPage
    },
    {
        path: 'articles/:id',
        component: ArticleDetailsPage
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }