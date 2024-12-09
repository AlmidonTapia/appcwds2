import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { PersonService } from '../../../api/person.service';
import { Router } from '@angular/router';

@Component({
	selector: 'person-insert',
	standalone: true,
	imports: [FormsModule,
		ReactiveFormsModule],
	templateUrl: './person-insert.component.html',
	styleUrl: './person-insert.component.css'
})

export class PersonInsertComponent {
	frmPersonInsert: UntypedFormGroup;

	get dniFb() { return this.frmPersonInsert.controls['dni']; }
	get firstNameFb() { return this.frmPersonInsert.controls['firstName']; }
	get surNameFb() { return this.frmPersonInsert.controls['surName']; }
	get emailFb() { return this.frmPersonInsert.controls['email']; }
	get birthDateFb() { return this.frmPersonInsert.controls['birthDate']; }
	get genderFb() { return this.frmPersonInsert.controls['gender']; }

	constructor(
		private personService: PersonService,
		private router: Router,
		private formBuilder: FormBuilder,

	) {
		this.frmPersonInsert = this.formBuilder.group({
			dni: ['', null],
			firstName: ['', null],
			surName: ['', null],
			email: ['', null],
			birthDate: ['', null],
			gender: ['', null]
		});
	}

	public save(): void {
		let formData = new FormData();

		formData.append('dni', this.dniFb.value);
		formData.append('firstName', this.firstNameFb.value);
		formData.append('surName', this.surNameFb.value);
		formData.append('birthDate', this.birthDateFb.value);
		formData.append('gender', this.genderFb.value);

		this.personService.insert(formData).subscribe({
			next: (response: any) => {
				console.log(response);
				this.goToList();
			},
			error: (error: any) => {
				console.log(error);
				this.goToList();
			}
		});
	}

	public goToList(): void {
		this.router.navigate(['/person/getall']);
	}
}