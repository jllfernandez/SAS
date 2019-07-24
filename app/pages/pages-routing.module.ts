import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertasComponent } from '@app/pages/alertas/alertas.component';
import { BusquedaPortadoresComponent } from './busqueda-portadores/busqueda-portadores.component';
import { CategoriasComponent } from '@app/pages/categorias/categorias.component';
import { EmpresasComponent } from '@app/pages/empresas/empresas.component';
import { HomeComponent } from './home/home.component';
import { Shell } from '@app/shared/shell/shell.service';
import { UsuariosComponent } from '@app/pages/usuarios/usuarios.component';
import { PerfilesComponent } from '@app/pages/perfiles/perfiles.component';
import { PerfilesUsuarioComponent } from './perfiles-usuario/perfiles-usuario.component';
import { JerarquiasComponent } from '@app/pages/zonas/jerarquias/jerarquias.component';
import { NivelesComponent } from '@app/pages/zonas/niveles/niveles.component';
import { MantenimientosComponent } from '@app/pages/zonas/mantenimientos/mantenimientos.component';
import { SensoresComponent } from './sensores/sensores.component';
import { AnalizadorEventosComponent } from './analizador-eventos/analizador-eventos.component';
import { PortadoresComponent } from './portadores/portadores.component';
import { ServidoresEventosComponent } from '@app/pages/servidores-eventos/servidores-eventos.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: '' } },
    { path: 'usuarios', component: UsuariosComponent, data: { title: 'Usuarios' } },
    { path: 'empresas', component: EmpresasComponent, data: { title: 'Empresas' } },
    { path: 'categorias', component: CategoriasComponent, data: { title: 'Categorias' } },
    { path: 'zonasJerarquias', component: JerarquiasComponent, data: { title: 'Consulta Jerarquica de Zonas' } },
    { path: 'zonasNiveles', component: NivelesComponent, data: { title: 'Consulta de Zonas por Niveles' } },
    { path: 'zonasMantenimiento/:role', component: MantenimientosComponent, data: { title: 'Mantenimiento de Zonas' } },
    { path: 'perfiles', component: PerfilesComponent, data: { title: 'Perfiles' } },
    { path: 'alertas', component: AlertasComponent, data: { title: 'Alertas' } },
    { path: 'perfiles-usuario', component: PerfilesUsuarioComponent, data: { title: 'Perfiles de Usuario' } },
    { path: 'busqueda-portadores', component: BusquedaPortadoresComponent, data: { title: 'Buscar Portadores' } },
    { path: 'analizador-eventos', component: AnalizadorEventosComponent, data: { title: 'Analizadores de Eventos' } },
    { path: 'portadores', component: PortadoresComponent, data: { title: 'Alta de Portador' } },
    { path: 'portadores/:id', component: PortadoresComponent, data: { title: 'Detalle de Portador' } },
    { path: 'sensores', component: SensoresComponent, data: { title: 'Sensores' } },
    { path: 'servidoresEventos', component: ServidoresEventosComponent, data: { title: 'Servidores de Eventos' } }
  ])
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class PagesRoutingModule {}
