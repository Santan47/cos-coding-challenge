import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'login';
  constructor(private router: Router) { }

  ngOnInit() {
  }


  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  generateToken(email,passwd){
    let baseUrl = "https://api-core-dev.caronsale.de/api";
    return new Promise((resolve,reject) => {
      const data = {  
                    "password": passwd,  
                    "meta": "string" 
                  };
      fetch(baseUrl+'/v1/authentication/'+email, {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
        console.error('Error:', error);
      });
    })
  }

  // $('.btn').click(function(e){
  onsubmit(){
    let email = $("#email").val()
    let password = $("#passwd").val()
    if(this.validateEmail(email)){
      this.generateToken(email,password).then((dataToken) => {
          if(dataToken['msgKey']!='user.not-authenticated')
          {
            
            window.localStorage.setItem("userEmail",email);
            window.localStorage.setItem("token",dataToken["token"]);
            this.router.navigate(['dashboard'])
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Sorry!',
              text: 'Please enter correct credentials.'
            })
          }

        }).catch((err) => {
          Swal.fire({
                icon: 'error',
                title: 'Sorry!',
                text: 'Please enter correct credentials.'
              })
        });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Sorry!',
        text: 'Please enter correct email.'
      })
    }
  }

  // navDashboard() {
  //   this.router.navigate(['/dashboard']);
  // }
}
