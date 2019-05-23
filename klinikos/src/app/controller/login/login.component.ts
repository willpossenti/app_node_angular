import { Component, OnInit, NgZone } from '@angular/core';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './login.service';
import { User } from '../../model/User';
import { Return } from '../../model/Return';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private readonly router: Router, private loginService: LoginService) {


  }

  ngOnInit() {


    $(document).ready(function () {

      $('body').css("background", "#0C3D8A url(../../../assets/media/misc/bg_login.jpg)");
      $('body').addClass("k-login-v1--enabled k-header--fixed k-header-mobile--fixed k-subheader--enabled k-subheader--transparent k-aside--enabled k-aside--fixed k-page--loading");
      document.title = 'Login | Klinikos';
    });
  }


  public onLogar(p: NgForm) {


    if (p.value.usuario.trim() === "") {
      $('.form-group').find('span').text('Informe o usuário');
      return;
    }

    if (p.value.senha.trim() === "") {
      $('.form-group').find('span').text('Informe a senha');
      return;
    }

    var user: User = {

      username: p.value.usuario,
      password: p.value.senha
    };

    this.loginService.Authenticate(user).subscribe(async (data: any) => {


      if (data.statusCode === 404 || data.statusCode === 401) {
        $('.form-group').find('span').text(data.message);
      } else {
        var RegExp = /["|']/g;
        localStorage.setItem('user', JSON.stringify(data.result));
        localStorage.setItem('token_accessToken', data.token.accessToken.replace(RegExp, ""));
        localStorage.setItem('token_expiracao', data.token.expiration.toString());

        this.router.navigate(['klinikos']);

        var userCadeco: any = {

          login: "prime_fcard",
          senha: "prime_fcard"
        };

        var js = JSON.stringify(userCadeco);

        this.loginService.AuthenticateCadeco(js).subscribe(async (data: any) => {

          localStorage.setItem('token_accessToken_cadeco', data.token);

        });

      }



    }, (error: HttpErrorResponse) => {

      $('.form-group').find('span').text('Erro ao comunicar com a API');
      console.log(error);
    });
  }

}
