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

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'app', component: LayoutComponent, children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'recibos', component: RecibosComponent, children: [
            { path: '', component: ListaRecibosComponent },
            { path: ':id', component: DetalleReciboComponent }
        ]},
        { path: 'reporte', component: ReporteComponent },
        { path: 'perfil', component: PerfilComponent },
    ]},
    { path: '**', redirectTo: '' }
];
