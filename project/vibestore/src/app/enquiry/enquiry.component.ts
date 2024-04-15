import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FormData {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent {
  formData: FormData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:3000/api/contact', this.formData)
      .subscribe(response => {
        console.log(response);
      });
  }
}
