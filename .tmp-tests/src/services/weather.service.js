"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWeatherSnapshot = exports.EMPTY_WEATHER_SNAPSHOT = void 0;
exports.EMPTY_WEATHER_SNAPSHOT = {
    temperatureCelsius: null,
    windSpeedKph: null,
    humidityPercent: null,
    pressureHpa: null,
};
const fetchWeatherSnapshot = async (latitude, longitude) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,surface_pressure`);
    if (!response.ok) {
        throw new Error("Unable to fetch weather.");
    }
    const data = (await response.json());
    const current = data.current;
    return {
        temperatureCelsius: current?.temperature_2m ?? null,
        windSpeedKph: current?.wind_speed_10m ?? null,
        humidityPercent: current?.relative_humidity_2m ?? null,
        pressureHpa: current?.surface_pressure ?? null,
    };
};
exports.fetchWeatherSnapshot = fetchWeatherSnapshot;
