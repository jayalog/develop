import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard } from './authguard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'forgot-password',
    loadChildren: 'app/pages/forgot-password/forgot-password.module#ForgotPasswordModule'
  },
  {
    path: 'reset-password',
    loadChildren: 'app/pages/reset-password/reset-password.module#ResetPasswordModule'
  },
  {
    path: 'verify',
    loadChildren: 'app/pages/verify/verify.module#VerifyModule'
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: 'app/pages/profile/profile.module#ProfileModule'
      },
      {
        path: 'portfolio',
        loadChildren: 'app/pages/portfolio/portfolio.module#PortfolioModule',
        pathMatch: 'full'
      },
      {
        path: 'jobs',
        loadChildren: 'app/pages/jobs/jobs.module#JobsModule'
      },
      {
        path: 'projects',
        loadChildren: 'app/pages/projects/projects.module#ProjectsModule'
      },
      {
        path: '**',
        loadChildren: 'app/pages/notfound/notfound.module#NotfoundModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule {
}
