import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const CORREO_KEY = 'AuthCorreo';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public setToken(token:string):void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getToken():string{
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setCorreo(correo:string):void{
    window.sessionStorage.removeItem(CORREO_KEY);
    window.sessionStorage.setItem(CORREO_KEY,correo);
  }

  public getCorreo():string{
    return sessionStorage.getItem(CORREO_KEY);
  }

  public setAuthorities(authorities:string[]):void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }
  public getAuthorities():string[]{
    this.roles = [];
    if(sessionStorage.getItem(AUTHORITIES_KEY)){
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      })
    }
    return this.roles;
  }

  public logOut(): void{
    window.sessionStorage.clear();
  }
}
