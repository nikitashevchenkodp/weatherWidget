var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var WeatherWidget = /** @class */ (function () {
  function WeatherWidget(options) {
    var _this = this;
    this.getData = function (location, interval) {
      if (interval === void 0) {
        interval = 1;
      }
      return __awaiter(_this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3, , 4]);
              return [
                4 /*yield*/,
                fetch(
                  'https://api.weatherapi.com/v1/forecast.json?key=8a989a0a161545fc9ea171901220609&q='
                    .concat(location, '&days=')
                    .concat(interval, '&aqi=no&alerts=no')
                ),
              ];
            case 1:
              response = _a.sent();
              if (!response.ok) {
                throw new Error('Could not fetch , recived '.concat(response.status));
              }
              return [4 /*yield*/, response.json()];
            case 2:
              return [2 /*return*/, _a.sent()];
            case 3:
              error_1 = _a.sent();
              return [3 /*break*/, 4];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    };
    this.ellementToAppend = document.querySelector(options.ellementToAppend);
    this.wheatherContainer = null;
    this.location = localStorage.getItem('location') || options.location;
    this.data = null;
    this.dataSevenDays = null;
    this.init();
  }
  WeatherWidget.prototype._getMoreDays = function () {
    var _this = this;
    if (!this.dataSevenDays) {
      this.getData(this.location, 7)
        .then(function (res) {
          _this.dataSevenDays = res;
          _this._renderMoreDays(res);
        })
        .then(function () {
          return document.querySelector('.weather__seven').classList.toggle('weather__open');
        });
    } else {
      document.querySelector('.weather__seven').classList.toggle('weather__open');
    }
  };
  WeatherWidget.prototype.init = function () {
    var _this = this;
    if (!this.wheatherContainer) {
      var weather = document.createElement('div');
      weather.classList.add('weather');
      this.wheatherContainer = weather;
      this.ellementToAppend.append(this.wheatherContainer);
    }
    this.wheatherContainer.innerHTML = 'Loading..............';
    this.getData(this.location)
      .then(function (data) {
        return _this.render(data);
      })
      .then(function () {
        return _this._innitEventListeners();
      });
  };
  WeatherWidget.prototype.changeLocation = function (newLocation) {
    localStorage.setItem('location', newLocation);
    this.location = newLocation;
    console.log(this.location);
    this.dataSevenDays = null;
    this.init();
  };
  WeatherWidget.prototype._checkImage = function (text) {
    if (text.toLowerCase().includes('rain')) {
      return './assets/Group 8night_rain.png';
    } else if (text.toLowerCase().includes('sun') || text.toLowerCase().includes('clear')) {
      return './assets/Ellipse 4sun.svg';
    } else {
      return './assets/Group 16sunny_cloudddd.svg';
    }
  };
  WeatherWidget.prototype._innitEventListeners = function () {
    var _this = this;
    this.wheatherContainer.querySelector('.weather__more').addEventListener('click', function () {
      _this.wheatherContainer.querySelector('.weather__settings').classList.remove('weather__settings__open');
      _this._getMoreDays();
    });
    this.wheatherContainer.querySelector('.weather__settings-btn').addEventListener('click', function () {
      _this.wheatherContainer.querySelector('.weather__seven') &&
        _this.wheatherContainer.querySelector('.weather__seven').classList.remove('weather__open');
      _this.wheatherContainer.querySelector('.weather__settings').classList.toggle('weather__settings__open');
    });
    this.wheatherContainer.querySelector('.weather__button').addEventListener('click', function () {
      var input = _this.wheatherContainer.querySelector('.weather__settings-input');
      _this.changeLocation(input.value);
    });
  };
  WeatherWidget.prototype._renderMoreDays = function (data) {
    var forecast = data.forecast;
    var items = forecast.forecastday
      .map(function (dayItem) {
        return '\n            <li class="weather__list-item">\n                    <div class="weather__day">'
          .concat(
            daysInWeek[new Date(dayItem.date).getDay()],
            '</div>\n                    <div class="weather__condition">\n                        <img class="weather__condition__img" src="https:'
          )
          .concat(
            dayItem.day.condition.icon,
            '" />\n                    </div>\n                    <div class="weather__temperature"> '
          )
          .concat(dayItem.day.maxtemp_c, '\u00B0 / ')
          .concat(dayItem.day.mintemp_c, '\u00B0</div>\n                </li>\n        ');
      })
      .join('\n');
    var content =
      '\n            <div class="weather__seven">\n            <ul class="weater__list">\n                <li class="weather__list-header">\n                    <div class="day">Day</div>\n                    <div class="condition">Condition</div>\n                    <div class="temperature">Degrees</div>\n                </li>\n                '.concat(
        items,
        '\n            </ul>\n        </div>\n        '
      );
    this.wheatherContainer.insertAdjacentHTML('beforeend', content);
  };
  WeatherWidget.prototype.render = function (data) {
    console.log(data);
    var current = data.current;
    this.wheatherContainer.innerHTML =
      '\n        <img class="weather__settings-btn" src="./assets/OOjs_UI_icon_advanced-invert.svg"/>\n        <div class="weather__inner">\n            <div class="weather__main">\n                <img class="weather__image" src="'
        .concat(
          this._checkImage(current.condition.text),
          '" />\n                <div>\n                    <div class="weather__degrees">'
        )
        .concat(current.temp_c, '\u00B0</div>\n                    <div class="weather__location">')
        .concat(this.location, '</div>\n                    <div class="weather__description">')
        .concat(
          current.condition.text,
          '</div>\n                </div>\n            </div>\n            <div class="weather__extra">\n                <div class="weather__item">\n                    <img class="weather__icon" src="./assets/Group 35wind_icon.svg" />\n                    <div class="weather__data">'
        )
        .concat(
          current.wind_kph,
          ' km/h</div>\n                </div>\n                <div class="weather__item">\n                    <img class="weather__icon" src="./assets/cloudcloud_icon.svg" />\n                    <div class="weather__data">'
        )
        .concat(
          current.cloud,
          ' %</div>\n                </div>\n                <div class="weather__item">\n                    <img class="weather__icon" src="./assets/Vectoruv_icon.svg" />\n                    <div class="weather__data">'
        )
        .concat(
          current.uv,
          ' of 10</div>\n                </div>\n            </div>\n            <div class="weather__more">more</div>\n            <div class="weather__settings">\n            <div class="weather__settings-block">\n                <label for="city">\n                    Change the city\n                </label>\n                <input class="weather__settings-input" id="city" type="text" value="'
        )
        .concat(
          this.location,
          '">\n            </div>\n            <div class="weather__settings-block">\n                <label for="city">\n                    Change days quantity\n                </label>\n                <input class="weather__settings-input" id="city" type="text">\n            </div>\n            <button class="weather__button">save</button>\n        </div>\n        </div>'
        );
  };
  return WeatherWidget;
})();
var weatherWidget = new WeatherWidget({
  ellementToAppend: '.container',
  location: 'Kyiev',
});
