import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  
  //Inyectar el servicio creado
  constructor( private gifsService: GifsService ) {}

  buscar() {
      
    const valor = this.txtBuscar.nativeElement.value;

    // console.log(valor);
    this.gifsService.buscarGifts( valor );

    this.txtBuscar.nativeElement.value = '';
  }
}
