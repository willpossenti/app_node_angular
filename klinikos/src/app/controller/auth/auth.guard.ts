
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {


    if (localStorage['token_accessToken'] != null) {

      var expiracao = new Date(Date.parse(localStorage['token_expiracao']));

      if (expiracao < new Date())
        this.router.navigate(['/login']);
      else
        return true;

    } else {
      this.router.navigate(['/login']);
    }
  }

  onSessaoInvalida(error: HttpErrorResponse) {

    if (error.status === 0 || error.status === 401) {
      this.router.navigate(['/login']);

      if (error.status !== 0)
        console.log(`Error. ${error.message}.`);
      else
        console.log(`Error. Falha ao comunicar com a API`);
      return;
    }

  }


  onSessaoAcrescimoTempo() {

    var dt = new Date();
    dt.setMinutes(dt.getMinutes() + 20);
    localStorage.setItem('token_expiracao', dt.toLocaleString());

  }
     
}
