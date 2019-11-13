import { CreateCasualtyComponent } from './components/create-casualty/create-casualty.component';
import { CreateCaseV2Component } from './components/create-case-v2/create-case-v2.component';
import { CasesV2Component } from './components/cases-v2/cases-v2.component';
import { InjuryV2Component } from './components/injury-v2/injury-v2.component';
import { CanDeactivateGuardGuard } from './guards/can-deactivate-guard.guard';
import { CreateInjuryV2Component } from './components/create-injury-v2/create-injury-v2.component';
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
import { InjuriesV2Component } from './components/injuries-v2/injuries-v2.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { state: '0' } },
  { path: 'injuries',
    children: [
      { path: '', component: InjuriesV2Component, data: { state: '1' } },
      { path: 'create', component: CreateInjuryV2Component, canDeactivate: [CanDeactivateGuardGuard], data: { state: '2' } },
      { path: ':id',
        children: [
          { path: '', component: InjuryV2Component, data: { state: '2' } },
          { path: 'edit', component: CreateInjuryV2Component, canDeactivate: [CanDeactivateGuardGuard], data: { state: '3' } }
        ],
        data: { state: '2' }
      },
    ],
    data: { state: '1' }
  },
  { path: 'cases',
    children: [
      { path: '', component: CasesV2Component, data: { state: '1' } },
      { path: 'create', component: CreateCaseV2Component, canDeactivate: [CanDeactivateGuardGuard], data: { state: '2' } }
    ]
  },
  { path: 'create-casualty', component: CreateCasualtyComponent, canDeactivate: [CanDeactivateGuardGuard], data: { state: '1' } }
  // { path: 'injury/:id', component: InjuryV2Component, data: {state: '3'} },
  // { path: 'create-injury', component: CreateInjuryV2Component, canDeactivate: [CanDeactivateGuardGuard], data: { state: '3' } },
  // { path: 'update-injury/:id', component: CreateInjuryV2Component, canDeactivate: [CanDeactivateGuardGuard] },
  // {path: 'cases', component: CasesComponent},
  // {path: 'triage', component: TriageComponent},
  // {path: 'access-case', component: AccessCaseComponent},
  // {path: 'case/:id', component: CaseComponent},
  // {path: 'case/:id/barem/:victimId', component: BaremComponent},
  // {path: 'create-case', component: CreateCaseComponent},
  // {path: 'create-case/victims-list', component: VictimsListComponent},
  // {path: 'admin', component: AdminComponent},
  // {path: 'admin/create-case', component: AdminCreateCaseComponent},
  // {path: 'admin/create-victim', component: AdminCreateVictimComponent},
  // {path: 'admin/view', component: AdminViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
