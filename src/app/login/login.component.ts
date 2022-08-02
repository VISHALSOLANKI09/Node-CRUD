import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Swal } from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  DataToBeValidated: any;
  constructor(private http: HttpClient, private route: Router) {
    this.username = '';
    this.password = '';
    this.DataToBeValidated = [];
  }

  submit() {
    this.DataToBeValidated.push({
      username: this.username,
      password: this.password,
    });
    console.log(this.DataToBeValidated);
    var req = {
      method: 'POST',
      url: 'http://localhost:3000/login',
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    this.http
      .post<any>(req.url, req.body, { headers: req.headers })
      .subscribe((res) => {
        console.log(res);
        if (res) {
          console.log(res);
          // swal.fire({
          //   title: 'Submit',
          //   text: 'Logged In Successfully',
          //   icon: 'success',
          // });
          this.route.navigate(['/feed']);
        } else {
          // res.render('Invalid Credentials');
          console.log('Invalid');
        }
      });
  }

  ngOnInit(): void {
  }

}
