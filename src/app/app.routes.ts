import { PersonInsertComponent } from './pages/person/insert/person-insert.component';
import { PersonGetAllComponent } from './pages/person/getall/person-get-all.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{ 
	path: '',
	redirectTo: '/',
	pathMatch: 'full',
	title: 'Home'	
	},
	{ 
	path: 'person/login',
	component: LoginComponent },
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
