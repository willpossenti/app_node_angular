import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Location } from '@angular/common';

@Component({
  selector: 'app-klinikos',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],


})
export class MasterComponent implements OnInit {
  title = 'app';


  constructor(private router: ActivatedRoute,
    private route: Router, private location: Location) {

    var classname = document.getElementsByClassName("k-grid-nav-v2__item");

    for (var i = 0; i < classname.length; i++) {
      classname[i].addEventListener('click', (e: Event) => this.getpage(e));
    }



  }

  public ngOnInit() {




    $(document).ready(function () {




      $('body').css("background", "");
      $('body').addClass("k-header--fixed k-header-mobile--fixed k-subheader--enabled k-subheader--transparent k-aside--enabled k-aside--fixed k-page--loading");
      document.title = 'Home | Klinikos';









    });

  }

  logout() {

    this.route.navigate(['login']);
  }


  getpage(event) {


    $(document).ready(function () {
      $("#k_offcanvas_toolbar_quick_actions").removeClass("k-offcanvas-panel--on");
      $("body").removeClass("k-offcanvas-panel--on");
      $("div").remove(".k-offcanvas-panel-overlay");
      $("#kt_blockui_3_5").click();


    });



    if (event.target.id === "registroboletim")
      setTimeout(() =>

        //this.route.navigate(['registroboletim'], { relativeTo: this.router })
        window.location.replace("http://localhost:4200/klinikos/registroboletim")
        , 1000);
    else {
      setTimeout(() =>
        window.location.replace("http://localhost:4200/klinikos/cadastro")
        //this.route.navigate(['cadastro'], { relativeTo: this.router })

        , 1000);
    }






  }

}
