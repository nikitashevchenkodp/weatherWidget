// daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// class WeatherWidget {
//   constructor(options) {
//     this.ellementToAppend = document.querySelector(options.ellementToAppend);
//     this.wheatherContainer = null;
//     this.location = localStorage.getItem('location') || options.location;
//     this.data = null;
//     this.dataSevenDays = null;
//     this.init();
//   }

//   getData = async (location, interval = 1) => {
//     try {
//       const response = await fetch(
//         `https://api.weatherapi.com/v1/forecast.json?key=8a989a0a161545fc9ea171901220609&q=${location}&days=${interval}&aqi=no&alerts=no`
//       );
//       if (!response.ok) {
//         throw new Error(`Could not fetch ${url}, recived ${response.status}`);
//       }
//       this.state = 'fullfilled';
//       return await response.json();
//     } catch (error) {
//       this.state = 'error';
//     }
//   };

//   _getMoreDays() {
//     if (!this.dataSevenDays) {
//       this.getData(this.location, 7)
//         .then((res) => {
//           this.dataSevenDays = res;
//           this._renderMoreDays(res);
//         })
//         .then(() => document.querySelector('.weather__seven').classList.toggle('weather__open'));
//     } else {
//       document.querySelector('.weather__seven').classList.toggle('weather__open');
//     }
//   }

//   init() {
//     if (!this.wheatherContainer) {
//       const weather = document.createElement('div');
//       weather.classList.add('weather');
//       this.wheatherContainer = weather;
//       this.ellementToAppend.append(this.wheatherContainer);
//     }
//     this.wheatherContainer.innerHTML = `Loading..............`;
//     this.getData(this.location)
//       .then((data) => this.render(data))
//       .then(() => this._innitEventListeners());
//   }

//   changeLocation(newLocation) {
//     localStorage.setItem('location', newLocation);
//     this.location = newLocation;
//     console.log(this.location);
//     this.dataSevenDays = null;
//     this.init();
//   }

//   _checkImage(text) {
//     if (text.toLowerCase().includes('rain')) {
//       return `./assets/Group 8night_rain.png`;
//     } else if (text.toLowerCase().includes('sun') || text.toLowerCase().includes('clear')) {
//       return `./assets/Ellipse 4sun.svg`;
//     } else {
//       return `./assets/Group 16sunny_cloudddd.svg`;
//     }
//   }

//   _innitEventListeners() {
//     this.wheatherContainer.querySelector('.weather__more').addEventListener('click', () => {
//       this.wheatherContainer.querySelector('.weather__settings').classList.remove('weather__settings__open');
//       this._getMoreDays();
//     });
//     this.wheatherContainer.querySelector('.weather__settings-btn').addEventListener('click', () => {
//       this.wheatherContainer.querySelector('.weather__seven') &&
//         this.wheatherContainer.querySelector('.weather__seven').classList.remove('weather__open');
//       this.wheatherContainer.querySelector('.weather__settings').classList.toggle('weather__settings__open');
//     });
//     this.wheatherContainer.querySelector('.weather__settings-input').addEventListener('input', (e) => {
//       console.log(e.target.value);
//     });
//     this.wheatherContainer.querySelector('.weather__button').addEventListener('click', () => {
//       const newCity = this.wheatherContainer.querySelector('.weather__settings-input').value;
//       this.changeLocation(newCity);
//     });
//   }

//   _renderMoreDays(data) {
//     const { forecast } = data;
//     const items = forecast.forecastday
//       .map((dayItem) => {
//         return `
//             <li class="weather__list-item">
//                     <div class="weather__day">${daysInWeek[new Date(dayItem.date).getDay()]}</div>
//                     <div class="weather__condition">
//                         <img class="weather__condition__img" src="https:${dayItem.day.condition.icon}" />
//                     </div>
//                     <div class="weather__temperature"> ${dayItem.day.maxtemp_c}° / ${dayItem.day.mintemp_c}°</div>
//                 </li>
//         `;
//       })
//       .join('\n');
//     const content = `
//             <div class="weather__seven">
//             <ul class="weater__list">
//                 <li class="weather__list-header">
//                     <div class="day">Day</div>
//                     <div class="condition">Condition</div>
//                     <div class="temperature">Degrees</div>
//                 </li>
//                 ${items}
//             </ul>
//         </div>
//         `;
//     this.wheatherContainer.insertAdjacentHTML('beforeend', content);
//   }

//   renderSettings() {}

//   render(data) {
//     console.log(data);
//     const { current, location } = data;
//     this.wheatherContainer.innerHTML = `
//         <img class="weather__settings-btn" src="./assets/OOjs_UI_icon_advanced-invert.svg"/>
//         <div class="weather__inner">
//             <div class="weather__main">
//                 <img class="weather__image" src="${this._checkImage(current.condition.text)}" />
//                 <div>
//                     <div class="weather__degrees">${current.temp_c}°</div>
//                     <div class="weather__location">${this.location}</div>
//                     <div class="weather__description">${current.condition.text}</div>
//                 </div>
//             </div>
//             <div class="weather__extra">
//                 <div class="weather__item">
//                     <img class="weather__icon" src="./assets/Group 35wind_icon.svg" />
//                     <div class="weather__data">${current.wind_kph} km/h</div>
//                 </div>
//                 <div class="weather__item">
//                     <img class="weather__icon" src="./assets/cloudcloud_icon.svg" />
//                     <div class="weather__data">${current.cloud} %</div>
//                 </div>
//                 <div class="weather__item">
//                     <img class="weather__icon" src="./assets/Vectoruv_icon.svg" />
//                     <div class="weather__data">${current.uv} of 10</div>
//                 </div>
//             </div>
//             <div class="weather__more">more</div>
//             <div class="weather__settings">
//             <div class="weather__settings-block">
//                 <label for="city">
//                     Change the city
//                 </label>
//                 <input class="weather__settings-input" id="city" type="text" value="${this.location}">
//             </div>
//             <div class="weather__settings-block">
//                 <label for="city">
//                     Change days quantity
//                 </label>
//                 <input class="weather__settings-input" id="city" type="text">
//             </div>
//             <button class="weather__button">save</button>
//         </div>
//         </div>`;
//   }
// }

// const weatherWidget = new WeatherWidget({
//   ellementToAppend: '.container',
//   location: 'Prague',
// });
