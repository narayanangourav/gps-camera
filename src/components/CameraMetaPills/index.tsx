import React from "react";
import { View } from "react-native";

import AutoScrollText from "../AutoScrollText";
import { StampConfig } from "../../models/preferences.model";
import { WeatherSnapshot } from "../../models/weather.model";
import { useStyles } from "../../screens/CameraScreen/styles";

type CameraMetaPillsProps = {
  styles: ReturnType<typeof useStyles>;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number | null;
    altitude: number | null;
  } | null;
  weather: WeatherSnapshot;
  stampConfig: StampConfig;
};

const getMetaPills = (
  location: CameraMetaPillsProps["location"],
  weather: WeatherSnapshot,
  stampConfig: StampConfig,
) => {
  const pills: string[] = [];

  if (stampConfig.showWeather) {
    pills.push(
      weather.temperatureCelsius !== null ? `${weather.temperatureCelsius} C` : "-- C",
    );
  }
  if (stampConfig.showCoordinates) {
    pills.push(location ? `Lat ${location.latitude.toFixed(6)}` : "Lat --");
    pills.push(location ? `Lon ${location.longitude.toFixed(6)}` : "Lon --");
  }
  if (stampConfig.showAccuracy) {
    pills.push(
      location && location.accuracy !== null
        ? `Acc ${Math.round(location.accuracy)} m`
        : "Acc --",
    );
  }
  if (stampConfig.showAltitude) {
    pills.push(
      location && location.altitude !== null
        ? `Alt ${Math.round(location.altitude)} m`
        : "Alt --",
    );
  }
  if (stampConfig.showTimezone) {
    pills.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }
  if (stampConfig.showWind && weather.windSpeedKph !== null) {
    pills.push(`${weather.windSpeedKph} km/h`);
  }
  if (stampConfig.showHumidity && weather.humidityPercent !== null) {
    pills.push(`${weather.humidityPercent}% RH`);
  }
  if (stampConfig.showPressure && weather.pressureHpa !== null) {
    pills.push(`${weather.pressureHpa} hPa`);
  }

  return pills;
};

export default function CameraMetaPills(props: CameraMetaPillsProps) {
  return (
    <>
      {getMetaPills(props.location, props.weather, props.stampConfig).map((pill) => (
        <View key={pill} style={[props.styles.pill, props.styles.metaPill]}>
          <AutoScrollText
            text={pill}
            containerStyle={props.styles.pillTextContainer}
            textStyle={props.styles.pillText}
          />
        </View>
      ))}
    </>
  );
}
