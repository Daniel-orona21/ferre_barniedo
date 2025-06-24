import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RolesYPermisosComponent } from './pages/roles-y-permisos/roles-y-permisos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { TiposDeClientesComponent } from './pages/tipos-de-clientes/tipos-de-clientes.component';
import { AseguradorasComponent } from './pages/aseguradoras/aseguradoras.component';
import { RefaccioensComponent } from './pages/refaccioens/refaccioens.component';
import { AlmacenenComponent } from './pages/almacenen/almacenen.component';
import { AlmacenenEnProcesoComponent } from './pages/almacenen-en-proceso/almacenen-en-proceso.component';
import { AnaquelComponent } from './pages/anaquel/anaquel.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { OrdenesDeCompraComponent } from './pages/ordenes-de-compra/ordenes-de-compra.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { CreditoComponent } from './pages/credito/credito.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'app', component: LayoutComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'roles-y-permisos', component: RolesYPermisosComponent },
        { path: 'roles-y-permisos/crear', loadComponent: () => import('./pages/roles-y-permisos/crear-rol/crear-rol.component').then(m => m.CrearRolComponent) },
        { path: 'clientes', component: ClientesComponent },
        { path: 'tipos-de-clientes', component: TiposDeClientesComponent },
        { path: 'aseguradoras', component: AseguradorasComponent },
        { path: 'refacciones', component: RefaccioensComponent },
        { path: 'almacenes', component: AlmacenenComponent },
        { path: 'almacen-en-proceso', component: AlmacenenEnProcesoComponent },
        { path: 'anaquel', component: AnaquelComponent },
        { path: 'proveedores', component: ProveedoresComponent },
        { path: 'ordenes', component: OrdenesDeCompraComponent },
        { path: 'ventas', component: VentasComponent },
        { path: 'credito', component: CreditoComponent },
        { path: 'reportes', component: ReportesComponent },
    ]},
    { path: '**', redirectTo: '' }
];
