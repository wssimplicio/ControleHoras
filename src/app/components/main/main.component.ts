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
    horaFinal: ''
  }

  listHours : ControlHours[] = []

  ngOnInit(): void {
    const id  = this.route.snapshot.paramMap.get('id')

    this.service.showCheckPoints(parseInt(id!)).subscribe((listHours) =>{
      this.listHours = listHours
    })
  }

  saveCheckPoint(){

    this.service.saveCheckPoint(this.controlHours).subscribe(() => {
      window.location.reload();
    })
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
