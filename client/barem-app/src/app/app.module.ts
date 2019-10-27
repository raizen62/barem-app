import { CasualtyService } from './services/casualty.service';
import { InjuryService } from './services/injury.service';
import { ManeuverService } from './services/maneuver.service';
import { CaseService } from 'src/app/services/case.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatSnackBarModule,
  MatCardModule,
  MatListModule,
  MatTreeModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatTabsModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatSidenavModule,
  MatRippleModule,
  MatMenuModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateCaseComponent } from './components/create-case/create-case.component';
import { HttpClientModule } from '@angular/common/http';
import { VictimsListComponent } from './components/victims-list/victims-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminCreateVictimComponent } from './components/admin/admin-create-victim/admin-create-victim.component';
import { AdminCreateCaseComponent } from './components/admin/admin-create-case/admin-create-case.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CaseComponent } from './components/case/case.component';
import { AccessCaseComponent } from './components/access-case/access-case.component';
import { CaseCodeComponent } from './components/case-code/case-code.component';
import { BaremComponent } from './components/barem/barem.component';
import { InjuriesToStringPipe } from './pipes/injuries-to-string.pipe';
import { ManeuverComponent } from './components/barem/injury/maneuver/maneuver.component';
import { CasualtyCardComponent } from './components/casualty-card/casualty-card.component';
import { TriageComponent } from './components/triage/triage.component';
import {AdminViewComponent} from './components/admin/admin-view/admin-view.component';
import {AdminViewCasesComponent} from './components/admin/admin-view/admin-view-cases/admin-view-cases.component';
import {AdminViewCasualtiesComponent} from './components/admin/admin-view/admin-view-casualties/admin-view-casualties.component';
import {AdminViewInjuriesComponent} from './components/admin/admin-view/admin-view-injuries/admin-view-injuries.component';
import {CaseCardComponent} from './components/case-card/case-card.component';
import {InjuriesCardComponent} from './components/injuries-card/injuries-card.component';
import { CasesComponent } from './components/cases/cases.component';
import { CreateInjuryComponent } from './components/create-injury/create-injury.component';
import { AddManeuverComponent } from './components/add-maneuver/add-maneuver.component';
import { ManeuverListItemComponent } from './components/maneuver-list-item/maneuver-list-item.component';
import { DialogAddScoreComponent } from './components/dialog-add-score/dialog-add-score.component';
import { InjuriesComponent } from './components/injuries/injuries.component';
import { InjuryListItemComponent } from './components/injury-list-item/injury-list-item.component';
import { InjuryComponent } from './components/injury/injury.component';
import { BaremInjuryComponent } from './components/barem-injury/barem-injury.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CreateInjuryV2Component } from './components/create-injury-v2/create-injury-v2.component';
import { InjuriesV2Component } from './components/injuries-v2/injuries-v2.component';
import { InjuryV2Component } from './components/injury-v2/injury-v2.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateCaseComponent,
    VictimsListComponent,
    AdminComponent,
    AdminCreateVictimComponent,
    AdminCreateCaseComponent,
    AdminNavbarComponent,
    CaseComponent,
    AccessCaseComponent,
    CaseCodeComponent,
    BaremComponent,
    InjuriesToStringPipe,
    InjuryComponent,
    ManeuverComponent,
    CasualtyCardComponent,
    TriageComponent,
    AdminViewComponent,
    AdminViewCasesComponent,
    AdminViewCasualtiesComponent,
    AdminViewInjuriesComponent,
    CaseCardComponent,
    InjuriesCardComponent,
    CasesComponent,
    CreateInjuryComponent,
    AddManeuverComponent,
    ManeuverListItemComponent,
    DialogAddScoreComponent,
    InjuriesComponent,
    InjuryListItemComponent,
    BaremInjuryComponent,
    ConfirmationDialogComponent,
    CreateInjuryV2Component,
    InjuriesV2Component,
    InjuryV2Component
  ],
  entryComponents: [
    AddManeuverComponent,
    DialogAddScoreComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatTreeModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTabsModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatSidenavModule,
    MatRippleModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    CaseService,
    CasualtyService,
    InjuryService,
    ManeuverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
