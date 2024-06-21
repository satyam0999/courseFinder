


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  angForm: FormGroup;
  loading = false;
  courseResults: any;

  // private apiUrl = 'http://localhost:5000/'; 
  private apiUrl = 'https://mydreamuniversity.in/'

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.angForm = this.fb.group({
      question: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const question = this.angForm.get('question')?.value;
    if (question) {
      this.loading = true;
      this.http.post(`${this.apiUrl}/chat`, { question }).subscribe(
        (response: any) => {
          const chatResponse = response.response;
          this.http.post(`${this.apiUrl}/response`, { response: chatResponse }).subscribe(
            data => {
              this.loading = false;
              this.courseResults = data;
            },
            error => {
              this.loading = false;
              console.error('Error sending response:', error);
            }
          );
        },
        error => {
          this.loading = false;
          console.error('Error sending question:', error);
        }
      );
    }
  }
}
