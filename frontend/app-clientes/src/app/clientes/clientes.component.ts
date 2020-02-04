import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";

import { ModalService } from "./detalle/modal.service";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})

export class ClientesComponent implements OnInit {
  clientesArray: Cliente[];
  paginador: any;
  clienteSeleccionado:Cliente;
  // constructor(clienteService: ClienteService) { 
  //   this.ServiceCliente = clienteService;
  // }
  constructor(
    private serviceCliente: ClienteService, 
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
    ) { }

  ngOnInit() { //evento cuando se inicia el componente
    this.activatedRoute.paramMap.subscribe(params => { //capturamos el valor de la ruta
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.serviceCliente.getClientes(page).pipe(
        tap(response => { // el top es solo para realizar algun tip de tarea
          console.log('ClientesComponent: tap 3');
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre);
          });
        })
      ).subscribe(response => {
        this.clientesArray = response.content as Cliente[]
        this.paginador = response; // el response contiene todos los atributos
      });
    });
    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientesArray.map(clienteOriginal =>{
        if(cliente.id == clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      });
    });
  }



  //2.
  // (clientesArray) => {
  //   this.clientesArray = clientesArray
  // }

  //3.
  // function (clientesArray){
  //   this.clientesArray = clientesArray
  // }





  deleteCliente(cliente: Cliente): void {

    swal.fire({
      title: 'Estas Seguro',
      text: `¡Seguro que desea eliminar cliente? ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.serviceCliente.deleteCliente(cliente.id).subscribe(
          response => {
            this.clientesArray = this.clientesArray.filter(cli => cli !== cliente)
            swal.fire(
              'Cliente Eliminado',
              `Cliente ${cliente.nombre} eliminad con exito`,
              'success'
            )
          }
        )
      }
    })
  }

  abrirModal(cliente: Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

}
