import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { jqxMenuComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';

import { ZonasService } from '../../../core/services/zonas.service';
import { NodoZona } from '../../../core/models/NodoZona';
import { NodoSensor } from '../../../core/models/NodoSensor';

export class BaseComponent implements OnInit {
  titulo: string;
  labelTitulo = '';

  dataSourceTabla: any[] = [];

  heightSubMenu = 1;
  heightInput = 1;
  // prepare the data
  sourceTabla = {
    datatype: 'json',
    datafields: [
      { name: 'id', type: 'number' },
      { name: 'icon', type: 'string' },
      { name: 'descripcion', type: 'string' },
      { name: 'descTipoZona', type: 'string' }
    ],
    localdata: this.dataSourceTabla
  };
  dataAdapterTable: any = new jqx.dataAdapter(this.sourceTabla);

  iconRenderer = (row: number, column: any, value: string): string => {
    let imgurl = value;
    let img =
      '<div style="background: white;"><img style="margin: 2px; margin-left: 10px;" src="' + imgurl + '"></div>';
    return img;
  };

  columns: any[] = [
    { text: 'id', datafield: 'id', hidden: true },
    { text: '', datafield: 'icon', width: 60, cellsrenderer: this.iconRenderer },
    { text: 'Descripcion', datafield: 'descripcion', width: '60%' },
    { text: 'Tipo', datafield: 'descTipoZona', width: '30%' }
  ];

  links: Array<any> = [];
  submenu: Array<any> = [];
  inputText: string;

  role: number;

  @ViewChild('tree') tree: jqxTreeComponent;
  @ViewChild('menu') menu: jqxMenuComponent;
  @ViewChild('grid') grid: jqxGridComponent;

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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private zonasService: ZonasService) {
    this.titulo = this.labelTitulo;
  }

  ngOnInit() {
    this.dataSourceTabla = [];
    this.data = [];

    this.role = 0;
    this.links = [];
    this.activatedRoute.paramMap.subscribe(params => {
      this.role = +params.get('role');
      if (!this.role) {
        this.role = 0;
      }
    });

    this.links = this.generateToolBarOptions(this.role);
    this.submenu = this.generateSubMenu(this.role);
    this.heightSubMenu = this.submenu.length * 30;

    this.zonasService.getZonas().subscribe(response => {
      let zonas: NodoZona[] = this.zonasService.flatToTree(this.getView(), response);
      this.data = this.renderTree(zonas);
      this.tree.addTo(this.data, null);

      this.tree.render;
    });

    this.actualizaGrid();
  }

  getView(): number {
    return 0;
  }

  renderTree(source: NodoZona[]): NodoZona[] {
    for (var i = 0, max = source.length; i < max; i += 1) {
      if (source[i].sons.length > 0) {
        source[i].sons = this.renderTree(source[i].sons);
      }

      source[i] = this.renderZona(source[i]);
    }

    return source;
  }

  renderTreeIcons(key: number) {
    /*
    GBtzNODORAIZ = 1
    GBtzGEOGRAFICA = 2
    GBtzEDIFICIO = 3
    GBtzZONA = 4

    */
    //console.log('----------------->'+key);
    let result: string = '../../../assets/icons/color/16x/Todas 101_16px.png';
    switch (key) {
      case 1:
        result = '../../../assets/icons/color/16x/16x/SIP 97_16px.png';
        break;

      case 2:
        result = '../../../assets/icons/color/16x/Buscar zona 22_16px.png';
        break;

      case 3:
        result = '../../../assets/icons/color/16x/Irirs verificar 55_16px.png';
        break;

      case 4:
        result = '../../../assets/icons/color/16x/Detalle automático 34_16px.png';
        break;
    }

    return result;
  }

  renderSensoresIcons(key: number): string {
    /*
        CODIGO=1 DESCRIPCION='SENSOR DE PROXIMIDAD'
        CODIGO= 2 DESCRIPCION ='CAMARA DE IRIS'/>
        CODIGO=3 DESCRIPCION ='CAMARA IP'/>
        CODIGO=4 DESCRIPCION ='CUENTA PERSONAS'/>
        CODIGO=5 DESCRIPCION ='INTEGRA-ID'/>
        CODIGO=6 DESCRIPCION ='IDP-IRIS'/>
        CODIGO=7 DESCRIPCION ='IDP-VEIN'/>
        CODIGO=8 DESCRIPCION ='IRIS&amp;GO'/>
        CODIGO=9 DESCRIPCION ='AIRIM'/>

    */

    let result: string = '../../../assets/icons/color/16x/Sensor 85_16px.png';
    switch (key) {
      case 1:
        result = '../../../assets/icons/color/16x/Sensor conectado 87_16px.png';
        break;

      case 2:
        result = '../../../assets/icons/color/16x/Sensor IP 86_16px.png';
        break;

      case 3:
        result = '../../../assets/icons/color/16x/Irirs verificar 55_16px.png';
        break;

      case 4:
        result = '../../../assets/icons/color/16x/Detalle automático 34_16px.png';
        break;

      case 5:
        result = '../../../assets/icons/color/16x/Detalle evento 35_16px.png';
        break;

      case 6:
        result = '../../../assets/icons/color/16x/Abajo 9_16px.png';
        break;

      case 7:
        result = '../../../assets/icons/color/16x/Acceso IDP 1_16px.png';
        break;

      case 8:
        result = '../../../assets/icons/color/16x/Actualizar 2_16px.png';
        break;
      case 9:
        result = '../../../assets/icons/color/16x/Alarma activada 3_16px.png';
        break;
    }

    return result;
  }

  generateSubMenu(role: number): Array<any> {
    let submenu: Array<any> = [];
    return submenu;
  }

  generateToolBarOptions(id: number): Array<any> {
    let options: Array<any> = [];
    return options;
  }

  filtrarZonas(termino: string) {
    /*    
    this.zonasService.getZonasFilter(termino).subscribe(response => {
      console.log(<NodoZona[]>response);
      this.dataSourceTabla = response;
    });*/
  }

  ///EVENTOS
  processClickRow(row: string) {
    console.log('Click en : ', row);
    row['class'] = 'text-primary';
  }

  processEditRow(row: any) {
    console.log('Edit en : ', row.id);
    //this.modalService.openModal();
    //this.router.navigate(['detalleusuario', row.id]);
  }

  processDeleteRow(row: any) {
    console.log('Delete en : ', row.id);
  }

  processButton(button: any) {
    console.log('Proceso: ', button.action);
  }

  processTreeSelect(event: any): void {
    let selectedItem = this.tree.getSelectedItem();
    if (selectedItem != null) {
      this.dataSourceTabla = [];
      let json: NodoZona[] = this.data;
      let zona = this.processRecursive(json, selectedItem.element.id);

      let cont = 0;
      //clean dataSource
      for (var j = 0, max = zona.sons.length; j < max; j += 1) {
        this.dataSourceTabla[cont] = zona.sons[j];
        cont++;
      }
      let id: number = selectedItem.element.id;
      this.zonasService.getSensoresByZona(id).subscribe(response => {
        let sensoresRelacionados: NodoSensor[] = response;

        for (var i = 0, max = sensoresRelacionados.length; i < max; i += 1) {
          this.dataSourceTabla.push(this.translateToZona(sensoresRelacionados[i]));
        }

        this.actualizaGrid();
      });

      this.actualizaGrid();
    }
  }

  processRecursive(json: NodoZona[], id: number): NodoZona {
    let zona = json.find((zon: NodoZona) => {
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

  processTreeExpand(event: any): void {
    let args = event.args;
    let item = this.tree.getItem(args.element);
  }

  processTreeCollapse(event: any): void {
    let args = event.args;
    let item = this.tree.getItem(args.element);
  }

  processContextMenu(event: any): void {}

  goto(url: string) {
    let selectedItem = this.tree.getSelectedItem();
    //this.router.navigate([url, selectedItem.element.id]);
    this.router.navigate([url]);
  }

  contextmenuMenu(event: any) {
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

  cellClick(event: any): void {}

  actualizaGrid() {
    this.sourceTabla.localdata = this.dataSourceTabla;
    this.grid.updatebounddata('columns');
  }

  /*
    render zona
  */
  renderZona(zona: NodoZona): NodoZona {
    zona['icon'] = this.renderTreeIcons(zona.tipoZona);
    zona['label'] = zona['descripcion'];
    zona['items'] = zona['sons'];
    zona.descTipoZona = this.zonasService.renderTipoZona(zona.tipoZona);

    return zona;
  }

  renderTipoSensor(key: number): string {
    /*
      CODIGO=1 DESCRIPCION='SENSOR DE PROXIMIDAD'
      CODIGO= 2 DESCRIPCION ='CAMARA DE IRIS'/>
      CODIGO=3 DESCRIPCION ='CAMARA IP'/>
      CODIGO=4 DESCRIPCION ='CUENTA PERSONAS'/>
      CODIGO=5 DESCRIPCION ='INTEGRA-ID'/>
      CODIGO=6 DESCRIPCION ='IDP-IRIS'/>
      CODIGO=7 DESCRIPCION ='IDP-VEIN'/>
      CODIGO=8 DESCRIPCION ='IRIS&amp;GO'/>
      CODIGO=9 DESCRIPCION ='AIRIM'/>

    */

    switch (key) {
      case 1:
        return 'SENSOR DE PROXIMIDAD';
        break;
      case 2:
        return 'CAMARA DE IRIS';
        break;
      case 3:
        return 'CAMARA IP';
        break;
      case 4:
        return 'CUENTA PERSONAS';
        break;
      case 5:
        return 'INTEGRA-ID';
        break;
      case 6:
        return 'IDP-IRIS';
        break;
      case 7:
        return 'IDP-VEIN';
        break;
      case 8:
        return 'CIRIS&amp;GO';
        break;
      case 9:
        return 'AIRIM';
        break;
    }
  }

  translateToZona(sensor: NodoSensor): NodoZona {
    let zona: NodoZona = new NodoZona();
    zona['icon'] = this.renderSensoresIcons(sensor.tipoSensor);
    //zona.tipoZona =
    zona.id = sensor.idSensor;
    zona.idZonaPadre = sensor.idZona;
    zona.sons = [];
    zona.descripcion = sensor.alias;
    zona.descTipoZona = this.renderTipoSensor(sensor.tipoSensor);
    zona.isSensor = 1;

    return zona;
  }

  onClickOption(index: number) {
    //console.log('Indice -------------->' + index);
  }

  isUndefined(arg: any): boolean {
    return typeof arg === 'undefined';
  }

  /////////////////////////
  addItem(father: NodoZona) {
    swal
      .fire({
        title: 'Añadir',
        text: 'Introduzca nueva zona',
        input: 'text',
        showCancelButton: true
      })
      .then(result => {
        if (!this.isUndefined(result.value)) {
          let zonaFather = this.processRecursive(this.data, father.id);

          let newZona: NodoZona = new NodoZona();
          newZona.sons = [];
          newZona.descripcion = result.value;
          newZona.idZonaPadre = zonaFather.id;

          this.zonasService.create(newZona).subscribe(response => {
            response as NodoZona;
            newZona.id = response.id;
            let zonas = zonaFather.sons;
            zonas.push(newZona);

            let selectedItem = this.tree.getSelectedItem();

            this.tree.addTo(this.renderZona(newZona), selectedItem.element);
            this.tree.expandItem(selectedItem.element);
            this.dataSourceTabla.push(newZona);
            this.tree.render;
            this.actualizaGrid();
          });
        }
      });
  }

  deleteItem(zona: NodoZona) {
    let selectedItem = this.tree.getSelectedItem();
    this.zonasService.delete(zona.id).subscribe(response => {
      console.log(response);
      let zonaFather = this.processRecursive(this.data, selectedItem.parentElement.id);

      let zonas = zonaFather.sons;
      let newZonas: NodoZona[] = [];
      let cont = 0;
      for (var i = 0, max = zonas.length; i < max; i += 1) {
        if (zonas[i].id != zona.id) {
          newZonas[cont] = zonas[i];
          cont++;
        }
      }
      zonaFather.sons = newZonas;

      this.tree.removeItem(selectedItem.element);
      this.tree.render;
      this.actualizaGrid();
    });
  }

  updateItem(zona: NodoZona) {
    swal
      .fire({
        title: 'Modificar',
        text: 'Modifique la zona',
        input: 'text',
        showCancelButton: true
      })
      .then(result => {
        if (!this.isUndefined(result.value)) {
          let selectedItem = this.tree.getSelectedItem();
          let updateZona = this.processRecursive(this.data, zona.id);
          updateZona['descripcion'] = result.value;
          this.zonasService.update(updateZona).subscribe(response => {
            console.log(response);
            this.tree.updateItem({ label: result.value }, selectedItem.element);
            this.tree.updateItem({ icon: this.renderTreeIcons(updateZona.tipoZona) }, selectedItem.element);
            this.tree.render;
            this.actualizaGrid();
          });
        }
      });
  }
}
