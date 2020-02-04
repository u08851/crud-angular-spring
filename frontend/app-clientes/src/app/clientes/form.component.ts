import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

import { Router, ActivatedRoute } from '@angular/router';
import swal  from "sweetalert2";
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  regiones: Region[];
  private titulo: string = "Crear Cliente";
  private errores: String[];
  // activateRoute: any;
  
  //inyectar
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
     this.cargarCliente();  //cuando se inicializa el componente

     this.clienteService.getRegiones().subscribe(regiones =>{
        return this.regiones = regiones;
     })

  }

  //cargarCliente: cargar cliente por id
  cargarCliente(): void {
    //class ActivatedRoute: capturamos el  id de la url 
    this.activateRoute.params.subscribe(params => { 
          let id = params['id']
          if(id){
            this.clienteService.getCliente(id).subscribe((cliente) => {
              console.log(cliente);
              this.cliente = cliente
            });
          }
      });
  }

  //create: regitrar cliente
  public create(): void{
    console.log(this.cliente);
    this.clienteService.create(this.cliente)
    .subscribe(cliente => {
      console.log(cliente);
      // response => this.router.navigate(['/clientes']) // redireccionamos a la  lista  
        this.router.navigate(['/clientes']) // redireccionamos a la  lista
        swal.fire('Nuevo Cliente', `El cliente ${cliente.nombre} a sido creado con éxito`, 'success')
      },
      err => {
        this.errores = err.error.errors as String[];
        console.dir(this.errores);
        console.log('Codigo del error desde el backed'+ err.status);
        console.error(err.error.errors);
      }
    );
  }

  updateCliente(): void {
    console.log(this.cliente);
    this.clienteService.updateCliente(this.cliente)
    .subscribe( json => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
    },
    err => {
      this.errores = err.error.errors as String[];
      console.log('Codigo del error desde el backed'+ err.status);
      console.error(err.error.errors);
    }

    );
  }

  compararRegion(o1:Region, o2:Region): boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined? false : o1.id === o2.id;
  }
}
