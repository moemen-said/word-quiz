import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: HomeComponent ,data:{animationState:'home'}},
  { path: 'quiz', component: QuizComponent ,data:{animationState:'quiz'} },
  { path: 'result', component: ResultComponent ,data:{animationState:'result'} },
  { path: '**', component: NotFoundComponent ,data:{animationState:'notFound'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
