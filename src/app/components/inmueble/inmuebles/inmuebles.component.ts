import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/classes/inmueble';
import { Usuario } from 'src/app/classes/usuario';
import { TokenService } from 'src/app/login/services/token.service';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {

  id: number;
  rol: string = "user";
  roles: string[];
  usuario: Usuario[];
  inmuebles: Inmueble[];
  inmuebles2: Inmueble[];
  correo: string;
  constructor(private usuarioService: UsuarioServiceService, private tokenService: TokenService, private inmuebleService: InmuebleServiceService, private router: Router) { }

  ngOnInit(): void {
    this.correo = this.tokenService.getCorreo();
    this.roles = this.tokenService.getAuthorities();
    if (this.roles.includes('ROLE_ADMIN')) {
      this.rol = 'admin';
    } else if (this.roles.includes('ROLE_COMERCIAL')) {
      this.rol = 'comercial';
    }
    this.getUsuarioco(this.correo);
  }

  getUsuarioco(correo: string) {
    if (this.rol == "user") {
      this.usuarioService.getUsuarioCo(correo).subscribe(response => {
        this.usuario = response;
        this.inmuebles = this.usuario[0].inmueble;
        this.inmuebles2 = this.usuario[0].inmueble;

        const results: Inmueble[] = [];
        for (const inmueble of this.inmuebles) {
          if (inmueble.estado.toLowerCase() == "activo" || inmueble.estado.toLowerCase() == "vendido") {
            results.push(inmueble);
          }
        }
        this.inmuebles = results;
        console.log(this.inmuebles)
      })
    } else {
      this.inmuebleService.getInmuebles().subscribe(response => {
        this.inmuebles = response;
        this.inmuebles2 = response;
        console.log(this.inmuebles);
      })
    }
  }

  inactivarInmueble(id: number) {
    this.inmuebleService.deleteInmueble(id).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        confirmButtonText: `OK`,
        text: '¡Hemos eliminado el inmueble!'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error, intenta nuevamente',
        footer: 'Si el problema persiste, Comunicate con un administrador.'
      })
    });
  }
  venderInmueble(id: number) {
    this.inmuebleService.venderInmueble(id).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Vendido',
        confirmButtonText: `OK`,
        text: '¡Hemos cambiado el estado del inmueble a vendido!'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error, intenta nuevamente',
        footer: 'Si el problema persiste, Comunicate con un administrador.'
      })
    });
  }

  editar(id: number) {
    this.router.navigate(["editarinmueble", id]);
  }


  search(key: string): void {
    console.log(key);
    const results: Inmueble[] = [];
    for (const inmueble of this.inmuebles) {
      if (inmueble.estado.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        inmueble.direccion.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        inmueble.barrio.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        inmueble.tipo.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        inmueble.tipo_inmueble.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        inmueble.ciudad.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(inmueble);
      }
    }
    this.inmuebles = results;
    if (results.length === 0 || !key) {
      this.inmuebles = this.inmuebles2;
    }
  }
}
