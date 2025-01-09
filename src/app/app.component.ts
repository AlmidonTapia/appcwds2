import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActividadesComponent } from "./actividades/actividades.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ActividadesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  person: any = {};

	constructor() {}
}
