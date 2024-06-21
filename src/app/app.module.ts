import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseResultsComponent } from './course-results/course-results.component';
import { HttpClientModule } from '@angular/common/http'; 
import { CourseResultService } from './course-result.service';
import { FilteredResultsComponent } from './filtered-results/filtered-results.component';


@NgModule({
  declarations: [
    AppComponent,
    CourseFormComponent,
    CourseResultsComponent,
    FilteredResultsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CourseResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
