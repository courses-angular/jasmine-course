import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 http = inject(HttpClient);
  
   constructor(
   
  ) { }

  SaveDetails(info: { sumVal: number; name: string; }) {
    return this.http.post('https://example.com/api/students', info);
  }
}
