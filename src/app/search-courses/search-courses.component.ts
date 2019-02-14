import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../courses.model';
import { Observable, Subject } from 'rxjs';
import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';



@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.less']
})
export class SearchCoursesComponent implements OnInit {

    courses$: Observable<Course[]>;
    private searchTerms = new Subject<string>();
    private community;

    constructor(private courseService: CourseService) { }

    ngOnInit() {
        this.courses$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.courseService.searchCourses(term)), //, {community: this.community})),
        );
    }

    search(term): void {
        console.log('Search', term);
        this.searchTerms.next(term);
    }

}
