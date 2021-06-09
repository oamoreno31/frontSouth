import { RegistrarUsuarioComponent } from './components/usuario/registrar-usuario/registrar-usuario.component';
import { EditarInmuebleComponent } from './components/inmueble/editar-inmueble/editar-inmueble.component';
import { GuardService as guard } from './login/guards/guard.service';
import { SinglelistingComponent } from './components/inmueble/singlelisting/singlelisting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultageneralComponent } from './components/inmueble/consultageneral/consultageneral.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './components/inmueble/inicio/inicio.component';
import { RegistroComponent } from './login/registro/registro/registro.component';
import { InmueblesComponent } from './components/inmueble/inmuebles/inmuebles.component';
import { RegistrarInmuebleComponent } from './components/inmueble/registrar-inmueble/registrar-inmueble.component';
import { UsuariosComponent } from './components/usuario/usuarios/usuarios.component';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';
import { InmueblesUsuarioComponent } from './components/inmueble/inmuebles-usuario/inmuebles-usuario.component';

const routes: Routes = [
  {path:'consultageneral', component:ConsultageneralComponent},
  {path:'',redirectTo:'consultageneral',pathMatch:'full'},
  {path:'singelisting/:id', component:SinglelistingComponent},
  {path:'login', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path:'inicio', component:InicioComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] }},
  {path:'inmuebles',component:InmueblesComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user','comercial'] }},
  {path:'editarinmueble/:id',component:EditarInmuebleComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] }},
  {path:'registrarinmueble',component:RegistrarInmuebleComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] }},
  {path:'usuarios',component:UsuariosComponent, canActivate: [guard], data: { expectedRol: ['admin', 'comercial' , 'user'] }},
  {path:'registarusuario',component:RegistrarUsuarioComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  {path:'editarusuario/:id',component:EditarUsuarioComponent,canActivate: [guard], data: { expectedRol: ['admin', 'user', 'comercial'] }},
  {path:'inmueblesusuario/:id',component:InmueblesUsuarioComponent,canActivate: [guard], data: { expectedRol: ['admin', 'comercial'] }}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
