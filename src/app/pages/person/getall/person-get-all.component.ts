import { Component, TemplateRef } from '@angular/core';
import { PersonService } from '../../../api/person.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup,  FormBuilder} from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
	selector: 'person-get-all',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	providers: [BsModalService],
	templateUrl: './person-get-all.component.html',
	styleUrl: './person-get-all.component.css'
})

export class PersonGetAllComponent {

	frmEditPerson: UntypedFormGroup;
	indexToModify: number = -1;

	get idPersonFb(){ return this.frmEditPerson.controls['idPerson']; }
	get firstNameFb(){ return this.frmEditPerson.controls['firstName']; }
	get surNameFb(){ return this.frmEditPerson.controls['surName']; }
	get dniFb(){ return this.frmEditPerson.controls['dni']; }
	get genderFb(){ return this.frmEditPerson.controls['gender']; }
	get birthDateFb(){ return this.frmEditPerson.controls['birthDate']; }
	
listPerson: any[] = [];

	constructor(
		private formBuilder: FormBuilder,
		private personService: PersonService,
		private modalService: BsModalService
	) {
		
		this.frmEditPerson = this.formBuilder.group({
			idPerson: [null, []],
			firstName: [null, []],
			surName: [null, []],
			dni: [null, []],
			gender: [null, []],
			birthDate: [null, []]
		});
	}

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

	showModal(modalEditPerson: TemplateRef<any>, index: any): void {
			this.indexToModify = index;

			this.idPersonFb.setValue(this.listPerson[index].idPerson);
			this.firstNameFb.setValue(this.listPerson[index].firstName);
			this.surNameFb.setValue(this.listPerson[index].surName);
			this.dniFb.setValue(this.listPerson[index].dni);
			this.genderFb.setValue(this.listPerson[index].gender.toString());
			this.birthDateFb.setValue(this.listPerson[index].birthDate.toString().substring(0, 10));

			this.modalService.show(modalEditPerson);
		}

	closeModal(): void {
		this.modalService.hide();
	}

	onClickSaveChanges(): void {
		let formData: FormData = new FormData();

		formData.append('idPerson', this.idPersonFb.value);
		formData.append('firstName', this.firstNameFb.value);
		formData.append('surName', this.surNameFb.value);
		formData.append('dni', this.dniFb.value);
		formData.append('gender', this.genderFb.value);
		formData.append('birthDate', this.birthDateFb.value);

		this.personService.update(formData).subscribe({
			next: (response: any) => {
				this.listPerson[this.indexToModify].firstName = this.firstNameFb.value;
					this.listPerson[this.indexToModify].surName = this.surNameFb.value;
					this.listPerson[this.indexToModify].dni = this.dniFb.value;
					this.listPerson[this.indexToModify].gender = this.genderFb.value == 'true';
					this.listPerson[this.indexToModify].birthDate = this.birthDateFb.value;

					this.modalService.hide();
				},
			error: (error: any) => {
				console.log(error);}
		});
	}
}