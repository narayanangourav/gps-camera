import { WeatherSnapshot } from "../models/weather.model";

type OpenMeteoCurrentResponse = {
  current?: {
    temperature_2m?: number;
    wind_speed_10m?: number;
    relative_humidity_2m?: number;
    surface_pressure?: number;
  };
};

export const EMPTY_WEATHER_SNAPSHOT: WeatherSnapshot = {
  temperatureCelsius: null,
  windSpeedKph: null,
  humidityPercent: null,
  pressureHpa: null,
};

export const fetchWeatherSnapshot = async (
  latitude: number,
  longitude: number,
): Promise<WeatherSnapshot> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,surface_pressure`,
  );

  if (!response.ok) {
    throw new Error("Unable to fetch weather.");
  }

  const data = (await response.json()) as OpenMeteoCurrentResponse;
  const current = data.current;

  return {
    temperatureCelsius: current?.temperature_2m ?? null,
    windSpeedKph: current?.wind_speed_10m ?? null,
    humidityPercent: current?.relative_humidity_2m ?? null,
    pressureHpa: current?.surface_pressure ?? null,
  };
};
