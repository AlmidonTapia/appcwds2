import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class PersonService {
	constructor(
		private httpClient: HttpClient
	) {}

	public getData(): Observable<any> {
		return this.httpClient.get(`http://localhost:8080/person/getdata`).pipe(retry(3));
	}
}