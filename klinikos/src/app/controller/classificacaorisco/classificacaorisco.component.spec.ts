import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificacaoRiscoComponent } from './classificacaorisco.component';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ClassificaoRiscoService } from './classificacaorisco.service';
import { AuthGuard } from '../auth/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MasterComponent', () => {
  let component: ClassificacaoRiscoComponent;
  let fixture: ComponentFixture<ClassificacaoRiscoComponent>;

  const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificacaoRiscoComponent  ],
      imports: [FormsModule, OrderModule, HttpClientModule, 
        RouterTestingModule.withRoutes(
          [{path: 'cadastro', component: ClassificacaoRiscoComponent}]
        ),     NgxMaskModule.forRoot(options), BrowserAnimationsModule ],
        
      providers: [ClassificaoRiscoService, AuthGuard]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificacaoRiscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
