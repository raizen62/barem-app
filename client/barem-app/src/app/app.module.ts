import { InjuryService } from './services/injury.service';
import { ManeuverService } from './services/maneuver.service';
import { VictimService } from './services/victim.service';
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
  MatChipsModule
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
import { InjuryComponent } from './components/barem/injury/injury.component';
import { ManeuverComponent } from './components/barem/injury/maneuver/maneuver.component';
import { CasualtyCardComponent } from './components/casualty-card/casualty-card.component';
import { TriageComponent } from './components/triage/triage.component';


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
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    CaseService,
    VictimService,
    InjuryService,
    ManeuverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
