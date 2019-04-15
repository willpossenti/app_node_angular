import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) { }

  ngOnInit() {


    $(document).ready(function () {

      $('body').css("background", "#0C3D8A url(../../../assets/media/misc/bg_login.jpg)");
      $('body').addClass("k-login-v1--enabled k-header--fixed k-header-mobile--fixed k-subheader--enabled k-subheader--transparent k-aside--enabled k-aside--fixed k-page--loading");
      document.title = 'Login | Klinikos';
    });
  }


  public onLogar(p: NgForm) {

   
    this.router.navigate(['/home', { outlets: ['cadastro'] }]);
  }

}
