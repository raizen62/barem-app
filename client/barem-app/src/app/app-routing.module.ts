import { CreateCaseComponent } from './components/create-case/create-case.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VictimsListComponent } from './components/victims-list/victims-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-case', component: CreateCaseComponent },
  { path: 'create-case/victims-list', component: VictimsListComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
