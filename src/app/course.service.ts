import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Course } from './courses.model';
import { ALL_COURSES } from '../assets/courses.mock';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

    private coursesUrl = 'https://hll-registration-2.appspot.com/api/types/course-occ/instances';
    constructor(private http: HttpClient) { }

    get(communities: any = null): Observable<Course[]> {

        return of(ALL_COURSES.courseOccurrences as Course[])
          .pipe(
            tap(_ => console.log('Fetched Courses')),
            map(courses => {
              if (communities.length > 0) {
                return courses.filter(course => communities.indexOf(course.community) > -1);
              }
              return courses;
            }),
            catchError(this.handleError('GET Courses', []))
          );

        // return this.http.get<any>(this.coursesUrl)
        //     .pipe(
        //         map(coursesObj => coursesObj.courseOccurrences),
        //         tap(_ => console.log('Fetched Courses')),
        //         map(courses => {
        //             if (communities.length > 0) {
        //                 return courses.filter(course => communities.indexOf(course.community) > -1);
        //             }
        //             return courses;
        //         }),
        //         catchError(this.handleError('GET Courses', []))
        //     );
    }

    searchCourses(term: string): Observable<Course[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<any>(this.coursesUrl) // of(ALL_COURSES.courseOccurrences as Course[])
            .pipe(
                map(coursesObj => coursesObj.courseOccurrences),
                map(courses => courses.filter(crs => crs.name.toLowerCase().includes(term))),
                tap(_ => console.log(`found courses matching "${term}" #${_.length}`)),
                catchError(this.handleError<Course[]>('Search Courses', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
