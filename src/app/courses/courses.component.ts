import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../courses.model';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent implements OnInit {

    courses = [];
    selectedCourse: Course;
    state = {
        selected: [],
        communities: [
            { id: 'telaviv', checked: false, value: 'Tel Aviv' },
            { id: 'haifa', checked: false, value: 'Haifa' },
            { id: 'jerusalem', checked: false, value: 'Jerusalem' },
            { id: 'ramatgan', checked: false, value: 'Ramat Gan' }
        ]
    };

    constructor(private courseService: CourseService) { }

    ngOnInit() {
        // this.onChange(this.state.telaviv);
        this.getCourses();
    }

    private getCourses() {

        this.courseService.get(this.state.selected).subscribe(crss => {
            this.courses = crss;
        });
    }

    onSelect(course) {
        this.selectedCourse = course;
    }

    onChange(state) {
        state.checked = !state.checked;
        const filters = [];
        this.state.communities.forEach(s => {
            if (s.checked) {
                filters.push(s.value);
            }
        });
        this.state.selected = filters;
        this.getCourses();
    }
}
