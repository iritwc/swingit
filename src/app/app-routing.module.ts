import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import  { SearchCoursesComponent } from './search-courses/search-courses.component';

const routes: Routes = [
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: 'courses', component: CoursesComponent, pathMatch: 'full' },
    // { path: 'detail/:id', component: HeroDetailComponent },
    { path: 'courses/search', component: SearchCoursesComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
