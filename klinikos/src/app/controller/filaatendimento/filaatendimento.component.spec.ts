import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaatendimentoComponent } from './filaatendimento.component';

describe('FilaatendimentoComponent', () => {
  let component: FilaatendimentoComponent;
  let fixture: ComponentFixture<FilaatendimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilaatendimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilaatendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
