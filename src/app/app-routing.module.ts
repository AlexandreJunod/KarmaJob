import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'profile/:id', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'my-jobs/:id', loadChildren: './my-jobs/my-jobs.module#MyJobsPageModule' },
  { path: 'their-jobs/:id', loadChildren: './their-jobs/their-jobs.module#TheirJobsPageModule' },
  { path: 'free-jobs/:id', loadChildren: './free-jobs/free-jobs.module#FreeJobsPageModule' },
  { path: 'job-details/:id', loadChildren: './job-details/job-details.module#JobDetailsPageModule' },
  { path: 'users/:id', loadChildren: './users/users.module#UsersPageModule' },
  { path: 'user-details/:id', loadChildren: './user-details/user-details.module#UserDetailsPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
