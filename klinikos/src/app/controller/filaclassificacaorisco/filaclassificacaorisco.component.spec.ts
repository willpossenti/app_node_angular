import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaclassificacaoriscoComponent } from './filaclassificacaorisco.component';

describe('FilaclassificacaoriscoComponent', () => {
  let component: FilaclassificacaoriscoComponent;
  let fixture: ComponentFixture<FilaclassificacaoriscoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilaclassificacaoriscoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilaclassificacaoriscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
