import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ZonasService } from '../../../core/services/zonas.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-niveles-zonas',
  templateUrl: '../zonas.component.html',
  styleUrls: ['../zonas.component.scss']
})
export class JerarquiasComponent extends BaseComponent {
  constructor(activatedRoute: ActivatedRoute, router: Router, zonasService: ZonasService) {
    super(activatedRoute, router, zonasService);
    this.titulo = this.labelTitulo;

    this.submenu = this.generateSubMenu(this.role);
    //this.heightSubMenu = this.submenu.length * 30;
  }

  generateToolBarOptions(role: number): Array<any> {
    let options: Array<any> = [];

    options.push({
      link: '/perfiles',
      logo: '../../../assets/icons/color/16x/Zonas 110_16px.png',
      bicolor: '../../../assets/icons/color/32x/Zonas 110_32px.png',
      title: '', //'Mostrar jerarquía de zonas',
      index: 1
    });
    options.push({
      link: '/alertas',
      //logo: `<span class="imagen"><i class="ci-search-bearer-16"></i></span>`,
      //logo: '<div class="ci-search-bearer-16" />',//'<i class="ci-search-bearer-16"></i>',
      logo: '../../../assets/icons/color/16x/Zonas usuarios 111_16px.png',
      bicolor: '../../../assets/icons/color/32x/Zonas usuarios 111_32px.png',
      title: '', //'Mostrar zonas por niveles',
      index: 2
    });
    options.push({
      link: '/zonasJerarquias',
      logo: '../../../assets/icons/color/16x/Zonas 110_16px.png',
      bicolor: '../../../assets/icons/color/32x/Zonas 110_32px.png',
      title: '', //'Mostrar jerarquía de zonas',
      index: 3
    });
    options.push({
      link: '/zonasNiveles',
      //logo: `<span class="imagen"><i class="ci-search-bearer-16"></i></span>`,
      //logo: '<div class="ci-search-bearer-16" />',//'<i class="ci-search-bearer-16"></i>',
      logo: '../../../assets/icons/color/16x/Zonas usuarios 111_16px.png',
      bicolor: '../../../assets/icons/color/32x/Zonas usuarios 111_32px.png',
      title: '', //'Mostrar zonas por niveles',
      index: 4
    });

    return options;
  }

  generateSubMenu(role: number): Array<any> {
    let submenu: Array<any> = [];

    submenu.push({ name: 'portadores', label: 'Portadores' });
    submenu.push({ name: 'perfiles', label: 'Perfiles' });
    submenu.push({ name: 'alertas', label: 'Alertas' });
    return submenu;
  }

  processContextMenu(event: any): void {
    let args = event.args;
    let item = args.innerText;

    let selectedItem = this.tree.getSelectedItem();

    switch (item) {
      case this.submenu[0].label:
        if (selectedItem != null) {
          console.log('Add' + ' --->' + selectedItem.element.id);
          console.log('' + this.submenu[0].name);
        }
        break;
      case this.submenu[1].label:
        if (selectedItem != null) {
          this.goto('/perfiles');
        }
        break;
      case this.submenu[2].label:
        if (selectedItem != null) {
          this.goto('/alertas');
        }
        break;
    }
  }
}
