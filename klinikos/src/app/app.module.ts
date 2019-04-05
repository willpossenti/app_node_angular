import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PessoaComponent } from './controller/cadastro/pessoa/pessoa.component';
import { RegistroBoletimComponent } from './controller/registroboletim/registroboletim.component';


import { PessoaService } from './controller/cadastro/pessoa/pessoa.service';
import { RegistroBoletimService } from './controller/registroboletim/registroboletim.service';

import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    AppComponent,
    PessoaComponent,
    RegistroBoletimComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    OrderModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'cadastro', component: PessoaComponent },
      { path: '', component: RegistroBoletimComponent, pathMatch: 'full' },
    ])
  ],
  providers: [PessoaService, RegistroBoletimService],
  bootstrap: [AppComponent]
})
export class AppModule { }
