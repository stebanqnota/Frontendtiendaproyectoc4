import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloProdcto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'nomre':['', [Validators.required]],
    'precio': ['',[Validators.required]],
    'imagen': ['',[Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router: Router) { }

  ngOnInit(): void {
  }

GuardarProducto(){
  let nombre = this.fgValidador.controls["nombre"].value;
  let precio = parseInt(this.fgValidador.controls["precio"].value);
  let imagen = this.fgValidador.controls["imagen"].value;
  let p= new ModeloProdcto();
  p.nombre = nombre;
  p.precio = precio;
  p.imagen = imagen;
this.servicioProducto.CrearProducto(p).subscribe((datos: ModeloProdcto)=>{
  alert("Producto almacenado correctamente")
this.router.navigate(["/administracion/listar-productos"])
}, (error: any)=>{
  alert("error almacenando el producto")
})

}

}
