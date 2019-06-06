import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AcolhimentoComponent } from './acolhimento.component';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { AcolhimentoService } from './acolhimento.service';

describe('AcolhimentoComponent', () => {
  let component: AcolhimentoComponent;
  let fixture: ComponentFixture<AcolhimentoComponent>;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcolhimentoComponent  ],
      imports: [FormsModule, OrderModule, HttpClientModule, 

        
        RouterTestingModule.withRoutes(
          [{path: 'acolhimento', component: AcolhimentoComponent}]
        ) ],
      providers: [AcolhimentoService]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcolhimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
