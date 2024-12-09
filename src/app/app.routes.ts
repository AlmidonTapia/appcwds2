import { Routes } from '@angular/router';
import { PersonInsertComponent } from './pages/person/insert/person-insert.component';
import { PersonGetAllComponent } from './pages/person/getall/person-get-all.component';

export const routes: Routes = [
	{ 
	path: '',
	redirectTo: '',
	pathMatch: 'full',
	title: 'Home'	
	},
	{
	path: 'person/insert',
	component: PersonInsertComponent,
	title: 'Insertar Persona'
	},
	{
	path: 'person/getall',
	component: PersonGetAllComponent,
	title: 'Lista de Personas'
},
];
