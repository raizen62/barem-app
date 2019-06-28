import { CaseService } from 'src/app/services/case.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatSelectModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateCaseComponent } from './components/create-case/create-case.component';
import { HttpClientModule } from '@angular/common/http';
import { VictimsListComponent } from './components/victims-list/victims-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateCaseComponent,
    VictimsListComponent
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
    MatCardModule,
    MatListModule
  ],
  providers: [
    CaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
