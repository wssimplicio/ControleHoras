import { Component, OnInit } from "@angular/core";
import { ControlHours } from "src/app/interfaces/controlhours";
import { ControlhoursService } from "src/app/services/controlhours.service";
const returnData: any[] = [];

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private service: ControlhoursService) { }

  displayedColumns: string[] = ["data", "horaInicial", "horaFinal", "total"];
  dataSource = returnData;

  ngOnInit(): void {
    this.service.showCheckPoints(2).subscribe((i) => {
      const dataJson: ControlHours[] = [];

      for (const data of i) {
        dataJson.push({
          ...data,
          total: this.conversorDeSegundos((new Date(data.horaFinal).getTime() - new Date(data.horaInicial).getTime()))
        })
      }
      this.dataSource = dataJson;
      console.log(this.dataSource);
      console.log(dataJson)
    });
  }  

  conversorDeSegundos(milisegundos: number): string{
    const hours = Math.floor(milisegundos / (1000 * 60 * 60)); // Calcula as horas
    const minutes = Math.floor((milisegundos % (1000 * 60 * 60)) / (1000 * 60)); // Calcula os minutos restantes
  
    // Formata o resultado como "HH:mm"
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${formattedHours}:${formattedMinutes}`;
  }
}
