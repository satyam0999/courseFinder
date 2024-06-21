import { TestBed } from '@angular/core/testing';

import { CourseResultService } from './course-result.service';

describe('CourseResultService', () => {
  let service: CourseResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
