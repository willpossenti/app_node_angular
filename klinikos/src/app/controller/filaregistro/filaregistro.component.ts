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
import * as Toastr from 'toastr';
import { PessoaService } from '../cadastro/pessoa/pessoa.service';
import { PessoaProfissional } from 'src/app/model/PessoaProfissional';
import { Router } from '@angular/router';

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
  dataUltimaChamadaPainel: Date;
  dataUltimaChamadaCancelada: Date;
  dataUltimaChamadaConfirmado: Date;
  idUltimaChamadaPainel: string;
  idUltimaChamadaCancelada: string;
  idUltimaChamadaConfirmado: string;
  itemRemovido: boolean;
  Profissional : PessoaProfissional;

  constructor(private route: Router, private FilaRegistroService: FilaRegistroService, private AcolhimentoService: AcolhimentoService, private pessoaService: PessoaService, 
    private auth: AuthGuard) {

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
    this.itemRemovido = false;    
    

    let user = JSON.parse(localStorage.getItem('user'));
    this.pessoaService.ConsultaProfissional(user.userId).subscribe(async (data: Return) => {
     this.Profissional = data.result;

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar o profissional");
      console.log(`Error. ${error.message}.`);
    });

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

    this.FilaRegistroService.BindPreferencial().subscribe(async (subdata: Return) => {
      this.listaPreferencial = subdata.result;
    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });

    setTimeout( () => {
      this.ConsultaFila();
  }, 1000);
  

    this.interval = setInterval(() => { 
      this.ConsultarNovosRegistros();
    }, 5000);

  }

 

  ConsultaFila(){

    this.listaFila = [];
    this.FilaRegistroService.BuscarFilaRegistro().subscribe(async (data: Return) => {
      this.listaFilaRegistro = data.result;
      this.onBindGrid(this.listaFilaRegistro);

      if(this.listaFilaRegistro.length === 1)
        Toastr.info("Fila atualizada");

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
          especialidade: this.GetEspecialidade(itemFila.acolhimento.especialidadeId),
          descricaoPreferencial: this.GetPreferencial(itemFila.acolhimento.preferencialId),
          dataEntradaFilaRegistro: moment(itemFila.dataEntradaFilaRegistro).format("DD/MM/YYYY HH:mm"),
          tempoEspera: this.GetTempoEspera(itemFila.dataEntradaFilaRegistro),
          risco: itemFila.acolhimento.risco,
          idoso80: itemFila.idoso80,
          preferencial: itemFila.preferencial,
          filaRegistroId: itemFila.filaRegistroId,
          pessoaId: itemFila.acolhimento.pessoaPaciente.pessoaId
      };

      this.listaFila.push(item);
      idlinha++;
      
    
    });

    this.onBindPaginacao("inicial");

  }


  ConsultarNovosRegistros(){

    var filaregistroevento: FilaRegistroEvento = {};

        if(this.listaFilaRegistro !== undefined){
          var filaRegistro = this.listaFilaRegistro.sort((a, b) =>  {
            if(a.dataEntradaFilaRegistro > b.dataEntradaFilaRegistro)
              return -1;
            if(a.dataEntradaFilaRegistro < b.dataEntradaFilaRegistro)
              return 1;
            return 0;
            })[0];

            filaregistroevento.filaRegistro = filaRegistro;
          }


            this.FilaRegistroService.ConsultarRegistrosNovos(filaregistroevento).subscribe(async (data: Return) => {
    
            if(data.result !== null){
              if(data.result.filaRegistro !== null){
                  this.listaFila = [];
                  this.listaFilaRegistro.push(data.result.filaRegistro);
                  this.onBindGrid(this.listaFilaRegistro);

                    Toastr.info("Fila atualizada");
              }
            } else {
  
            if(this.listaFilaRegistro.length > 0){

              if(this.dataUltimaRemocao === undefined)
                filaregistroevento.dataFilaRegistroEvento = filaRegistro.dataEntradaFilaRegistro;
              else
                filaregistroevento.dataFilaRegistroEvento = this.dataUltimaRemocao;         
         


              this.FilaRegistroService.ConsultarRegistrosRetirados(filaregistroevento).subscribe(async (subdata: Return) => {
                    

                  if(subdata.result !== null){
                    if(subdata.result.filaRegistro !== null){

                      var index = this.listaFilaRegistro.findIndex(x => x.filaRegistroId === subdata.result.filaRegistro.filaRegistroId);

                      if(index >= 0){
            
                        this.listaFilaRegistro.splice(index, 1);
                        this.listaFila = [];
                        this.onBindGrid(this.listaFilaRegistro);
                        this.dataUltimaRemocao = subdata.result.dataFilaRegistroEvento;
          
                        if(!this.itemRemovido)
                          Toastr.info("Fila atualizada");
                      }
                    }
                  }else{

                  if(this.idUltimaChamadaPainel !== undefined)
                    filaregistroevento.filaRegistroEventosId = this.idUltimaChamadaPainel;

                  if(this.dataUltimaChamadaPainel === undefined)
                    filaregistroevento.dataFilaRegistroEvento = filaRegistro.dataEntradaFilaRegistro;
                  else{
                    filaregistroevento.dataFilaRegistroEvento = this.dataUltimaChamadaPainel;         
                    this.idUltimaChamadaPainel = filaregistroevento.filaRegistroEventosId;
                  }

                        this.FilaRegistroService.ConsultarRegistrosChamadosAoPainel(filaregistroevento).subscribe(async (subdata2: Return) => {

                          if(subdata2.result !== null){
                            if(Number(moment(new Date()).diff(subdata2.result.dataFilaRegistroEvento,'minutes')) <= 5){
                              this.dataUltimaChamadaPainel = subdata2.result.dataFilaRegistroEvento;
                              this.idUltimaChamadaPainel = subdata2.result.filaRegistroEventosId;
                              Toastr.info("Paciente "+subdata2.result.filaRegistro.acolhimento.pessoaPaciente.nomeCompleto+" foi enviado ao Painel");
                            }
                          }else{

                            if(this.idUltimaChamadaCancelada !== undefined)
                            filaregistroevento.filaRegistroEventosId = this.idUltimaChamadaCancelada;
        
                            if(this.dataUltimaChamadaCancelada === undefined)
                              filaregistroevento.dataFilaRegistroEvento = filaRegistro.dataEntradaFilaRegistro;
                            else{
                              filaregistroevento.dataFilaRegistroEvento = this.dataUltimaChamadaCancelada;    
                              this.idUltimaChamadaCancelada = filaregistroevento.filaRegistroEventosId;
                            }

                            this.FilaRegistroService.ConsultarRegistrosCancelados(filaregistroevento).subscribe(async (subdata3: Return) => {

                              if(subdata3.result !== null){
                                if(Number(moment(new Date()).diff(subdata3.result.dataFilaRegistroEvento,'minutes')) <= 5){
                                  this.dataUltimaChamadaCancelada = subdata3.result.dataFilaRegistroEvento;
                                  this.idUltimaChamadaCancelada = subdata3.result.filaRegistroEventosId;
                                  Toastr.error("Paciente "+subdata3.result.filaRegistro.acolhimento.pessoaPaciente.nomeCompleto+" foi cancelado");
                                }
                              }else{


                                if(this.idUltimaChamadaConfirmado !== undefined)
                                filaregistroevento.filaRegistroEventosId = this.idUltimaChamadaConfirmado;
            
                                if(this.dataUltimaChamadaConfirmado === undefined)
                                  filaregistroevento.dataFilaRegistroEvento = filaRegistro.dataEntradaFilaRegistro;
                                else{
                                  filaregistroevento.dataFilaRegistroEvento = this.dataUltimaChamadaConfirmado;    
                                  this.idUltimaChamadaConfirmado = filaregistroevento.filaRegistroEventosId;
                                }

                                this.FilaRegistroService.ConsultarRegistrosConfirmados(filaregistroevento).subscribe(async (subdata4: Return) => {

                                 
                                  if(subdata4.result !== null){
                                    if(Number(moment(new Date()).diff(subdata4.result.dataFilaRegistroEvento,'minutes')) <= 5){

                                      this.dataUltimaChamadaConfirmado = subdata4.result.dataFilaRegistroEvento;
                                      this.idUltimaChamadaConfirmado = subdata4.result.filaRegistroEventosId;
                                      Toastr.success("Paciente "+subdata4.result.filaRegistro.acolhimento.pessoaPaciente.nomeCompleto+" foi confirmado");
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
                        }, (error: HttpErrorResponse) => {
                          this.auth.onSessaoInvalida(error);
                      });
                      
                    }

                  }, (error: HttpErrorResponse) => {
                    this.auth.onSessaoInvalida(error);
                });
              }
            }
          }, (error: HttpErrorResponse) => {
            this.auth.onSessaoInvalida(error);
          });


}

  GetEspecialidade(especialidadeId: string){

    if(especialidadeId !=='00000000-0000-0000-0000-000000000000' )
    return this.listaEspecialidade.find(x=>x.especialidadeId === especialidadeId).descricao;
    return '';
  }




  GetPreferencial(preferencialId: string){
    if(preferencialId !=='00000000-0000-0000-0000-000000000000' )
         return this.listaPreferencial.find(x=>x.preferencialId === preferencialId).nome;
    return '';
        
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


  SelecionarPaciente(item: any){
    
    
    this.pessoaService.ConsultaPessoaStatus("AB").subscribe(data => {

      var pessoa = this.listaFilaRegistro.find(x=>x.acolhimento.pessoaPaciente.pessoaId === item.pessoaId).acolhimento.pessoaPaciente;
      pessoa.pessoaStatusId = data.result.pessoaStatusId;

      this.pessoaService.AlterarPessoaPaciente(pessoa).subscribe(subdata => {


      }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
      });

    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });

    this.route.navigate(['klinikos/registroboletim'], {queryParams: {filaRegistroId: item.filaRegistroId}});

  

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

  onExibeBotoesPainel(index: any, tipo: any){

    var tipoBotao: any;
 
      if(!$("#icon_microfone"+index).hasClass('c-vermelho') && tipo === "chamada"){
        //realiza chamada
        $("#icon_microfone"+index).attr("class", "fas fa-microphone-alt-slash c-vermelho i-s1");
        $("#btnCancelarChamadaPainel"+index).removeClass('oculta');
        tipoBotao = "P";

      }else{
        //cancela chamada
        $("#icon_microfone"+index).attr("class", "fas fa-microphone-alt i-s1");
        $("#btnCancelarChamadaPainel"+index).addClass('oculta');
       
       if(tipo === "chamada")
          tipoBotao = "C";
        else
          tipoBotao = "O";
        
      
    }

      this.FilaRegistroService.ConsultarEvento(tipoBotao).subscribe(async (data: Return) => {
  
        if(data.result !== null){
  
          var date = new Date();
          var filaregistroevento: FilaRegistroEvento = {
            filaRegistro: this.listaFila[index],
            dataFilaRegistroEvento: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())),
            eventoId: data.result.eventoId,
            PessoaProfissional:  this.Profissional
        };
  
  
        this.FilaRegistroService.AdicionarFilaEvento(filaregistroevento).subscribe(async (subdata: Return) => {


          if(tipoBotao === "P"){
            this.idUltimaChamadaPainel = subdata.result.filaRegistroEventosId;
            Toastr.info("Paciente "+this.listaFila[index].nomepaciente+" enviada ao Painel");
          }
         if(tipoBotao=== "C"){
            this.idUltimaChamadaCancelada = subdata.result.filaRegistroEventosId;
            Toastr.error("Paciente "+this.listaFila[index].nomepaciente+" cancelada");
          }
           if(tipoBotao=== "O"){
            this.idUltimaChamadaConfirmado = subdata.result.filaRegistroEventosId;
            Toastr.success("Paciente "+this.listaFila[index].nomepaciente+" confirmado");

            var filaRegistro = this.listaFila[index];
            this.SelecionarPaciente(filaRegistro);
           
          }
        }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
    

        });
  
      }
     
        }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
  
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

 

      this.FilaRegistroService.ConsultarEvento("R").subscribe(async (subdata: Return) => {

        if(subdata.result !== null){

          var date = new Date();
          var filaregistroevento: FilaRegistroEvento = {
            filaRegistro: item,
            dataFilaRegistroEvento: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())),
            eventoId: subdata.result.eventoId,
            PessoaProfissional:  this.Profissional
        };


        this.FilaRegistroService.AdicionarFilaEvento(filaregistroevento).subscribe(async (subdata2: Return) => {
          this.itemRemovido = true;
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
