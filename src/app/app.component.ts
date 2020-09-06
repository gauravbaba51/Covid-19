import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';


export class Country {
  constructor(public Country: string, public CountryCode: string) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data$: Observable<any> = this.dataService.getData();
  majorStats:any;
  showresult:boolean=false
  countryCtrl: FormControl;
  filteredCountry: Observable<any[]>;
  country_lis: Country[]
  selectedCode:any

  constructor(private readonly dataService: DataService) {
    this.data$.subscribe(res=>{
      this.majorStats=res.majorStats
      this.country_lis=res.countries
    })
  }

  ngOnInit() {
    this.countryCtrl = new FormControl();
    this.filteredCountry = this.countryCtrl.valueChanges
      .pipe(
        startWith(''),
        map(country => country ? this.filtercountry(country) : this.country_lis.slice())
    );
  }

  filtercountry(name: string) {
    this.showresult=false
    return this.country_lis.filter(country => 
      country.Country.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  changeCountry(countryCode) {
    console.log(countryCode.value)
    this.data$.subscribe(res=>{
      res.countries.forEach(element => {
        if(element.CountryCode==countryCode.value){
          this.showresult=true
          this.majorStats=   this.dataService.getstructureData(element);
        }
      });
    })
  }


  displayFn(user): string | undefined {
    this.selectedCode=user ? user : ""
    return user 
  }
}