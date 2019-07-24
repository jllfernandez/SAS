import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { jqxMenuComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';

import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss']
})
export class AlertasComponent implements OnInit {
  dataSourceTabla: any[] = [];

  // prepare the data
  sourceTabla = {
    datatype: 'json',
    datafields: [{ name: 'id', type: 'number' }, { name: 'nombre', type: 'string' }, { name: 'tipo', type: 'string' }],
    localdata: this.dataSourceTabla
  };
  dataAdapterTable: any = new jqx.dataAdapter(this.sourceTabla);

  columns: any[] = [
    { text: 'id', datafield: 'id', width: '1%', hidden: true },
    { text: 'Tipo', datafield: 'tipo', width: '10%' },
    { text: 'Descripcion', datafield: 'nombre', width: '40%' },
    { text: 'Estado', datafield: 'estado', width: '20%' },
    { text: 'Fecha Inicio', datafield: 'fecIni', width: '15%' },
    { text: 'Fecha Fin', datafield: 'fecFin', width: '15%' }
  ];

  @ViewChild('grid') grid: jqxGridComponent;

  constructor() {}

  ngOnInit() {
    this.dataSourceTabla = [];
    /*
    this.zonasService.getZonas().subscribe(response => {
      console.log(<NodoZona[]>response);
      this.data = this.renderTree(response);

      this.tree.addTo(this.data, null);

      this.tree.render;
    });

    this.zonasService.getDescZonas().subscribe(response => {
      console.log(<NodoZona[]>response);
      this.dataSourceTabla = response;
    });
*/
    this.actualizaGrid();
  }

  actualizaGrid() {
    this.sourceTabla.localdata = this.dataSourceTabla;
    //console.log(this.sourceTabla);
    //this.grid.updatebounddata('cells');
  }

  cellClick(event: any): void {}
}
