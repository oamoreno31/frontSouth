import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/login/services/auth.service';
import { NuevoUsuario } from 'src/app/login/models/nuevo-usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  rols: string[] = []
  roles: string;
  nuevoUsuario: NuevoUsuario;
  nombre: string;
  identificacion: string;
  apellido: string;
  telefono: string;
  correo: string;
  clave: string;
  estado: string = "Activo";
  constructor(private authServive: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registrar() {
    this.rols.push(this.roles);
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.identificacion, this.apellido, this.telefono, this.correo.toLowerCase(), this.clave, this.estado, this.rols);

    this.authServive.nuevo(this.nuevoUsuario).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'La cuenta ha sido registrada, ya puede iniciar sesión'
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
          text: 'Ha habido un fallo al registrar el usuario ' + err.error.mensaje,
          footer: 'Si el problema persiste, Comunicate con un administrador.'
        })
      }
    );
  }


}
