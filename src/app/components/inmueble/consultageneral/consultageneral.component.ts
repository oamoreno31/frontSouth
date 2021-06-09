import { Inmueble } from './../../../classes/inmueble';
import { Component, OnInit } from '@angular/core';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultageneral',
  templateUrl: './consultageneral.component.html',
  styleUrls: ['./consultageneral.component.css']
})
export class ConsultageneralComponent implements OnInit {
  //revisen como se hace el tipo de dato
  inmuebles: Inmueble[];
  inmuebles2: Inmueble[];
  //^^^^^^^^^^^^^^^^
  constructor(private inmuebleService: InmuebleServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getInmuebles()

  }

  singlelisting(id: number) {
    this.router.navigate(["singelisting", id]);
  }

  getInmuebles(): void {
    this.inmuebleService.getInmueblesActivos().subscribe((response: Inmueble[]) => {
      this.inmuebles = response;
      this.inmuebles2 = response;
      console.log(this.inmuebles);
    })
  }
  search(key: string): void {

    console.log(key)
      ; const results: Inmueble[] = [];
    for (const inmueble of this.inmuebles) {
      if (inmueble.tipo.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        inmueble.direccion.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        inmueble.tipo_inmueble.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        inmueble.ciudad.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        inmueble.barrio.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(inmueble);
      }
    }
    this.inmuebles = results;
    if (results.length === 0 || !key) {
      this.inmuebles = this.inmuebles2;
    }
  }

}
