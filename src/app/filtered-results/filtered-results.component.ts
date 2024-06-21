import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface Course {
  university: string;
  course: string;
  duration: string;
  yearlytuitionfees: number;
  toefl_score: number;
  ielts_score: number;
  website: string;
  scholarship: string;
}

interface FilteredRecommendations {
  ambitious: Course[];
  moderate: Course[];
  safe: Course[];
}

@Component({
  selector: 'app-filtered-results',
  templateUrl: './filtered-results.component.html',
  styleUrls: ['./filtered-results.component.scss']
})
export class FilteredResultsComponent implements OnInit {
  showMoreSafe = false;
  showMoreModerate = false;
  showMoreAmbitious = false;

  filteredRecommendations: FilteredRecommendations = {
    ambitious: [],
    moderate: [],
    safe: []
  };

  showJobsPopup = false;  
  courseTitle: string = '';     
  universityName: string = ''; 
  jobsData: any;
  jobSource: string = '';

  constructor(private router: Router, private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    this.filteredRecommendations = navigation?.extras?.state?.['filteredRecommendations'] || {
      ambitious: [],
      moderate: [],
      safe: []
    };
  }

  ngOnInit(): void {
    console.log('Filtered Recommendations:', this.filteredRecommendations);
  }

  closeJobsPopup() {
    this.jobsData = [];
    this.jobSource = '';
    this.showJobsPopup = false;
  }

  openJobsPopup(university: string, course: string) {
    this.showJobsPopup = true;
    this.courseTitle = course;
    this.universityName = university;
    
    const jobData = {
      university: university,
      course: course
    };

    // this.http.post<any>('http://localhost:5000/jobs', jobData).subscribe(
    this.http.post<any>('https://mydreamuniversity.in/jobs', jobData).subscribe(
      (response: any) => {
        if (response) {
          const jobs = JSON.parse(response);
          this.jobsData = jobs.filter((job: any) => job.jobTitle);
          const sourceObject = jobs.find((job: any) => job.Source);
          this.jobSource = sourceObject ? sourceObject.Source : '';
        } else {
          console.error('Unexpected response format from jobs endpoint');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Failed to post job data:', error);
      }
    );
  }
}
