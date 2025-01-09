import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class PersonService {
	constructor(
		private httpClient: HttpClient
	) { }

	// public getData(): Observable<any> {
	// 	return this.httpClient.get(`http://localhost:8080/person/getdata`);
	// 	// backsito de .net
	// 	// return this.httpClient.get(`http://localhost:5191/person/getdata`);
	// }

	// public insert(formData: FormData): Observable<any> {
	// 	return this.httpClient.post(`http://localhost:8080/person/insert`, formData);
	// 	//backsito de .net
	// 	// return this.httpClient.post(`http://localhost:5191/person/insert`, formData);

	// }

	// public getAll(): Observable<any> {
	// 	return this.httpClient.get(`http://localhost:8080/person/getall`);
	// 	// backsito de .net
	// 	// return this.httpClient.get(`http://localhost:5191/person/getall`);
	// }

	// public delete(idPerson: string): Observable<any> {
	// 	return this.httpClient.delete(`http://localhost:8080/person/delete/${idPerson}`);
	// 	// backsito de .net
	// 	// return this.httpClient.delete(`http://localhost:5191/person/delete/${idPerson}`);
	// }

	// public update(formData: FormData): Observable<any> {
	// 	return this.httpClient.post(`http://localhost:8080/person/update`, formData);
	// 	// backsito de .net
	// 	// return this.httpClient.post(`http://localhost:5191/person/update`, formData);
	// }

	// public login(formData: FormData): Observable<any> {
	// 	return this.httpClient.post<any>('http://localhost:8080/person/login', formData).pipe(retry(3));
	// }




	public insert(formData: FormData): Observable<any> {
		return this.httpClient.post(`http://localhost:8080/actividades/insert`, formData);

	}

	public getAll(): Observable<any> {
		return this.httpClient.get(`http://localhost:8080/actividades/getall`);
	}

	public delete(idActividad: string): Observable<any> {
		return this.httpClient.delete(`http://localhost:8080/actividades/delete/${idActividad}`);
	}

	public update(formData: FormData): Observable<any> {
		return this.httpClient.post(`http://localhost:8080/actividades/update`, formData);
	}

}