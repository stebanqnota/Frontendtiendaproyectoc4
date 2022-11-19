
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModeloProdcto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {

  id: string ='';
  nombre: string='';
  fgValidador: FormGroup = this.fb.group({
    'id':['', [Validators.required]],
    'nombre':['', [Validators.required]],
    'precio': ['',[Validators.required]],
    'imagen': ['',[Validators.required]]
  })
  constructor(private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarProducto();
  }

BuscarProducto(){
  this.servicioProducto.ObtenerRegistrosPorid(this.id).subscribe((datos: ModeloProdcto)=>{
  this.fgValidador.controls["id"].setValue(this.id);
  this.fgValidador.controls["nombre"].setValue(datos.nombre);
   this.fgValidador.controls["precio"].setValue(datos.precio);
   this.fgValidador.controls["imagen"].setValue(datos.imagen);
  });
  }

  EliminarProducto(){

this.servicioProducto.EliminarProducto(this.id).subscribe((datos: ModeloProdcto)=>{
  alert("Producto eliminado correctamente");
this.router.navigate(["/administracion/listar-productos"])
}, (error: any)=>{
  alert("error eliminando el producto");
})

}

}
