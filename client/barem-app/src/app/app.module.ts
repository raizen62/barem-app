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
  MatSnackBarModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateCaseComponent } from './components/create-case/create-case.component';
import { HttpClientModule } from '@angular/common/http';
import {AdminComponent} from './components/admin/admin.component';
import {AdminCreateVictimComponent} from './components/admin/admin-create-victim/admin-create-victim.component';
import {AdminCreateCaseComponent} from './components/admin/admin-create-case/admin-create-case.component';
import {AdminNavbarComponent} from './components/admin/admin-navbar/admin-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateCaseComponent,
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
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [CaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
