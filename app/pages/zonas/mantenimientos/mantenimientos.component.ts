import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ZonasService } from '../../../core/services/zonas.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-mantenimiento-zonas',
  templateUrl: '../zonas.component.html',
  styleUrls: ['../zonas.component.scss']
})
export class MantenimientosComponent extends BaseComponent {
  constructor(activatedRoute: ActivatedRoute, router: Router, zonasService: ZonasService) {
    super(activatedRoute, router, zonasService);
    this.titulo = this.labelTitulo;

    //this.submenu = this.generateSubMenuById(this.role);
    //this.heightSubMenu = this.submenu.length * 30;
  }

  generateToolBarOptions(role: number): Array<any> {
    let options: Array<any> = [];

    // let selectedItem = this.tree.getSelectedItem();

    options.push({
      link: '/zonasMantenimiento/' + role,
      logo: '../../../assets/icons/color/16x/Restaurar 84_16px.png',
      bicolor: '../../../assets/icons/color/32x/Restaurar 84_32px.png',
      title: '', //'Añadir zona',
      index: 1
    });
    options.push({
      link: '/zonasMantenimiento/' + role,
      logo: '../../../assets/icons/color/16x/Sensor 85_16px.png',
      bicolor: '../../../assets/icons/color/32x/Sensor 85_32px.png',
      title: '', //'Añadir sector',
      index: 2
    });

    options.push({
      link: '/perfiles',
      logo: '../../../assets/icons/color/16x/Perfil de usuario 76_16px.png',
      bicolor: '../../../assets/icons/color/32x/Perfil de usuario 76_32px.png',
      title: '', //'Lista de perfiles con accesos',
      index: 3
    });
    options.push({
      link: '/zonasMantenimiento/' + role,
      logo: '../../../assets/icons/color/16x/Sensor desconectado 88_16px.png',
      bicolor: '../../../assets/icons/color/32x/Sensor desconectado 88_32px.png',
      title: '', //'Lista de portadores en Edificio',
      index: 4
    });
    options.push({
      link: '/alertas',
      logo: '../../../assets/icons/color/16x/Sensor IP 86_16px.png',
      bicolor: '../../../assets/icons/color/32x/Sensor IP 86_32px.png',
      title: '', //'Lista de Alertas',
      index: 5
    });
    options.push({
      link: '/alertas',
      logo: '../../../assets/icons/color/16x/Servidor actualizado 89_16px.png',
      bicolor: '../../../assets/icons/color/32x/Servidor actualizado 89_32px.png',
      title: '', //'Ver mapa de zona',
      index: 6
    });
    options.push({
      link: '/zonasJerarquias',
      logo: '../../../assets/icons/color/16x/Zonas 110_16px.png',
      bicolor: '../../../assets/icons/color/32x/Zonas 110_32px.png',
      title: '', //'Mostrar jerarquía de zonas',
      index: 7
    });
    options.push({
      link: '/zonasNiveles',
      //logo: `<span class="imagen"><i class="ci-search-bearer-16"></i></span>`,
      logo: '../../../assets/icons/color/16x/Zonas usuarios 111_16px.png',
      bicolor: '../../../assets/icons/color/32x/Zonas usuarios 111_32px.png',
      title: '', //'Mostrar zonas por niveles',
      index: 8
    });

    return options;
  }

  generateSubMenu(role: number): Array<any> {
    let submenu: Array<any> = [];

    submenu.push({ name: 'addZona', label: 'Añadir Zona' });
    submenu.push({ name: 'addSensor', label: 'Añadir Sensor' });
    submenu.push({ name: 'addMas', label: 'Alta masiva' });
    submenu.push({ name: 'eliminar', label: 'Eliminar' });
    submenu.push({ name: 'modificar', label: 'Modificar' });
    submenu.push({ name: 'plano', label: 'Asociar plano' });
    submenu.push({ name: 'empresa', label: 'Asociar empresa' });
    submenu.push({ name: 'desempresa', label: 'Desasociar empresa' });
    submenu.push({ name: 'portadores', label: 'Portadores' });
    submenu.push({ name: 'perfiles', label: 'Perfiles' });
    submenu.push({ name: 'alertas', label: 'Alertas' });
    submenu.push({ name: 'diseño', label: 'Diseño' });
    submenu.push({ name: 'seguridad', label: 'Modificar Nivel Seguridad' });

    return submenu;
  }

  processContextMenu(event: any): void {
    let args = event.args;
    let item = args.innerText;
    this.tree.selectItem(event.target);
    let selectedItem = this.tree.getSelectedItem();

    switch (item) {
      case this.submenu[0].label:
        if (selectedItem != null) {
          //this.tree.selectItem(event.target);
          let item = this.addItem(selectedItem.element);
        }
        break;
      case this.submenu[1].label:
        if (selectedItem != null) {
          //this.tree.selectItem(event.target);
          //let item = this.addItemSensor(selectedItem.element);
        }
      case this.submenu[2].label:
        if (selectedItem != null) {
          //this.tree.selectItem(event.target);
          //this.tree.removeItem(selectedItem.element);
        }
        break;
      case this.submenu[3].label:
        if (selectedItem != null) {
          //this.tree.selectItem(event.target);
          this.deleteItem(selectedItem.element);
        }
        break;
      case this.submenu[4].label:
        if (selectedItem != null) {
          //this.tree.selectItem(event.target);
          this.updateItem(selectedItem.element);
        }
        break;
      case this.submenu[5].label:
        if (selectedItem != null) {
          // this.tree.selectItem(event.target);
          this.goto('/portadores');
        }
        break;
      case this.submenu[6].label:
        if (selectedItem != null) {
          //this.tree.selectItem(event.target);
          this.goto('/perfiles');
        }
        break;
      case this.submenu[10].label:
        console.log('Alertas');
        if (selectedItem != null) {
          //this.tree.selectItem(event.target);
          this.goto('/alertas');
        }
        break;
    }
  }

  onClickOption(index: any) {
    //console.log('Indice -------------->' + index);
    let selectedItem = this.tree.getSelectedItem();
    if (null !== selectedItem) {
      let option: number = parseInt(index);
      switch (option) {
        case 1:
          {
            let item = this.addItem(selectedItem.element);
          }
          break;
      } //case
    } // if
  } // method
}
