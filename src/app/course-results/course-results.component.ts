import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseResultService } from '../course-result.service';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http'; 

interface Job {
  title: string;
  salary: string; 
}

function isJobArray(response: HttpResponse<any>): response is HttpResponse<Job[]> {
  return Array.isArray(response.body); 
}

@Component({
  selector: 'app-course-results',
  templateUrl: './course-results.component.html',
  styleUrls: ['./course-results.component.scss'],
})

export class CourseResultsComponent implements OnInit {
  showButton = true;
  @Input() config: any;
  @Input() formData: any;
  buttonColor = 'blue';

  showJobsPopup = false;  
  courseTitle: string;     
  universityName: string; 
  jobsData : any
  jobSource: string = '';

  showFilterPopup = false;
  filterForm: FormGroup;

  filteredRecommendations = {
    ambitious: [],
    moderate: [],
    safe: []
  };

  constructor(
    private courseResultService: CourseResultService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.showJobsPopup = false;
    this.courseTitle = ''; 
    this.universityName = '';
    this.filterForm = this.fb.group({
      toefl: [''],
      ielts: [''],
      max_fee: [''],
      scholarship: ['']
    });
  }

  ngOnInit() {
  
  }


  fetchRelatedCourses(formData: FormData) {
    
    // this.http.post<any>('http://localhost:5000/related-courses', formData)
    this.http.post<any>('https://mydreamuniversity.in/related-courses', formData)
      .subscribe(
        (response: HttpResponse<any>) => {
          console.log('Related courses:', response);
          this.config = response; 
          
        },
        (error: HttpErrorResponse) => {
          
          console.error('Failed to fetch related courses:', error);
        }
      );
      this.changeButtonColor(); 
    setTimeout(() => {
      this.hideButton();
    }, 7000); 
  }

  changeButtonColor() {
    this.buttonColor = 'grey'; 
  }
  
  getButtonColor() {
    return this.buttonColor; 
  }
  
  hideButton() {
    
    this.showButton = false;
  }

  //jobs popup functionality
  closeJobsPopup() {
    this.jobsData = [];
    this.jobSource = '';
    this.showJobsPopup = false;
  }

  // scrollToTop() {
  //   window.scrollTo(0, 0);
  // }
  
  
  openJobsPopup(university:string, course: string) {
    this.showJobsPopup = true;
    this.courseTitle = course;
    this.universityName = university;
    
    
    const jobData = {
      university: university,
      course: course
    };

    // this.http.post<any>('http://localhost:5000/jobs',jobData).subscribe((response: any) => {
      this.http.post<any>('https://mydreamuniversity.in/jobs',jobData).subscribe((response: any) => {
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


  // Filter functionality
  openFilterPopup() {
    this.showFilterPopup = true;
  }

  closeFilterPopup() {
    this.showFilterPopup = false;
  }

  applyFilter() {
    const filterData = {
      ...this.filterForm.value,
      results_from_main: this.config // Include the course results data
    };
    
    // this.http.post<any>('http://localhost:5000/filter', filterData).subscribe(
    this.http.post<any>('https://mydreamuniversity.in/filter', filterData).subscribe(
      
      (response: any) => {
        console.log('Filtered results:', response);
        this.router.navigate(['/filtered-results'], { state: { filteredRecommendations: response } });
        this.closeFilterPopup();
      },
      (error: HttpErrorResponse) => {
        console.error('Failed to apply filter:', error);
      }
    );
  }
}

