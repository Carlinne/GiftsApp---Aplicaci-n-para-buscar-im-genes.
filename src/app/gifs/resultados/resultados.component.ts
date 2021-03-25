import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent implements OnInit {

  //10. Mostrar los resultados en pantalla.
  get resultados(){
    return this.gifsService.resultados;
  }

  constructor( private gifsService: GifsService ) { }

  ngOnInit(): void {
  }

}
