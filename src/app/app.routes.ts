import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { RecibosComponent } from './pages/recibos/recibos.component';
import { ListaRecibosComponent } from './pages/recibos/lista-recibos/lista-recibos.component';
import { DetalleReciboComponent } from './pages/recibos/detalle-recibo/detalle-recibo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'app', component: LayoutComponent, canActivate: [AuthGuard], children: [
        { path: '', redirectTo: 'recibos', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
        { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
        { path: 'recibos', component: RecibosComponent, canActivate: [AuthGuard], children: [
            { path: '', component: ListaRecibosComponent },
            { path: ':id', component: DetalleReciboComponent }
        ]},
        { path: 'reporte', component: ReporteComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
        { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    ]},
    { path: '**', redirectTo: '' }
];
