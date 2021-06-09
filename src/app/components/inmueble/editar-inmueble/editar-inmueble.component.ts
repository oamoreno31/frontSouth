import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inmueble } from 'src/app/classes/inmueble';
import { TokenService } from 'src/app/login/services/token.service';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css'],
  providers: [TitleCasePipe]
})
export class EditarInmuebleComponent implements OnInit {


  inmueble: Inmueble[];
  id: number;
  constructor(private activatedroute: ActivatedRoute, private inmuebleService: InmuebleServiceService, private tokenService: TokenService, private titleCasePipe: TitleCasePipe, private router: Router) {
    this.activatedroute.params.subscribe(data => {
      this.id = data.id;
    })
  }


  ngOnInit(): void {
    console.log(this.id);
    this.getInmueble(this.id);
  }

  getInmueble(id: number) {
    this.inmuebleService.getInmuebleId(id).subscribe(data => {
      this.inmueble = data;

    })
  }

  editar() {
    this.inmueble['ciudad'] = this.titleCasePipe.transform(this.inmueble['ciudad']);
    this.inmueble['barrio'] = this.titleCasePipe.transform(this.inmueble['barrio'])
    this.inmuebleService.editInmueble(this.inmueble).subscribe(response => {
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        confirmButtonText: `OK`,
        text: '¡El inmueble ha sido actualizado exitosamente!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['inmuebles']);
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
}
