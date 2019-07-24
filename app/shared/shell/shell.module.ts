import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ButtonbarComponent } from './buttonbar/buttonbar.component';
// import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, TranslateModule, NgbModule, RouterModule, SharedModule],
  declarations: [HeaderComponent, BreadcrumbsComponent, ShellComponent, FooterComponent, ButtonbarComponent]
})
export class ShellModule {}
