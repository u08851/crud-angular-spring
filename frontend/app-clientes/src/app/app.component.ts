import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienbenido a Angular';

  curso: string = 'Curso de spring 5 con angular 8';

  profesor: string = 'Gamaliel humberto abanto quiroz';
}
