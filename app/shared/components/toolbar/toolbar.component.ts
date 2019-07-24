import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  /*
  El array enlaces debe ser de la siguiente estructura
  links: Array<any> = [

    { link: '<link>', logo: '<ruta a la imagen>', bicolor: '<ruta para el efecto hover>', title: '<descripcion>', index: '<identificativo y por orden>' },
    { link: '/zonas', logo: 'assets/icons/color/48x/Alta tarjeta 8_48px.png', bicolor: 'assets/icons/bicolor/48x/Alta tarjeta 8_48px.png' title: 'Pantalla de Zonas', index: 1 }
  ]
  */
  @Input() enlaces: Array<any>;
  @Input() visiblidad: string;

  @Output() clickedOption = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  hotlinkHover(event: any): void {
    const element = event.currentTarget.children[0].children[0];
    const index = element.id;
    const hoverPath = this.enlaces[index - 1].bicolor;
    element.src = hoverPath;
  }

  hotlinkOut(event: any): void {
    const element = event.currentTarget.children[0].children[0];
    const index = element.id;
    const logoPath = this.enlaces[index - 1].logo;
    element.src = logoPath;
  }

  hotlinkClick(event: any) {
    const element = event.currentTarget.children[0].children[0];
    const index = element.id;
    //console.log('Option selected: ', element.id);
    this.clickedOption.emit(index);
  }
}
