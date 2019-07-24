import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { jqxMenuComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';

import { PerfilesService } from '../../core/services/perfiles.service';
import { NodoPerfil } from '../../core/models/NodoPerfil';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.scss']
})
export class PerfilesComponent implements OnInit {
  titulo: string;
  labelTitulo = '';

  submenu: Array<any> = [
    { name: 'anadir', label: 'Añadir' },
    { name: 'detalle', label: 'Detalle' },
    { name: 'portadores', label: 'Portadores' },
    { name: 'alertas', label: 'Alertas' }
  ];

  submenu2: Array<any> = [
    { name: 'anadir', label: 'Añadir' },
    { name: 'detalle', label: 'Detalle' },
    { name: 'portadores', label: 'Portadores' },
    { name: 'alertas', label: 'Alertas' }
  ];

  heightSubMenu = 1;
  heightSubMenu2 = 1;
  heightInput = 1;
  links: Array<any> = [];
  inputText: string;

  @ViewChild('tree') tree: jqxTreeComponent;
  @ViewChild('tree2') tree2: jqxTreeComponent;
  @ViewChild('menu') menu: jqxMenuComponent;
  @ViewChild('menu2') menu2: jqxMenuComponent;

  data: any[] = [];

  // prepare the data
  source = {
    datatype: 'json',
    datafields: [{ name: 'id' }, { name: 'tipo' }, { name: 'label' }, { name: 'items' }],
    id: 'id',
    autoload: true,
    localdata: this.data
  };
  // create data adapter & perform Data Binding.
  dataAdapter = new jqx.dataAdapter(this.source, { autoBind: true });
  records: any = this.dataAdapter.getRecordsHierarchy('id', 'label');

  //
  data2: any[] = [];

  // prepare the data
  source2 = {
    datatype: 'json',
    datafields: [{ name: 'id' }, { name: 'tipo' }, { name: 'label' }, { name: 'items' }],
    id: 'id',
    autoload: true,
    localdata: this.data
  };
  // create data adapter & perform Data Binding.
  dataAdapter2 = new jqx.dataAdapter(this.source2, { autoBind: true });
  records2: any = this.dataAdapter.getRecordsHierarchy('id', 'label');

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private perfilesService: PerfilesService
  ) {
    this.titulo = this.labelTitulo;
  }

  ngOnInit() {
    this.data = [];
    this.data2 = [];

    this.links = this.generateToolBarOptions();
    this.heightSubMenu = this.submenu.length * 30;

    this.heightSubMenu2 = this.submenu2.length * 30;

    this.perfilesService.getPerfiles().subscribe(response => {
      let perfiles: NodoPerfil[] = this.perfilesService.flatToTree(response);
      console.log(perfiles);
      this.data = this.renderTree(perfiles);
      this.tree.addTo(this.data, null);
      this.tree.render;
    });
  }

  renderTree(source: NodoPerfil[]) {
    for (var i = 0, max = source.length; i < max; i += 1) {
      if (source[i].sons.length > 0) {
        source[i].sons = this.renderTree(source[i].sons);
      }
      source[i]['icon'] = this.mapeo(source[i].estado);

      source[i]['icon'] = this.mapeo(source[i].estado);
      source[i]['label'] = source[i]['descripcion'];
      source[i]['items'] = source[i]['sons'];
    }

    return source;
  }

  mapeo(key: number) {
    if (key == 1) return '../../../assets/icons/color/16x/Perfil de usuario 76_16px.png';
    else if (key == 2) return '../../../assets/icons/color/16x/Perfil desactivado 75_16px.png';
    else if (key == 3) return '../../../assets/icons/color/16x/Perfiles 77_16px.png';
    else if (key == 0) return 'fas fa-desktop ic-w mr-1';
    return '../../../assets/icons/color/16x/Perfiles 77_16px.png';
  }

  processTreeSelect(event: any): void {
    let selectedItem = this.tree.getSelectedItem();
    if (selectedItem != null) {
      let json: NodoPerfil[] = this.data;
      let perfil = this.processRecursive(json, selectedItem.element.id);
      if (this.isSelectable(perfil)) {
        console.log('Click en Valor a seleccionar');
      }
    }
  }

  processTreeSelect2(event: any): void {
    /*    let selectedItem = this.tree.getSelectedItem();
    if (selectedItem != null) {
      let json: NodoPerfil[] = this.data;
      let perfil = this.processRecursive(json, selectedItem.element.id);
      if (this.isSelectable(perfil)) {
        console.log('Click en Valor a seleccionar');
      }
    }*/
  }

  isSelectable(perfil: NodoPerfil): boolean {
    return !this.isUndefined(perfil.idEmpresa);
  }

  processRecursive(json: NodoPerfil[], id: number): NodoPerfil {
    let zona = json.find((zon: NodoPerfil) => {
      return zon.id == id;
    });

    if (this.isUndefined(zona)) {
      for (var i = 0; i < json.length; i++) {
        zona = this.processRecursive(json[i].sons, id);
        if (!this.isUndefined(zona)) {
          return zona;
        }
      }
    }
    return zona;
  }

  isUndefined(arg: any): boolean {
    return typeof arg === 'undefined';
  }

  processTreeExpand(event: any): void {
    let args = event.args;
    let item = this.tree.getItem(args.element);
  }

  processTreeCollapse(event: any): void {
    let args = event.args;
    let item = this.tree.getItem(args.element);
  }

  processContextMenu(event: any): void {
    let args = event.args;
    let item = args.innerText;
    let selectedItem = this.tree.getSelectedItem();
    //let perfil = this.processRecursive(this.data, selectedItem.element.id);

    switch (item) {
      case this.submenu[0].label:
        if (selectedItem != null) {
          console.log('Add' + ' --->' + selectedItem.element.id);
          console.log('' + this.submenu[0].name);
        }
        break;
      case this.submenu[1].label:
        if (selectedItem != null) {
          console.log('Add' + ' --->' + selectedItem.element.id);
          console.log('' + this.submenu[1].name);
        }
        break;
      case this.submenu[2].label:
        if (selectedItem != null) {
          console.log('Add' + ' --->' + selectedItem.element.id);
          console.log('' + this.submenu[2].name);
        }
        break;
      case this.submenu[3].label:
        if (selectedItem != null) {
          console.log('Add' + ' --->' + selectedItem.element.id);
          console.log('' + this.submenu[3].name);
          this.router.navigate(['alertas']);
        }
        break;
    }
  }

  processTreeExpand2(event: any): void {
    let args = event.args;
    let item = this.tree.getItem(args.element);
  }

  processTreeCollapse2(event: any): void {
    let args = event.args;
    let item = this.tree.getItem(args.element);
  }

  processContextMenu2(event: any): void {}

  contextmenuMenu(event: any): boolean {
    let selectedItem = this.tree.getSelectedItem();

    let perfil = this.processRecursive(this.data, selectedItem.element.id);
    if (this.isSelectable(perfil)) {
      if ((<HTMLInputElement>event.target).classList.contains('jqx-tree-item')) {
        this.tree.selectItem(event.target);
        let scrollTop = window.scrollY;
        let scrollLeft = window.scrollX;

        this.menu.open(event.clientX + 5 + scrollLeft, event.clientY + 5 + scrollTop);
        return false;
      } else {
        this.menu.close();
      }
    }
  }

  contextmenuMenu2(event: any): boolean {
    if ((<HTMLInputElement>event.target).classList.contains('jqx-tree-item')) {
      this.tree2.selectItem(event.target);
      let scrollTop = window.scrollY;
      let scrollLeft = window.scrollX;

      this.menu2.open(event.clientX + 5 + scrollLeft, event.clientY + 5 + scrollTop);
      return false;
    } else {
      this.menu2.close();
    }
  }

  generateToolBarOptions(): Array<any> {
    let options: Array<any> = [];

    options.push({
      link: '/zonasJerarquias',
      logo: '../../../assets/icons/color/16x/Zonas 110_16px.png',
      bicolor: '../../../assets/icons/color/32x/Zonas 110_32px.png',
      title: '', //'Mostrar jerarquía de zonas',
      index: 1
    });
    options.push({
      link: '/zonasNiveles',
      logo: '../../../assets/icons/color/16x/Zonas usuarios 111_16px.png',
      bicolor: '../../../assets/icons/color/32x/Zonas usuarios 111_32px.png',
      title: '', //'Mostrar zonas por niveles',
      index: 2
    });

    return options;
  }

  onClickOption(index: any) {
    //console.log('Indice -------------->' + index);
    let selectedItem = this.tree.getSelectedItem();
    if (null !== selectedItem) {
      let option: number = parseInt(index);
      switch (option) {
        case 1:
          {
            // let item = this.addItem(selectedItem.element);
          }
          break;
      } //case
    } // if
  } // method
}
