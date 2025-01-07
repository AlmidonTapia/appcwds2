import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../api/person.service';
import { NotifyComponent } from '../component/notify/notify.component';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule, NotifyComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  frmLoginUser: UntypedFormGroup;

  get userNameFb() { return this.frmLoginUser.controls['email']; }
  get passwordFb() { return this.frmLoginUser.controls['password']; }

  typeResponse: string = '';
  listMessageResponse: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private personService: PersonService
  ) {
    this.frmLoginUser = this.formBuilder.group({
      email: ['', []],
      password: ['', []]
    });
  }

  onClickBtnSubmit(): void {
    if (!this.frmLoginUser.valid) {
      this.frmLoginUser.markAllAsTouched();
      this.frmLoginUser.markAsDirty();
      return;
    }

    let formData: FormData = new FormData();

    formData.append('email', this.userNameFb.value);
    formData.append('password', this.passwordFb.value);

    this.personService.login(formData).subscribe({
      next: (response: any) => {
        this.typeResponse = response.mo.type;
        this.listMessageResponse = response.mo.listMessage;
        switch (response.mo.type) {
          case 'success':
            localStorage.setItem('idPerson', response.dto.user.idUser);
            localStorage.setItem('firstName', response.dto.user.userName);
            this.router.navigateByUrl('/person/getall');


            this.frmLoginUser.reset();
            break;

        }
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  public goToList(): void {
    this.router.navigate(['/person/getall']);
  }
}
