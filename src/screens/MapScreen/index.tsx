import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import OverviewMap from "../../components/OverviewMap";
import { useMapScreenLogic } from "../../logics/mapScreen.logic";
import { webDomProps } from "../../logics/webDom.logic";
import { useStyles } from "./styles";

export default function MapScreen() {
  const styles = useStyles();
  const logic = useMapScreenLogic();

  return (
    <SafeAreaView style={styles.container} {...webDomProps("map-screen", "map-screen")}>
      <View style={styles.header}>
        <TouchableOpacity onPress={logic.goBack}>
          <Text style={styles.headerAction}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Full Map</Text>
      </View>
      <View style={styles.mapContainer}>
        {logic.region ? (
          <OverviewMap
            region={logic.region}
            markerCoordinate={logic.markerCoordinate}
            onRegionChangeComplete={logic.setRegion}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Location not available yet.</Text>
          </View>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={logic.recenter}>
          <Text style={styles.actionButtonText}>Recenter</Text>
        </TouchableOpacity>
        {logic.canUseCurrentLocation ? (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={logic.useCurrentAsManual}
          >
            <Text style={styles.actionButtonText}>Use Current For Manual</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
