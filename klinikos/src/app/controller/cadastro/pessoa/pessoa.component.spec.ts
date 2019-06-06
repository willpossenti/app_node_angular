import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PessoaComponent } from './pessoa.component';
import { PessoaService } from './pessoa.service';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { CpfService } from '../../util/cpf.service';
import { AuthGuard } from '../../auth/auth.guard';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxMaskModule, IConfig } from 'ngx-mask';

describe('PessoaComponent', () => {
  let component: PessoaComponent;
  let fixture: ComponentFixture<PessoaComponent>;

  const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaComponent  ],
      imports: [FormsModule, OrderModule, HttpClientModule, 
        RouterTestingModule.withRoutes(
          [{path: 'cadastro', component: PessoaComponent}]
        ),     NgxMaskModule.forRoot(options) ],
        
      providers: [PessoaService, CpfService, AuthGuard]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
