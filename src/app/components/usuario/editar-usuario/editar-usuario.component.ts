import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Inmueble } from 'src/app/classes/inmueble';
import { Usuario } from 'src/app/classes/usuario';
import { TokenService } from 'src/app/login/services/token.service';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  idU: number;
  roles: string[];
  rol: string = 'user';
  correo: string;
  usuario: Usuario[]
  constructor(private tokenService: TokenService, private usuarioService: UsuarioServiceService, private router: Router, private activatedroute: ActivatedRoute) {
    this.activatedroute.params.subscribe(data => {
      this.idU = data.id;
    })
  }

  ngOnInit(): void {
    this.correo = this.tokenService.getCorreo();
    this.roles = this.tokenService.getAuthorities();
    if (this.roles.includes('ROLE_ADMIN')) {
      this.rol = 'admin';
    }
    this.getUsuarioid(this.idU);
  }

  getUsuarioid(id: number) {
    this.usuarioService.getUsuarioId(id).subscribe(data => {
      this.usuario = data;
    })
  }
  editar() {
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'La cuenta ha sido actualizada'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['usuarios'])
        }
      })
    },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha habido un fallo al actualizar el usuario ' + err.error.mensaje,
          footer: 'Si el problema persiste, Comunicate con un administrador.'
        })
      })
  }
}
