import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  GroupData: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: Router
  ) { 
    this.GroupData = [];
  }

  Signupform = this.fb.group(
    {
      name: [''],
      email: [''],
      username: [''],
      password: [''],
    },
    { updateOn: 'submit' }
  );

  submit() {
    this.GroupData.push(this.Signupform);
    console.log(this.GroupData);
    var req = {
      method: 'POST',
      url: 'http://localhost:3000/register',
      body: JSON.stringify(this.Signupform.value),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    this.http
      .post<any>(req.url, req.body, { headers: req.headers })
      .subscribe((res) => {
        console.log(res);
      });
    this.route.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
