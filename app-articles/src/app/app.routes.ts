import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { ForgotPasswordPage } from './pages/forgot-password-page/forgot-password-page';
import { ArticlesPage } from './pages/articles-page/articles-page';
import { ArticlesAddPage } from './pages/articles-add-page/articles-add-page';
import { ArticleDetailsPage } from './pages/article-details-page/article-details-page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login', 
        component: LoginPage,
    },
    {
        path: 'register', 
        component: RegisterPage
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordPage
    },
    {
        path: 'articles',
        component: ArticlesPage,
        canActivate: [authGuard]
    },
    {
        path: 'article-add',
        component: ArticlesAddPage,
        canActivate: [authGuard]
    },
    { 
        path: 'articles/edit/:id', 
        component: ArticlesAddPage,
        canActivate: [authGuard]
    },
    {
        path: 'articles/:id',
        component: ArticleDetailsPage,
        canActivate: [authGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }