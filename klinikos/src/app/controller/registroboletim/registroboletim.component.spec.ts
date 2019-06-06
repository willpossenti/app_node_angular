import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroBoletimComponent } from './registroboletim.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from '../auth/auth.guard';
import { LoginComponent } from '../login/login.component';


require('./../../../assets/demo/default/base/scripts.bundle.js');
require('./../../../assets/app/bundle/app.bundle.js');

describe('RegistroBoletimComponent', () => {
  let component: RegistroBoletimComponent;
  let fixture: ComponentFixture<RegistroBoletimComponent>;

  const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroBoletimComponent,LoginComponent  ],
      imports: [FormsModule, OrderModule, HttpClientModule, 
        RouterTestingModule.withRoutes(
          [{path: 'login', component: LoginComponent},
          {path: 'registroboletim', component: RegistroBoletimComponent}]
        ),     NgxMaskModule.forRoot(options), BrowserAnimationsModule],
        
      providers: [AuthGuard],
    
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroBoletimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
