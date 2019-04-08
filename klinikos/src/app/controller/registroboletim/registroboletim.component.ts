import { Component, OnInit } from '@angular/core';
import { RegistroBoletimService } from './registroboletim.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-registroboletim',
  templateUrl: './registroboletim.component.html'
})
export class RegistroBoletimComponent implements OnInit {
  
  

  constructor(private registroBoletimService: RegistroBoletimService, private router: Router) {
   

  }

  public ngOnInit() {

    $(document).ready(function () { document.title = 'Registro Boletim | Klinikos'; });

  }





}


