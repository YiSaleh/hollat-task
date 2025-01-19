import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
          import('./auth/components/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/components/signup/signup.component').then(
            (c) => c.SignupComponent
          ),
      },
      {
        path: 'list-beneficiaries',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import('./pages/list-beneficiaries/list-beneficiaries.component').then(
            (c) => c.ListBeneficiariesComponent
          ),
      },     {
        path: 'view',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import('./pages/view-beneficiary/view-beneficiary.component').then(
            (c) => c.ViewBeneficiaryComponent
          ),
      },
];
