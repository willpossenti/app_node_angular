import { TestBed, async, ComponentFixture, inject,  } from '@angular/core/testing';
import { LoginService } from './login.service';
import { User } from 'src/app/model/User';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


describe('LoginComponent', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;


    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [FormsModule, HttpClientModule, RouterTestingModule.withRoutes(
            [{path: 'login', component: LoginComponent}]
          )],
          
        providers: [ LoginService]
        
      })
      .compileComponents();
    }));

      beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

    
      it('should create', () => {
        expect(component).toBeTruthy();
      });


    var user: User = {

        username: "admin",
        password: "!q2w3e4r5t"
      };
    
  
    it('Usuário e senha válidos', inject([LoginService], (service: LoginService) => {
      expect(service.Authenticate(user)).toBeTruthy();
    }));
  
   // it('Usuário ou senha válido(s)', inject([LoginService], (service: LoginService) => {
   //   expect(service.Authenticate('dotnet', 'SP2')).toBeFalsy();
    //}));
  
  });