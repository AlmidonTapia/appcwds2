import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PersonService } from '../../../api/person.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotifyComponent } from '../../../component/notify/notify.component';

@Component({
  selector: 'person-insert',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NotifyComponent],
  templateUrl: './person-insert.component.html',
  styleUrl: './person-insert.component.css',
})
export class PersonInsertComponent {
  frmPersonInsert: UntypedFormGroup;

  get dniFb() { return this.frmPersonInsert.controls['dni']; }
  get firstNameFb() { return this.frmPersonInsert.controls['firstName']; }
  get surNameFb() { return this.frmPersonInsert.controls['surName']; }
  get emailFb() { return this.frmPersonInsert.controls['email']; }
  get birthDateFb() { return this.frmPersonInsert.controls['birthDate']; }
  get genderFb() { return this.frmPersonInsert.controls['gender']; }

  typeResponse: string = '';
  listMessageResponse: string[] = [];

  constructor(
    private personService: PersonService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.frmPersonInsert = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      firstName: ['', [Validators.required]],
      surName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/)]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });
  }

  public save(): void {
    if (!this.frmPersonInsert.valid) {
      this.frmPersonInsert.markAllAsTouched();
      this.frmPersonInsert.markAsDirty();

      return;
    }

    let formData = new FormData();

    formData.append('dni', this.dniFb.value);
    formData.append('firstName', this.firstNameFb.value);
    formData.append('surName', this.surNameFb.value);
    formData.append('birthDate', this.birthDateFb.value);
    formData.append('gender', this.genderFb.value);

    this.personService.insert(formData).subscribe({
      next: (response: any) => {
        this.typeResponse = response.mo.type;
        this.listMessageResponse = response.mo.listMessage;

        switch (response.mo.type) {
          case 'success':
            this.frmPersonInsert.reset();

            break;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  public goToList(): void {
    this.router.navigate(['/person/getall']);
  }
}
