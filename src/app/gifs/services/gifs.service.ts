import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root' //Angular lo eleva a un nivel global de mi aplicación es decir que puede funcionar en cualquier parte
})
export class GifsService {

  private apiKey: string = 'AYNON0yniNEix4KFPNni12LWnlbWLuzK';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  
  private _historial: string[] = [];

  //10.Mostrar los resultados en pantalla.
  //public resultados: any[] = [];

  // 11. Colocando un tipado a las peticiones HTTP. https://quicktype.io/ SearchGifsResponse
  public resultados: Gif[] = [];

  get historial(){    
    //return this._historial;
    return [...this._historial]; //Rompe la referencia y regresa un nuevo arreglo
  }

  //9. Realizar una petición HTTP
  constructor(private http: HttpClient){
  //11. LocalStorages
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifts(query: string = ''){
    //this._historial.unshift(query); //Añade un elemento al arreglo
    
    query = query.trim().toLocaleLowerCase();

     //7. Controlar el historial de búsqueda
    if( !this._historial.includes ( query )) {
      this._historial.unshift(query); //Añade un elemento al arreglo      
      this._historial = this._historial.splice(0,10);
    }   

    //9. Realizar una petición HTTP
    //this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=AYNON0yniNEix4KFPNni12LWnlbWLuzK&q=${ query }&limit=10`)
    // .subscribe( (resp: any) => {
    //   console.log(resp.data);
    //   this.resultados = resp.data;
    // });
    

    //  11.LocalStorages
    // ¿Como grabamos en el localstorages?
    localStorage.setItem('historial', JSON.stringify(this._historial));

    // 15: HttpParams
    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    console.log(params.toString());

    // 11. Colocando un tipado a las peticiones HTTP. https://quicktype.io/ SearchGifsResponse
    //Crear interface --> gifs.interface.ts y copiar el código ahí.
    //this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=AYNON0yniNEix4KFPNni12LWnlbWLuzK&q=${ query }&limit=10`)
     this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
    .subscribe( ( resp ) => {
      //console.log( resp.data );
      this.resultados = resp.data;
      //12. Cargar imágenes automáticamente
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
    
    //7. Controlar el historial de búsqueda
    //console.log(this._historial);
  }
}
