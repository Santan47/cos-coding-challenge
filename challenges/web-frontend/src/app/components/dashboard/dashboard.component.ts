import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  carDetailsArrayOfJson : any = [];

  constructor(public dataservice:DataServiceService) {

  }

  ngOnInit() {
    const $dropdownOrigin = $('.js-dropdown__trigger');
    const $dropdownTrigger = $('.js-dropdown__trigger');
    const $dropdown = $('.js-dropdown');

    $dropdownTrigger.on('click', function() {
      $(this).closest('.js-dropdown__origin').find('.js-dropdown').toggleClass('is-active');
    });

    $('html').click(function() {                    
        $dropdown.removeClass('is-active');
    });

    $dropdownOrigin.click(function(e){
      e.stopPropagation();
    });
    this.getFetch();
  }

  getFetch(){
    this.dataservice.getDashboardDetails().then(data=>{
      this.carDetailsArrayOfJson = data;
    })
  }

}
