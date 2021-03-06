import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ClienteService } from './clientes/cliente.service';

import {RouterModule, Routes} from '@angular/router'
import { HttpClientModule } from "@angular/common/http";//para la comunicacion don el servidor con diferentes peticines (get, post, put ...)
import { FormComponent } from './clientes/form.component'; 
import { FormsModule } from "@angular/forms";

import localeES from '@angular/common/locales/es';
import { registerLocaleData } from "@angular/common";
import { MatDatepickerModule, MatNativeDateModule } from "@angular/material";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  {path:'', redirectTo:'/clientes', pathMatch: 'full'},
  {path:'directivas', component: DirectivaComponent},
  {path:'clientes', component: ClientesComponent},
  {path:'clientes/form', component: FormComponent},
  {path:'clientes/form/:id', component: FormComponent},
  {path:'clientes/page/:page', component: ClientesComponent},
  {path:'login', component: LoginComponent}
  // {path:'clientes/ver/:id', component: DetalleComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent, 
    ClientesComponent, 
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [ClienteService, {provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
