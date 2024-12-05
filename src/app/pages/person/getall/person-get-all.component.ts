import { Component } from '@angular/core';
import { PersonService } from '../../../api/person.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'person-get-all',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './person-get-all.component.html',
	styleUrl: './person-get-all.component.css'
})

export class PersonGetAllComponent {

listPerson: any[] = [];

	constructor(
		private personService: PersonService
	) {}

	ngOnInit() {
		this.personService.getAll().subscribe({
			next: (response: any) => {
				this.listPerson = response.response.listPerson;
			},
			error: (error: any) => {
				console.log(error);
			}
		});
	}
delete(idPerson: string): void{
	this.personService.delete(idPerson).subscribe({
		next: (response: any) => {
			this.listPerson = this.listPerson.filter(x => x.idPerson !== idPerson);
		},
		error: (error: any) => {
			console.log(error);
		}
	});
}
}