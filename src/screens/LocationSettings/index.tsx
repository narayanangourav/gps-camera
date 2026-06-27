import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { appTheme } from "../../logics/theme.logic";
import { webDomProps } from "../../logics/webDom.logic";
import { useLocationSettingsLogic } from "../../logics/locationSettings.logic";
import { useStyles } from "./styles";

export default function LocationSettingsScreen() {
  const styles = useStyles();
  const logic = useLocationSettingsLogic();

  return (
    <SafeAreaView
      style={styles.container}
      {...webDomProps("location-settings-screen", "location-settings-screen")}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={logic.goBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Location Mode</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Capture source</Text>
          <Text style={styles.subtitle}>{logic.subtitle}</Text>
          <View style={styles.modeRow}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                logic.locationMode === "automatic" && styles.modeButtonActive,
              ]}
              onPress={logic.setAutomaticMode}
            >
              <Text style={styles.modeButtonText}>Automatic</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modeButton,
                logic.locationMode === "manual" && styles.modeButtonActive,
              ]}
              onPress={logic.setManualMode}
            >
              <Text style={styles.modeButtonText}>Manual</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Manual coordinates</Text>
          <Text style={styles.sectionHint}>
            Use a fixed site or project position when browser GPS is unavailable
            or should not change between captures.
          </Text>
          <TextInput
            value={logic.latitude}
            onChangeText={logic.setLatitude}
            style={styles.input}
            placeholder="Latitude"
            placeholderTextColor={appTheme.colors.textMuted}
            keyboardType="decimal-pad"
          />
          <TextInput
            value={logic.longitude}
            onChangeText={logic.setLongitude}
            style={styles.input}
            placeholder="Longitude"
            placeholderTextColor={appTheme.colors.textMuted}
            keyboardType="decimal-pad"
          />
          <TextInput
            value={logic.addressLine1}
            onChangeText={logic.setAddressLine1}
            style={styles.input}
            placeholder="Address line 1"
            placeholderTextColor={appTheme.colors.textMuted}
          />
          <TextInput
            value={logic.addressLine2}
            onChangeText={logic.setAddressLine2}
            style={styles.input}
            placeholder="Address line 2"
            placeholderTextColor={appTheme.colors.textMuted}
          />
          <TextInput
            value={logic.city}
            onChangeText={logic.setCity}
            style={styles.input}
            placeholder="City"
            placeholderTextColor={appTheme.colors.textMuted}
          />
          <TextInput
            value={logic.state}
            onChangeText={logic.setState}
            style={styles.input}
            placeholder="State"
            placeholderTextColor={appTheme.colors.textMuted}
          />
          <TextInput
            value={logic.country}
            onChangeText={logic.setCountry}
            style={styles.input}
            placeholder="Country"
            placeholderTextColor={appTheme.colors.textMuted}
          />
          <TextInput
            value={logic.postalCode}
            onChangeText={logic.setPostalCode}
            style={styles.input}
            placeholder="Postal code"
            placeholderTextColor={appTheme.colors.textMuted}
          />
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={logic.saveManualLocation}
          >
            <Text style={styles.primaryButtonText}>Save Manual Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={logic.clearManualLocation}
          >
            <Text style={styles.secondaryButtonText}>Clear Manual Location</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
