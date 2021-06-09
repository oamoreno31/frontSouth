import Swal from 'sweetalert2';
import { NuevoUsuario } from './../../models/nuevo-usuario';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  rols: string[] = [];
  isLogged = false;
  isRegister = false;
  isRegisterFail = false;
  nuevoUsuario: NuevoUsuario;
  nombre: string;
  identificacion: string;
  apellido: string;
  telefono: string;
  correo: string;
  clave: string;
  estado: string = "Activo";
  errMsj: string;
  constructor(private router: Router, private tokenService: TokenService,
    private authServive: AuthService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.router.navigate(['consultageneral']);
    }
  }

  onRegister(): void {
    this.rols.push('user');
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.identificacion, this.apellido, this.telefono, this.correo.toLowerCase(), this.clave, this.estado, this.rols);
    this.authServive.nuevo(this.nuevoUsuario).subscribe(
      data => {
        this.isRegister = true;
        this.isRegisterFail = false;
        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'Tu cuenta ha sido registrada, ya puedes iniciar sesión'
        })
        this.router.navigate(['consultageneral']);
      },
      err => {
        this.isRegisterFail = true;
        this.isRegister = false;
        this.errMsj = err.error.mensaje;
        console.log(this.errMsj)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '' + this.errMsj,
          footer: 'Si el problema persiste, Comunicate con un administrador.'
        })
      }
    );
  }
}
