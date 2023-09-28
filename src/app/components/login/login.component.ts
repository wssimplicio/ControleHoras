import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user : User = {
    nome: '',
    grupo_id: 0,
    email: '',
    senha: '',
    status: 0,
    mensagem: '',
    id_usuario: 0
  }

  constructor (
    private service: UserService, 
    private router: Router
  ) {}

  login(){
     this.service.login(this.user).subscribe((retorno) => {
     
      if(retorno.status == 200){
        this.router.navigate([`main/${retorno.id_usuario}`])
      }
      else{
        alert('Usuario ou Senha Invalido!')
        this.user.senha = ''
      }
    },
    error =>{
      if(error['status'] == 400 || error['status'] == 500){
        alert(error['error']['mensagem'])
        this.user.senha = ''
      }
    })
  }

}
