import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2'
import { AuthService } from './auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = "Por favor Sing in";
  usuario:Usuario;

  constructor(private authService: AuthService,private router:Router) {
    this.usuario = new Usuario();
   }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      Swal.fire('Login',`Hola ${this.authService.usuario.username} ya estas autenticado`,'info');
      this.router.navigate(['/clientes']);
    }
  } 

  

  login(): void{
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error de login','Username o password vacia!..','error');
    }

    this.authService.login(this.usuario).subscribe( response => {
      // let objPayload = JSON.parse(atob(response.access_token.split('.')[1])); 

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;

      this.router.navigate(['/clientes']);
      Swal.fire('Login',`hola  ${usuario.username} has iniciado sesion con éxito!!..`,'success');
      
    }, error => {
      if(error.status == 400){
        Swal.fire('Error de login','Usuario o clave incorrectas!..','error');
      }
    }

    );
  }

}
