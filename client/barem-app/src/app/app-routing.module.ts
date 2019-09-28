import { InjuriesComponent } from './components/injuries/injuries.component';
import { CreateInjuryComponent } from './components/create-injury/create-injury.component';
import { TriageComponent } from './components/triage/triage.component';
import { AccessCaseComponent } from './components/access-case/access-case.component';
import { CaseComponent } from './components/case/case.component';
import { CreateCaseComponent } from './components/create-case/create-case.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './components/admin/admin.component';
import {AdminCreateCaseComponent} from './components/admin/admin-create-case/admin-create-case.component';
import {AdminCreateVictimComponent} from './components/admin/admin-create-victim/admin-create-victim.component';
import { VictimsListComponent } from './components/victims-list/victims-list.component';
import { BaremComponent } from './components/barem/barem.component';
import { AdminViewComponent } from './components/admin/admin-view/admin-view.component';
import { CasesComponent } from './components/cases/cases.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'injuries', component: InjuriesComponent},
  {path: 'create-injury', component: CreateInjuryComponent},
  {path: 'cases', component: CasesComponent},
  {path: 'triage', component: TriageComponent},
  {path: 'access-case', component: AccessCaseComponent},
  {path: 'case/:id', component: CaseComponent},
  {path: 'case/:id/barem/:victimId', component: BaremComponent},
  {path: 'create-case', component: CreateCaseComponent},
  {path: 'create-case/victims-list', component: VictimsListComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/create-case', component: AdminCreateCaseComponent},
  {path: 'admin/create-victim', component: AdminCreateVictimComponent},
  {path: 'admin/view', component: AdminViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
