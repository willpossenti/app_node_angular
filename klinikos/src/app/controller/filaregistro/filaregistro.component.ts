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
import { FilaRegistroEvento } from 'src/app/model/FilaRegistroEvento';
import * as swal from '../../../assets/vendors/general/sweetalert2/dist/sweetalert2.js';
import { FilaRegistro } from 'src/app/model/FilaRegistro';
import * as Toastr from 'toastr';

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
  dataUltimaRemocao: Date;

  constructor(private FilaRegistroService: FilaRegistroService, private AcolhimentoService: AcolhimentoService,private auth: AuthGuard) {

    this.listaEspecialidade = new Array<Especialidade>();
    this.listaPreferencial = new Array<Preferencial>();
   
    Toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };

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
  this.ConsultarNovosRegistros();
}, 2000);


  }

 

  ConsultaFila(){

    this.listaFila = [];
    this.FilaRegistroService.BuscarFilaRegistro().subscribe(async (data: Return) => {
      console.log('2');
      console.log(this.listaFilaRegistro);
      console.log(data.result);

      //  if(this.listaFilaRegistro.length === 0 && data.result !== null)
      //    Toastr.info("Fila atualizada");

      this.listaFilaRegistro = data.result;
      this.onBindGrid(this.listaFilaRegistro);

    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });

  }

  onBindGrid(lista: any){

    var idlinha = 1;
    lista.sort((g, h) => 
    {
    if(g.dataEntradaFilaRegistro > h.dataEntradaFilaRegistro)
      return 1;
    if(g.dataEntradaFilaRegistro < h.dataEntradaFilaRegistro)
      return -1;
    return 0;
    }).sort((e, f) => 
    {
    if(e.idoso80 > f.idoso80)
      return -1;
    if(e.idoso80 < f.idoso80)
      return 1;
    return 0;
    })
    .sort((c, d) => 
    {
    if(c.preferencial > d.preferencial)
      return -1;
    if(c.preferencial < d.preferencial)
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
          preferencial: itemFila.preferencial,
          filaRegistroId: itemFila.filaRegistroId
      };

      this.listaFila.push(item);
      idlinha++;

    });
  

    this.onBindPaginacao("inicial");

  }



  ConsultarNovosRegistros(){
  
    if(this.listaFilaRegistro !== undefined){

    var filaRegistro = this.listaFilaRegistro.sort((a, b) => 
    {
    if(a.dataEntradaFilaRegistro > b.dataEntradaFilaRegistro)
      return -1;
    if(a.dataEntradaFilaRegistro < b.dataEntradaFilaRegistro)
      return 1;
    return 0;
    })[0];

    var filaregistroevento: FilaRegistroEvento = {
        filaRegistro: filaRegistro
    };

    this.FilaRegistroService.ConsultarRegistrosNovos(filaregistroevento).subscribe(async (data: Return) => {
    
      if(data.result !== null){
        if(data.result.filaRegistro !== null){
            this.listaFila = [];
            this.listaFilaRegistro.push(data.result.filaRegistro);
            this.onBindGrid(this.listaFilaRegistro);

            Toastr.info("Fila atualizada");
        }
      } else {
  

        if(this.dataUltimaRemocao === undefined)
            filaregistroevento.dataFilaRegistroEvento = filaRegistro.dataEntradaFilaRegistro;
        else
            filaregistroevento.dataFilaRegistroEvento = this.dataUltimaRemocao;


            console.log(this.dataUltimaRemocao);

        this.FilaRegistroService.ConsultarRegistrosRetirados(filaregistroevento).subscribe(async (subdata: Return) => {


          if(subdata.result !== null)
            if(subdata.result.filaRegistro !== null){

              var index = this.listaFilaRegistro.findIndex(x => x.filaRegistroId === subdata.result.filaRegistro.filaRegistroId);

              if(index >= 0){
    
              this.listaFilaRegistro.splice(index, 1);
              this.listaFila = [];
              this.onBindGrid(this.listaFilaRegistro);
              this.dataUltimaRemocao = subdata.result.dataFilaRegistroEvento;
              Toastr.info("Fila atualizada");
              }
         
          }
     
        }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
    
        });

      }
    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);

    });
  }
  else{
    this.ConsultaFila();

  }
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

    //  if(minutos > new Date().getMinutes())
    //   return (hora-1) +'h '+ minutos+ 'min';

    if(hora > 1)
    return hora +'h '+ minutos+ 'min';


    return minutos+ 'min';
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

        this.listaPaginas = [];

        this.totalPaginas = Math.ceil(this.listaFila.length/ Number(this.NumeroRegistrosGrid));

        for(let i = 0; i <= (this.totalPaginas + 1); i++)

            if(i === 0)
              this.listaPaginas.push(["Anterior"]);
            else if (i === (this.totalPaginas + 1))
                this.listaPaginas.push(["Próximo"]);
            else
              this.listaPaginas.push(i);

      this.inicioGrid = 0;
      this.finalGrid = this.NumeroRegistrosGrid; 
      this.paginaAtual = 1;

      $(document).ready(function () {
        $(".page-item").removeClass("active");
        $("#1").addClass("active");
      });

    }else {
      var page = this;

        if(value == "Anterior"){

          if(page.paginaAtual > 2){
  
            page.paginaAtual--;
            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#"+(page.paginaAtual).toString()).addClass("active");
            });

            value = page.paginaAtual;
            this.inicioGrid = (Number(this.NumeroRegistrosGrid) * (value - 1)).toString();
            this.finalGrid = (Number(this.inicioGrid) * value).toString();

          }else{

            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#1").addClass("active");
            });
            page.paginaAtual = 1;
            this.inicioGrid = "0";
            this.finalGrid = this.NumeroRegistrosGrid;
           
          }

        }else if(value == "Próximo"){
          if(page.paginaAtual !== this.totalPaginas){

            page.paginaAtual++;

            value = page.paginaAtual;

            this.inicioGrid = (Number(this.NumeroRegistrosGrid) * (value - 1)).toString();
            this.finalGrid = (Number(this.inicioGrid) * value).toString();

            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#"+ value).addClass("active");

            });

            

          }
          }else{


            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#"+ (this.totalPaginas - 1)).addClass("active");

            });
          
          
          if(value !== 1){
            this.inicioGrid = (Number(this.NumeroRegistrosGrid) * (value - 1)).toString();
            this.finalGrid = (Number(this.inicioGrid) * value).toString();

            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#" +value).addClass("active");

            });
            
          }else{
            
            this.inicioGrid = "0";
            this.finalGrid = this.NumeroRegistrosGrid;

            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#1").addClass("active");

            });
          }

          this.paginaAtual = value;
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

  onEvasaoSemAtendimento(filaRegistroId: any){

    var page = this;

    swal({ title: 'Deseja realizar a saída da fila?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })
    .then(function (result) {
      if (result.value) {
     
        page.onRetirarItemFila(filaRegistroId);
       

      }
    });


  }

  onRetirarItemFila(filaRegistroId: any) {

     var index = this.listaFila.findIndex(x => x.filaRegistroId === filaRegistroId);
     this.listaFila.splice(index, 1);

     var item = this.listaFilaRegistro.find(x => x.filaRegistroId === filaRegistroId);
      item.ativo = false;

      this.FilaRegistroService.RetirarFila(item).subscribe(async (data: Return) => {

 

      this.FilaRegistroService.ConsultarEvento("REMOVER FILA").subscribe(async (subdata: Return) => {

        if(subdata.result !== null){

          var date = new Date();
          var filaregistroevento: FilaRegistroEvento = {
            filaRegistro: item,
            dataFilaRegistroEvento: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())),
            eventoId: subdata.result.eventoId
        };


        this.FilaRegistroService.AdicionarFilaEvento(filaregistroevento).subscribe(async (subdata2: Return) => {

          Toastr.success("Paciente retirado da fila");
        }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
    
        });

      }

        }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
    
        });

      
    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);

    });

  }

}
