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
import { AuthorizationGuard } from './guards/authorization.guard';
import { EstudianteDetailsComponent } from './estudiante-details/estudiante-details.component';
import { NewPagoComponent } from './new-pago/new-pago.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminTemplateComponent, canActivate: [AuthGuard], children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: HomeComponent},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'estudiantes', component: EstudiantesComponent},
        {path: 'estudiantes/:codigo', component: EstudianteDetailsComponent},
        {path: 'pagos', component: PagosComponent},
        {path: 'new-pago/:codigoEstudiante', component: NewPagoComponent},
        {path: 'load-estudiantes', component: LoadEstudiantesComponent},
        {path: 'load-pagos', component: LoadPagosComponent},
        {path: 'profile', component: ProfileComponent}
    ]},
];
