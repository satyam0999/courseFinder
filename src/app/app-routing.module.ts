import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseResultsComponent } from './course-results/course-results.component';
import { FilteredResultsComponent } from './filtered-results/filtered-results.component';

const routes: Routes = [
  { path:"", component:CourseFormComponent },
  { path:"course-results", component:CourseResultsComponent},
  { path: 'filtered-results', component: FilteredResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
