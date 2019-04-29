import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './controller/auth/auth.guard';
import { AppComponent } from './app.component';
import { PessoaComponent } from './controller/cadastro/pessoa/pessoa.component';
import { RegistroBoletimComponent } from './controller/registroboletim/registroboletim.component';

import { LoginService } from './controller/login/login.service';
import { PessoaService } from './controller/cadastro/pessoa/pessoa.service';
import { RegistroBoletimService } from './controller/registroboletim/registroboletim.service';

import { OrderModule } from 'ngx-order-pipe';
import { CpfService } from './controller/util/cpf.service';
import { LoginComponent } from './controller/login/login.component';
import { MasterComponent } from './controller/master/master.component';




const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'klinikos', component: MasterComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always', children: [
      { path: 'cadastro', component: PessoaComponent },
      { path: 'registroboletim', component: RegistroBoletimComponent }
    ]
  },


  { path: '**', redirectTo: '/login' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
      appRoutes, { onSameUrlNavigation: 'reload' }
    )
  ],
  providers: [
    PessoaService,
    RegistroBoletimService,
    LoginService,
    CpfService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


