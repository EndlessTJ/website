import { Component, OnInit, OnDestroy } from '@angular/core';import { ApiService } from './api.service';@Component({  selector: 'app-weather',  templateUrl: './weather.component.html',  styleUrls: ['./weather.component.css']})export class WeatherComponet implements OnInit, OnDestroy{  private apiUrl: string ;  today: number;  isLoading: boolean = true;  dialogVisible: boolean;  panelShow: boolean = false;  daysOfWeek: string[] =  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];  forecastCity: any[];  initialWeatherForecastArray: any[] = [];  cityWoeid: string;  constructor(    private apiservice: ApiService  ){    this.forecastCity =  [{key:'2357536',label:'奥斯丁, TX'},{key:'2367105',label:'波士顿, MA'},{key:'2379574',label:'芝加哥, IL'},{key:'2459115',label:'纽约, NY'},{key:'2475687',label:'Portland, OR'},{key:'2487956',label:'圣弗朗西斯, CA'},{key:'2490383',label:'Seattle, WA'}];  }  ngOnInit ():void {    this.isLoading = false;    this.dialogVisible = false;    this.panelShow = true;    this.apiUrl = 'https://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid=';    this.today = new Date().getDay();    this.getForecast('2151330','Beijing, CN');  }  ngOnDestroy ():void {  }  toggleAddDialog (type) {    if (type === "add") this.dialogVisible = true;    else if (type == "cancel") this.dialogVisible = false;  }  addNewCity () {    if (this.cityWoeid) {      const cityObj = this.forecastCity.filter((value) => { return this.cityWoeid === value.key})[0];      this.dialogVisible = false;      this.getForecast(cityObj.key, cityObj.label);      this.initialWeatherForecastArray = this.initialWeatherForecastArray.concat([]);    }  }  updateForecast() {    this.initialWeatherForecastArray.forEach((value) => {      this.getForecast(value.key,value.label)    })  }  getIconClass (forecastData) {    // Weather codes: https://developer.yahoo.com/weather/documentation.html#codes    forecastData.channel.item.forecast.forEach((val, index) => {      let weatherCode = parseInt(val.code);      switch (weatherCode) {        case 25: // cold        case 32: // sunny        case 33: // fair (night)        case 34: // fair (day)        case 36: // hot        case 3200: // not available          return  forecastData.channel.item.forecast[index].className = 'clear-day';        case 0: // tornado        case 1: // tropical storm        case 2: // hurricane        case 6: // mixed rain and sleet        case 8: // freezing drizzle        case 9: // drizzle        case 10: // freezing rain        case 11: // showers        case 12: // showers        case 17: // hail        case 35: // mixed rain and hail        case 40: // scattered showers          return  forecastData.channel.item.forecast[index].className = 'rain';        case 3: // severe thunderstorms        case 4: // thunderstorms        case 37: // isolated thunderstorms        case 38: // scattered thunderstorms        case 39: // scattered thunderstorms (not a typo)        case 45: // thundershowers        case 47: // isolated thundershowers          return  forecastData.channel.item.forecast[index].className = 'thunderstorms';        case 5: // mixed rain and snow        case 7: // mixed snow and sleet        case 13: // snow flurries        case 14: // light snow showers        case 16: // snow        case 18: // sleet        case 41: // heavy snow        case 42: // scattered snow showers        case 43: // heavy snow        case 46: // snow showers          return  forecastData.channel.item.forecast[index].className = 'snow';        case 15: // blowing snow        case 19: // dust        case 20: // foggy        case 21: // haze        case 22: // smoky          return  forecastData.channel.item.forecast[index].className = 'fog';        case 24: // windy        case 23: // blustery          return  forecastData.channel.item.forecast[index].className = 'windy';        case 26: // cloudy        case 27: // mostly cloudy (night)        case 28: // mostly cloudy (day)        case 31: // clear (night)          return  forecastData.channel.item.forecast[index].className = 'cloudy';        case 29: // partly cloudy (night)        case 30: // partly cloudy (day)        case 44: // partly cloudy          return  forecastData.channel.item.forecast[index].className = 'partly-cloudy-day';      }    });    this.initialWeatherForecastArray.push(forecastData);  };  getForecast (key,label) {    const url = `${this.apiUrl}${key}`;    if ('caches' in window) {      caches.match(url).then((response) => {        if (response) {          response.json().then((json) => {            const results = json.query.results;            results.key = key;            results.label = label;            results.created = json.query.created;            this.getIconClass(results);          })        }      })    }    this.apiservice.fetchContent(url).subscribe(response=> {      const results = response.query.results;      results.key = key;      results.label = label;      results.created = response.query.created;      this.getIconClass(results);    })  }}