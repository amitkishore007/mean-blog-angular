import { LoginComponent } from './auth/login/login.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { SignupComponent } from './auth/signup/signup.component';

const appRoutes:Routes = [
    {path:'',component:PostListComponent},
    {path:'posts/add', component:PostCreateComponent},
    {path:'posts/edit/:id', component:PostCreateComponent},
    {path:'login', component:LoginComponent},
    {path:'signup', component: SignupComponent}
];
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ],
})
export class AppRoutingModule {

}