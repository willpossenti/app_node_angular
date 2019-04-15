import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']

})
export class MasterComponent implements OnInit {
  title = 'app';


  constructor(private router: Router) {

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


  getpage(event) {

    if (event.target.id === "registroboletim")
      this.router.navigate(['']);
    else
      this.router.navigate(['/cadastro']);

    $(document).ready(function () {
      $("#k_offcanvas_toolbar_quick_actions").removeClass("k-offcanvas-panel--on");
      $("body").removeClass("k-offcanvas-panel--on");
      $("div").remove(".k-offcanvas-panel-overlay");
      $("#kt_blockui_3_5").click();


    });


  }

}
