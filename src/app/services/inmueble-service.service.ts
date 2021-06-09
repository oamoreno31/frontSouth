import { Inmueble } from './../classes/inmueble';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Usuario } from '../classes/usuario';

//los servicios están divididos por modulo para tener más orden
//Revisen los Observable:<Inmueble[]> de los metodos y la manera en la que se retorna "this.http.post<Inmueble[]>", por si necesitan agregar metodos
//Para Agregar servicios ng g s services/nombreService

@Injectable({
  providedIn: 'root'
})
export class InmuebleServiceService {

  constructor(private http:HttpClient) { }

  Url = "http://localhost:8080/inalpes/api";

  getInmuebles():Observable<Inmueble[]>{
    return this.http.get<Inmueble[]>(this.Url+'/Inmuebles');
  }

  insertInmueble(inmueble:Inmueble, id:number):Observable<Inmueble>{
    return this.http.post<Inmueble>(this.Url+"/Inmuebles/"+id, inmueble);
  }

  getInmuebleId(id:number):Observable<Inmueble[]>{
    return this.http.get<Inmueble[]>(this.Url+"/Inmuebles/"+id)
  }

  editInmueble(inmueble:Inmueble[]):Observable<Inmueble[]>{
    return this.http.put<Inmueble[]>(this.Url+"/Inmuebles",inmueble)
  }

  deleteInmueble(id:number):Observable<Inmueble[]>{
    return this.http.delete<Inmueble[]>(this.Url+"/Inmuebles/"+id)
  }
  venderInmueble(id:number):Observable<Inmueble[]>{
    return this.http.delete<Inmueble[]>(this.Url+"/Inmueblesvender/"+id)
  }

  getInmueblesActivos():Observable<Inmueble[]>{
    return this.http.get<Inmueble[]>(this.Url+"/InmueblesA");
  }


}
