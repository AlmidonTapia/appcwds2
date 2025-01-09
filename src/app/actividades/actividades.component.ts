import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { PersonService } from '../api/person.service';
import { NotifyComponent } from '../component/notify/notify.component';


@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NotifyComponent],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent {
  frmPaisInsert: UntypedFormGroup;
  listPaises: any[] = [];
  typeResponse: string = '';
  listMessageResponse: string[] = [];



  ngOnInit() {
    this.personService.getAll().subscribe({
      next: (response: any) => {
        this.listPaises = response.dto.listPerson;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }


  get nombreActividadFb() {
    return this.frmPaisInsert.controls['nombre'];
  }
  get fechaInicioFb() {
    return this.frmPaisInsert.controls['fecha_hora_inicio'];
  }
  get fechaFinFb() {
    return this.frmPaisInsert.controls['fecha_hora_termino'];
  } 


  constructor(
    private personService: PersonService,
    private formBuilder: FormBuilder
  ) {

    this.frmPaisInsert = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      fecha_hora_inicio: ['', [Validators.required]],
      fecha_hora_termino: ['', [Validators.required]],
      

    });
  }
  public save(): void {
    if (!this.frmPaisInsert.valid) {
      this.frmPaisInsert.markAllAsTouched();
      this.frmPaisInsert.markAsDirty();

      return;
    }

    let formData = new FormData();

    formData.append('nombre', this.nombreActividadFb.value);
    formData.append('fecha_hora_inicio', this.fechaInicioFb.value);
    formData.append('fecha_hora_termino', this.fechaFinFb.value);
    

    this.personService.insert(formData).subscribe({
      next: (response: any) => {
        console.log(response);
        this.loadData();

      },
      error: (error: any) => {
        console.log(error);
        this.loadData();
      }
    });
  }

  delete(idActividad: string): void {
    this.personService.delete(idActividad).subscribe({
      next: (response: any) => {
        this.listPaises = this.listPaises.filter(x => x.idPais !== idActividad);
      },
      error: (error: any) => {
        console.log(error);
        this.loadData();
      }
    });
  }

  get filteredPaises() {
    return this.listPaises
      .sort((a, b) => new Date(a.fecha_hora_inicio).getTime() - new Date(b.fecha_hora_inicio).getTime());
  }

  loadData(): void {
    this.personService.getAll().subscribe({
      next: (response: any) => {
        this.listPaises = response.response.listPais;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
