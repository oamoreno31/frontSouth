import Swal from 'sweetalert2';
import { Inmueble } from './../../../classes/inmueble';
import { Component, OnInit } from '@angular/core';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { TitleCasePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/login/services/token.service';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-inmueble',
  templateUrl: './registrar-inmueble.component.html',
  styleUrls: ['./registrar-inmueble.component.css'],
  providers: [TitleCasePipe]
})
export class RegistrarInmuebleComponent implements OnInit {

  certifcado: number = 1;
  estado: string = "Activo";
  ruta: number = 1;
  id: number;
  correo: string;
  inmueble: Inmueble[]
  constructor(private inmuebleService: InmuebleServiceService, private titleCasePipe: TitleCasePipe, private tokenService: TokenService, private usuarioService: UsuarioServiceService, private router: Router) { }

  ngOnInit(): void {

  }
  registrar(addForm: NgForm) {
    this.correo = this.tokenService.getCorreo();
    this.usuarioService.getUsuarioCo(this.correo).subscribe(data => {
      this.id = data[0].id;
      this.inmuebleService.insertInmueble(addForm.value, this.id).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          confirmButtonText: `OK`,
          text: '¡Hemos registrado el inmueble!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['inmuebles'])
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
    })


  }

}
