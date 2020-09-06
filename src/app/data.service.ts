import { Injectable } from '@angular/core';
import { map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private readonly http: HttpClient) {}

  getData() {
    return this.http.get("https://api.covid19api.com/summary").pipe(
      map(response => {
        var tset:any
        tset=response
        const Global = tset.Global;
        const  Countries  = tset.Countries;
        const majorStats = this.getstructureData(Global)
        return {
          majorStats,
          countries: Countries.sort(
            (countryA, countryB) =>
              countryB.NewConfirmed - countryA.NewConfirmed
          )
        };
      }),
    );
  }


  getstructureData(data){
    const {
      NewConfirmed,
      TotalConfirmed,
      NewDeaths,
      TotalDeaths,
      NewRecovered,
      TotalRecovered
    } = data;
  let majorStats = [
    {
      title: "Total Confirmed",
      stat: TotalConfirmed,
      color: "#F9345E"
    },
    {
      title: "Active Confirmed",
      stat: NewConfirmed,
      color: "#FA6400"
    },
    {
    title: "Total Recovered",
    stat: TotalRecovered,
    color: "#1CB142"
    },
    {
    title: "Total Deaths",
    stat: TotalDeaths,
    color: "#6236FF"
    }];
   return majorStats 
  }
  
}
