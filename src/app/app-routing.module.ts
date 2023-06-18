import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'',
component: HomeComponent},
{path:'profiles',
component: ProfilesComponent, canActivate:[AuthGuard],},
{path:'profile', component:ProfileComponent,canActivate:[AuthGuard]},
{path:'profile/:id', component:ProfileComponent,canActivate:[AuthGuard]},
{path:'posts', component:PostsComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
