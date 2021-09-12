import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  baseUrl : "https://api-core-dev.caronsale.de/api";
  public selectedData:any = {};

  constructor(public http: HttpClient) { }

  setSelectedAgentData(selectedTableRowData){
    this.selectedData = selectedTableRowData;
  }
  getSelectedAgentData(){
    return this.selectedData;
  }

  getDashboardDetails(){
    return new Promise(function (resolve, reject) {
      let carData;
      let headersList = {
        "userid": window.localStorage.getItem('userEmail'),
        "authtoken": window.localStorage.getItem('token')
      }

      const apiUrl = "https://api-core-dev.caronsale.de/api/v2/auction/buyer/?filter="+window.localStorage.getItem('userEmail')+"&count=false";

      fetch(apiUrl, { 
        method: "GET",
        headers: headersList
      }).then(function(response) {
        return response.text();
      }).then(function(data) {
        carData = JSON.parse(data);
        resolve(carData)
      })
    });
  }
}