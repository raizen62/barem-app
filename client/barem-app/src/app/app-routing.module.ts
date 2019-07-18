import { CreateCaseComponent } from './components/create-case/create-case.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './components/admin/admin.component';
import {AdminCreateCaseComponent} from './components/admin/admin-create-case/admin-create-case.component';
import {AdminCreateVictimComponent} from './components/admin/admin-create-victim/admin-create-victim.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create-case', component: CreateCaseComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/create-case', component: AdminCreateCaseComponent},
  {path: 'admin/create-victim', component: AdminCreateVictimComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
