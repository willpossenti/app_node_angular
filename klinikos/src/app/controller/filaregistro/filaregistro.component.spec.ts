import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaregistroComponent } from './filaregistro.component';

describe('FilaregistroComponent', () => {
  let component: FilaregistroComponent;
  let fixture: ComponentFixture<FilaregistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilaregistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilaregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
