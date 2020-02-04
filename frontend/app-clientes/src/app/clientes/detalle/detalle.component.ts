import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';

import { ClienteService } from "../cliente.service";
// import { ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

import { ModalService } from "./modal.service";

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() 
  cliente: Cliente;
  titulo: string = "Detalle del cliente";
  private fotoSeleccionada: File;
  progreso : number = 0;
  constructor(
    private clienteService:ClienteService, 
    // private activatedRoute: ActivatedRoute
    private modalService: ModalService
    
    ) { }

  ngOnInit() {
      // this.activatedRoute.paramMap.subscribe(params =>{
      //   let id:number =+ params.get('id');
      //   if(id){
      //     this.clienteService.getCliente(id).subscribe(cliente => {
      //       this.cliente = cliente;
      //     });
      //   }
      // });
  }

  seleccionarFoto(event){
    console.log(event);
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0; //vada vez que se carga una foto 
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){ //validamos solo para formato de tipo image
      swal.fire('Error formato no permitido','El archivo deve ser de tipo imagen','error');
      this.fotoSeleccionada = null;
    }
    // else{
    //   this.subirFoto();
    // }
  } 

  subirFoto(){
    if(this.fotoSeleccionada){
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe(event => {
          if(event.type === HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded/event.total)*100);
          }else if(event.type === HttpEventType.Response){
            let response : any = event.body;
            this.cliente = response.cliente as Cliente;
            this.modalService.notificarUpload.emit(this.cliente);
            swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
          }
        // this.cliente = cliente;
        
      });
    }else{
      swal.fire('Error Upload: ','Deve Seleccionar una foto', 'error');
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
