import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CourseResultService {

  baseUrl:string = "https://mydreamuniversity.in/"


  constructor(private HttpClient: HttpClient) { }

  public userData(domain:any, studyLevel:any, degree:any, test_type:any, test_score:any){
    return this.HttpClient.post<any>(this.baseUrl+ 'data',
      {domain, studyLevel, degree, test_type, test_score})
      .pipe(map(inputData => { 
        return inputData;

      })
    )
     
  }
  
  getCourses(formData: any) {
    return this.HttpClient.post<any>('https://mydreamuniversity.in/', formData); // Replace URL
  }


//   public userData(domain: any, studyLevel: any, degree: any, test_type: any, test_score: any) {
//     return this.HttpClient.post<any>(this.baseUrl + 'api/data', // Update endpoint URL
//       { domain, studyLevel, degree, test_type, test_score });
//  }
}
