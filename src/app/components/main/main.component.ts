import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlHours } from 'src/app/interfaces/controlhours';
import { ControlhoursService } from 'src/app/services/controlhours.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ControlhoursService
  ){}

  controlHours : ControlHours = {
    id: 0,
    id_usuario: parseInt(this.route.snapshot.paramMap.get('id')!),
    data: '',
    horaInicial: '',
    horaFinal: '',
    total: ''
  }

  listHours : ControlHours[] = []

  ngOnInit(): void {
    const id  = this.route.snapshot.paramMap.get('id')

    this.service.showCheckPoints(parseInt(id!)).subscribe((listHours) =>{
      
      let contador = 0
      var dataJson = [];

      while(contador < listHours.length){

        var id = listHours[contador].id
        var id_usuario = listHours[contador].id_usuario
        var data = listHours[contador].data
        var inicio = listHours[contador].horaInicial
        var fim  = listHours[contador].horaFinal
        var resultado

        var horaInicio = new Date(listHours[contador].horaInicial)
        var HoraFim = new Date(listHours[contador].horaFinal)
        var diferenca = HoraFim.getTime() - horaInicio.getTime()

        var horas = Math.round(diferenca/3600000)
        var min = ( diferenca / 60000 ) % 60

        if(horas.toString().length < 2 && min.toString().length < 2){
          var a = "0" + horas;
          var b = "0" + min;
          resultado =  a + ":" + b
        }
        else if(horas.toString().length < 2 && min.toString().length > 1){
          var a = "0" + horas;
          resultado =  a + ":" + min
        }
        else if(horas.toString().length > 1 && min.toString().length < 2){
          var b = "0" + min;
          resultado = horas + ":" + b
        }
        else{
          resultado = Math.round(horas) + ":" + min
        }       

        var myJson = { 
          id: id, 
          id_usuario: id_usuario, 
          data: data, 
          horaInicial: inicio,
          horaFinal: fim,
          total: resultado
        }

        dataJson.push(myJson)    
      
        contador ++
      }

      //console.log(dataJson)
      this.listHours = dataJson
      
    })
  }
  saveCheckPoint(){
    if(this.controlHours.horaFinal < this.controlHours.horaInicial){
      alert('Hora Fim não pode ser menor que Hora Inicio!')
      alert('Apontamentos após as 23:59 tem que ser realizo em duas etapas!\n O Primeiro Hora Inicio até 23:59 e o Segundo de 00:01 em diante')
    }
    else{
        this.service.saveCheckPoint(this.controlHours).subscribe(() => {
        window.location.reload();
      })
    }
  }

  deleteCheckPoint(id: any){
    this.service.deleteCheckPoint(id).subscribe(() =>{
      this.reloadPage();
    })
  }

  clear(){
    this.controlHours.data = ''
    this.controlHours.horaInicial = ''
    this.controlHours.horaFinal = ''
  }

  reloadPage(){
    window.location.reload();
  }

}
