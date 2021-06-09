import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {


  constructor(private http:HttpClient) { }

  Url = "http://localhost:8080/inalpes/api";

  getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.Url+"/usuario");
  }
  createUsuario(usuario:Usuario):Observable<Usuario[]>{
    return this.http.post<Usuario[]>(this.Url+"/usuario",usuario);
  }
  getUsuarioId(id:number):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.Url+"/usuario/"+id)
  }
  getUsuarioId2(id:number):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.Url+"/usuario2/"+id)
  }
  actualizarUsuario(usuario:Usuario[]):Observable<Usuario[]>{
    return this.http.put<Usuario[]>(this.Url+"/usuario",usuario)
  }
  eliminarUsuario(id:Number):Observable<Usuario[]>{
    return this.http.delete<Usuario[]>(this.Url+"/usuario/"+id)
  }

  usuarioInmueble(id:Number):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.Url+"/usuarioIn/"+id)
  }

  Login(usuario:string, clave:string):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.Url}/usuarioLogin/${usuario}/${clave}`)
  }
  getUsuarioCo(correo:string):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.Url}/usuarioCo/${correo}`)
  }

}
