import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterComponent } from './master.component';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AuthGuard } from '../auth/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MasterComponent', () => {
  let component: MasterComponent;
  let fixture: ComponentFixture<MasterComponent>;

  const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

  //require('./../../../assets/demo/default/base/scripts.bundle.js');
  //require('./../../../assets/app/bundle/app.bundle.js');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterComponent  ],
      imports: [FormsModule, OrderModule, HttpClientModule, 
        RouterTestingModule.withRoutes(
          [{path: 'klinikos', component: MasterComponent}]
        ),     NgxMaskModule.forRoot(options), BrowserAnimationsModule],
        
      providers: [ AuthGuard]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
