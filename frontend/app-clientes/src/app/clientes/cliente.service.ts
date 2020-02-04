import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from "@angular/common";
import { clientesList } from './clienetes.json'; 
import { Cliente } from './cliente';

import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from "@angular/common/http";
// catchError:  --> para control de errores
import { map, catchError, tap } from "rxjs/operators";

//.... investigar ---> Observable y of
import { of, Observable, throwError } from "rxjs";

import swal from 'sweetalert2';

import { Router } from '@angular/router';
import { Region } from './region.js';
import { throws } from 'assert';




@Injectable()

// @Injectable({
//   providedIn: 'root'
// })

export class ClienteService {
  
  private url: string ="http://localhost:8080/api/clientes" // api desde el backend contienede el crud

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  
  constructor(private httpVariable: HttpClient, private router : Router) { } //inyectamos
  
  getRegiones(): Observable<Region[]>{
    return this.httpVariable.get<Region[]>(this.url +'/regiones').pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return  throwError(e);;
      })
    );
  }

  //--------get cliente-------------
  getClientes(page : number): Observable<any> {
    return this.httpVariable.get(this.url + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
          return cliente;
        });
        return response;
      }
      ),
      tap((response : any) => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    );
  }
  // getClientes():Observable<Cliente[]> {
  //   // return of(clientesList);
  //   //1.
  //   //return this.httpVariableVariable.get<Cliente[]>(this.url);
    
  //   //2.
  //   return this.httpVariable.get(this.url).pipe(
  //     tap(response =>{
  //       let clientes = response as Cliente[];
  //       console.log("ClienteService: tap 1"); 
  //       clientes.forEach(cliente => {
  //         console.log(cliente.nombre);
  //       });
  //     }),  
  //     map(response => {
  //         let clientes = response as Cliente[];
  //         return clientes.map(cliente => {
  //             cliente.nombre =  cliente.nombre.toUpperCase(); // Convertimos el nombre en Mayuscula
              

  //             //1.
  //             /**
  //               * Formatos:
  //               * EEEE dd, MMMM yyyy --> en letras
  //               * EEE dd, MMMM yyy    --> en letras abreviado
  //               * fullDate            --> fecha completa
  //               * 
  //               * Locale
  //               * en-US
  //               * 
  //               */
              
  //               let datePipe = new DatePipe('es');
  //               //cliente.createAt = datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy');  
               
               

  //              // 
              
  //             //2.
  //             //cliente.createAt = FormatDate(cliente.createAt,'dd/MM/yyy', 'en-US');
  //             return cliente;
  //         });
  //       }),
  //       tap(response =>{
  //         console.log("ClienteService: tap 2");  
  //         response.forEach( cliente => {
  //           console.log(cliente.nombre);
  //         });
  //       })
  //   );
  // }

  //--------registrar clientes ------------
  getCliente(id): Observable<Cliente> {
    return this.httpVariable.get<Cliente>(`${this.url}/${id}`).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)){ // retorna 401
            return throwError(e);
          }
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
    );
  }

  //investigar Observable
  //insertar
  create(cliente: Cliente): Observable<Cliente> {
     return this.httpVariable.post(this.url, cliente, {headers : this.httpHeaders}).pipe(
        map((response: any) => response.cliente as Cliente),
        catchError(e =>{

          if(this.isNoAutorizado(e)){ // retorna 401
            return throwError(e); 

          }

          if(e.status==400){ // 400  llega de la vaidacion del BAD_REQUEST
              return throwError(e);
          }
            console.error(e.error.mensaje);
            swal.fire(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
        })
     );
  }

  //actualizar
  updateCliente(cliente: Cliente): Observable<any> { // any: devuelve cualquier tipo de dato
      return this.httpVariable.put<any>(`${this.url}/${cliente.id}`, cliente, {headers : this.httpHeaders}).pipe(
        catchError(e => {

          if(this.isNoAutorizado(e)){ // retorna 401
            return throwError(e); 
          }

          if(e.status==400){ // 400  llega de la vaidacion del BAD_REQUEST
            return throwError(e);
          }

          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
    );
  }


  //eliminar
  deleteCliente(id: number): Observable<Cliente>{
    return this.httpVariable.delete<Cliente>(`${this.url}/${id}`, {headers : this.httpHeaders}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){ // retorna 401
          return throwError(e); 
        }
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
  );
  }
  
  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);

    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true
    });

    return this.httpVariable.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return  throwError(e);;
      })
    )
  } 
  
  private isNoAutorizado(e): boolean {
    if(e.status === 401 || e.status == 403){ //401-> No Autorizado   -- 403 recurso prohibid
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

}


/**
 * Nota: el service es quien se comunica con el backed
 */
