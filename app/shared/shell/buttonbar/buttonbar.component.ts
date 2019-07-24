import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttonbar',
  templateUrl: './buttonbar.component.html',
  styleUrls: ['./buttonbar.component.scss']
})
export class ButtonbarComponent implements OnInit {
  links: Array<any> = [
    {
      link: '/busqueda-portadores',
      logo: 'assets/icons/color/48x/Portador animación 80_48px.png',
      bicolor: 'assets/icons/bicolor/48x/Portador animación 80_48px.png',
      title: 'Localiza Portador',
      index: 1
    },
    {
      link: '',
      logo: 'assets/icons/color/48x/Alta tarjeta 8_48px.png',
      bicolor: 'assets/icons/bicolor/48x/Alta tarjeta 8_48px.png',
      title: 'Localiza Tarjeta',
      index: 2
    },
    {
      link: '',
      logo: 'assets/icons/color/48x/Capturar tarjeta 26_48px.png',
      bicolor: 'assets/icons/bicolor/48x/Capturar tarjeta 26_48px.png',
      title: 'Captura Tarjeta',
      index: 3
    },
    {
      link: '/zonasJerarquias',
      logo: 'assets/icons/color/48x/Zonas 110_48px.png',
      bicolor: 'assets/icons/bicolor/48x/Zonas 110_48px.png',
      title: 'Zonas',
      index: 4
    },
    {
      link: '/perfilesUsuario',
      logo: 'assets/icons/color/48x/Perfiles 77_48px.png',
      bicolor: 'assets/icons/bicolor/48x/Perfiles 77_48px.png',
      title: 'Perfiles',
      index: 5
    },
    {
      link: '',
      logo: 'assets/icons/color/48x/Alertas_2 6_48px.png',
      bicolor: 'assets/icons/bicolor/48x/Alertas_2 6_48px.png',
      title: 'Alertas',
      index: 6
    },
    {
      link: '',
      logo: 'assets/icons/color/48x/Consola 30_48px.png',
      bicolor: 'assets/icons/bicolor/48x/Consola 30_48px.png',
      title: 'Consola',
      index: 7
    }
  ];

  constructor() {}

  ngOnInit() {}
}
