import { LoginUsuario } from './models/login-usuario';
import { AuthService } from './services/auth.service';
import { Usuario } from 'src/app/classes/usuario';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarios: Usuario[];
  errorusuario = '';

  isLogged = false;
  isLogginFail = false;
  loginUsuario: LoginUsuario;
  correo: string;
  clave: string;
  roles: string[] = [];
  errMsj: string;



  constructor(private router: Router, private tokenService: TokenService,
    private authServive: AuthService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
      this.router.navigate(['consultageneral']);
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.correo.toLowerCase(), this.clave);
    this.authServive.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.isLogginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setCorreo(data.correo);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['consultageneral']);

      },
      err => {
        this.isLogged = false;
        this.isLogginFail = true;
        this.errMsj = err.error.mensaje + "";
        console.log(this.errMsj)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.errMsj,
          footer: 'Si el problema persiste, Comunicate con un administrador.'
        })
      }
    );
  }
}
