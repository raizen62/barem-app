import { CaseService } from 'src/app/services/case.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatSelectModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateCaseComponent } from './components/create-case/create-case.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateCaseComponent
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
  ],
  providers: [
    CaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
