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
  MatListModule
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateCaseComponent,
    VictimsListComponent,
    AdminComponent,
    AdminCreateVictimComponent,
    AdminCreateCaseComponent,
    AdminNavbarComponent
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
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    CaseService,
    VictimService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
