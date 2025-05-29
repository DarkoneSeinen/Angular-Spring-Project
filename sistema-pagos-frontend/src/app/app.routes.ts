import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { LoadEstudiantesComponent } from './load-estudiantes/load-estudiantes.component';
import { LoadPagosComponent } from './load-pagos/load-pagos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { PagosComponent } from './pagos/pagos.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminTemplateComponent,canActivate:[AuthGuard], children:
        [
            {path: 'home', component:HomeComponent},
            {path: 'profile', component: ProfileComponent},
            {path: 'login', component: LoginComponent},
            {path: 'loadEstudents', component: LoadEstudiantesComponent},
            {path: 'loadPayments', component: LoadPagosComponent},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'estudents', component: EstudiantesComponent},
            {path: 'payments', component: PagosComponent}
        ]
    },
];
