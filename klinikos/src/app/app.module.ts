import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
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
import { AcolhimentoService } from './controller/acolhimento/acolhimento.service';
import { ClassificaoRiscoService } from './controller/classificacaorisco/classificacaorisco.service';

import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CpfService } from './controller/util/cpf.service';
import { LoginComponent } from './controller/login/login.component';
import { MasterComponent } from './controller/master/master.component';
import { AcolhimentoComponent } from './controller/acolhimento/acolhimento.component';
import { ClassificacaoRiscoComponent } from './controller/classificacaorisco/classificacaorisco.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ClassificacaoRiscoPipe } from './controller/classificacaorisco/classificacaorisco.pipe';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { AtendimentoMedicoComponent } from './controller/atendimentomedico/atendimentomedico.component';
import { AtendimentoMedicoService } from './controller/atendimentomedico/atendimentomedico.service';
import { FilaatendimentoComponent } from './controller/filaatendimento/filaatendimento.component';
import { FilaregistroComponent } from './controller/filaregistro/filaregistro.component';
import { FilaclassificacaoriscoComponent } from './controller/filaclassificacaorisco/filaclassificacaorisco.component';
import { FilaRegistroService } from './controller/filaregistro/filaregistro.service';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'


const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'klinikos', component: MasterComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always', children: [
      { path: 'cadastro', component: PessoaComponent },
      { path: 'registroboletim', component: RegistroBoletimComponent, data : { data: {}} },
      { path: 'acolhimento', component: AcolhimentoComponent },
      { path: 'classificacaorisco', component: ClassificacaoRiscoComponent },
      { path: 'atendimentomedico', component: AtendimentoMedicoComponent },
      { path: 'filaatendimento', component: FilaatendimentoComponent },
      { path: 'filaregistro', component: FilaregistroComponent },
      { path: 'filaclassificacao', component: FilaclassificacaoriscoComponent }
    ]
  },


  { path: '**', redirectTo: '/login' },
];

registerLocaleData(localePt);

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PessoaComponent,
    RegistroBoletimComponent,
    LoginComponent,
    MasterComponent,
    AcolhimentoComponent,
    ClassificacaoRiscoComponent,
    ClassificacaoRiscoPipe,
    AtendimentoMedicoComponent,
    FilaatendimentoComponent,
    FilaregistroComponent,
    FilaclassificacaoriscoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    OrderModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes, { onSameUrlNavigation: 'reload' }
    ),
    NgxMaskModule.forRoot(options)
  ],
  providers: [
    PessoaService,
    RegistroBoletimService,
    LoginService,
    CpfService,
    AcolhimentoService,
    ClassificaoRiscoService,
    AtendimentoMedicoService,
    FilaRegistroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


