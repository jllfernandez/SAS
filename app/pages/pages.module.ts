import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// Third-party components
import { jqxComboBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxButtonGroupComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttongroup';

// Custom imports
import { CategoriasComponent } from './categorias/categorias.component';
import { CoreModule } from '@app/core';
import { DetalleEmpresaComponent } from './empresas/detalle-empresa/detalle-empresa.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { QuoteService } from '../pages/home/quote.service';
import { SharedModule } from '@app/shared';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { AlertasComponent } from './alertas/alertas.component';
import { BusquedaPortadoresComponent } from './busqueda-portadores/busqueda-portadores.component';
import { PerfilesUsuarioComponent } from './perfiles-usuario/perfiles-usuario.component';
import { JerarquiasComponent } from './zonas/jerarquias/jerarquias.component';
import { NivelesComponent } from './zonas/niveles/niveles.component';
import { MantenimientosComponent } from './zonas/mantenimientos/mantenimientos.component';
import { SensoresComponent } from './sensores/sensores.component';
import { AnalizadorEventosComponent } from './analizador-eventos/analizador-eventos.component';
import { PortadoresComponent } from './portadores/portadores.component';
import { ServidoresEventosComponent } from './servidores-eventos/servidores-eventos.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    TranslateModule,
    PagesRoutingModule
  ],
  exports: [jqxGridComponent, jqxButtonGroupComponent, UsuariosComponent, jqxComboBoxComponent],
  declarations: [
    HomeComponent,
    CategoriasComponent,
    EmpresasComponent,
    DetalleEmpresaComponent,
    NivelesComponent,
    JerarquiasComponent,
    MantenimientosComponent,
    UsuariosComponent,
    jqxGridComponent,
    jqxButtonGroupComponent,
    jqxComboBoxComponent,
    PerfilesComponent,
    AlertasComponent,
    BusquedaPortadoresComponent,
    PerfilesUsuarioComponent,
    SensoresComponent,
    AnalizadorEventosComponent,
    PortadoresComponent,
    ServidoresEventosComponent
  ],
  providers: [QuoteService]
})
export class PagesModule {}
