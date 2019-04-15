import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PessoaComponent } from './controller/cadastro/pessoa/pessoa.component';
import { RegistroBoletimComponent } from './controller/registroboletim/registroboletim.component';


import { PessoaService } from './controller/cadastro/pessoa/pessoa.service';
import { RegistroBoletimService } from './controller/registroboletim/registroboletim.service';


import { OrderModule } from 'ngx-order-pipe';
import { LoginComponent } from './controller/login/login.component';
import { MasterComponent } from './controller/master/master.component';


const appRoutes: Routes = [
  {
    path: 'home', component: MasterComponent,
    children: [{
      path: 'cadastro', component: PessoaComponent, outlet: 'cadastro'
    }]
  }
 ,
  { path: '', component: LoginComponent, pathMatch: 'full'  },
];

@NgModule({
  declarations: [
    AppComponent,
    PessoaComponent,
    RegistroBoletimComponent,
    LoginComponent,
    MasterComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    OrderModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [PessoaService, RegistroBoletimService],
  bootstrap: [AppComponent, LoginComponent]
})
export class AppModule { }
