import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent  implements OnInit {
  perfil: string | null = null;
  tecladoAbierto: boolean = false;

  constructor(
    private router: Router
  ) {}


  ngOnInit() {
    this.perfil = localStorage.getItem('perfil');

    //listener para cuando el teclado se muestra o no 
    Keyboard.addListener('keyboardWillShow',()=>{
      this.tecladoAbierto = true;
    })

    Keyboard.addListener('keyboardWillHide',()=>{
      this.tecladoAbierto = false;
    })
  }

  navPagina(page: string){
    this.router.navigate([page]).then(()=>{
      location.reload();
    })
  }

  
}
