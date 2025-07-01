import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ReporteComponent } from './pages/ordenes-de-compra/reporte.component';
import { RecibosComponent } from './pages/recibos/recibos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'app', component: LayoutComponent, children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'recibos', component: RecibosComponent },
        { path: 'reporte', component: ReporteComponent },
        { path: 'perfil', component: PerfilComponent },
    ]},
    { path: '**', redirectTo: '' }
];
