import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { FilaRegistroService } from './filaregistro.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthGuard } from '../auth/auth.guard';
import { Return } from 'src/app/model/Return';
import { AcolhimentoService } from '../acolhimento/acolhimento.service';
import { Especialidade } from 'src/app/model/Especialidade';
import * as moment from 'moment';
import { Preferencial } from 'src/app/model/Preferencial';


@Component({
  selector: 'app-filaregistro',
  templateUrl: './filaregistro.component.html',
  styleUrls: ['./filaregistro.component.css']
})
export class FilaregistroComponent implements OnInit, OnDestroy {


  listaFilaRegistro: any;
  listaPaginas: Array<any> = [];
  listaEspecialidade: Array<Especialidade>;
  listaPreferencial: Array<Preferencial>;
  listaFilaCustom: Array<any>;
  NumeroRegistrosGrid: any;
  listaFila: Array<any> = [];
  searchText: any;
  inicioGrid: any;
  finalGrid: any;
  paginaAtual: any;
  totalPaginas: any;
  interval: any;

  constructor(private FilaRegistroService: FilaRegistroService, private AcolhimentoService: AcolhimentoService,private auth: AuthGuard) {

    this.listaEspecialidade = new Array<Especialidade>();
    this.listaPreferencial = new Array<Preferencial>();
   
   }

 

  ngOnInit() {

    this.inicioGrid = "0";
    this.NumeroRegistrosGrid = this.finalGrid = "10";
    this.paginaAtual = 1;

    $(document).ready(function () {
 
      document.title = 'Fila de Registro | Klinikos';
      $("h3[class^=k-subheader__title]").html("Fila de Registro");

        $.getScript("../../../assets/app/custom/general/interface.js", function (data: any, textStatus: any, jqxhr: any) {
        });

        $.getScript("../../../assets/vendors/general/block-ui/jquery.blockUI.js", function (data: any, textStatus: any, jqxhr: any) {
        });

        $.getScript("../../../assets/app/custom/general/components/extended/blockui.js", function (data: any, textStatus: any, jqxhr: any) {
        });
    });

    this.AcolhimentoService.BindEspecialidade().subscribe(async (data: Return) => {
      this.listaEspecialidade = data.result;

  
    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });

    this.FilaRegistroService.BindPreferencial().subscribe(async (data: Return) => {
      this.listaPreferencial = data.result;
    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });

    this.ConsultaFila(); 

this.interval = setInterval(() => { 
  
  this.ConsultaFila(); 

}, 4000);


  }

  ConsultaFila(){
    $.noConflict();
    $(document).ready(function () {
      
      KApp.block('#k_content', {
        overlayColor: '#000000',
        type: 'v2',
        state: 'primary',
        message: 'Atualizando...'
    });

    setTimeout(function() {
      KApp.unblock('#k_content');
  }, 2000);

    });
   
    this.listaFila = [];
    this.FilaRegistroService.BuscarFilaRegistro().subscribe(async (data: Return) => {

      this.listaFilaRegistro = data.result;

      var idlinha = 1;

      this.listaFilaRegistro.sort((c, d) => 
      {
      if(c.idoso80 > d.idoso80)
        return -1;
      if(c.idoso80 < d.idoso80)
        return 1;
      return 0;
      })
      .sort((e, f) => 
      {
      if(e.preferencial > f.preferencial)
        return -1;
      if(e.preferencial < f.preferencial)
        return 1;
      return 0;
      }).sort((a, b) => 
      {
      if(a.acolhimento.risco > b.acolhimento.risco)
        return -1;
      if(a.acolhimento.risco < b.acolhimento.risco)
        return 1;
      return 0; 
      }).forEach(itemFila => {

        let item = {
            idlinha: idlinha,
            nomepaciente: itemFila.acolhimento.pessoaPaciente.nomeSocial != null? 
            itemFila.acolhimento.pessoaPaciente.nomeSocial +' ['+itemFila.acolhimento.pessoaPaciente.nomeCompleto+']':itemFila.acolhimento.pessoaPaciente.nomeCompleto,
            
            especialidade: itemFila.acolhimento.especialidadeId !== "00000000-0000-0000-0000-000000000000"? 
            this.GetEspecialidade(itemFila.acolhimento.especialidadeId): "",
            
            descricaoPreferencial: itemFila.acolhimento.preferencialId !== "00000000-0000-0000-0000-000000000000"? 
            this.GetPreferencial(itemFila.acolhimento.preferencialId):"",
            
            dataEntradaFilaRegistro: moment(itemFila.dataEntradaFilaRegistro).format("DD/MM/YYYY HH:mm"),
            tempoEspera: this.GetTempoEspera(itemFila.dataEntradaFilaRegistro),
            risco: itemFila.acolhimento.risco,
            idoso80: itemFila.idoso80,
            preferencial: itemFila.preferencial
        };

        this.listaFila.push(item);
        idlinha++;
      });


      this.onBindPaginacao("inicial");

    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });


  }

  GetEspecialidade(especialidadeId: string){
    if(this.listaEspecialidade.length > 0)
    return this.listaEspecialidade.find(x=>x.especialidadeId === especialidadeId).descricao;
  }
  GetPreferencial(preferencialId: string){
       return this.listaPreferencial.find(x=>x.preferencialId === preferencialId).nome;
  }

  GetTempoEspera(dataEntradaFilaRegistro: Date){

    const hora = Math.round(moment(new Date()).diff(dataEntradaFilaRegistro,'minutes') /60);
    const minutos = Math.round(moment(new Date()).diff(dataEntradaFilaRegistro,'minutes') % 60);

    if(minutos > new Date().getHours())
      return (hora-1) +'h '+ minutos+ 'min';

    return hora +'h '+ minutos+ 'min';

  }


  SelecionarPaciente(){

    alert('teste');

  }

  onBindPaginacao(value: any){

    if(value === "inicial"){
      if(Number(this.NumeroRegistrosGrid) < this.listaFila.length){
        $(document).ready(function () { $("#paginacaoGrid").removeClass("oculta");});

        this.listaPaginas = [];

        this.totalPaginas = Math.ceil(this.listaFila.length/ Number(this.NumeroRegistrosGrid));

        for(let i = 0; i <= (this.totalPaginas + 1); i++)

            if(i === 0)
              this.listaPaginas.push(["Anterior"]);
            else if (i === (this.totalPaginas + 1))
                this.listaPaginas.push(["Próximo"]);
            else
              this.listaPaginas.push(i);

             
      }

    }
  
    else if(value === "linhasexibicao"){

      if(Number(this.NumeroRegistrosGrid) > this.listaFila.length)
        $(document).ready(function () { $("#paginacaoGrid").addClass("oculta");});
      else
        $(document).ready(function () { $("#paginacaoGrid").removeClass("oculta");});

      this.finalGrid = this.NumeroRegistrosGrid; 

    }else {
      var page = this;

      $(document).ready(function () {
        $(".page-item").removeClass("active");
        $("#"+value).addClass("page-item active");


      });
    
        if(value == "Anterior"){
          if(page.paginaAtual !== 1){
            page.paginaAtual--;
            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#"+(page.paginaAtual).toString()).addClass("active");
            });

            value = page.paginaAtual;
          }
        }else if(value == "Próximo"){
          if(page.paginaAtual !== this.listaFila.length){
          page.paginaAtual++;

            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#"+(page.paginaAtual).toString()).addClass("active");
            });

            value = page.paginaAtual;
          }
          }
          
          
          if(value !== 1){
            this.inicioGrid = this.NumeroRegistrosGrid;
            this.finalGrid = (Number(this.inicioGrid) * 2).toString();
          }else{
    
            this.inicioGrid = "0";
            this.finalGrid = this.NumeroRegistrosGrid;
          }

    }

  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  onExibeBotoesPainel(id: any){

    $(document).ready(function () {

      if(!$("#icon_microfone"+id).hasClass('c-vermelho')){

        $("#icon_microfone"+id).attr("class", "fas fa-microphone-alt-slash c-vermelho i-s1");
        $("#btnCancelarChamadaPainel"+id).removeClass('oculta');

      }else{

        $("#icon_microfone"+id).attr("class", "fas fa-microphone-alt i-s1");
        $("#btnCancelarChamadaPainel"+id).addClass('oculta');

      }
    });
  }

}
