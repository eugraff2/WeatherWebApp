import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component <{}, any>{

  constructor(props:any) {
    super(props);
    this.state = {
      weather : String,
      location : String, 
    } // state members
  } // constructor

  cities = 
  [
   {
    location: "Rochester NY",
    lat: 43.15,
    lon: -77.61,
   },
   {
    location: "Miami FL",
    lat: 25.76,
    lon: -80.19
   },
   {  
    location: "Athens GA",
    lat: 33.95,
    lon: -83.36
   }
  ] // cities

   getDate() {
      let newDate = new Date();
      let day = newDate.getDate();
      let month = newDate.getMonth();
      let year = newDate.getFullYear();
      return month + "/" + day + "/" + year;
  } // getDate

   apiKey = 'd11748c3d7732604b78a0bc37651048d';

   getUrl(index:number) {
    let loc:string = this.cities[index].location;
    this.setState({location: loc}); // allows easy use of location when changing message

    let lat:number = this.cities[index].lat;
    let lon:number = this.cities[index].lon;

    let queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + lon
      + '&units=imperial&exclude=minutely,hourly,daily,alerts&appid=' + this.apiKey;
    return queryURL;
  } // getUrl

  setWeather(url:string) {
    axios.get(url).then(response => {
      let loc = this.state.location;
      let overall:any = response.data.current.weather.main;
      let temp:number = response.data.current.temp;
      let feels:number = response.data.current.feels_like;

      let messageWeather = ("Today " + this.getDate() + " in " + loc  + " the weather is "
      + overall + ". The current temperature is " + temp + " and it feels like " + feels);
      this.setState({weather: messageWeather})      // updates the message displayed on the page 
    });
  } // setWeather

  handleClick(index:number) {
    let url = this.getUrl(index);
    this.setWeather(url);
  } // handleClick  

  render () {
    return (
    <div>

      <ul>
        <button onClick = {() => this.handleClick(0)}>Rochester, NY</button>
        <button onClick = {() => this.handleClick(1)}>Miami, FL</button>
        <button onClick = {() => this.handleClick(2)}>Athens, GA</button>
      </ul>
      
        {this.state.weather}

    </div>
    ); // end return
  } // end render

}; // App


export default App;
