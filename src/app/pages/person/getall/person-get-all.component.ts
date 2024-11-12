import { Component } from '@angular/core';
import { PersonService } from '../../../api/person.service';

@Component({
	selector: 'person-get-all',
	standalone: true,
	imports: [],
	templateUrl: './person-get-all.component.html',
	styleUrl: './person-get-all.component.scss'
})

export class PersonGetAllComponent {
	person: any = {};

	constructor(
		private personService: PersonService
	) {}

	ngOnInit() {
		this.personService.getData().subscribe({
			next: (response: any) => {
				this.person = response;
			},
			error: (error: any) => {
				console.log(error);
			}
		});
	}
}