
import { InmuebleServiceService } from './services/inmueble-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultageneralComponent } from './components/inmueble/consultageneral/consultageneral.component';
import { SinglelistingComponent } from './components/inmueble/singlelisting/singlelisting.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './components/inmueble/inicio/inicio.component';
import { NavbarComponent } from './plantillas/navbar/navbar.component';
import { FooterComponent } from './plantillas/footer/footer.component'
import { interceptorProvider } from './login/interceptors/interceptor.service';
import { RegistroComponent } from './login/registro/registro/registro.component';
import { InmueblesComponent } from './components/inmueble/inmuebles/inmuebles.component';
import { EditarInmuebleComponent } from './components/inmueble/editar-inmueble/editar-inmueble.component';
import { RegistrarInmuebleComponent } from './components/inmueble/registrar-inmueble/registrar-inmueble.component';
import { UsuariosComponent } from './components/usuario/usuarios/usuarios.component';
import { RegistrarUsuarioComponent } from './components/usuario/registrar-usuario/registrar-usuario.component';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';
import { InmueblesUsuarioComponent } from './components/inmueble/inmuebles-usuario/inmuebles-usuario.component';



@NgModule({
  declarations: [
    AppComponent,
    ConsultageneralComponent,
    SinglelistingComponent,
    LoginComponent,
    InicioComponent,
    NavbarComponent,
    FooterComponent,
    RegistroComponent,
    InmueblesComponent,
    EditarInmuebleComponent,
    RegistrarInmuebleComponent,
    UsuariosComponent,
    RegistrarUsuarioComponent,
    EditarUsuarioComponent,
    InmueblesUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
