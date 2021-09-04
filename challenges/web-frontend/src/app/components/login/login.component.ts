import { Component, OnInit } from '@angular/core';
// import { promise } from 'protractor';
import Swal from 'sweetalert2'
// import {DataServiceService} from '../../services/data-service.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'login';
  constructor() { }

  ngOnInit() {
    let baseUrl = "https://api-core-dev.caronsale.de/api";
    function Login(email,password){
      return new Promise((resolve,reject) => {
        fetch(baseUrl + "/v1/authentication/"+email+"/registered")
          .then(res => {
            if(res["status"] == 204){
              resolve({
                "result":"submitted",
                "ids":email+password,
                "data":res
              })
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'Sorry!',
                text: 'Your Email is not registred!'
              })
            }
            // console.log(res)
          })
      })
      // -----------------------------------------------------------------------------------------------
    }

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    $('.btn').click(function(e){
      let email = $("#email").val()
      let password = $("#passwd").val()
      console.log("s");
      if(validateEmail(email)){// if(email == "salesman@random.com" && password == "123test" || email == "dealership@alwaysAvailable.com" && password == "test123"){
          Login(email,password).then((data) => {
            // console.log(data);
            window.location.replace('http://localhost:4200/dashboard');
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
    })

  }

}
