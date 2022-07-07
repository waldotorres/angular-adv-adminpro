import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    
    const strTheme = localStorage.getItem('theme') || "./assets/css/colors/default-dark.css" ; 
    this.linkTheme?.setAttribute('href', strTheme)

   }

  changeTheme(theme:string){

    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url); 
    this.checkCurrentTheme();  
  }

  checkCurrentTheme(){

    const links = document.querySelectorAll('.selector');

    links.forEach(item=>{
      item.classList.remove('working');
      const btnTheme = item.getAttribute('data-theme');
      const btnThemeURL = `./assets/css/colors/${btnTheme}.css`;

      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeURL === currentTheme) {
        item.classList.add('working');
      }

    })


    
  }
  

}
