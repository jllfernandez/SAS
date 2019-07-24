import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoaderComponent } from './components/loader/loader.component';

// @todo crear un modulo en components para realizar los imports y llamarlo
import { ButtonsboxComponent } from './components/buttonsbox/buttonsbox.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { jqxMenuComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    LoaderComponent,
    ButtonsboxComponent,
    DatatableComponent,
    jqxTreeComponent,
    jqxMenuComponent,
    ToolbarComponent
  ],
  exports: [
    LoaderComponent,
    ButtonsboxComponent,
    DatatableComponent,
    jqxTreeComponent,
    jqxMenuComponent,
    ToolbarComponent
  ]
})
export class SharedModule {}
