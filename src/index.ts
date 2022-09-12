/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { Data, Options } from "./types";
import "./styles/style.scss";

const daysInWeek: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

class WeatherWidget {
  data: Data | null;

  ellementToAppend: HTMLElement | null;

  wheatherContainer: HTMLElement | null;

  location: string;

  dataSevenDays: Data | null;

  state: any;

  constructor(options: Options) {
    this.ellementToAppend = document.querySelector(options.ellementToAppend);
    this.wheatherContainer = null;
    this.location = localStorage.getItem("location") || options.location;
    this.data = null;
    this.dataSevenDays = null;
    this.init();
  }

  getData = async (location: string, interval: number = 1) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=8a989a0a161545fc9ea171901220609&q=${location}&days=${interval}&aqi=no&alerts=no`,
      );
      if (!response.ok) {
        throw new Error(`Could not fetch , recived ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  private getMoreDays(): void {
    if (!this.dataSevenDays) {
      this.getData(this.location, 7)
        .then((res) => {
          this.dataSevenDays = res;
          this.renderMoreDays(res);
        })
        .then(() =>
          document
            .querySelector(".weather__seven")!
            .classList.toggle("weather__open"),
        );
    } else {
      document
        .querySelector(".weather__seven")!
        .classList.toggle("weather__open");
    }
  }

  private init(): void {
    if (!this.wheatherContainer) {
      const weather = document.createElement("div");
      weather.classList.add("weather");
      this.wheatherContainer = weather;
      this.ellementToAppend!.append(this.wheatherContainer);
    }
    this.wheatherContainer.innerHTML = `Loading..............`;
    this.getData(this.location)
      .then((data) => this.render(data))
      .then(() => this.innitEventListeners());
  }

  changeLocation(newLocation: string): void {
    localStorage.setItem("location", newLocation);
    this.location = newLocation;
    this.dataSevenDays = null;
    this.init();
  }

  private checkImage(text: string): string {
    if (text.toLowerCase().includes("rain")) {
      return `weather__image-rain`;
    }
    if (
      text.toLowerCase().includes("sun") ||
      text.toLowerCase().includes("clear")
    ) {
      return `weather__image-sun`;
    }
    return `weather__image-cloudy`;
  }

  private innitEventListeners(): void {
    this.wheatherContainer!.querySelector(".weather__more")!.addEventListener(
      "click",
      () => {
        this.wheatherContainer!.querySelector(
          ".weather__settings",
        )!.classList.remove("weather__settings__open");
        this.getMoreDays();
      },
    );

    this.wheatherContainer!.querySelector(
      ".weather__settings-btn",
    )!.addEventListener("click", () => {
      if (this.wheatherContainer!.querySelector(".weather__seven")) {
        this.wheatherContainer!.querySelector(
          ".weather__seven",
        )!.classList.remove("weather__open");
        this.wheatherContainer!.querySelector(
          ".weather__settings",
        )!.classList.toggle("weather__settings__open");
      }
    });

    this.wheatherContainer!.querySelector(".weather__button")!.addEventListener(
      "click",
      () => {
        const input: HTMLInputElement = this.wheatherContainer!.querySelector(
          ".weather__settings-input",
        )!;
        this.changeLocation(input.value);
      },
    );
  }

  private renderMoreDays(data: Data): void {
    const { forecast } = data;
    const items = forecast.forecastday
      .map((dayItem) => {
        return `
            <li class="weather__list-item">
                    <div class="weather__day">${
                      daysInWeek[new Date(dayItem.date).getDay()]
                    }</div>
                    <div class="weather__condition">
                        <img class="weather__condition__img" src="https:${
                          dayItem.day.condition.icon
                        }" />
                    </div>
                    <div class="weather__temperature"> ${
                      dayItem.day.maxtemp_c
                    }° / ${dayItem.day.mintemp_c}°</div>
                </li>
        `;
      })
      .join("\n");
    const content = `
            <div class="weather__seven">
            <ul class="weater__list">
                <li class="weather__list-header">
                    <div class="day">Day</div>
                    <div class="condition">Condition</div>
                    <div class="temperature">Degrees</div>
                </li>
                ${items}
            </ul>
        </div>
        `;
    this.wheatherContainer!.insertAdjacentHTML("beforeend", content);
  }

  private render(data: Data): void {
    const { current } = data;
    this.wheatherContainer!.innerHTML = `
        <button class="weather__settings-btn"></button>
        <div class="weather__inner">
            <div class="weather__main">
                <div class="weather__image ${this.checkImage(
                  current.condition.text,
                )}"></div>
                <div>
                    <div class="weather__degrees">${current.temp_c}°</div>
                    <div class="weather__location">${this.location}</div>
                    <div class="weather__description">${
                      current.condition.text
                    }</div>
                </div>
            </div>
            <div class="weather__extra">
                <div class="weather__item">
                    <div class="weather__icon weather__icon-wind"></div>
                    <div class="weather__data">${current.wind_kph} km/h</div>
                </div>
                <div class="weather__item">
                    <div class="weather__icon weather__icon-cloud"></div>
                    <div class="weather__data">${current.cloud} %</div>
                </div>
                <div class="weather__item">
                    <div class="weather__icon weather__icon-uv"></div>
                    <div class="weather__data">${current.uv} of 10</div>
                </div>
            </div>
            <div class="weather__more">more</div>
            <div class="weather__settings">
            <div class="weather__settings-block">
                <label for="city">
                    Change the city
                </label>
                <input class="weather__settings-input" id="city" type="text" value="${
                  this.location
                }">
            </div>
            <div class="weather__settings-block">
                <label for="city">
                    Change days quantity
                </label>
                <input class="weather__settings-input" id="city" type="text">
            </div>
            <button class="weather__button">save</button>
        </div>
        </div>`;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const weatherWidget = new WeatherWidget({
  ellementToAppend: ".container",
  location: "Kiyev",
});
