export type Day = {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      icon: string;
    };
  };
};

export type Data = {
  forecast: {
    forecastday: Day[];
  };
  current: {
    cloud: number;
    condition: {
      text: string;
      icon?: string;
    };
    temp_c: number;
    wind_kph: number;
    uv: number;
  };
};

export type Options = {
  ellementToAppend: string;
  location: string;
};
