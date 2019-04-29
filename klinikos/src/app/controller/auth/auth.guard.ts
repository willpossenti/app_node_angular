
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

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
}
