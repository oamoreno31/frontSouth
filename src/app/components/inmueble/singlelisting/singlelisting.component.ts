
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inmueble } from 'src/app/classes/inmueble';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { Usuario } from 'src/app/classes/usuario';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { TokenService } from 'src/app/login/services/token.service';

@Component({
  selector: 'app-singlelisting',
  templateUrl: './singlelisting.component.html',
  styleUrls: ['./singlelisting.component.css']
})
export class SinglelistingComponent implements OnInit {
  images: any[] = [{
    img: 'assets/img/bg-img/hero4.jpg'
  },
  {
    img: 'assets/img/bg-img/hero5.jpg'
  }
  ];
  isLogged = false;
  id: number;
  inmuebles: Inmueble[];
  usuarios: Usuario[];
  constructor(private activatedroute: ActivatedRoute, private router: Router, private inmuebleService: InmuebleServiceService, private configcar: NgbCarouselConfig, private usuarioService: UsuarioServiceService, private tokenService: TokenService) {
    this.activatedroute.params.subscribe(data => {
      this.id = data.id;
    })
  }

  ngOnInit(): void {
    this.getInmuebles(this.id);
    this.getUsuarioid(this.id);
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }

  }

  getInmuebles(id: number) {
    this.inmuebleService.getInmuebleId(id).subscribe(response => {
      this.inmuebles = response;
      console.log(this.inmuebles);
    })
  }

  getUsuarioid(id: number) {
    this.usuarioService.usuarioInmueble(id).subscribe(data => {
      this.usuarios = data;
      console.log(this.usuarios);
    })
  }


}
