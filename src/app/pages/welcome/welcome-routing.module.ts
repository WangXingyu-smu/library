import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { BooksComponent } from '../pages/books/books.component';
import { AddbooksComponent } from '../pages/addbooks/addbooks.component';
import { BookinfoComponent } from '../pages/bookinfo/bookinfo.component';
const routes: Routes = [
  { path: '', component: WelcomeComponent ,
children:[
    { path: 'books', component: BooksComponent},
    { path: 'booksposition', component: AddbooksComponent},
    { path: 'bookinfo', component: BookinfoComponent}, ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
