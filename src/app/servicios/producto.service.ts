import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloProdcto } from '../modelos/producto.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
url = `http://localhost:3000`;
token: string = '';

  constructor(private http: HttpClient, private seguridadServicio: SeguridadService){
    this.token=this.seguridadServicio.ObtenerToken();
   }

  ObtenerRegistros(): Observable<ModeloProdcto[]> {
    return this.http.get<ModeloProdcto[]>(`${this.url}/productos`);

  }
  ObtenerRegistrosPorid(id: string): Observable<ModeloProdcto> {
    return this.http.get<ModeloProdcto>(`${this.url}/productos/${id}`);

  }
 CrearProducto(producto: ModeloProdcto): Observable<ModeloProdcto>{
  return this.http.post<ModeloProdcto>(`${this.url}/productos`, producto, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  })
 }

 ActualizarProducto(producto: ModeloProdcto): Observable<ModeloProdcto>{
  return this.http.put<ModeloProdcto>(`${this.url}/productos/${producto.id} `, producto, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  })
 }

 EliminarProducto(id : string): Observable<any>{
  return this.http.delete(`${this.url}/productos/${id}`, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  })
 }
}
