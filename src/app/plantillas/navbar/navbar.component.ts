import { TokenService } from './../../login/services/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged=false;
  roles:string[]=[];
  rol:string = 'user';
  constructor(private tokenService:TokenService, private router:Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
      if(this.roles.includes('ROLE_ADMIN')){
        this.rol = 'admin';
      } else if (this.roles.includes('ROLE_COMERCIAL')) {
        this.rol = 'comercial';
      }
    }
    else{
      this.isLogged=false;
    }
  }
  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
  }

}
